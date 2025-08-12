import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { StarFilled, ClockCircleOutlined } from "@ant-design/icons";
import BigGrid from "../../components/BigGrid/BigGrid";
import kinopoiskApi from "../../api/kinopoiskApi";
import Footer from "../../components/Footer/Footer";
import Comments from "../../components/Comments/Comments";
import { Row, Col } from "antd";

const API_KEY = "EPJEEZD-RPT42ZD-GS9F7VW-E5NV13Z";

export default function MoviePage() {
  const { movieName } = useParams<{ movieName: string }>();
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movieInfo, setMovieInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const randomFetchFunction = () => {
    const functions = [
      kinopoiskApi.getRecommendedMovies,
      kinopoiskApi.getNewRelease,
      kinopoiskApi.getTrending,
    ];
    const randomIndex = Math.floor(Math.random() * functions.length);
    return functions[randomIndex];
  };
  useEffect(() => {
    if (!movieName) return;

    const fetchMovieData = async () => {
      setLoading(true);
      setError("");
      setTrailerUrl("");
      setMovieInfo(null);

      try {
        const res = await fetch(
          `https://api.kinopoisk.dev/v1.4/movie/search?query=${encodeURIComponent(
            movieName
          )}`,
          { headers: { "X-API-KEY": API_KEY } }
        );
        const data = await res.json();

        if (!data.docs || data.docs.length === 0) {
          setError("Фильм не найден");
          setLoading(false);
          return;
        }

        const movieId = data.docs[0].id;

        const movieRes = await fetch(
          `https://api.kinopoisk.dev/v1.4/movie/${movieId}`,
          { headers: { "X-API-KEY": API_KEY } }
        );
        const movieData = await movieRes.json();

        setMovieInfo(movieData);

        const trailer = movieData.videos?.trailers?.[0];
        if (trailer?.url) {
          let url = trailer.url;
          if (trailer.site === "youtube") {
            url = url.replace("watch?v=", "embed/");
          }
          setTrailerUrl(url);
        }
      } catch {
        setError("ошибка при загрузке данных");
      }

      setLoading(false);
    };

    fetchMovieData();
  }, [movieName]);

  if (loading)
    return (
      <p className="text-center text-lg py-10 text-gray-300">Загрузка...</p>
    );

  if (error)
    return (
      <p className="text-center text-lg py-10 text-red-500 font-semibold">
        {error}
      </p>
    );

  return (
    <div className="min-h-screen text-white">
      <div className="flex justify-center py-4 ">
        <Header />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {trailerUrl && (
          <div className="mb-8 flex justify-center">
            <iframe
              className="w-full max-w-6xl aspect-video rounded-lg shadow-lg"
              src={trailerUrl}
              title="Трейлер"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {movieInfo && (
          <div className="rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={
                  movieInfo.poster?.url ||
                  movieInfo.backdrop?.url ||
                  "нету фотки"
                }
                alt={movieInfo.name}
                className="w-72 rounded-lg shadow-md"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {movieInfo.name}{" "}
                  <span className="text-gray-400">({movieInfo.year})</span>
                </h1>
                <div className="mb-2 flex flex-wrap gap-3 ">
                  {movieInfo.genres?.map((g: any, index: number) => (
                    <span
                      key={index}
                      className="bg-white text-black px-3 py-1 rounded-md text-sm"
                    >
                      {g.name}
                    </span>
                  ))}
                  <p className="mb-2">
                    <ClockCircleOutlined />{" "}
                    {movieInfo.movieLength
                      ? `${movieInfo.movieLength} минут`
                      : "n/a"}
                  </p>
                  <p className="mb-2">
                    <StarFilled /> {movieInfo.rating?.kp?.toFixed(1)}
                  </p>
                </div>

                <p className="text-gray-300 mb-4">{movieInfo.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mb-4 mx-10">
        <div className="flex flex-wrap gap-6">
          <div className="mb-4 mx-10">
            <span className="font-bold text-2xl text-yellow-400 block mb-2">
              Актеры в фильме:
            </span>

            <Row gutter={[16, 16]}>
              {movieInfo.persons
                ?.filter((p: any) => p.enProfession === "actor")
                .slice(0, 12)
                .map((p: any, index: number) => (
                  <Col xs={12} sm={8} md={6} lg={3} key={index}>
                    <div className="flex flex-col items-center">
                      <img
                        src={p.photo}
                        alt={p.name}
                        className="w-full h-full object-cover rounded-xl border border-gray-700"
                      />
                      <span className="text-xs text-gray-300 mt-1 text-center">
                        {p.name}
                      </span>
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </div>
        <div className="mt-15">
          <BigGrid
            count={5}
            title="You may also like"
            fetchFunction={randomFetchFunction()}
          />
        </div>
        <div className="mx-15 mt-10">
          <Comments />
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
