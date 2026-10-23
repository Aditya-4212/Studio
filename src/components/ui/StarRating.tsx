import { Star } from "lucide-react";

export default function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-primary-500 text-primary-500" : "text-[rgb(var(--border))]"}`}
        />
      ))}
    </div>
  );
}
