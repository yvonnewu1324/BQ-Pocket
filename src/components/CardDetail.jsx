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
    <div className="fixed inset-0 z-50 bg-white md:bg-black/40 md:backdrop-blur-sm md:flex md:items-center md:justify-center md:p-4">
      <div className="h-full md:h-auto md:max-h-[90vh] md:w-full md:max-w-2xl md:rounded-2xl bg-white md:shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between p-4 border-b border-border">
          <button
            onClick={onClose}
            className="p-1.5 text-text-muted hover:text-text-primary hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>

          <span className="text-xs text-text-muted font-medium">
            {currentIndex + 1} / {totalCount}
          </span>

          <div className="flex gap-1">
            <button
              onClick={() => onToggleStar(card.id)}
              className="p-1.5 hover:scale-110 transition-transform"
            >
              <Star
                size={18}
                className={
                  card.starred
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300 hover:text-amber-300"
                }
              />
            </button>
            <button
              onClick={() => onEdit(card)}
              className="p-1.5 text-text-muted hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => {
                onDelete(card.id);
                onClose();
              }}
              className="p-1.5 text-text-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 md:p-6">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              {category && (
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${category.color}`}>
                  {category.label}
                </span>
              )}
              {company && (
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                  <Building2 size={11} />
                  {company.label}
                </span>
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-text-primary leading-snug mb-6">
              {card.question}
            </h2>
            <div className="border-t border-border pt-5">
              <MarkdownAnswer text={card.answer} />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="shrink-0 flex items-center justify-between p-4 border-t border-border bg-surface-dim">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-secondary hover:text-brand-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={currentIndex === totalCount - 1}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-secondary hover:text-brand-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
