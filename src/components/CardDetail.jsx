import { X, Star, Edit3, Trash2, ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import { MarkdownAnswer } from "./MarkdownAnswer";

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
  const company = companies.find((c) => c.id === card.company);

  return (
    <div className="fixed inset-0 z-50 bg-white md:bg-black/50 md:backdrop-blur-sm md:flex md:items-center md:justify-center md:p-6">
      <div className="h-full md:h-auto md:max-h-[90vh] md:w-full md:max-w-2xl md:rounded-xl bg-white md:shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-4 py-3 bg-gray-50/80 border-b border-border/50">
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-white rounded-md transition-all"
          >
            <X size={18} />
          </button>

          <span className="text-xs text-gray-400 font-semibold tabular-nums">
            {currentIndex + 1} / {totalCount}
          </span>

          <div className="flex gap-0.5">
            <button
              onClick={() => onToggleStar(card.id)}
              className="p-1.5 rounded-md hover:bg-white transition-all"
            >
              <Star
                size={16}
                className={card.starred ? "fill-amber-400 text-amber-400" : "text-gray-300 hover:text-amber-300"}
              />
            </button>
            <button
              onClick={() => onEdit(card)}
              className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-white rounded-md transition-all"
            >
              <Edit3 size={15} />
            </button>
            <button
              onClick={() => { onDelete(card.id); onClose(); }}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-white rounded-md transition-all"
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
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded ${category.color}`}>
                  {category.label}
                </span>
              )}
              {company && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-500">
                  <Building2 size={10} />
                  {company.label}
                </span>
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-text-primary leading-snug tracking-tight mb-6">
              {card.question}
            </h2>
            <div className="border-t border-border/50 pt-6">
              <MarkdownAnswer text={card.answer} />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="shrink-0 flex items-center justify-between px-4 py-3 border-t border-border/50 bg-gray-50/80">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-gray-500 hover:text-brand-600 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={15} />
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={currentIndex === totalCount - 1}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-gray-500 hover:text-brand-600 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
          >
            Next
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
