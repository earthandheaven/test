import Link from "next/link";
import { notFound } from "next/navigation";
import { getParfumById, parfumData } from "@/lib/data";
import StarRating from "@/components/StarRating";

export async function generateStaticParams() {
  return parfumData.map((p) => ({ id: String(p.id) }));
}

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getSimilarityColor(pct: number): string {
  if (pct >= 85) return "bg-green-500";
  if (pct >= 70) return "bg-yellow-400";
  return "bg-orange-400";
}

function getSimilarityLabel(pct: number): string {
  if (pct >= 85) return "Sangat Mirip";
  if (pct >= 70) return "Cukup Mirip";
  return "Agak Mirip";
}

export default async function ParfumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parfumId = parseInt(id);

  if (isNaN(parfumId)) notFound();

  const parfum = getParfumById(parfumId);
  if (!parfum) notFound();

  const avgSavings =
    parfum.dupes.length > 0
      ? Math.round(
          parfum.dupes.reduce(
            (acc, d) => acc + (parfum.priceMin - d.priceMax),
            0
          ) / parfum.dupes.length
        )
      : 0;

  const sortedDupes = [...parfum.dupes].sort(
    (a, b) => b.similarity - a.similarity
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-rose-500 transition-colors">
          Beranda
        </Link>
        <span>/</span>
        <span className="text-gray-600">{parfum.name}</span>
      </nav>

      {/* Parfum Header */}
      <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 rounded-3xl p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="text-7xl">🌹</div>
          <div className="flex-1">
            <p className="text-rose-400 font-semibold text-sm uppercase tracking-widest mb-1">
              {parfum.brand}
            </p>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {parfum.name}
            </h1>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {parfum.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-white/80 rounded-xl px-4 py-2">
                <span className="text-gray-400 block text-xs mb-0.5">
                  Harga Original
                </span>
                <span className="font-bold text-gray-800">
                  {formatRupiah(parfum.priceMin)} –{" "}
                  {formatRupiah(parfum.priceMax)}
                </span>
              </div>
              <div className="bg-white/80 rounded-xl px-4 py-2">
                <span className="text-gray-400 block text-xs mb-0.5">
                  Notes
                </span>
                <span className="font-medium text-gray-700">
                  {parfum.notes}
                </span>
              </div>
              {avgSavings > 0 && (
                <div className="bg-green-100 rounded-xl px-4 py-2">
                  <span className="text-green-600 block text-xs mb-0.5">
                    Rata-rata Hemat
                  </span>
                  <span className="font-bold text-green-700">
                    {formatRupiah(avgSavings)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dupes Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🧴 Rekomendasi Dupe ({parfum.dupes.length})
      </h2>

      {sortedDupes.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-10 text-center text-gray-500">
          Belum ada dupe untuk parfum ini.
        </div>
      ) : (
        <div className="space-y-6">
          {sortedDupes.map((dupe, index) => {
            const avgRating =
              dupe.reviews.length > 0
                ? dupe.reviews.reduce((acc, r) => acc + r.rating, 0) /
                  dupe.reviews.length
                : null;

            return (
              <div
                key={dupe.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Dupe Header */}
                <div className="p-6 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center font-bold text-rose-500 flex-shrink-0">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">
                          {dupe.brand}
                        </p>
                        <h3 className="text-lg font-bold text-gray-800">
                          {dupe.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {dupe.description}
                        </p>
                      </div>
                    </div>

                    {/* Similarity Badge */}
                    <div className="flex-shrink-0">
                      <div className="text-center">
                        <div
                          className={`${getSimilarityColor(dupe.similarity)} text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto`}
                        >
                          {dupe.similarity}%
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {getSimilarityLabel(dupe.similarity)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dupe Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 rounded-xl p-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Harga Dupe</p>
                      <p className="font-semibold text-gray-800">
                        {formatRupiah(dupe.priceMin)} –{" "}
                        {formatRupiah(dupe.priceMax)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Notes</p>
                      <p className="text-sm text-gray-700">{dupe.notes}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Beli di mana</p>
                      <p className="text-sm text-gray-700">
                        {dupe.whereToBuy}
                      </p>
                    </div>
                  </div>

                  {/* Savings & Rating Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                    <div className="flex items-center gap-3">
                      {parfum.priceMin - dupe.priceMax > 0 && (
                        <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                          💰 Hemat{" "}
                          {formatRupiah(parfum.priceMin - dupe.priceMax)}
                        </span>
                      )}
                      {avgRating !== null && (
                        <div className="flex items-center gap-1">
                          <StarRating rating={Math.round(avgRating)} readonly />
                          <span className="text-sm text-gray-500">
                            ({dupe.reviews.length} ulasan)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="border-t border-gray-100 p-6">
                  <h4 className="font-semibold text-gray-700 mb-4">
                    💬 Ulasan Komunitas
                  </h4>

                  {dupe.reviews.length > 0 ? (
                    <div className="space-y-3">
                      {dupe.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="bg-gray-50 rounded-xl p-4"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-700 text-sm">
                              {review.author}
                            </span>
                            <StarRating rating={review.rating} readonly />
                          </div>
                          <p className="text-sm text-gray-600">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">
                      Belum ada ulasan.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Back Button */}
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 font-medium transition-colors"
        >
          ← Kembali ke Daftar Parfum
        </Link>
      </div>
    </div>
  );
}
