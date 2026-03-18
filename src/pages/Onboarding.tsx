import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Your Beauty Studio",
    subtitle: "Try on real products with your camera in real time",
    emoji: "💄",
    bg: "from-primary/5 to-accent/5",
  },
  {
    title: "Record Your Routine",
    subtitle: "Capture your GRWM with sound and share your favorite looks",
    emoji: "🎬",
    bg: "from-accent/5 to-primary/5",
  },
  {
    title: "Save & Collect",
    subtitle: "Build your beauty collection and discover new products",
    emoji: "✨",
    bg: "from-primary/10 to-transparent",
  },
];

const Onboarding = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (current === slides.length - 1) {
      navigate("/home");
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        key={`bg-${current}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`absolute inset-0 bg-gradient-to-b ${slides[current].bg}`}
      />

      <button
        onClick={() => navigate("/home")}
        className="absolute top-14 right-6 z-10 text-muted-foreground text-sm font-medium"
      >
        Skip
      </button>

      <div className="flex-1 flex flex-col items-center justify-center px-10 pt-20 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <motion.div 
              className="w-32 h-32 rounded-3xl bg-muted flex items-center justify-center mb-12"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <motion.span 
                className="text-5xl"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                {slides[current].emoji}
              </motion.span>
            </motion.div>
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
              {slides[current].title}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-[280px]">
              {slides[current].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center pb-14 gap-8 px-10 relative z-10">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <motion.div
              key={i}
              className="h-1.5 rounded-full"
              animate={{
                width: i === current ? 32 : 8,
                backgroundColor: i === current ? "hsl(var(--foreground))" : "hsl(var(--border))",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={next}
          className="w-full bg-foreground text-background py-4 rounded-2xl text-base font-medium"
        >
          {current === slides.length - 1 ? "Get Started" : "Continue"}
        </motion.button>
      </div>
    </div>
  );
};

export default Onboarding;
