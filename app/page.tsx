import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import PerfumeCard from "@/components/PerfumeCard";

interface SearchParams {
  q?: string;
  brand?: string;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q = "", brand = "" } = await searchParams;

  const parfums = await prisma.originalPerfume.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { name: { contains: q } },
                { brand: { contains: q } },
                { notes: { contains: q } },
              ],
            }
          : {},
        brand ? { brand: { contains: brand } } : {},
      ],
    },
    include: {
      dupes: {
        select: {
          id: true,
          name: true,
          brand: true,
          priceMin: true,
          priceMax: true,
          similarity: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  const allBrands = await prisma.originalPerfume.findMany({
    select: { brand: true },
    distinct: ["brand"],
    orderBy: { brand: "asc" },
  });

  const totalParfum = await prisma.originalPerfume.count();
  const totalDupes = await prisma.dupe.count();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">🌸</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Temukan Parfum Dupe{" "}
            <span className="text-rose-500">Terbaik</span> Untukmu
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Cari alternatif parfum mewah favoritmu dengan harga yang lebih
            terjangkau. Tetap wangi, hemat budget!
          </p>
          <SearchBar initialQuery={q} />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center text-sm text-gray-600">
            <div>
              <span className="font-bold text-rose-500 text-xl block">
                {totalParfum}
              </span>
              Parfum Original
            </div>
            <div>
              <span className="font-bold text-rose-500 text-xl block">
                {totalDupes}
              </span>
              Rekomendasi Dupe
            </div>
            <div>
              <span className="font-bold text-rose-500 text-xl block">
                {allBrands.length}
              </span>
              Brand Tersedia
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Results */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        {/* Brand Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href={q ? `/?q=${q}` : "/"}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !brand
                ? "bg-rose-500 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-rose-300"
            }`}
          >
            Semua Brand
          </Link>
          {allBrands.map((b) => (
            <Link
              key={b.brand}
              href={`/?brand=${encodeURIComponent(b.brand)}${q ? `&q=${q}` : ""}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                brand === b.brand
                  ? "bg-rose-500 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-rose-300"
              }`}
            >
              {b.brand}
            </Link>
          ))}
        </div>

        {/* Search results info */}
        {(q || brand) && (
          <div className="mb-6 text-gray-600">
            {q && (
              <span>
                Hasil pencarian untuk <strong>&quot;{q}&quot;</strong>
              </span>
            )}
            {brand && (
              <span className="ml-2">
                · Brand: <strong>{brand}</strong>
              </span>
            )}
            <span className="ml-2 text-gray-400">
              ({parfums.length} ditemukan)
            </span>
            <Link href="/" className="ml-3 text-rose-500 hover:underline">
              Hapus filter
            </Link>
          </div>
        )}

        {/* Parfum Grid */}
        {parfums.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Parfum tidak ditemukan
            </h3>
            <p className="text-gray-500">
              Coba kata kunci lain atau{" "}
              <Link href="/" className="text-rose-500 hover:underline">
                lihat semua parfum
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parfums.map((parfum) => (
              <PerfumeCard key={parfum.id} parfum={parfum} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">
            Belum menemukan parfum yang kamu cari?
          </h2>
          <p className="text-rose-100 mb-6">
            Database kami terus diupdate dengan rekomendasi dupe terbaru dari
            komunitas parfum Indonesia.
          </p>
          <div className="bg-white/20 rounded-xl px-6 py-3 inline-block">
            <span className="font-medium">
              💌 Ikuti terus DupeFinder ID untuk update terbaru!
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
