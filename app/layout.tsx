import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DupeFinder ID - Temukan Parfum Dupe Terbaik",
  description:
    "Temukan rekomendasi parfum dupe berkualitas untuk parfum mewah favoritmu. Hemat budget, tetap wangi seharian!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen">
        <header className="bg-white border-b border-rose-100 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌸</span>
              <div>
                <span className="font-bold text-rose-600 text-lg">
                  DupeFinder
                </span>
                <span className="text-gray-500 text-sm ml-1">ID</span>
              </div>
            </Link>
            <nav className="flex items-center gap-4 text-sm text-gray-600">
              <Link href="/" className="hover:text-rose-600 transition-colors">
                Beranda
              </Link>
              <Link
                href="/parfum"
                className="hover:text-rose-600 transition-colors"
              >
                Semua Parfum
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-white border-t border-rose-100 mt-16 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
            <p>
              🌸 <strong className="text-rose-500">DupeFinder ID</strong> —
              Temukan parfum dupe terbaik untuk budget kamu
            </p>
            <p className="mt-1">
              Dibuat dengan ❤️ untuk komunitas parfum Indonesia
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
