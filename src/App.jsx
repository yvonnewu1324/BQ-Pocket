import { useState, useCallback, useEffect, useRef } from "react";
import { Plus, Star, Shuffle, ChevronRight, ChevronLeft, Edit3, Trash2, Eye, EyeOff, Building2, Filter, X, List, Zap } from "lucide-react";
import { useCards } from "./hooks/useCards";
import { SearchBar } from "./components/SearchBar";
import { CardModal } from "./components/CardModal";
import { CardDetail } from "./components/CardDetail";
import { EmptyState } from "./components/EmptyState";
import { MarkdownAnswer } from "./components/MarkdownAnswer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./components/ui/dialog";
import { Button } from "./components/ui/button";

function App() {
  const {
    cards,
    categories,
    companies,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activeCompany,
    setActiveCompany,
    showStarredOnly,
    setShowStarredOnly,
    categoryCounts,
    companyCounts,
    addCard,
    updateCard,
    deleteCard,
    toggleStar,
    addCategory,
    addCompany,
  } = useCards();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [detailIndex, setDetailIndex] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [focusIndex, setFocusIndex] = useState(0);
  const [listPage, setListPage] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.max(1, Math.ceil(cards.length / ITEMS_PER_PAGE));
  const safePage = Math.min(listPage, totalPages - 1);
  const pagedCards = cards.slice(safePage * ITEMS_PER_PAGE, (safePage + 1) * ITEMS_PER_PAGE);

  useEffect(() => {
    setListPage(0);
  }, [searchQuery, activeCategory, activeCompany, showStarredOnly]);

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

  const requestDelete = useCallback((id) => {
    setDeleteTarget(id);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteTarget) {
      deleteCard(deleteTarget);
      setDeleteTarget(null);
    }
  }, [deleteTarget, deleteCard]);

  const handleShuffle = useCallback(() => {
    setFocusIndex(Math.floor(Math.random() * cards.length));
  }, [cards.length]);

  const detailCard = detailIndex !== null ? cards[detailIndex] : null;
  const hasActiveFilters = activeCategory !== "all" || activeCompany !== "all" || showStarredOnly;

  return (
    <div className="min-h-screen bg-surface-dim">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-border/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-sm">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                  <path d="M6 9h20M6 16h15M6 23h17" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h1 className="text-base font-extrabold text-text-primary tracking-tight leading-none">BQ Pocket</h1>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowStarredOnly(!showStarredOnly)}
                className={`p-2 rounded-lg transition-all ${
                  showStarredOnly
                    ? "bg-amber-50 text-amber-500 shadow-sm shadow-amber-100"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
                title="Show starred only"
              >
                <Star size={17} className={showStarredOnly ? "fill-current" : ""} />
              </button>
              <button
                onClick={() => {
                  setModalOpen(true);
                  setEditingCard(null);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 active:scale-[0.97] transition-all shadow-sm shadow-brand-200"
              >
                <Plus size={15} strokeWidth={2.5} />
                <span className="hidden sm:inline">New</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-5 space-y-4">
        {/* Toolbar */}
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="flex bg-white border border-border rounded-lg overflow-hidden shrink-0 shadow-sm">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1 px-2.5 py-2 text-xs font-semibold transition-all ${
                viewMode === "list"
                  ? "bg-brand-600 text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <List size={13} />
              List
            </button>
            <button
              onClick={() => {
                setViewMode("focus");
                setFocusIndex(0);
              }}
              className={`flex items-center gap-1 px-2.5 py-2 text-xs font-semibold transition-all ${
                viewMode === "focus"
                  ? "bg-brand-600 text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Zap size={13} />
              Focus
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={13} className="text-gray-400" />
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger className={`text-xs font-semibold ${
              activeCategory !== "all"
                ? "bg-brand-600 text-white border-brand-600 shadow-sm shadow-brand-200 [&_svg]:text-white"
                : "bg-white border-border text-gray-600 hover:border-gray-300"
            }`}>
              <SelectValue placeholder="Category: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Category: All</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.label} ({categoryCounts[cat.id] || 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={activeCompany} onValueChange={setActiveCompany}>
            <SelectTrigger className={`text-xs font-semibold ${
              activeCompany !== "all"
                ? "bg-brand-600 text-white border-brand-600 shadow-sm shadow-brand-200 [&_svg]:text-white"
                : "bg-white border-border text-gray-600 hover:border-gray-300"
            }`}>
              <SelectValue placeholder="Company: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Company: All</SelectItem>
              {companies.map((co) => (
                <SelectItem key={co.id} value={co.id}>
                  {co.label} ({companyCounts[co.id] || 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <button
              onClick={() => { setActiveCategory("all"); setActiveCompany("all"); setShowStarredOnly(false); }}
              className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-brand-600 transition-colors"
            >
              <X size={12} />
              Reset
            </button>
          )}

          <div className="flex-1" />

          <span className="text-xs text-gray-400 font-medium tabular-nums">
            {cards.length} card{cards.length !== 1 ? "s" : ""}
          </span>

          {viewMode === "focus" && cards.length > 1 && (
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-brand-600 transition-colors"
            >
              <Shuffle size={12} />
              Shuffle
            </button>
          )}
        </div>

        {/* Cards */}
        {cards.length === 0 ? (
          <EmptyState
            hasSearch={!!searchQuery || hasActiveFilters}
            onClearSearch={() => {
              setSearchQuery("");
              setActiveCategory("all");
              setActiveCompany("all");
              setShowStarredOnly(false);
            }}
          />
        ) : viewMode === "list" ? (
          <div className="mb-8 space-y-3">
            <div className="bg-white rounded-xl border border-border/60 shadow-sm overflow-hidden">
              {pagedCards.map((card, idx) => {
                const category = categories.find((c) => c.id === card.category);
                const company = companies.find((c) => c.id === card.company);
                const globalIdx = safePage * ITEMS_PER_PAGE + idx;
                const isLast = idx === pagedCards.length - 1;
                return (
                  <div
                    key={card.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setDetailIndex(globalIdx)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setDetailIndex(globalIdx); }}
                    className={`flex items-center gap-3 px-4 py-3.5 hover:bg-brand-50/40 transition-all group cursor-pointer ${!isLast ? "border-b border-border/50" : ""}`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(card.id);
                      }}
                      className="shrink-0 p-0.5"
                    >
                      <Star
                        size={15}
                        className={`transition-all ${
                          card.starred
                            ? "fill-amber-400 text-amber-400 scale-110"
                            : "text-gray-200 group-hover:text-gray-300"
                        }`}
                      />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-[20px] font-semibold text-text-primary leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
                        {card.question}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {category && (
                          <span className={`text-[14px] font-semibold px-3 py-0.5 rounded-full ${category.color}`}>
                            {category.label}
                          </span>
                        )}
                        {company && (
                          <span className="inline-flex items-center gap-1 text-[14px] font-semibold px-3 py-0.5 rounded-full bg-slate-100 text-slate-500">
                            <Building2 size={12} />
                            {company.label}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight
                      size={15}
                      className="shrink-0 text-gray-300 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5">
                <button
                  onClick={() => setListPage((p) => Math.max(0, p - 1))}
                  disabled={safePage === 0}
                  className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-white rounded-md disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={17} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setListPage(i)}
                    className={`min-w-[32px] h-8 rounded-lg text-xs font-semibold transition-all ${
                      i === safePage
                        ? "bg-brand-600 text-white shadow-sm shadow-brand-200"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setListPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={safePage === totalPages - 1}
                  className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-white rounded-md disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <FocusView
            cards={cards}
            categories={categories}
            companies={companies}
            index={focusIndex}
            setIndex={setFocusIndex}
            onToggleStar={toggleStar}
            onEdit={handleEdit}
            onDelete={requestDelete}
          />
        )}
      </main>

      {/* Modals */}
      {modalOpen && (
        <CardModal
          card={editingCard}
          categories={categories}
          companies={companies}
          onAddCategory={addCategory}
          onAddCompany={addCompany}
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
          categories={categories}
          companies={companies}
          currentIndex={detailIndex}
          totalCount={cards.length}
          onClose={() => setDetailIndex(null)}
          onToggleStar={toggleStar}
          onEdit={(card) => {
            setDetailIndex(null);
            handleEdit(card);
          }}
          onDelete={requestDelete}
          onPrev={() => setDetailIndex((i) => Math.max(0, i - 1))}
          onNext={() => setDetailIndex((i) => Math.min(cards.length - 1, i + 1))}
        />
      )}

      <Dialog open={deleteTarget !== null} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete Card</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this card? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FocusView({ cards, categories, companies, index, setIndex, onToggleStar, onEdit, onDelete }) {
  const [revealedIds, setRevealedIds] = useState(new Set());
  const [animating, setAnimating] = useState(false);
  const answerRef = useRef(null);
  const safeIndex = Math.min(index, cards.length - 1);
  const card = cards[safeIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [safeIndex]);

  const revealed = card ? revealedIds.has(card.id) : false;

  function toggleRevealed(show) {
    setAnimating(true);
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (show) next.add(card.id);
      else next.delete(card.id);
      return next;
    });
    setTimeout(() => setAnimating(false), 500);
  }

  const category = categories.find((c) => c.id === card?.category);
  const company = companies.find((c) => c.id === card?.company);
  if (!card) return null;

  function goTo(next) {
    const target = next
      ? Math.min(cards.length - 1, safeIndex + 1)
      : Math.max(0, safeIndex - 1);
    setIndex(target);
  }

  return (
    <div className="pb-8">
      <div className="bg-white rounded-xl border border-border/60 shadow-sm overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/80 border-b border-border/50">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleStar(card.id)}
              className="p-1.5 rounded-md hover:bg-white transition-all"
            >
              <Star
                size={15}
                className={`transition-all ${card.starred ? "fill-amber-400 text-amber-400 scale-110" : "text-gray-300 hover:text-amber-300"}`}
              />
            </button>
            <button
              onClick={() => onEdit(card)}
              className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-white rounded-md transition-all"
            >
              <Edit3 size={14} />
            </button>
            <button
              onClick={() => onDelete(card.id)}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-white rounded-md transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => goTo(false)}
              disabled={safeIndex === 0}
              className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-white rounded-md disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={17} />
            </button>
            <span className="text-xs text-gray-400 font-semibold tabular-nums min-w-[3rem] text-center">
              {safeIndex + 1} / {cards.length}
            </span>
            <button
              onClick={() => goTo(true)}
              disabled={safeIndex === cards.length - 1}
              className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-white rounded-md disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        {/* Question */}
        <div className="p-6 md:p-10">
          <div className="flex items-center gap-2 flex-wrap mb-5">
            {category && (
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${category.color}`}>
                {category.label}
              </span>
            )}
            {company && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                <Building2 size={10} />
                {company.label}
              </span>
            )}
          </div>

          <h2 className="text-xl md:text-2xl font-extrabold text-text-primary leading-snug tracking-tight">
            {card.question}
          </h2>
        </div>

        {/* Reveal */}
        {!revealed && (
          <button
            onClick={() => {
              toggleRevealed(true);
              setTimeout(() => {
                answerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 100);
            }}
            className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-gradient-to-r from-brand-50 to-indigo-50 hover:from-brand-100 hover:to-indigo-100 border-t border-brand-100 text-brand-600 font-semibold text-sm transition-all"
          >
            <Eye size={15} />
            Show Answer
          </button>
        )}

        {/* Answer */}
        {revealed && (
          <div
            ref={answerRef}
            className={animating ? "overflow-hidden transition-all duration-500 ease-out" : ""}
            style={animating ? { maxHeight: "5000px", opacity: 1 } : undefined}
          >
            <div className="border-t border-border/50 px-6 md:px-10 py-6 md:py-8">
              <MarkdownAnswer text={card.answer} />
            </div>

            <button
              onClick={() => {
                toggleRevealed(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gray-100 border-t border-border/50 text-gray-400 font-semibold text-xs transition-all"
            >
              <EyeOff size={13} />
              Hide Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
