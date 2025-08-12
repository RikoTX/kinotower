import "./App.css";
import { useRef } from "react";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ContentPage from "./pages/ContentPage";

function App() {
  
  const contentRef = useRef<HTMLDivElement>(null); 

  return (
    <div ref={contentRef}>
      <ScrollToTop scrollRef={contentRef} />
      <ContentPage />
    </div>
  );
}

export default App;
