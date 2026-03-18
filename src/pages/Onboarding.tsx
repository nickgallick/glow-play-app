import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Your Beauty Studio",
    subtitle: "Try on real products with your camera in real time",
    emoji: "💄",
  },
  {
    title: "Record Your Routine",
    subtitle: "Capture your GRWM and share your favorite looks",
    emoji: "🎬",
  },
  {
    title: "Save & Collect",
    subtitle: "Build your beauty collection and discover new products",
    emoji: "✨",
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
    <div className="flex flex-col min-h-screen bg-background relative">
      <button
        onClick={() => navigate("/home")}
        className="absolute top-14 right-6 z-10 text-muted-foreground text-sm font-medium"
      >
        Skip
      </button>

      <div className="flex-1 flex flex-col items-center justify-center px-10 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-32 h-32 rounded-3xl bg-muted flex items-center justify-center mb-12">
              <span className="text-5xl">{slides[current].emoji}</span>
            </div>
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
              {slides[current].title}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-[280px]">
              {slides[current].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center pb-14 gap-8 px-10">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <motion.div
              key={i}
              className={`h-1 rounded-full ${i === current ? "w-8 bg-foreground" : "w-2 bg-border"}`}
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
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
