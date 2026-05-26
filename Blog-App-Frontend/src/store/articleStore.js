import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://suntek-blogapp-4iwp.onrender.com";
const ARTICLE_ENDPOINTS = ["/user-api/articles", "/api/articles"];

async function fetchArticles() {
  let lastError = null;

  for (const endpoint of ARTICLE_ENDPOINTS) {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`);
      return Array.isArray(response.data?.payload) ? response.data.payload : [];
    } catch (error) {
      lastError = error;
    }
  }

  // If remote endpoints failed, fall back to any locally-published articles
  try {
    const local = JSON.parse(localStorage.getItem("local_articles") || "[]");
    if (Array.isArray(local) && local.length > 0) return local;
  } catch (e) {
    // ignore parse errors
  }

  throw lastError || new Error("Failed to load articles");
}

const useArticleStore = create((set, get) => ({
  articles: [],
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),
  reset: () => set({ articles: [], isLoading: false, error: null }),

  fetchActiveArticles: async () => {
    const currentArticles = get().articles;

    if (currentArticles.length === 0) {
      set({ isLoading: true, error: null });
    }

    try {
      const articles = await fetchArticles();
      set({ articles, isLoading: false, error: null });
    } catch (err) {
      set({
        error:
          err?.response?.data?.message || err?.message || "Failed to load articles",
        isLoading: false,
      });
    }
  },
}));

export default useArticleStore;