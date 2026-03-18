import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SquishButton } from "@/components/SparkleEffect";
import onboarding1 from "@/assets/onboarding-1.png";
import onboarding2 from "@/assets/onboarding-2.png";
import onboarding3 from "@/assets/onboarding-3.png";

const slides = [
  { image: onboarding1, emoji: "💄", text: "Get Ready With Me!" },
  { image: onboarding2, emoji: "🎬", text: "Record Your Look!" },
  { image: onboarding3, emoji: "⭐", text: "Save & Share!" },
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
        className="absolute top-12 right-6 z-10 text-muted-foreground font-kid text-lg"
      >
        Skip
      </button>

      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col items-center"
          >
            <div className="w-72 h-72 rounded-4xl overflow-hidden shadow-soft mb-10">
              <img
                src={slides[current].image}
                alt={slides[current].text}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-5xl mb-4">{slides[current].emoji}</p>
            <h2 className="text-3xl font-bold text-foreground font-kid text-center">
              {slides[current].text}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center pb-16 gap-8">
        <div className="flex gap-3">
          {slides.map((_, i) => (
            <motion.div
              key={i}
              className={`h-3 rounded-full ${i === current ? "w-8 bg-primary" : "w-3 bg-muted"}`}
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          ))}
        </div>

        <SquishButton
          size="lg"
          onClick={next}
          className="bg-primary text-primary-foreground px-12 py-5 text-xl font-bold font-kid"
        >
          {current === slides.length - 1 ? "Let's Go! ✨" : "Next →"}
        </SquishButton>
      </div>
    </div>
  );
};

export default Onboarding;
