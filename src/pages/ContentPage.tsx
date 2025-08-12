import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./HomePages/Home";
import MoviePage from "./MoviePage/MoviePage";

export default function ContentPage() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/kinotower" />} />
      <Route path="/kinotower" element={<Home />} />
      <Route path="/kinotower/:movieName" element={<MoviePage />} />
    </Routes>
  );
}
