import Link from "next/link";

interface Dupe {
  id: number;
  name: string;
  brand: string;
  priceMin: number;
  priceMax: number;
  similarity: number;
}

interface Parfum {
  id: number;
  name: string;
  brand: string;
  description: string;
  notes: string;
  priceMin: number;
  priceMax: number;
  dupes: Dupe[];
}

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PerfumeCard({ parfum }: { parfum: Parfum }) {
  const bestDupe =
    parfum.dupes.length > 0
      ? parfum.dupes.reduce((a, b) => (a.similarity > b.similarity ? a : b))
      : null;

  const savings = bestDupe
    ? parfum.priceMin - bestDupe.priceMax
    : 0;

  return (
    <Link href={`/parfum/${parfum.id}`} className="block group">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-rose-200 transition-all overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-5 pb-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-rose-400 uppercase tracking-wider mb-1">
                {parfum.brand}
              </p>
              <h3 className="font-bold text-gray-800 text-lg group-hover:text-rose-600 transition-colors">
                {parfum.name}
              </h3>
            </div>
            <div className="text-3xl flex-shrink-0">🌹</div>
          </div>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {parfum.description}
          </p>
        </div>

        {/* Price */}
        <div className="px-5 py-3 border-b border-gray-50">
          <p className="text-xs text-gray-400 mb-1">Harga Original</p>
          <p className="font-semibold text-gray-700">
            {formatRupiah(parfum.priceMin)} – {formatRupiah(parfum.priceMax)}
          </p>
        </div>

        {/* Notes */}
        <div className="px-5 py-3 border-b border-gray-50">
          <p className="text-xs text-gray-400 mb-1">Notes</p>
          <p className="text-sm text-gray-600 line-clamp-1">{parfum.notes}</p>
        </div>

        {/* Best Dupe */}
        <div className="px-5 py-4">
          {bestDupe ? (
            <div className="bg-green-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                  Dupe Terbaik
                </p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  {bestDupe.similarity}% mirip
                </span>
              </div>
              <p className="font-semibold text-gray-800 text-sm">
                {bestDupe.name}
              </p>
              <p className="text-xs text-gray-500">{bestDupe.brand}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm font-medium text-green-700">
                  {formatRupiah(bestDupe.priceMin)} –{" "}
                  {formatRupiah(bestDupe.priceMax)}
                </p>
                {savings > 0 && (
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                    Hemat {formatRupiah(savings)}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-2">
              Belum ada dupe tersedia
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-4 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {parfum.dupes.length} dupe tersedia
          </span>
          <span className="text-xs text-rose-500 font-medium group-hover:underline">
            Lihat detail →
          </span>
        </div>
      </div>
    </Link>
  );
}
