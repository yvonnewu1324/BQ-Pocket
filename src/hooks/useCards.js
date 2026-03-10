import { useState, useEffect, useMemo } from "react";
import { sampleCards, DEFAULT_CATEGORIES, DEFAULT_COMPANIES, CATEGORY_COLORS } from "../data/sampleCards";

const STORAGE_KEY = "bq-pocket-cards";
const CATEGORIES_KEY = "bq-pocket-categories";
const COMPANIES_KEY = "bq-pocket-companies";

function load(key) {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function migrateCard(card) {
  if (card.companies) return card;
  const companies = card.company ? [card.company] : [];
  const { company, ...rest } = card;
  return { ...rest, companies };
}

export function useCards() {
  const [cards, setCards] = useState(() => (load(STORAGE_KEY) || sampleCards).map(migrateCard));
  const [categories, setCategories] = useState(() => load(CATEGORIES_KEY) || DEFAULT_CATEGORIES);
  const [companies, setCompanies] = useState(() => load(COMPANIES_KEY) || DEFAULT_COMPANIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeCompany, setActiveCompany] = useState("all");
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  useEffect(() => { save(STORAGE_KEY, cards); }, [cards]);
  useEffect(() => { save(CATEGORIES_KEY, categories); }, [categories]);
  useEffect(() => { save(COMPANIES_KEY, companies); }, [companies]);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        card.question.toLowerCase().includes(q) ||
        card.answer.toLowerCase().includes(q) ||
        (card.hint && card.hint.toLowerCase().includes(q));

      const matchesCategory =
        activeCategory === "all" || card.category === activeCategory;

      const matchesCompany =
        activeCompany === "all" || (card.companies && card.companies.includes(activeCompany));

      const matchesStarred = !showStarredOnly || card.starred;

      return matchesSearch && matchesCategory && matchesCompany && matchesStarred;
    });
  }, [cards, searchQuery, activeCategory, activeCompany, showStarredOnly]);

  const categoryCounts = useMemo(() => {
    const counts = { all: cards.length };
    categories.forEach((cat) => {
      counts[cat.id] = cards.filter((c) => c.category === cat.id).length;
    });
    return counts;
  }, [cards, categories]);

  const companyCounts = useMemo(() => {
    const counts = { all: cards.length };
    companies.forEach((co) => {
      counts[co.id] = cards.filter((c) => c.companies && c.companies.includes(co.id)).length;
    });
    return counts;
  }, [cards, companies]);

  function addCard(card) {
    const newCard = { ...card, id: Date.now().toString(), companies: card.companies || [], hint: card.hint || "" };
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

  function addCategory(label) {
    const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (categories.some((c) => c.id === id)) return categories.find((c) => c.id === id);
    const color = CATEGORY_COLORS[categories.length % CATEGORY_COLORS.length];
    const newCat = { id, label, color };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  }

  function deleteCategory(id) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  function addCompany(label) {
    const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (companies.some((c) => c.id === id)) return companies.find((c) => c.id === id);
    const color = CATEGORY_COLORS[(companies.length + 5) % CATEGORY_COLORS.length];
    const newCo = { id, label, color };
    setCompanies((prev) => [...prev, newCo]);
    return newCo;
  }

  function deleteCompany(id) {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  }

  return {
    cards: filteredCards,
    allCards: cards,
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
    deleteCategory,
    addCompany,
    deleteCompany,
  };
}
