import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const API_KEY = "EPJEEZD-RPT42ZD-GS9F7VW-E5NV13Z";

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontWeight: "500",
  transition: "color 0.3s",
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: "10px 16px",
  border: "none",
  fontSize: "14px",
  outline: "none",
  backgroundColor: "#FFFFFF",
  color: "black",
};

export default function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 0) {
        fetchMovies(query);
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchMovies = async (searchQuery: string) => {
    try {
      const res = await fetch(
        `https://api.kinopoisk.dev/v1.4/movie/search?query=${encodeURIComponent(
          searchQuery
        )}&limit=10`,
        {
          headers: {
            "X-API-KEY": API_KEY,
          },
        }
      );
      const data = await res.json();
      setResults(data.docs || []);
    } catch (error) {
      console.error("Ошибка при загрузке фильмов:", error);
    }
  };

  const handleMovieClick = (movieName: string) => {
    setQuery("");
    setResults([]);
    navigate(`/kinotower/${encodeURIComponent(movieName)}`);
  };

  return (
    <div style={{ padding: "10px", position: "relative" }}>
      <Row wrap={false} gutter={16} align="middle" justify="space-between">
        <Col flex="none">
          <Link style={linkStyle} to="/kinotower/">
            Home
          </Link>
        </Col>
        <Col flex="none">
          <a style={linkStyle} href="#">
            Genre
          </a>
        </Col>
        <Col flex="none">
          <a style={linkStyle} href="#">
            Country
          </a>
        </Col>
        <Col flex="none" style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              borderRadius: "20px",
              overflow: "hidden",
              width: "400px",
              backgroundColor: "black",
              border: "1px solid #333",
            }}
          >
            <input
              type="text"
              placeholder="Search movies......."
              style={inputStyle}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid #FFFFFF",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              <SearchOutlined />
            </button>
          </div>

          {results.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                left: 0,
                width: "400px",
                background: "white",
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
                zIndex: 1000,
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              {results.map((movie) => (
                <div
                  key={movie.id}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  onClick={() => handleMovieClick(movie.name)}
                >
                  <img
                    src={
                      movie.poster?.url || "https://via.placeholder.com/50x75"
                    }
                    alt={movie.name}
                    style={{
                      width: "40px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  <span style={{ fontSize: "14px", color: "black" }}>
                    {movie.name || "Без названия"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Col>
        <Col flex="none">
          <a style={linkStyle} href="#">
            Movies
          </a>
        </Col>
        <Col flex="none">
          <a style={linkStyle} href="#">
            Series
          </a>
        </Col>
        <Col flex="none">
          <a style={linkStyle} href="#">
            Animation
          </a>
        </Col>
        <Col flex="none">
          <a style={linkStyle} href="#">
            Login/SignUp
          </a>
        </Col>
      </Row>
    </div>
  );
}
