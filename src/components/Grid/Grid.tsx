import { useEffect, useRef, useState } from "react";
import { Row, Col } from "antd";
import kinopoiskApi from "../../api/kinopoiskApi";

interface Movie {
  id: number;
  name: string;
  type: string;
  year: number;
  poster?: { url: string };
  seasonsInfo?: { number: number }[];
  updatedAt?: string;
}

interface RecentlyUpdatedProps {
  title: string;
}

export default function RecentlyUpdated({ title }: RecentlyUpdatedProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    kinopoiskApi.getRecommended(20).then(setMovies).catch(console.error);
  }, []);

  // Горизонтальная прокрутка колесом
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    scrollContainer.addEventListener("wheel", onWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="p-5 text-white">
      <style>
        {`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <h2 className="mb-4 text-[30px] font-bold">{title}</h2>

      <div ref={scrollRef} className="overflow-x-auto hide-scrollbar pb-3">
        <Row gutter={[16, 16]} className="flex-nowrap !flex-nowrap gap-4">
          {movies.map((movie) => (
            <Col
              key={movie.id}
              className="flex-shrink-0"
              style={{ minWidth: "150px", maxWidth: "150px" }}
            >
              <div className="text-center">
                <img
                  src={movie.poster?.url || "/no-poster.png"}
                  alt={movie.name}
                  className="w-full h-[260px] object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
                <p className="mt-2 font-bold">{movie.name}</p>
                <p className="text-xs text-gray-400">
                  {movie.type === "tv-series" && movie.seasonsInfo?.length
                    ? `Series/S${movie.seasonsInfo[0].number} | EP ?`
                    : "Movie"}
                </p>
                <p className="text-xs text-gray-400">{movie.year}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
