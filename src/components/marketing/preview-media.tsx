import { useEffect, useRef, useState } from "react";

type Props = {
  /** Looping preview clip (autoplays, muted, no controls). */
  video?: string | undefined;
  /** VP9/WebM variant for browsers without H.264. */
  videoWebm?: string | undefined;
  /** Still frame — used as poster and as the reduced-motion / no-video fallback. */
  poster: string;
  alt: string;
  className?: string;
};

/**
 * Renders a silent looping product clip when motion is allowed, and the
 * static screenshot otherwise. Playback only runs while in view.
 */
export function PreviewMedia({ video, videoWebm, poster, alt, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionOk) return;
    if (typeof IntersectionObserver === "undefined") {
      void el.play().catch(() => {});
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) void el.play().catch(() => {});
          else el.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [motionOk]);

  const media = "block w-full dark:brightness-[0.85] dark:contrast-[0.95] " + className;

  if ((!video && !videoWebm) || !motionOk) {
    return <img src={poster} alt={alt} loading="lazy" className={media} />;
  }

  return (
    <video
      ref={ref}
      poster={poster}
      aria-label={alt}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={media}
    >
      {videoWebm ? <source src={videoWebm} type="video/webm" /> : null}
      {video ? <source src={video} type="video/mp4" /> : null}
    </video>
  );
}
