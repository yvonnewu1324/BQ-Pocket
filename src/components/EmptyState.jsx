import { Search, Inbox } from "lucide-react";

export function EmptyState({ hasSearch, onClearSearch }) {
  if (hasSearch) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
          <Search size={20} className="text-gray-400 dark:text-zinc-500" />
        </div>
        <h3 className="text-base font-bold text-text-primary mb-1">
          No matching cards
        </h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4 max-w-xs">
          Try adjusting your search or filters to find what you're looking for
        </p>
        <button
          onClick={onClearSearch}
          className="text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-500/15 flex items-center justify-center mb-4">
        <Inbox size={20} className="text-brand-500 dark:text-brand-400" />
      </div>
      <h3 className="text-base font-bold text-text-primary mb-1">
        No cards yet
      </h3>
      <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-xs">
        Add your first behavioral question to start building your prep deck
      </p>
    </div>
  );
}
