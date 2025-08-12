import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface Genre {
  name: string;
}

interface Rating {
  kp?: number;
}

interface Poster {
  url: string;
}
interface Backdrop {
  url: string;
}

interface Movie {
  id: number;
  name: string;
  year: number;
  type: string; 
  genres?: Genre[];
  poster?: Poster;
  backdrop?: Backdrop;
  movieLength?: number; 
  rating?: Rating;
}

interface BigGridProps {
  count: number;
  title: string;
  fetchFunction: (limit: number) => Promise<Movie[]>; 
}

const BigGrid: React.FC<BigGridProps> = ({ count, title, fetchFunction }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const moviesData = await fetchFunction(count);
        setMovies(moviesData || []);
      } catch (error) {
        console.error("Ошибка загрузки фильмов", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [count, fetchFunction]);

  if (loading) return <div className="text-center py-10">Загрузка...</div>;

  return (
    <section>
      <div className="flex justify-between items-center mb-6 px-4 max-w-[96%] font-bold">
        <h2 className="mb-6 text-3xl font-bold ml-[1%]">{title}</h2>
        <button className="bg-transparent border-0 text-gray-500 hover:text-gray-600">
          View all <ArrowRightOutlined />
        </button>
      </div>

      <Row gutter={[24, 24]} justify="center">
        {movies.map((movie) => {
          const genreNames =
            movie.genres?.map((g) => g.name).join(", ") || "жанр не указан";
          const durationStr = movie.movieLength
            ? `${movie.movieLength}m`
            : "N/A";
          const ratingStr = movie.rating?.kp ? movie.rating.kp.toFixed(1) : "—";

          const isComedy = genreNames.toLowerCase().includes("комедия");
          const trailerLabel =
            movie.type === "tv-series" ? "Трейлер" : "Комедия";

          return (
            <Col
              key={movie.id}
              xs={24}
              sm={12}
              md={8}
              lg={4}
              className="flex justify-center cursor-pointer"
              onClick={() =>
                navigate(`/kinotower/${encodeURIComponent(movie.name)}`)
              }
            >
              <div className="relative w-full max-w-md">
                <div className="relative">
                  <img
                    src={movie.poster?.url || movie.backdrop?.url}
                    alt={movie.name}
                    className="w-full rounded-lg object-cover hover:scale-105 duration-200"
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
                  <div className="max-w-[60%] text-white" title={movie.name}>
                    {movie.name}
                  </div>
                  <div className="italic text-gray-500 whitespace-nowrap">
                    {genreNames
                      ? isComedy
                        ? "Комедия"
                        : trailerLabel
                      : "Без жанра"}
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export default BigGrid;
