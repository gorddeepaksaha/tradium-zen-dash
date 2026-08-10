import { useEffect, useRef, useState, type ReactNode } from "react";

/** Adds `is-visible` the first time the element scrolls into view. */
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Motion flavour. */
  variant?: "up" | "left" | "right" | "zoom";
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "figure";
};

const variants = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  zoom: "reveal-zoom",
} as const;

export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${variants[variant]} ${inView ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
