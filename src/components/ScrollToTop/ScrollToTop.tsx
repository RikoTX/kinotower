import { useEffect } from "react";

interface ScrollToTopProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export default function ScrollToTop({ scrollRef }: ScrollToTopProps) {
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [scrollRef]);

  return null;
}
