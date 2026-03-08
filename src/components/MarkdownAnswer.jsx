export function MarkdownAnswer({ text }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-2 text-sm md:text-[15px] leading-relaxed text-gray-600 dark:text-zinc-400">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-2" />;

        if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
          const label = trimmed.slice(2, -2);
          return (
            <h3
              key={i}
              className="font-bold text-brand-600 dark:text-brand-400 text-xs uppercase tracking-wider pt-3 first:pt-0"
            >
              {label}
            </h3>
          );
        }

        if (trimmed.match(/^\*\*[^*]+:\*\*/)) {
          const colonIdx = trimmed.indexOf(":**");
          const label = trimmed.slice(2, colonIdx);
          const rest = trimmed.slice(colonIdx + 3).trim();
          return (
            <p key={i}>
              <span className="font-bold text-brand-600 dark:text-brand-400">{label}:</span>{" "}
              <span>{rest}</span>
            </p>
          );
        }

        if (trimmed.startsWith("- ")) {
          return (
            <div key={i} className="flex gap-2.5 pl-1">
              <span className="text-brand-400 dark:text-brand-500 mt-1 shrink-0 text-xs">●</span>
              <span>{renderInlineBold(trimmed.slice(2))}</span>
            </div>
          );
        }

        return (
          <p key={i}>{renderInlineBold(trimmed)}</p>
        );
      })}
    </div>
  );
}

function renderInlineBold(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
