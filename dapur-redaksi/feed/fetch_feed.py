#!/usr/bin/env python3
"""Ambil berita terbaru (Google News RSS) per niche akun dan tren pencarian
Google Indonesia, lalu tulis dokumen siap-unggah untuk koleksi `feed` di
database artifact Dapur Redaksi.

Pemakaian:
  python3 -I fetch_feed.py --niches NICHES_DIR --existing EXISTING_DIR --out OUT_DIR

  NICHES_DIR   hasil ArtifactData list koleksi `niches` dengan out_dir
               (file JSON per akun: accId, name, niche, keywords, lang)
  EXISTING_DIR hasil ArtifactData list koleksi `feed` dengan out_dir (boleh kosong)
  OUT_DIR      folder keluaran: new/<doc_id>.json + plan.json

plan.json berisi:
  new:    doc_id yang perlu dibuat (set tanpa if_version)
  update: doc_id lama yang muncul lagi dan perlu accountIds baru (pakai if_version)
  delete: doc_id lama yang kedaluwarsa (lebih dari MAX_AGE_H jam)
"""
import argparse, hashlib, json, os, re, sys, time, urllib.parse, urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

UA = "Mozilla/5.0 (compatible; DapurRedaksiFeed/1.0)"
PER_ACCOUNT = 12      # berita maksimal per akun per putaran
TRENDS = 15           # tren pencarian maksimal per putaran
MAX_AGE_H = 48        # berita lebih tua dari ini dihapus
HT = "{https://trends.google.com/trending/rss}"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def strip_html(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", s or "")).strip()


def ts(s):
    try:
        return int(parsedate_to_datetime(s).timestamp() * 1000)
    except Exception:
        return int(time.time() * 1000)


def doc_id(kind, key):
    return kind + "_" + hashlib.sha1(key.encode("utf-8")).hexdigest()[:20]


def lang_params(lang):
    if str(lang or "").lower().startswith("english"):
        return "hl=en-ID&gl=ID&ceid=ID:en"
    return "hl=id&gl=ID&ceid=ID:id"


def news_for(keyword, lang):
    q = urllib.parse.quote(f"{keyword} when:1d")
    url = f"https://news.google.com/rss/search?q={q}&{lang_params(lang)}"
    root = ET.fromstring(get(url))
    out = []
    for it in root.iter("item"):
        title = (it.findtext("title") or "").strip()
        src = (it.findtext("source") or "").strip()
        if src and title.endswith(" - " + src):
            title = title[: -len(" - " + src)].strip()
        desc_html = it.findtext("description") or ""
        related = []
        for m in re.finditer(r'<a [^>]*>(.*?)</a>(?:&nbsp;|\s)*<font[^>]*>(.*?)</font>', desc_html, re.S):
            t, s = strip_html(m.group(1)), strip_html(m.group(2))
            if t and t != title:
                related.append({"title": t[:200], "source": s[:60]})
        out.append({
            "title": title[:240],
            "source": src[:80],
            "url": (it.findtext("link") or "").strip(),
            "publishedAt": ts(it.findtext("pubDate")),
            "related": related[:4],
            "keyword": keyword,
        })
    return out


def trends():
    root = ET.fromstring(get("https://trends.google.com/trending/rss?geo=ID"))
    out = []
    for it in root.iter("item"):
        news = []
        for n in it.findall(HT + "news_item"):
            news.append({
                "title": strip_html(n.findtext(HT + "news_item_title"))[:200],
                "source": strip_html(n.findtext(HT + "news_item_source"))[:60],
                "url": (n.findtext(HT + "news_item_url") or "").strip(),
            })
        out.append({
            "title": (it.findtext("title") or "").strip()[:120],
            "traffic": (it.findtext(HT + "approx_traffic") or "").strip(),
            "publishedAt": ts(it.findtext("pubDate")),
            "related": news[:4],
        })
    return out[:TRENDS]


def load_dir(d):
    docs = {}
    if not d or not os.path.isdir(d):
        return docs
    for root, _, files in os.walk(d):
        for f in files:
            if f.endswith(".json"):
                try:
                    with open(os.path.join(root, f), encoding="utf-8") as fh:
                        docs[f[:-5]] = json.load(fh)
                except Exception:
                    pass
    return docs


def body(d):
    """ArtifactData out_dir files may wrap fields; accept both shapes."""
    if isinstance(d, dict) and isinstance(d.get("data"), dict):
        return d["data"]
    return d


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--niches", required=True)
    ap.add_argument("--existing", default="")
    ap.add_argument("--out", required=True)
    a = ap.parse_args()

    now = int(time.time() * 1000)
    niches = [body(d) for d in load_dir(a.niches).values()]
    niches = [n for n in niches if isinstance(n, dict) and n.get("accId")]
    existing = {k: body(v) for k, v in load_dir(a.existing).items()}

    fresh = {}   # doc_id -> doc
    errors = []

    for n in niches:
        kws = [k.strip() for k in re.split(r"[,\n]", n.get("keywords") or "") if k.strip()]
        if not kws:
            kws = [n.get("niche") or ""]
        items = []
        for kw in kws[:4]:
            if not kw:
                continue
            try:
                items += news_for(kw, n.get("lang"))
            except Exception as e:
                errors.append(f"{n.get('name')}: {kw}: {e}")
        seen, picked = set(), []
        for it in sorted(items, key=lambda x: -x["publishedAt"]):
            key = re.sub(r"\W+", " ", it["title"].lower()).strip()
            if key in seen or now - it["publishedAt"] > MAX_AGE_H * 3600e3:
                continue
            seen.add(key)
            picked.append(it)
            if len(picked) >= PER_ACCOUNT:
                break
        for it in picked:
            did = doc_id("news", it["title"].lower())
            d = fresh.get(did) or {"kind": "news", **it, "accountIds": [], "fetchedAt": now}
            if n["accId"] not in d["accountIds"]:
                d["accountIds"].append(n["accId"])
            fresh[did] = d

    try:
        for t in trends():
            did = doc_id("trend", t["title"].lower() + time.strftime("%Y%m%d"))
            fresh[did] = {"kind": "trend", **t, "accountIds": [], "fetchedAt": now}
    except Exception as e:
        errors.append(f"trends: {e}")

    os.makedirs(os.path.join(a.out, "new"), exist_ok=True)
    plan = {"new": [], "update": [], "delete": [], "errors": errors, "at": now}
    for did, d in fresh.items():
        if did in existing:
            old_ids = set(existing[did].get("accountIds") or [])
            if not set(d["accountIds"]) <= old_ids:
                plan["update"].append({"doc_id": did, "accountIds": sorted(old_ids | set(d["accountIds"]))})
            continue
        with open(os.path.join(a.out, "new", did + ".json"), "w", encoding="utf-8") as fh:
            json.dump(d, fh, ensure_ascii=False)
        plan["new"].append(did)
    for did, d in existing.items():
        if now - int(d.get("publishedAt") or 0) > MAX_AGE_H * 3600e3:
            plan["delete"].append(did)
    with open(os.path.join(a.out, "plan.json"), "w", encoding="utf-8") as fh:
        json.dump(plan, fh, ensure_ascii=False, indent=1)
    print(json.dumps({"accounts": len(niches), "new": len(plan["new"]), "update": len(plan["update"]),
                      "delete": len(plan["delete"]), "errors": errors}, ensure_ascii=False))


if __name__ == "__main__":
    sys.exit(main())
