import { CATEGORIES } from "../data/sampleCards";

export function CategoryFilter({ active, onChange, counts }) {
  const allFilters = [
    { id: "all", label: "All", color: "bg-gray-100 text-gray-700" },
    ...CATEGORIES,
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {allFilters.map((cat) => {
        const isActive = active === cat.id;
        const count = counts[cat.id] || 0;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isActive
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white border border-border text-text-secondary hover:border-brand-300 hover:text-brand-600"
            }`}
          >
            {cat.label}
            <span
              className={`ml-1.5 ${isActive ? "text-brand-200" : "text-text-muted"}`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
