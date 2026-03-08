import { Search, FolderOpen } from "lucide-react";

export function EmptyState({ hasSearch, onClearSearch }) {
  if (hasSearch) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
          <Search size={24} className="text-text-muted" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          No matching cards
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          Try adjusting your search or filters
        </p>
        <button
          onClick={onClearSearch}
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          Clear search
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
        <FolderOpen size={24} className="text-brand-500" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-1">
        No cards yet
      </h3>
      <p className="text-sm text-text-secondary">
        Add your first behavioral question card to get started
      </p>
    </div>
  );
}
