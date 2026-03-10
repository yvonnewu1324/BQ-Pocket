import { useState, useRef } from "react";
import { X, Star, Edit3, Trash2, ChevronLeft, ChevronRight, Building2, Lightbulb } from "lucide-react";
import { MarkdownAnswer } from "./MarkdownAnswer";
import { Timer } from "./Timer";

export function CardDetail({
  card,
  categories,
  companies,
  onClose,
  onToggleStar,
  onEdit,
  onDelete,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}) {
  const category = categories.find((c) => c.id === card.category);
  const cardCompanies = (card.companies || []).map((cid) => companies.find((c) => c.id === cid)).filter(Boolean);
  const backdropRef = useRef(null);
  const mouseDownTarget = useRef(null);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 bg-white dark:bg-surface-dim md:bg-black/50 md:dark:bg-black/70 md:backdrop-blur-sm md:flex md:items-center md:justify-center md:p-6"
      onMouseDown={(e) => { mouseDownTarget.current = e.target; }}
      onClick={(e) => {
        if (e.target === e.currentTarget && mouseDownTarget.current === e.currentTarget) onClose();
      }}
    >
      <div className="h-full md:h-auto md:max-h-[90vh] md:w-full md:max-w-2xl md:rounded-xl bg-white dark:bg-surface-card md:shadow-2xl dark:md:shadow-none flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-4 py-3 bg-gray-50/80 dark:bg-zinc-800/50 border-b border-border/50">
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-white dark:text-zinc-500 dark:hover:text-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-all"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3">
            <Timer cardId={card.id} />
            <span className="text-xs text-gray-400 dark:text-zinc-500 font-semibold tabular-nums">
              {currentIndex + 1} / {totalCount}
            </span>
          </div>

          <div className="flex gap-0.5">
            <button
              onClick={() => onToggleStar(card.id)}
              className="p-1.5 rounded-md hover:bg-white dark:hover:bg-zinc-700 transition-all"
            >
              <Star
                size={16}
                className={card.starred ? "fill-amber-400 text-amber-400" : "text-gray-300 hover:text-amber-300 dark:text-zinc-500 dark:hover:text-amber-400"}
              />
            </button>
            <button
              onClick={() => onEdit(card)}
              className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-white dark:text-zinc-500 dark:hover:text-brand-400 dark:hover:bg-zinc-700 rounded-md transition-all"
            >
              <Edit3 size={15} />
            </button>
            <button
              onClick={() => onDelete(card.id)}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-white dark:text-zinc-500 dark:hover:text-red-400 dark:hover:bg-zinc-700 rounded-md transition-all"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 md:p-8">
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {category && (
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${category.color}`}>
                  {category.label}
                </span>
              )}
              {cardCompanies.map((co) => (
                <span key={co.id} className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <Building2 size={10} />
                  {co.label}
                </span>
              ))}
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary leading-snug tracking-tight mb-4">
              {card.question}
            </h2>
            {card.hint && (
              <div className="flex items-start gap-2 mb-6 px-3 py-2.5 rounded-lg bg-amber-50/70 dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-500/20">
                <Lightbulb size={14} className="shrink-0 mt-0.5 text-amber-500 dark:text-amber-400" />
                <p className="text-sm text-amber-700 dark:text-amber-300/90">{card.hint}</p>
              </div>
            )}
            <div className="border-t border-border/50 pt-6">
              <MarkdownAnswer text={card.answer} />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="shrink-0 flex items-center justify-between px-4 py-3 border-t border-border/50 bg-gray-50/80 dark:bg-zinc-800/50">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-gray-500 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={15} />
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={currentIndex === totalCount - 1}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-gray-500 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
          >
            Next
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
