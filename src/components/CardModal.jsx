import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CATEGORIES } from "../data/sampleCards";

export function CardModal({ card, onSave, onClose }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("leadership");

  useEffect(() => {
    if (card) {
      setQuestion(card.question);
      setAnswer(card.answer);
      setCategory(card.category);
    } else {
      setQuestion("");
      setAnswer("");
      setCategory("leadership");
    }
  }, [card]);

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    onSave({
      ...(card || {}),
      question: question.trim(),
      answer: answer.trim(),
      category,
      starred: card?.starred || false,
    });
  }

  const isEdit = !!card?.id;

  return (
    <div
      className="fixed inset-0 z-50 md:flex md:items-center md:justify-center md:p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="h-full md:h-auto md:max-h-[90vh] md:w-full md:max-w-2xl md:rounded-2xl bg-white md:shadow-xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">
            {isEdit ? "Edit Card" : "New Card"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-text-muted hover:text-text-primary hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Tell me about a time you led a team..."
              rows={3}
              className="w-full px-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 resize-vertical"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Answer
              <span className="font-normal text-text-muted ml-1">
                (use **bold** and - for bullets)
              </span>
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={`**Situation:** ...\n\n**Task:** ...\n\n**Action:**\n- Step one\n- Step two\n\n**Result:** ...`}
              rows={14}
              className="w-full flex-1 min-h-[200px] px-3 py-2.5 border border-border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 resize-vertical"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-text-secondary hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!question.trim() || !answer.trim()}
              className="flex-1 px-4 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {isEdit ? "Save Changes" : "Add Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
