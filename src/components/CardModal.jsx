import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";

export function CardModal({ card, categories, companies, onAddCategory, onAddCompany, onSave, onClose }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showNewCompany, setShowNewCompany] = useState(false);

  useEffect(() => {
    if (card) {
      setQuestion(card.question);
      setAnswer(card.answer);
      setCategory(card.category);
      setCompany(card.company || "");
    } else {
      setQuestion("");
      setAnswer("");
      setCategory(categories[0]?.id || "");
      setCompany("");
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
    setCompany(co.id);
    setNewCompany("");
    setShowNewCompany(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    onSave({
      ...(card || {}),
      question: question.trim(),
      answer: answer.trim(),
      category,
      company,
      starred: card?.starred || false,
    });
  }

  const isEdit = !!card?.id;

  return (
    <div
      className="fixed inset-0 z-50 md:flex md:items-center md:justify-center md:p-6 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="h-full md:h-auto md:max-h-[90vh] md:w-full md:max-w-2xl md:rounded-xl bg-white md:shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 bg-gray-50/80 border-b border-border/50">
          <h2 className="text-base font-bold text-text-primary">
            {isEdit ? "Edit Card" : "New Card"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-white rounded-md transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
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
                    className="flex-1 px-3 py-2 border border-brand-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-100"
                  />
                  <button type="button" onClick={handleAddCategory}
                    className="px-3 py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors">
                    Add
                  </button>
                  <button type="button" onClick={() => { setShowNewCategory(false); setNewCategory(""); }}
                    className="p-2 text-gray-400 hover:text-gray-600">
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <select value={category} onChange={(e) => setCategory(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-400">
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                  <button type="button" onClick={() => setShowNewCategory(true)}
                    className="shrink-0 p-2 border border-dashed border-gray-300 text-gray-400 rounded-lg hover:border-brand-400 hover:text-brand-500 hover:bg-brand-50 transition-all"
                    title="Add new category">
                    <Plus size={15} />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Company <span className="font-normal normal-case text-gray-400">(optional)</span>
              </label>
              {showNewCompany ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCompany())}
                    placeholder="Company name"
                    autoFocus
                    className="flex-1 px-3 py-2 border border-brand-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-100"
                  />
                  <button type="button" onClick={handleAddCompany}
                    className="px-3 py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors">
                    Add
                  </button>
                  <button type="button" onClick={() => { setShowNewCompany(false); setNewCompany(""); }}
                    className="p-2 text-gray-400 hover:text-gray-600">
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <select value={company} onChange={(e) => setCompany(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-400">
                    <option value="">None</option>
                    {companies.map((co) => (
                      <option key={co.id} value={co.id}>{co.label}</option>
                    ))}
                  </select>
                  <button type="button" onClick={() => setShowNewCompany(true)}
                    className="shrink-0 p-2 border border-dashed border-gray-300 text-gray-400 rounded-lg hover:border-brand-400 hover:text-brand-500 hover:bg-brand-50 transition-all"
                    title="Add new company">
                    <Plus size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Tell me about a time you led a team..."
              rows={3}
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-400 resize-vertical"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Answer <span className="font-normal normal-case text-gray-400">— use **bold** and - for bullets</span>
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={`**Situation:** ...\n\n**Task:** ...\n\n**Action:**\n- Step one\n- Step two\n\n**Result:** ...`}
              rows={14}
              className="w-full flex-1 min-h-[200px] px-3 py-2.5 border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-400 resize-vertical"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={!question.trim() || !answer.trim()}
              className="flex-1 px-4 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm shadow-brand-200">
              {isEdit ? "Save Changes" : "Add Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
