"use client";

interface StarRatingProps {
  rating: number;
  readonly?: boolean;
  onChange?: (rating: number) => void;
}

export default function StarRating({
  rating,
  readonly = false,
  onChange,
}: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onChange?.(star)}
          className={`text-lg leading-none transition-colors ${
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          } ${star <= rating ? "text-yellow-400" : "text-gray-200"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
