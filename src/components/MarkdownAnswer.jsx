export function MarkdownAnswer({ text }) {
  const lines = text.split("\n");
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (!trimmed) {
      elements.push(<div key={i} className="h-2" />);
      i++;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <blockquote
          key={`q-${i}`}
          className="border-l-[3px] border-brand-400 dark:border-brand-500 pl-4 py-1 my-1 bg-brand-50/50 dark:bg-brand-500/5 rounded-r-md"
        >
          {quoteLines.map((ql, j) => (
            <p key={j} className="text-gray-600 dark:text-zinc-300 italic">
              {renderInline(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    if (trimmed.startsWith("**") && trimmed.endsWith("**") && !trimmed.includes(":**")) {
      const label = trimmed.slice(2, -2);
      elements.push(
        <h3
          key={i}
          className="font-bold text-brand-600 dark:text-brand-400 text-xs uppercase tracking-wider pt-3 first:pt-0"
        >
          {label}
        </h3>
      );
      i++;
      continue;
    }

    if (trimmed.match(/^\*\*[^*]+:\*\*/)) {
      const colonIdx = trimmed.indexOf(":**");
      const label = trimmed.slice(2, colonIdx);
      const rest = trimmed.slice(colonIdx + 3).trim();
      elements.push(
        <p key={i}>
          <span className="font-bold text-brand-600 dark:text-brand-400">{label}:</span>{" "}
          <span>{renderInline(rest)}</span>
        </p>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      elements.push(
        <div key={i} className="flex gap-2.5 pl-1">
          <span className="text-brand-400 dark:text-brand-500 mt-1 shrink-0 text-xs">●</span>
          <span>{renderInline(trimmed.slice(2))}</span>
        </div>
      );
      i++;
      continue;
    }

    elements.push(<p key={i}>{renderInline(trimmed)}</p>);
    i++;
  }

  return (
    <div className="space-y-2 text-sm md:text-[15px] leading-relaxed text-gray-600 dark:text-zinc-400">
      {elements}
    </div>
  );
}

function renderBold(text) {
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

function renderInline(text) {
  const parts = text.split(/(==[\s\S]+?==)/g);
  return parts.map((part, i) => {
    if (part.startsWith("==") && part.endsWith("==")) {
      return (
        <mark
          key={i}
          className="bg-yellow-200/70 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-200 px-0.5 rounded-sm"
        >
          {renderBold(part.slice(2, -2))}
        </mark>
      );
    }
    return renderBold(part);
  });
}
