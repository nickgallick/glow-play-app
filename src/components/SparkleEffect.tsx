import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export const SparkleEffect = ({ count = 8, active = true }: { count?: number; active?: boolean }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setSparkles(
        Array.from({ length: count }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 16 + 8,
          delay: Math.random() * 2,
        }))
      );
    }, 3000);
    setSparkles(
      Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 16 + 8,
        delay: Math.random() * 2,
      }))
    );
    return () => clearInterval(interval);
  }, [count, active]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 1.5, delay: s.delay, ease: "easeInOut" }}
            className="absolute"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L14.09 8.26L20.18 8.64L15.54 12.74L17.09 18.82L12 15.52L6.91 18.82L8.46 12.74L3.82 8.64L9.91 8.26L12 2Z"
                fill="hsl(var(--warning))"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const SquishButton = ({
  children,
  className = "",
  onClick,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
}) => {
  const sizes = {
    sm: "min-w-[48px] min-h-[48px]",
    md: "min-w-[64px] min-h-[64px]",
    lg: "min-w-[80px] min-h-[80px]",
    xl: "min-w-[96px] min-h-[96px]",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.92, rotate: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={`pill-button rounded-full flex items-center justify-center ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
