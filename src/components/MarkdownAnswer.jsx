export function MarkdownAnswer({ text }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-2 text-sm md:text-base leading-relaxed text-text-primary">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-2" />;

        if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
          const label = trimmed.slice(2, -2);
          return (
            <h3
              key={i}
              className="font-semibold text-brand-700 text-sm uppercase tracking-wide pt-2 first:pt-0"
            >
              {label}
            </h3>
          );
        }

        if (
          trimmed.match(/^\*\*[^*]+:\*\*/)
        ) {
          const colonIdx = trimmed.indexOf(":**");
          const label = trimmed.slice(2, colonIdx);
          const rest = trimmed.slice(colonIdx + 3).trim();
          return (
            <p key={i}>
              <span className="font-semibold text-brand-700">{label}:</span>{" "}
              <span className="text-text-secondary">{rest}</span>
            </p>
          );
        }

        if (trimmed.startsWith("- ")) {
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span className="text-brand-400 mt-1.5 shrink-0">•</span>
              <span className="text-text-secondary">
                {renderInlineBold(trimmed.slice(2))}
              </span>
            </div>
          );
        }

        return (
          <p key={i} className="text-text-secondary">
            {renderInlineBold(trimmed)}
          </p>
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
