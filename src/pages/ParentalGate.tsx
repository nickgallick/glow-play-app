import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

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
        setTimeout(() => { setInput(""); setError(false); }, 800);
      }
    }
  }, [input, problem.answer, navigate, destination]);

  const handleDelete = () => { setInput(input.slice(0, -1)); setError(false); };

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex flex-col items-center pt-24 px-8">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6">
          <Lock className="w-6 h-6 text-muted-foreground" strokeWidth={1.8} />
        </div>

        <h1 className="text-xl font-display font-semibold text-foreground mb-1">Parental Check</h1>
        <p className="text-sm text-muted-foreground mb-10">Solve to continue</p>

        <motion.div
          animate={error ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          className={`text-3xl font-semibold mb-8 px-8 py-4 rounded-2xl ${
            error ? "bg-destructive/10 text-destructive" : "bg-muted"
          }`}
        >
          {problem.a} × {problem.b} = {input || "?"}
        </motion.div>
      </div>

      <div className="flex-1 flex items-end pb-12 px-8">
        <div className="grid grid-cols-3 gap-3 w-full max-w-[280px] mx-auto">
          {digits.map((d, i) => (
            <div key={i}>
              {d === "" ? <div /> : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => d === "⌫" ? handleDelete() : handleDigit(d)}
                  className={`w-full aspect-square rounded-xl flex items-center justify-center text-xl font-medium ${
                    d === "⌫" ? "bg-muted text-muted-foreground" : "bg-card text-foreground shadow-soft"
                  }`}
                >
                  {d}
                </motion.button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentalGate;
