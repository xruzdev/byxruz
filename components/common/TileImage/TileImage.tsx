"use client";
import gsap from "gsap";
import { useMemo } from "react";
import styles from "./TileImage.module.css";

interface TileImageProps {
  src: string;
  alt: string;
  cols?: number;
  rows?: number;
  spread?: number;
}

export const TileImage = ({
  src,
  alt,
  cols = 4,
  rows = 5,
  spread = 40,
}: TileImageProps) => {
  const tiles = useMemo(() => {
    const result = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        result.push({ row, col });
      }
    }
    return result;
  }, [cols, rows]);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    row: number,
    col: number,
  ) => {
    const centerCol = (cols - 1) / 2;
    const centerRow = (rows - 1) / 2;

    const dx = (col - centerCol) * spread;
    const dy = (row - centerRow) * spread;

    gsap.to(e.currentTarget, {
      x: dx,
      y: dy,
      duration: 1,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.6)",
    });
  };

  return (
    <div className={styles.container} role="img" aria-label={alt}>
      {tiles.map(({ row, col }) => (
        <div
          key={`${row}-${col}`}
          className={styles.tile}
          style={{
            
            backgroundImage: `url(${src})`,
            backgroundSize: `${cols * 100}% ${rows * 100}%`,
            backgroundPosition: `${(col * 100) / (cols - 1)}% ${(row * 100) / (rows - 1)}%`,
            width: `${100 / cols}%`,
            height: `${100 / rows}%`,
          }}
          onMouseEnter={(e) => handleMouseEnter(e, row, col)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};
