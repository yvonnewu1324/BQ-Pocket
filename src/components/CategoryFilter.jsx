export function CategoryFilter({ label, items, active, onChange, counts }) {
  const allFilters = [
    { id: "all", label: "All" },
    ...items,
  ];

  return (
    <div>
      {label && (
        <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1.5">{label}</p>
      )}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {allFilters.map((item) => {
          const isActive = active === item.id;
          const count = counts[item.id] || 0;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-white border border-border text-text-secondary hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              {item.label}
              <span
                className={`ml-1.5 ${isActive ? "text-brand-200" : "text-text-muted"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
