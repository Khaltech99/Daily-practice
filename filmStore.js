import { create } from "zustand";

export const filmStore = create((set, get) => ({
  movies: [],
  allMoviesData: [],
  loading: false,
  error: false,
  allMovies: async () => {
    set({ loading: true, error: false });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      set({ movies: data, loading: false, allMoviesData: data });
    } catch (error) {
      console.log("Error fetching movies:", error);
      set({ error: true, loading: false });
    }
  },
  searchMovie: (searchInput) => {
    const { allMoviesData } = get();
    if (!searchInput.trim()) {
      set({ movies: [...allMoviesData] });
      return;
    }
    set({
      movies: allMoviesData.filter((movie) =>
        movie.title.includes(searchInput)
      ),
    });
  },
}));
