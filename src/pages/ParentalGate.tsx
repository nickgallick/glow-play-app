import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { SquishButton } from "@/components/SparkleEffect";

const generateProblem = () => {
  const a = Math.floor(Math.random() * 12) + 2;
  const b = Math.floor(Math.random() * 12) + 2;
  return { a, b, answer: a * b };
};

const ParentalGate = () => {
  const [problem] = useState(generateProblem);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const destination = (location.state as { destination?: string })?.destination || "/parents";

  const handleDigit = useCallback((digit: string) => {
    const newInput = input + digit;
    setInput(newInput);
    setError(false);

    if (newInput.length >= String(problem.answer).length) {
      if (parseInt(newInput) === problem.answer) {
        navigate(destination);
      } else {
        setError(true);
        setTimeout(() => {
          setInput("");
          setError(false);
        }, 800);
      }
    }
  }, [input, problem.answer, navigate, destination]);

  const handleDelete = () => {
    setInput(input.slice(0, -1));
    setError(false);
  };

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

  return (
    <div className="flex flex-col min-h-screen bg-muted font-parent">
      <div className="flex flex-col items-center pt-20 px-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mb-6"
        >
          <Lock className="w-8 h-8 text-secondary" strokeWidth={3} />
        </motion.div>

        <h1 className="text-2xl font-semibold text-foreground mb-2">Hi Grown-Up! 👋</h1>
        <p className="text-muted-foreground mb-10">Please solve this to continue</p>

        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className={`text-4xl font-bold mb-8 px-8 py-4 rounded-3xl ${
            error ? "bg-destructive/10 text-destructive" : "bg-card"
          } shadow-soft`}
        >
          {problem.a} × {problem.b} = {input || "?"}
        </motion.div>
      </div>

      <div className="flex-1 flex items-end pb-12 px-8">
        <div className="grid grid-cols-3 gap-4 w-full max-w-xs mx-auto">
          {digits.map((d, i) => (
            <div key={i}>
              {d === "" ? (
                <div />
              ) : d === "⌫" ? (
                <SquishButton
                  size="lg"
                  onClick={handleDelete}
                  className="w-full bg-muted text-foreground text-2xl font-parent"
                >
                  ⌫
                </SquishButton>
              ) : (
                <SquishButton
                  size="lg"
                  onClick={() => handleDigit(d)}
                  className="w-full bg-card text-foreground text-2xl font-semibold font-parent"
                >
                  {d}
                </SquishButton>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentalGate;
