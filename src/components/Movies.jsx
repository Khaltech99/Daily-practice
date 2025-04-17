import React, { useEffect, useState } from "react";
import { filmStore } from "../../filmStore";
import { Search } from "lucide-react";

const Movies = () => {
  const movies = filmStore((state) => state.movies);
  const allMovies = filmStore((state) => state.allMovies);
  const loading = filmStore((state) => state.loading);
  const error = filmStore((state) => state.error);
  const searchMovie = filmStore((state) => state.searchMovie);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    allMovies();
    console.log("Component mounted, allMovies called");
  }, [allMovies]);

  // For debugging
  useEffect(() => {
    console.log("Movies state:", movies);
  }, [movies]);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error loading movies</p>;
  if (!movies || movies.length === 0) return <p>No movies available</p>;

  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <input
          type="text"
          className="outline-0 bg-none bg-red-300 flex-1 font-semibold px-3"
          placeholder="search..."
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Search
          className="bg-green-500 p-1 rounded-sm"
          onClick={() => searchMovie(searchInput)}
        />
      </div>
      <h1>Movies List</h1>
      {movies.map((movie, index) => (
        <div
          key={movie.id || index}
          className="flex flex-col mb-4 bg-amber-100 p-2 mx-2"
        >
          <h2 className="text-red-400 font-semibold text-center text-lg">
            {movie.title}
          </h2>
          <p>{movie.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Movies;
