/* eslint-disable @next/next/no-img-element */
"use client";
import { projects } from "@/lib/data/projects";
import gsap from "gsap";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./ProjectSlider.module.css";

const TOTAL = projects.length;
const THUMB_WIDTH = 88 + 8;
const INIT_EXT = TOTAL + 1; // proyecto 1 centrado al inicio

// Posición del thumb strip: siempre ancla en la copia central (TOTAL + thumbIdx)
// para que haya thumbs en ambos extremos y nunca se vea vacío
const thumbStripX = (thumbIdx: number) => -(TOTAL + thumbIdx - 2) * THUMB_WIDTH;

export const ProjectSlider = () => {
  const extended = useMemo(() => [...projects, ...projects, ...projects], []);
  const extThumbs = useMemo(() => [...projects, ...projects, ...projects], []);

  const [activeExt, setActiveExt] = useState(INIT_EXT);
  const activeExtRef = useRef(INIT_EXT);
  const isAnimating = useRef(false);
  const touchStartX = useRef(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbsTrackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const getSlideStep = useCallback((): number => {
    const track = trackRef.current;
    if (!track) return 0;
    const a = track.children[0] as HTMLElement;
    const b = track.children[1] as HTMLElement;
    return b ? b.offsetLeft - a.offsetLeft : a.offsetWidth;
  }, []);

  const getTrackXFor = useCallback((extIdx: number): number => {
    const track = trackRef.current;
    const viewport = track?.parentElement;
    if (!track || !viewport) return 0;

    const step = getSlideStep();
    if (step === 0) return 0;

    const firstSlide = track.children[0] as HTMLElement | undefined;
    const slideWidth = firstSlide?.offsetWidth ?? step;
    const viewportWidth = viewport.offsetWidth;

    const rawX = viewportWidth / 2 - (extIdx * step + slideWidth / 2);

    const minX = Math.min(0, viewportWidth - track.scrollWidth);
    const maxX = 0;

    return Math.max(minX, Math.min(maxX, rawX));
  }, [getSlideStep]);

  /* ── Posiciones iniciales post-mount ── */
  useEffect(() => {
    gsap.set(trackRef.current, {
      x: getTrackXFor(INIT_EXT),
    });
    gsap.set(thumbsTrackRef.current, {
      x: thumbStripX(INIT_EXT % TOTAL),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slideTo = useCallback(
    (extIdx: number) => {
      if (isAnimating.current) return;

      const trackX = getTrackXFor(extIdx);
      const thumbIdx = ((extIdx % TOTAL) + TOTAL) % TOTAL;

      isAnimating.current = true;

      gsap.to(trackRef.current, {
        x: trackX,
        duration: 0.75,
        ease: "power3.inOut",
        onComplete: () => {
          isAnimating.current = false;
          if (extIdx < TOTAL || extIdx >= 2 * TOTAL) {
            const wrapped = (((extIdx % TOTAL) + TOTAL) % TOTAL) + TOTAL;
            gsap.set(trackRef.current, {
              x: getTrackXFor(wrapped),
            });
            activeExtRef.current = wrapped;
            setActiveExt(wrapped);
          }
        },
      });

      // Thumb strip: ancla siempre en la copia central → nunca vacío
      gsap.to(thumbsTrackRef.current, {
        x: thumbStripX(thumbIdx),
        duration: 0.75,
        ease: "power3.inOut",
      });

      activeExtRef.current = extIdx;
      setActiveExt(extIdx);
    },
    [getTrackXFor],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) < 50) return;
    slideTo(activeExtRef.current + (delta > 0 ? 1 : -1));
  };

  const thumbClick = (realIdx: number) => {
    const cur = activeExtRef.current;
    const candidates = [realIdx, realIdx + TOTAL, realIdx + 2 * TOTAL];
    const closest = candidates.reduce((prev, c) =>
      Math.abs(c - cur) < Math.abs(prev - cur) ? c : prev,
    );
    slideTo(closest);
  };

  const thumbActive = ((activeExt % TOTAL) + TOTAL) % TOTAL;

  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;

      if (idx === activeExt) {
        const playPromise = video.play();
        if (playPromise) {
          playPromise.catch(() => {
            // Ignora bloqueos de autoplay del navegador.
          });
        }
      } else {
        video.pause();
      }
    });
  }, [activeExt]);

  return (
    <div className={styles.root}>
      {/* Thumbnail strip — 3 copias para que nunca quede vacío */}
      <div
        className={`${styles.topBar} overflow-x-hidden md:px-10 lg:px-20 xl:px-30`}
      >
        <div className={styles.thumbsViewport}>
          <div className={styles.thumbsTrack} ref={thumbsTrackRef}>
            {extThumbs.map((p, i) => {
              const isActive = i % TOTAL === thumbActive;
              return (
                <button
                  key={i}
                  className={`${styles.thumbBtn} ${isActive ? styles.thumbActive : ""}`}
                  onClick={() => thumbClick(i % TOTAL)}
                >
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className={styles.thumbImg}
                    loading="lazy"
                  />
                  {isActive && <span className={styles.activeDot} />}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.navBtns}>
          <button
            className={styles.navBtn}
            onClick={() => slideTo(activeExtRef.current - 1)}
          >
            &#8249;
          </button>
          <button
            className={styles.navBtn}
            onClick={() => slideTo(activeExtRef.current + 1)}
          >
            &#8250;
          </button>
        </div>
      </div>

      {/* Main slider */}
      <div
        className={styles.viewport}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className={styles.track} ref={trackRef}>
          {extended.map((p, i) => (
            <Link
              key={i}
              href={p.link}
              target="_blank"
              className={styles.slide}
            >
              <div className={styles.imageWrap}>
                {i === activeExt ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={p.video}
                    poster={p.coverImage}
                    className={styles.slideMedia}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    autoPlay
                  />
                ) : (
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className={styles.slideMedia}
                    loading="lazy"
                  />
                )}
              </div>
              <div className={styles.slideInfo}>
                <span className={styles.slideTitle}>{p.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
