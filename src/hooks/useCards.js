import { useState, useEffect, useMemo } from "react";
import { sampleCards, CATEGORIES } from "../data/sampleCards";

const STORAGE_KEY = "bq-pocket-cards";

function loadCards() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

function saveCards(cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function useCards() {
  const [cards, setCards] = useState(() => loadCards() || sampleCards);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  useEffect(() => {
    saveCards(cards);
  }, [cards]);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch =
        !searchQuery ||
        card.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.answer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === "all" || card.category === activeCategory;

      const matchesStarred = !showStarredOnly || card.starred;

      return matchesSearch && matchesCategory && matchesStarred;
    });
  }, [cards, searchQuery, activeCategory, showStarredOnly]);

  const categoryCounts = useMemo(() => {
    const counts = { all: cards.length };
    CATEGORIES.forEach((cat) => {
      counts[cat.id] = cards.filter((c) => c.category === cat.id).length;
    });
    return counts;
  }, [cards]);

  function addCard(card) {
    const newCard = { ...card, id: Date.now().toString() };
    setCards((prev) => [newCard, ...prev]);
    return newCard;
  }

  function updateCard(id, updates) {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...updates } : card))
    );
  }

  function deleteCard(id) {
    setCards((prev) => prev.filter((card) => card.id !== id));
  }

  function toggleStar(id) {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, starred: !card.starred } : card
      )
    );
  }

  function resetToSample() {
    setCards(sampleCards);
  }

  return {
    cards: filteredCards,
    allCards: cards,
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
    resetToSample,
  };
}
