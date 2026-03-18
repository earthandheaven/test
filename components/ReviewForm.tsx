"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StarRating from "./StarRating";

interface ReviewFormProps {
  dupeId: number;
}

export default function ReviewForm({ dupeId }: ReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      setError("Nama dan komentar wajib diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/dupe/${dupeId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, author, comment }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal mengirim ulasan");
      }

      setAuthor("");
      setComment("");
      setRating(5);
      setIsOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim ulasan");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-rose-500 hover:text-rose-600 font-medium transition-colors"
      >
        + Tulis ulasan
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-rose-50 rounded-xl p-4 space-y-3"
    >
      <h5 className="font-semibold text-gray-700 text-sm">Tulis Ulasan</h5>

      <div>
        <label className="text-xs text-gray-500 mb-1 block">Rating</label>
        <StarRating rating={rating} onChange={setRating} />
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-1 block">Nama kamu</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Contoh: Sari W."
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
          maxLength={50}
        />
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-1 block">Ulasan</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Bagaimana pengalamanmu dengan parfum dupe ini?"
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none bg-white"
          maxLength={500}
        />
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
        >
          {loading ? "Mengirim..." : "Kirim Ulasan"}
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm transition-colors"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
