import { useEffect, useState } from "react";
import { Carousel } from "antd";
import {
  PlayCircleFilled,
  ClockCircleFilled,
  CalendarFilled,
  ClockCircleOutlined,
  StarFilled,
} from "@ant-design/icons";
import kinopoiskApi from "../../api/kinopoiskApi";

interface Movie {
  id: number;
  name: string;
  year: number;
  type: "movie" | "tv-series";
  description?: string;
  rating?: { kp: number };
  movieLength?: number;
  backdrop?: { url: string };
  poster?: { url: string };
  seasonsInfo?: { number: number }[];
}

export default function HomeBanner() {
  const [slides, setSlides] = useState<Movie[]>([]);

  useEffect(() => {
    kinopoiskApi.getRecommended(4).then(setSlides).catch(console.error);
  }, []);

  return (
    <Carousel effect="fade">
      {slides.map((slide) => (
        <div key={slide.id}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "85vh",
              overflow: "hidden",
            }}
          >
            <img
              src={slide.backdrop?.url || slide.poster?.url || ""}
              alt={slide.name}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "40%",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
                zIndex: 1,
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                gap: "20px",
                zIndex: 2,
              }}
            >
              <button className="bg-red-600 hover:bg-red-700 cursor-pointer rounded-lg px-10 py-6 font-bold text-[20px] flex items-center gap-2 text-white">
                Watch Now <PlayCircleFilled className="text-2xl" />
              </button>
              <button className="border-4 border-solid border-red-600 hover:bg-black/20 cursor-pointer px-10 py-6 rounded-lg font-bold text-[20px] text-white flex items-center gap-2">
                Watch Later <ClockCircleFilled className="text-2xl" />
              </button>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "120px",
                left: "10%",
                maxWidth: "40%",
                color: "white",
                textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
                zIndex: 2,
              }}
            >
              <p className="font-bold text-[37px]">{slide.name}</p>
              <div className="flex gap-6 text-lg font-semibold">
                <p className="flex items-center gap-2">
                  <CalendarFilled /> {slide.year}
                </p>
                <p className="flex items-center gap-2">
                  <ClockCircleOutlined />{" "}
                  {slide.movieLength ? `${slide.movieLength}m` : "n/a"}
                </p>
                <p className="flex items-center gap-2">
                  <StarFilled /> {slide.rating?.kp?.toFixed(1)}
                </p>
              </div>
              <p className="mt-2 text-base">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
