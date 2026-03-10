import { useState, useEffect, useRef } from "react";
import { X, Plus, FileText } from "lucide-react";

const ANSWER_TEMPLATES = [
  {
    id: "star",
    label: "STAR",
    content: `**Situation:** \n\n**Task:** \n\n**Action:**\n- \n- \n\n**Result:** `,
  },
  {
    id: "par",
    label: "PAR",
    content: `**Problem:** \n\n**Action:**\n- \n- \n\n**Result:** `,
  },
  {
    id: "car",
    label: "CAR",
    content: `**Challenge:** \n\n**Action:**\n- \n- \n\n**Result:** `,
  },
  {
    id: "soar",
    label: "SOAR",
    content: `**Situation:** \n\n**Obstacle:** \n\n**Action:**\n- \n- \n\n**Result:** `,
  },
];

export function CardModal({ card, categories, companies, onAddCategory, onAddCompany, onSave, onClose }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showNewCompany, setShowNewCompany] = useState(false);

  useEffect(() => {
    if (card) {
      setQuestion(card.question);
      setAnswer(card.answer);
      setHint(card.hint || "");
      setCategory(card.category);
      setSelectedCompanies(card.companies || (card.company ? [card.company] : []));
    } else {
      setQuestion("");
      setAnswer("");
      setHint("");
      setCategory(categories[0]?.id || "");
      setSelectedCompanies([]);
    }
  }, [card, categories]);

  useEffect(() => {
    function handleEsc(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  function handleAddCategory() {
    const label = newCategory.trim();
    if (!label) return;
    const cat = onAddCategory(label);
    setCategory(cat.id);
    setNewCategory("");
    setShowNewCategory(false);
  }

  function handleAddCompany() {
    const label = newCompany.trim();
    if (!label) return;
    const co = onAddCompany(label);
    if (!selectedCompanies.includes(co.id)) {
      setSelectedCompanies((prev) => [...prev, co.id]);
    }
    setNewCompany("");
    setShowNewCompany(false);
  }

  function toggleCompany(id) {
    setSelectedCompanies((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function applyTemplate(template) {
    setAnswer(template.content);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    onSave({
      ...(card || {}),
      question: question.trim(),
      answer: answer.trim(),
      hint: hint.trim(),
      category,
      companies: selectedCompanies,
      starred: card?.starred || false,
    });
  }

  const isEdit = !!card?.id;
  const mouseDownTarget = useRef(null);

  return (
    <div
      className="fixed inset-0 z-50 md:flex md:items-center md:justify-center md:p-6 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
      onMouseDown={(e) => { mouseDownTarget.current = e.target; }}
      onClick={(e) => {
        if (e.target === e.currentTarget && mouseDownTarget.current === e.currentTarget) onClose();
      }}
    >
      <div
        className="h-full md:h-auto md:max-h-[90vh] md:w-full md:max-w-2xl md:rounded-xl bg-white dark:bg-surface-card md:shadow-2xl dark:md:shadow-none flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-3.5 bg-gray-50/80 dark:bg-zinc-800/50 border-b border-border/50">
          <h2 className="text-base font-bold text-text-primary">
            {isEdit ? "Edit Card" : "New Card"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-white dark:text-zinc-500 dark:hover:text-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide mb-1.5">
                Category
              </label>
              {showNewCategory ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCategory())}
                    placeholder="Category name"
                    autoFocus
                    className="flex-1 px-3 py-2 border border-brand-300 rounded-lg text-sm bg-white dark:bg-zinc-900 dark:border-brand-500/50 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-500/30"
                  />
                  <button type="button" onClick={handleAddCategory}
                    className="px-3 py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors">
                    Add
                  </button>
                  <button type="button" onClick={() => { setShowNewCategory(false); setNewCategory(""); }}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300">
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <select value={category} onChange={(e) => setCategory(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white dark:bg-zinc-900 border border-border rounded-lg text-sm dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-500/30 focus:border-brand-400">
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                  <button type="button" onClick={() => setShowNewCategory(true)}
                    className="shrink-0 p-2 border border-dashed border-gray-300 dark:border-zinc-600 text-gray-400 dark:text-zinc-500 rounded-lg hover:border-brand-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-all"
                    title="Add new category">
                    <Plus size={15} />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide mb-1.5">
                Companies <span className="font-normal normal-case text-gray-400 dark:text-zinc-500">(optional, multi-select)</span>
              </label>
              <div className="flex flex-wrap gap-1.5 min-h-[38px] px-2.5 py-2 border border-border rounded-lg bg-white dark:bg-zinc-900">
                {companies.map((co) => {
                  const active = selectedCompanies.includes(co.id);
                  return (
                    <button
                      key={co.id}
                      type="button"
                      onClick={() => toggleCompany(co.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                        active
                          ? "bg-brand-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {co.label}
                      {active && <X size={10} className="ml-0.5" />}
                    </button>
                  );
                })}
                {showNewCompany ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") { e.preventDefault(); handleAddCompany(); }
                        if (e.key === "Escape") { setShowNewCompany(false); setNewCompany(""); }
                      }}
                      placeholder="Name"
                      autoFocus
                      className="w-24 px-2 py-1 border border-brand-300 dark:border-brand-500/50 rounded-full text-xs bg-transparent dark:text-zinc-200 focus:outline-none"
                    />
                    <button type="button" onClick={handleAddCompany}
                      className="px-2 py-1 bg-brand-600 text-white rounded-full text-xs font-semibold hover:bg-brand-700 transition-colors">
                      Add
                    </button>
                    <button type="button" onClick={() => { setShowNewCompany(false); setNewCompany(""); }}
                      className="p-0.5 text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300">
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setShowNewCompany(true)}
                    className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-xs font-semibold border border-dashed border-gray-300 dark:border-zinc-600 text-gray-400 dark:text-zinc-500 hover:border-brand-400 hover:text-brand-500 dark:hover:border-brand-500 dark:hover:text-brand-400 transition-all"
                  >
                    <Plus size={10} />
                    New
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide mb-1.5">
              Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Tell me about a time you led a team..."
              rows={3}
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-white dark:bg-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-500/30 focus:border-brand-400 resize-vertical"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide mb-1.5">
              Hint <span className="font-normal normal-case text-gray-400 dark:text-zinc-500">(optional — a short reminder to jog your memory)</span>
            </label>
            <input
              type="text"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="e.g., Think about the Q3 project with the tight deadline..."
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-white dark:bg-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-500/30 focus:border-brand-400"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wide">
                Answer <span className="font-normal normal-case text-gray-400 dark:text-zinc-500">— **bold** &nbsp; - bullets &nbsp; &gt; quote &nbsp; ==highlight==</span>
              </label>
              {!isEdit && (
                <div className="flex items-center gap-1">
                  <FileText size={12} className="text-gray-400 dark:text-zinc-500" />
                  <span className="text-[10px] text-gray-400 dark:text-zinc-500 mr-1">Template:</span>
                  {ANSWER_TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => applyTemplate(t)}
                      className="px-2 py-0.5 text-[11px] font-semibold rounded-md border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:border-brand-400 hover:text-brand-600 dark:hover:border-brand-500 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-all"
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={`**Situation:** ...\n\n**Task:** ...\n\n**Action:**\n- Step one\n- Step two\n\n**Result:** ...`}
              rows={14}
              className="w-full flex-1 min-h-[200px] px-3 py-2.5 border border-border rounded-lg text-sm font-mono bg-white dark:bg-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-500/30 focus:border-brand-400 resize-vertical"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm font-semibold text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={!question.trim() || !answer.trim()}
              className="flex-1 px-4 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm shadow-brand-200 dark:shadow-none">
              {isEdit ? "Save Changes" : "Add Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
