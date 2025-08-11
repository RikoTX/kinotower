import React, { useEffect, useState } from "react";
import kinopoiskApi from "../../api/kinopoiskApi";

interface Genre {
  name: string;
}

interface Rating {
  kp?: number;
}

interface Poster {
  url: string;
}

interface Movie {
  id: number;
  name: string;
  year: number;
  type: string; // movie или tv-series
  genres?: Genre[];
  poster?: Poster;
  movieLength?: number; // в минутах
  rating?: Rating;
}

interface BigGridProps {
  count: number;
  title: string;
}

const BigGrid: React.FC<BigGridProps> = ({ count, title }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      setLoading(true);
      try {
        const moviesData = await kinopoiskApi.getTrending(count);
        setMovies(moviesData || []);
      } catch (error) {
        console.error("Ошибка загрузки трендовых фильмов", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrending();
  }, [count]);

  if (loading) return <div className="text-center py-10">Загрузка...</div>;

  return (
    <section>
      <h2 className="mb-6 text-3xl font-bold">{title}</h2>
      <div className="flex gap-6">
        {movies.map((movie) => {
          const genreNames = movie.genres?.map((g) => g.name).join(", ") || "жанр не указан";
          const durationStr = movie.movieLength ?`${movie.movieLength}m` : "N/A";
          const ratingStr = movie.rating?.kp ? movie.rating.kp.toFixed(1) : "—";

          const isComedy = genreNames.toLowerCase().includes("комедия");
          const trailerLabel = movie.type === "tv-series" ? "Трейлер" : "Комедия";

          return (
            <div key={movie.id} className="relative w-48 flex-shrink-0">
              <div className="relative">
                <img
                  src={movie.poster?.url}
                  alt={movie.name}
                  className="w-full rounded-lg object-cover"
                />
                {durationStr && (
                  <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs font-bold px-2 py-0.5 rounded">
                    {durationStr}
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs font-bold px-2 py-0.5 rounded">
                  {ratingStr}
                </div>
              </div>

              <div className="mt-2 flex justify-between text-sm font-medium text-gray-800">
                <div
                  className="max-w-[60%] truncate"
                  title={movie.name}
                >
                  {movie.name}
                </div>
                <div className="italic text-gray-500">
                  {genreNames ? (isComedy ? "Комедия" : trailerLabel) : "Без жанра"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BigGrid;
