import { Search, X } from "lucide-react";

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500"
      />
      <input
        type="text"
        placeholder="Search questions or answers..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-9 py-2 bg-white dark:bg-surface-card border border-border rounded-lg text-sm text-text-primary placeholder:text-gray-400 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-500/30 focus:border-brand-400 shadow-sm dark:shadow-none transition-all"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
