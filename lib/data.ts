export interface Review {
  id: number;
  rating: number;
  comment: string;
  author: string;
}

export interface Dupe {
  id: number;
  name: string;
  brand: string;
  description: string;
  notes: string;
  priceMin: number;
  priceMax: number;
  similarity: number;
  whereToBuy: string;
  reviews: Review[];
}

export interface OriginalPerfume {
  id: number;
  name: string;
  brand: string;
  description: string;
  notes: string;
  priceMin: number;
  priceMax: number;
  dupes: Dupe[];
}

export const parfumData: OriginalPerfume[] = [
  {
    id: 1,
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    description:
      "Parfum oriental floral yang ikonik dengan aroma kopi hitam, vanila, dan bunga putih. Cocok untuk malam hari.",
    notes: "Kopi, Vanila, Bunga Putih, Cendana, Kasmir",
    priceMin: 1200000,
    priceMax: 1800000,
    dupes: [
      {
        id: 1,
        name: "Black Sugar",
        brand: "Aquolina",
        description:
          "Alternatif terjangkau dengan aroma manis gula karamel dan vanila yang mirip Black Opium.",
        notes: "Karamel, Vanila, Stroberi, Kapas",
        priceMin: 180000,
        priceMax: 280000,
        similarity: 82,
        whereToBuy: "Shopee, Tokopedia, Guardian",
        reviews: [
          {
            id: 1,
            rating: 5,
            comment: "Sangat mirip dengan originalnya! Tahan lama seharian.",
            author: "Sari W.",
          },
          {
            id: 2,
            rating: 4,
            comment:
              "Hampir sama, bedanya di sillage-nya yang sedikit lebih lemah.",
            author: "Budi P.",
          },
        ],
      },
      {
        id: 2,
        name: "Scarlett by Zara",
        brand: "Zara",
        description:
          "Dupe dari Zara dengan perpaduan mawar dan kopi yang sangat mirip dengan nuansa Black Opium.",
        notes: "Mawar, Kopi, Vanila, Lada Hitam",
        priceMin: 89000,
        priceMax: 130000,
        similarity: 78,
        whereToBuy: "Zara Indonesia, Shopee",
        reviews: [
          {
            id: 3,
            rating: 4,
            comment: "Worth it banget! Budget friendly tapi tetap wangi.",
            author: "Dewi R.",
          },
          {
            id: 4,
            rating: 5,
            comment: "Recommended banget buat yang mau coba Black Opium.",
            author: "Rina S.",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Sauvage",
    brand: "Dior",
    description:
      "Parfum maskulin segar dengan nuansa mineral dan kayu yang kuat. Salah satu best-seller pria dunia.",
    notes: "Bergamot, Lada, Lavender, Vetiver, Ambroxan",
    priceMin: 1500000,
    priceMax: 2200000,
    dupes: [
      {
        id: 3,
        name: "Horizon Extreme",
        brand: "Davidoff",
        description:
          "Alternatif dengan nuansa segar ambre wood yang sangat dekat dengan Sauvage.",
        notes: "Jahe, Iris, Santal, Ambergris",
        priceMin: 350000,
        priceMax: 550000,
        similarity: 80,
        whereToBuy: "Shopee, Tokopedia, Department Store",
        reviews: [
          {
            id: 5,
            rating: 5,
            comment: "Sangat mirip dengan originalnya! Tahan lama seharian.",
            author: "Anton H.",
          },
          {
            id: 6,
            rating: 4,
            comment: "Mirip banget, cocok buat daily wear.",
            author: "Rizky F.",
          },
        ],
      },
      {
        id: 4,
        name: "Homme Signature",
        brand: "Zara Man",
        description:
          "Dupe Zara untuk Sauvage yang sangat mirip dengan harga yang sangat terjangkau.",
        notes: "Bergamot, Lavender, Cedar, Ambar",
        priceMin: 99000,
        priceMax: 140000,
        similarity: 75,
        whereToBuy: "Zara Indonesia, Shopee",
        reviews: [
          {
            id: 7,
            rating: 4,
            comment: "Lumayan mirip, harga miring banget!",
            author: "Bagas K.",
          },
          {
            id: 8,
            rating: 3,
            comment: "Mirip tapi longevity-nya kurang.",
            author: "Dimas A.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Good Girl",
    brand: "Carolina Herrera",
    description:
      "Parfum feminin ikonik dengan botol berbentuk sepatu tinggi. Aroma floral oriental yang kaya.",
    notes: "Jasmin, Tuberose, Kakao, Sandalwood, Tonka Bean",
    priceMin: 1300000,
    priceMax: 1900000,
    dupes: [
      {
        id: 5,
        name: "Good Life",
        brand: "Zara Woman",
        description:
          "Dupe dari Zara yang menangkap esensi floral gelap Good Girl dengan harga hemat.",
        notes: "Jasmin, Mawar, Coklat, Musk",
        priceMin: 89000,
        priceMax: 130000,
        similarity: 77,
        whereToBuy: "Zara Indonesia, Shopee",
        reviews: [
          {
            id: 9,
            rating: 5,
            comment: "Sangat mirip dengan originalnya! Tahan lama seharian.",
            author: "Maya L.",
          },
          {
            id: 10,
            rating: 4,
            comment: "Hampir sama, bedanya di sillage-nya yang sedikit lebih lemah.",
            author: "Nisa R.",
          },
        ],
      },
      {
        id: 6,
        name: "Bombshell",
        brand: "Victoria's Secret",
        description:
          "Bombshell dari Victoria's Secret hadir dengan nuansa floral yang mirip Good Girl.",
        notes: "Passion Fruit, Peony, Vanila, Musk",
        priceMin: 250000,
        priceMax: 400000,
        similarity: 72,
        whereToBuy: "Shopee, Tokopedia, Sephora",
        reviews: [
          {
            id: 11,
            rating: 4,
            comment: "Worth it banget! Budget friendly tapi tetap wangi.",
            author: "Putri A.",
          },
          {
            id: 12,
            rating: 4,
            comment: "Recommended buat yang suka Good Girl.",
            author: "Fitri D.",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    description:
      "Parfum mewah ultra premium dengan aroma ambre kayu safron yang unik dan tahan lama.",
    notes: "Safron, Jasmin, Ambergris, Cendana, Cedar",
    priceMin: 4500000,
    priceMax: 6500000,
    dupes: [
      {
        id: 7,
        name: "Club de Nuit Milestone",
        brand: "Armaf",
        description:
          "Dupe terbaik BR540 dengan longevity yang kuat dan sillage yang mengesankan.",
        notes: "Safron, Amberwood, Musk, Jasmin",
        priceMin: 450000,
        priceMax: 700000,
        similarity: 88,
        whereToBuy: "Shopee, Tokopedia, Lazada",
        reviews: [
          {
            id: 13,
            rating: 5,
            comment: "Sangat mirip dengan originalnya! Tahan lama seharian.",
            author: "Kevin S.",
          },
          {
            id: 14,
            rating: 5,
            comment: "Ini yang terbaik! Hampir identik dengan BR540.",
            author: "Hendra W.",
          },
        ],
      },
      {
        id: 8,
        name: "Decent Oud",
        brand: "Maison Alhambra",
        description:
          "Clone langsung dari Baccarat Rouge 540 dengan kemiripan yang sangat tinggi.",
        notes: "Oud, Kayu Cedar, Ambrette, Vanilla",
        priceMin: 250000,
        priceMax: 400000,
        similarity: 90,
        whereToBuy: "Shopee, Tokopedia",
        reviews: [
          {
            id: 15,
            rating: 5,
            comment: "Mirip banget sama BR540, harga jauh lebih murah.",
            author: "Farid M.",
          },
          {
            id: 16,
            rating: 5,
            comment: "Best dupe BR540 di kelasnya!",
            author: "Yusuf A.",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "La Vie Est Belle",
    brand: "Lancôme",
    description:
      "Parfum feminin ikonik yang melambangkan kebahagiaan dengan aroma iris dan praline manis.",
    notes: "Iris, Praline, Patchouli, Gula, Vanila",
    priceMin: 1100000,
    priceMax: 1600000,
    dupes: [
      {
        id: 9,
        name: "Beautiful Life",
        brand: "Zara Woman",
        description:
          "Dupe dari Zara dengan nuansa manis iris yang sangat mirip La Vie Est Belle.",
        notes: "Iris, Vanila, Kayu Manis, Musk",
        priceMin: 89000,
        priceMax: 130000,
        similarity: 80,
        whereToBuy: "Zara Indonesia, Shopee",
        reviews: [
          {
            id: 17,
            rating: 5,
            comment: "Sangat mirip dengan originalnya! Tahan lama seharian.",
            author: "Lita S.",
          },
          {
            id: 18,
            rating: 4,
            comment: "Hampir sama, recommended!",
            author: "Wulan P.",
          },
        ],
      },
      {
        id: 10,
        name: "Just Me",
        brand: "Paris Hilton",
        description:
          "Alternatif dengan aroma manis floral yang senada dengan La Vie Est Belle.",
        notes: "Jasmin, Mawar, Vanila, Sandal",
        priceMin: 200000,
        priceMax: 320000,
        similarity: 70,
        whereToBuy: "Shopee, Tokopedia",
        reviews: [
          {
            id: 19,
            rating: 4,
            comment: "Worth it banget! Budget friendly tapi tetap wangi.",
            author: "Citra N.",
          },
          {
            id: 20,
            rating: 3,
            comment: "Mirip tapi tidak terlalu dekat dengan originalnya.",
            author: "Esti R.",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Oud Wood",
    brand: "Tom Ford",
    description:
      "Parfum oud kayu premium yang hangat dan mewah, cocok untuk semua gender.",
    notes: "Oud, Sandal, Mawar Turki, Cardamom, Vetiver",
    priceMin: 2500000,
    priceMax: 4000000,
    dupes: [
      {
        id: 11,
        name: "Oud Al Layl",
        brand: "Rasasi",
        description:
          "Dupe Timur Tengah yang sangat bagus untuk Tom Ford Oud Wood dengan kualitas tinggi.",
        notes: "Oud, Mawar, Sandal, Amber",
        priceMin: 350000,
        priceMax: 600000,
        similarity: 85,
        whereToBuy: "Shopee, Tokopedia, Lazada",
        reviews: [
          {
            id: 21,
            rating: 5,
            comment: "Sangat mirip dengan originalnya! Tahan lama seharian.",
            author: "Rafi A.",
          },
          {
            id: 22,
            rating: 4,
            comment: "Hampir sama, bedanya di sillage-nya yang sedikit lebih lemah.",
            author: "Ilham S.",
          },
        ],
      },
      {
        id: 12,
        name: "Fragrance World Oud Wood",
        brand: "Fragrance World",
        description:
          "Clone terjangkau dari Tom Ford Oud Wood dengan performa yang solid.",
        notes: "Oud, Kayu Cedar, Vanilla, Amber",
        priceMin: 200000,
        priceMax: 350000,
        similarity: 83,
        whereToBuy: "Shopee, Tokopedia",
        reviews: [
          {
            id: 23,
            rating: 4,
            comment: "Worth it banget! Budget friendly tapi tetap wangi.",
            author: "Galih P.",
          },
          {
            id: 24,
            rating: 5,
            comment: "Hampir identik dengan Tom Ford Oud Wood.",
            author: "Wahyu M.",
          },
        ],
      },
    ],
  },
];

export function getParfumById(id: number): OriginalPerfume | undefined {
  return parfumData.find((p) => p.id === id);
}

export function searchParfum(
  query: string,
  brand: string
): OriginalPerfume[] {
  return parfumData.filter((p) => {
    const matchQuery =
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.notes.toLowerCase().includes(query.toLowerCase());

    const matchBrand = !brand || p.brand === brand;

    return matchQuery && matchBrand;
  });
}

export function getAllBrands(): string[] {
  return [...new Set(parfumData.map((p) => p.brand))].sort();
}
