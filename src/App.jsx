import { useState, useCallback, useEffect, useRef } from "react";
import { Plus, Star, Layers, Shuffle, ChevronRight, ChevronLeft, Edit3, Trash2, Eye, EyeOff } from "lucide-react";
import { useCards } from "./hooks/useCards";
import { CATEGORIES } from "./data/sampleCards";
import { SearchBar } from "./components/SearchBar";
import { CategoryFilter } from "./components/CategoryFilter";
import { CardModal } from "./components/CardModal";
import { CardDetail } from "./components/CardDetail";
import { EmptyState } from "./components/EmptyState";
import { MarkdownAnswer } from "./components/MarkdownAnswer";

function App() {
  const {
    cards,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    showStarredOnly,
    setShowStarredOnly,
    categoryCounts,
    addCard,
    updateCard,
    deleteCard,
    toggleStar,
  } = useCards();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [detailIndex, setDetailIndex] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" | "focus"
  const [focusIndex, setFocusIndex] = useState(0);

  const handleEdit = useCallback((card) => {
    setEditingCard(card);
    setModalOpen(true);
  }, []);

  const handleSave = useCallback(
    (cardData) => {
      if (cardData.id) {
        updateCard(cardData.id, cardData);
      } else {
        addCard(cardData);
      }
      setModalOpen(false);
      setEditingCard(null);
    },
    [addCard, updateCard]
  );

  const handleDelete = useCallback(
    (id) => {
      if (window.confirm("Delete this card?")) {
        deleteCard(id);
      }
    },
    [deleteCard]
  );

  const handleShuffle = useCallback(() => {
    setFocusIndex(Math.floor(Math.random() * cards.length));
  }, [cards.length]);

  const detailCard = detailIndex !== null ? cards[detailIndex] : null;

  return (
    <div className="min-h-screen bg-surface-dim">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <Layers size={18} className="text-white" />
            </div>
            <h1 className="text-lg font-bold text-text-primary">BQ Pocket</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowStarredOnly(!showStarredOnly)}
              className={`p-2 rounded-lg transition-colors ${
                showStarredOnly
                  ? "bg-amber-50 text-amber-500"
                  : "text-text-muted hover:text-text-secondary hover:bg-gray-100"
              }`}
              title="Show starred only"
            >
              <Star size={18} className={showStarredOnly ? "fill-current" : ""} />
            </button>
            <button
              onClick={() => {
                setModalOpen(true);
                setEditingCard(null);
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700 transition-colors shadow-sm"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Card</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-4 space-y-4">
        {/* Search + View Toggle */}
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="flex bg-white border border-border rounded-xl overflow-hidden shrink-0">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-brand-600 text-white"
                  : "text-text-secondary hover:bg-gray-50"
              }`}
            >
              List
            </button>
            <button
              onClick={() => {
                setViewMode("focus");
                setFocusIndex(0);
              }}
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                viewMode === "focus"
                  ? "bg-brand-600 text-white"
                  : "text-text-secondary hover:bg-gray-50"
              }`}
            >
              Focus
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          active={activeCategory}
          onChange={setActiveCategory}
          counts={categoryCounts}
        />

        {/* Card Count */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-muted">
            {cards.length} card{cards.length !== 1 ? "s" : ""}
            {showStarredOnly ? " (starred)" : ""}
          </p>
          {viewMode === "focus" && cards.length > 1 && (
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1 text-xs text-text-muted hover:text-brand-600 transition-colors"
            >
              <Shuffle size={13} />
              Shuffle
            </button>
          )}
        </div>

        {/* Cards */}
        {cards.length === 0 ? (
          <EmptyState
            hasSearch={!!searchQuery || activeCategory !== "all" || showStarredOnly}
            onClearSearch={() => {
              setSearchQuery("");
              setActiveCategory("all");
              setShowStarredOnly(false);
            }}
          />
        ) : viewMode === "list" ? (
          <div className="bg-white rounded-2xl border border-border divide-y divide-border overflow-hidden pb-0 mb-8">
            {cards.map((card, idx) => {
              const category = CATEGORIES.find((c) => c.id === card.category);
              return (
                <button
                  key={card.id}
                  onClick={() => setDetailIndex(idx)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-surface-dim transition-colors group"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(card.id);
                    }}
                    className="shrink-0 p-0.5"
                  >
                    <Star
                      size={16}
                      className={
                        card.starred
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-200 group-hover:text-gray-300"
                      }
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {card.question}
                    </p>
                    {category && (
                      <span
                        className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full mt-1 ${category.color}`}
                      >
                        {category.label}
                      </span>
                    )}
                  </div>
                  <ChevronRight
                    size={16}
                    className="shrink-0 text-text-muted group-hover:text-brand-500 transition-colors"
                  />
                </button>
              );
            })}
          </div>
        ) : (
          <FocusView
            cards={cards}
            index={focusIndex}
            setIndex={setFocusIndex}
            onToggleStar={toggleStar}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      {/* Modals */}
      {modalOpen && (
        <CardModal
          card={editingCard}
          onSave={handleSave}
          onClose={() => {
            setModalOpen(false);
            setEditingCard(null);
          }}
        />
      )}

      {detailCard && (
        <CardDetail
          card={detailCard}
          currentIndex={detailIndex}
          totalCount={cards.length}
          onClose={() => setDetailIndex(null)}
          onToggleStar={toggleStar}
          onEdit={(card) => {
            setDetailIndex(null);
            handleEdit(card);
          }}
          onDelete={handleDelete}
          onPrev={() => setDetailIndex((i) => Math.max(0, i - 1))}
          onNext={() =>
            setDetailIndex((i) => Math.min(cards.length - 1, i + 1))
          }
        />
      )}
    </div>
  );
}

function FocusView({ cards, index, setIndex, onToggleStar, onEdit, onDelete }) {
  const [revealed, setRevealed] = useState(false);
  const answerRef = useRef(null);
  const safeIndex = Math.min(index, cards.length - 1);
  const card = cards[safeIndex];

  useEffect(() => {
    setRevealed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [safeIndex]);

  const category = CATEGORIES.find((c) => c.id === card?.category);
  if (!card) return null;

  function goTo(next) {
    const target = next
      ? Math.min(cards.length - 1, safeIndex + 1)
      : Math.max(0, safeIndex - 1);
    setIndex(target);
  }

  return (
    <div className="pb-8 space-y-4">
      {/* Question card */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Navigation + actions bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleStar(card.id)}
              className="p-1.5 hover:scale-110 transition-transform"
            >
              <Star
                size={16}
                className={card.starred ? "fill-amber-400 text-amber-400" : "text-gray-300 hover:text-amber-300"}
              />
            </button>
            <button
              onClick={() => onEdit(card)}
              className="p-1.5 text-text-muted hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
            >
              <Edit3 size={15} />
            </button>
            <button
              onClick={() => onDelete(card.id)}
              className="p-1.5 text-text-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={15} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goTo(false)}
              disabled={safeIndex === 0}
              className="p-1.5 text-text-secondary hover:text-brand-600 hover:bg-brand-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs text-text-muted font-medium tabular-nums min-w-[3rem] text-center">
              {safeIndex + 1} / {cards.length}
            </span>
            <button
              onClick={() => goTo(true)}
              disabled={safeIndex === cards.length - 1}
              className="p-1.5 text-text-secondary hover:text-brand-600 hover:bg-brand-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="p-5 md:p-8">
          {category && (
            <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-4 ${category.color}`}>
              {category.label}
            </span>
          )}

          <h2 className="text-xl md:text-2xl font-bold text-text-primary leading-snug">
            {card.question}
          </h2>
        </div>

        {/* Reveal button */}
        {!revealed && (
          <button
            onClick={() => {
              setRevealed(true);
              setTimeout(() => {
                answerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 100);
            }}
            className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-brand-50 hover:bg-brand-100 border-t border-brand-100 text-brand-600 font-medium text-sm transition-colors"
          >
            <Eye size={16} />
            Show Answer
          </button>
        )}

        {/* Answer section */}
        <div
          ref={answerRef}
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{
            maxHeight: revealed ? "5000px" : "0px",
            opacity: revealed ? 1 : 0,
          }}
        >
          <div className="border-t border-border px-5 md:px-8 py-6 md:py-8">
            <MarkdownAnswer text={card.answer} />
          </div>

          <button
            onClick={() => {
              setRevealed(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 border-t border-border text-text-muted font-medium text-sm transition-colors"
          >
            <EyeOff size={14} />
            Hide Answer
          </button>
        </div>
      </div>

    </div>
  );
}

export default App;
