import Link from "next/link";
import PerfumeCard from "@/components/PerfumeCard";
import { parfumData } from "@/lib/data";

export const metadata = {
  title: "Semua Parfum - DupeFinder ID",
  description: "Daftar lengkap parfum original beserta rekomendasi dupe-nya.",
};

export default function AllPerfumesPage() {
  const totalDupes = parfumData.reduce((acc, p) => acc + p.dupes.length, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-rose-500">
          Beranda
        </Link>{" "}
        / <span className="text-gray-600">Semua Parfum</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Semua Parfum</h1>
          <p className="text-gray-500 mt-1">
            {parfumData.length} parfum original dengan {totalDupes} dupe
            tersedia
          </p>
        </div>
        <Link
          href="/"
          className="text-sm text-rose-500 hover:underline hidden md:block"
        >
          ← Kembali
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parfumData.map((parfum) => (
          <PerfumeCard key={parfum.id} parfum={parfum} />
        ))}
      </div>
    </div>
  );
}
