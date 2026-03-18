import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "node:path";

const dbPath = path.join(process.cwd(), "prisma/dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.dupe.deleteMany();
  await prisma.originalPerfume.deleteMany();

  const perfumes = [
    {
      name: "Black Opium",
      brand: "Yves Saint Laurent",
      description:
        "Parfum oriental floral yang ikonik dengan aroma kopi hitam, vanila, dan bunga putih. Cocok untuk malam hari.",
      notes: "Kopi, Vanila, Bunga Putih, Cendana, Kasmir",
      priceMin: 1200000,
      priceMax: 1800000,
      dupes: [
        {
          name: "Black Sugar",
          brand: "Aquolina",
          description:
            "Alternatif terjangkau dengan aroma manis gula karamel dan vanila yang mirip Black Opium.",
          notes: "Karamel, Vanila, Stroberi, Kapas",
          priceMin: 180000,
          priceMax: 280000,
          similarity: 82,
          whereToBuy: "Shopee, Tokopedia, Guardian",
        },
        {
          name: "Scarlett by Zara",
          brand: "Zara",
          description:
            "Dupe dari Zara dengan perpaduan mawar dan kopi yang sangat mirip dengan nuansa Black Opium.",
          notes: "Mawar, Kopi, Vanila, Lada Hitam",
          priceMin: 89000,
          priceMax: 130000,
          similarity: 78,
          whereToBuy: "Zara Indonesia, Shopee",
        },
      ],
    },
    {
      name: "Sauvage",
      brand: "Dior",
      description:
        "Parfum maskulin segar dengan nuansa mineral dan kayu yang kuat. Salah satu best-seller pria dunia.",
      notes: "Bergamot, Lada, Lavender, Vetiver, Ambroxan",
      priceMin: 1500000,
      priceMax: 2200000,
      dupes: [
        {
          name: "Horizon Extreme",
          brand: "Davidoff",
          description:
            "Alternatif dengan nuansa segar ambre wood yang sangat dekat dengan Sauvage.",
          notes: "Jahe, Iris, Santal, Ambergris",
          priceMin: 350000,
          priceMax: 550000,
          similarity: 80,
          whereToBuy: "Shopee, Tokopedia, Department Store",
        },
        {
          name: "Homme Signature",
          brand: "Zara Man",
          description:
            "Dupe Zara untuk Sauvage yang sangat mirip dengan harga yang sangat terjangkau.",
          notes: "Bergamot, Lavender, Cedar, Ambar",
          priceMin: 99000,
          priceMax: 140000,
          similarity: 75,
          whereToBuy: "Zara Indonesia, Shopee",
        },
      ],
    },
    {
      name: "Good Girl",
      brand: "Carolina Herrera",
      description:
        "Parfum feminin ikonik dengan botol berbentuk sepatu tinggi. Aroma floral oriental yang kaya.",
      notes: "Jasmin, Tuberose, Kakao, Sandalwood, Tonka Bean",
      priceMin: 1300000,
      priceMax: 1900000,
      dupes: [
        {
          name: "Good Life",
          brand: "Zara Woman",
          description:
            "Dupe dari Zara yang menangkap esensi floral gelap Good Girl dengan harga hemat.",
          notes: "Jasmin, Mawar, Coklat, Musk",
          priceMin: 89000,
          priceMax: 130000,
          similarity: 77,
          whereToBuy: "Zara Indonesia, Shopee",
        },
        {
          name: "Bombshell",
          brand: "Victoria's Secret",
          description:
            "Bombshell dari Victoria's Secret hadir dengan nuansa floral yang mirip Good Girl.",
          notes: "Passion Fruit, Peony, Vanila, Musk",
          priceMin: 250000,
          priceMax: 400000,
          similarity: 72,
          whereToBuy: "Shopee, Tokopedia, Sephora",
        },
      ],
    },
    {
      name: "Baccarat Rouge 540",
      brand: "Maison Francis Kurkdjian",
      description:
        "Parfum mewah ultra premium dengan aroma ambre kayu safron yang unik dan tahan lama.",
      notes: "Safron, Jasmin, Ambergris, Cendana, Cedar",
      priceMin: 4500000,
      priceMax: 6500000,
      dupes: [
        {
          name: "Club de Nuit Milestone",
          brand: "Armaf",
          description:
            "Dupe terbaik BR540 dengan longevity yang kuat dan sillage yang mengesankan.",
          notes: "Safron, Amberwood, Musk, Jasmin",
          priceMin: 450000,
          priceMax: 700000,
          similarity: 88,
          whereToBuy: "Shopee, Tokopedia, Lazada",
        },
        {
          name: "Decent Oud",
          brand: "Maison Alhambra",
          description:
            "Clone langsung dari Baccarat Rouge 540 dengan kemiripan yang sangat tinggi.",
          notes: "Oud, Kayu Cedar, Ambrette, Vanilla",
          priceMin: 250000,
          priceMax: 400000,
          similarity: 90,
          whereToBuy: "Shopee, Tokopedia",
        },
      ],
    },
    {
      name: "La Vie Est Belle",
      brand: "Lancôme",
      description:
        "Parfum feminin ikonik yang melambangkan kebahagiaan dengan aroma iris dan praline manis.",
      notes: "Iris, Praline, Patchouli, Gula, Vanila",
      priceMin: 1100000,
      priceMax: 1600000,
      dupes: [
        {
          name: "Beautiful Life",
          brand: "Zara Woman",
          description:
            "Dupe dari Zara dengan nuansa manis iris yang sangat mirip La Vie Est Belle.",
          notes: "Iris, Vanila, Kayu Manis, Musk",
          priceMin: 89000,
          priceMax: 130000,
          similarity: 80,
          whereToBuy: "Zara Indonesia, Shopee",
        },
        {
          name: "Just Me",
          brand: "Paris Hilton",
          description:
            "Alternatif dengan aroma manis floral yang senada dengan La Vie Est Belle.",
          notes: "Jasmin, Mawar, Vanila, Sandal",
          priceMin: 200000,
          priceMax: 320000,
          similarity: 70,
          whereToBuy: "Shopee, Tokopedia",
        },
      ],
    },
    {
      name: "Oud Wood",
      brand: "Tom Ford",
      description:
        "Parfum oud kayu premium yang hangat dan mewah, cocok untuk semua gender.",
      notes: "Oud, Sandal, Mawar Turki, Cardamom, Vetiver",
      priceMin: 2500000,
      priceMax: 4000000,
      dupes: [
        {
          name: "Oud Al Layl",
          brand: "Rasasi",
          description:
            "Dupe Timur Tengah yang sangat bagus untuk Tom Ford Oud Wood dengan kualitas tinggi.",
          notes: "Oud, Mawar, Sandal, Amber",
          priceMin: 350000,
          priceMax: 600000,
          similarity: 85,
          whereToBuy: "Shopee, Tokopedia, Lazada",
        },
        {
          name: "Fragrance World Oud Wood",
          brand: "Fragrance World",
          description:
            "Clone terjangkau dari Tom Ford Oud Wood dengan performa yang solid.",
          notes: "Oud, Kayu Cedar, Vanilla, Amber",
          priceMin: 200000,
          priceMax: 350000,
          similarity: 83,
          whereToBuy: "Shopee, Tokopedia",
        },
      ],
    },
  ];

  for (const perfume of perfumes) {
    const { dupes, ...perfumeData } = perfume;
    const created = await prisma.originalPerfume.create({
      data: perfumeData,
    });

    for (const dupe of dupes) {
      const createdDupe = await prisma.dupe.create({
        data: {
          ...dupe,
          originalId: created.id,
        },
      });

      const sampleReviews = [
        {
          rating: 5,
          comment: "Sangat mirip dengan originalnya! Tahan lama seharian.",
          author: "Sari W.",
        },
        {
          rating: 4,
          comment:
            "Hampir sama, bedanya di sillage-nya yang sedikit lebih lemah.",
          author: "Budi P.",
        },
      ];

      for (const review of sampleReviews) {
        await prisma.review.create({
          data: {
            ...review,
            dupeId: createdDupe.id,
          },
        });
      }
    }
  }

  console.log("Seed berhasil! Data parfum dupe sudah tersedia.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
