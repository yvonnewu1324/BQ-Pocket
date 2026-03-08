import { useState } from "react";
import { Star, Edit3, Trash2, RotateCcw } from "lucide-react";
import { CATEGORIES } from "../data/sampleCards";
import { MarkdownAnswer } from "./MarkdownAnswer";

export function FlashCard({ card, onToggleStar, onEdit, onDelete, large }) {
  const [flipped, setFlipped] = useState(false);

  const category = CATEGORIES.find((c) => c.id === card.category);

  const minH = large ? "calc(100vh - 220px)" : "320px";

  return (
    <div className="card-flip w-full" style={{ minHeight: minH }}>
      <div
        className={`card-flip-inner relative w-full h-full ${flipped ? "flipped" : ""}`}
        style={{ minHeight: minH }}
      >
        {/* Front - Question */}
        <div className="card-front absolute inset-0 rounded-2xl bg-white dark:bg-surface-card border border-border shadow-sm dark:shadow-none flex flex-col">
          <div className="flex items-start justify-between p-5 pb-3">
            {category && (
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${category.color}`}
              >
                {category.label}
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleStar(card.id);
              }}
              className="p-1 -m-1 hover:scale-110 transition-transform"
            >
              <Star
                size={18}
                className={
                  card.starred
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300 hover:text-amber-300 dark:text-zinc-500 dark:hover:text-amber-400"
                }
              />
            </button>
          </div>

          <button
            onClick={() => setFlipped(true)}
            className="flex-1 flex items-center justify-center px-6 pb-6 text-left cursor-pointer"
          >
            <p className="text-lg md:text-xl font-semibold text-text-primary leading-relaxed">
              {card.question}
            </p>
          </button>

          <div className="px-5 pb-4 flex items-center justify-between">
            <span className="text-xs text-text-muted">Tap to reveal answer</span>
            <div className="flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(card);
                }}
                className="p-2 text-text-muted hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition-colors"
              >
                <Edit3 size={15} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(card.id);
                }}
                className="p-2 text-text-muted hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Back - Answer */}
        <div className="card-back absolute inset-0 rounded-2xl bg-white dark:bg-surface-card border border-brand-200 dark:border-brand-500/30 shadow-sm shadow-brand-100/50 dark:shadow-none flex flex-col">
          <div className="flex items-center justify-between p-5 pb-3 border-b border-border">
            <p className="text-sm font-medium text-text-secondary line-clamp-1 pr-4 flex-1">
              {card.question}
            </p>
            <button
              onClick={() => setFlipped(false)}
              className="p-1.5 text-text-muted hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition-colors shrink-0"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <button
            onClick={() => setFlipped(false)}
            className="flex-1 overflow-y-auto p-5 text-left cursor-pointer"
          >
            <MarkdownAnswer text={card.answer} />
          </button>
        </div>
      </div>
    </div>
  );
}
