import { motion } from "framer-motion";
import React from "react";

export const GlowEffect = ({ active = true }: { active?: boolean }) => {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, -60 - Math.random() * 40],
          }}
          transition={{
            duration: 2,
            delay: i * 0.6,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: `${40 + Math.random() * 20}%`,
          }}
        />
      ))}
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
    sm: "min-w-[36px] min-h-[36px]",
    md: "min-w-[44px] min-h-[44px]",
    lg: "min-w-[56px] min-h-[56px]",
    xl: "min-w-[64px] min-h-[64px]",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={`rounded-2xl flex items-center justify-center transition-colors ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

// Keep backward compatibility
export const SparkleEffect = GlowEffect;
