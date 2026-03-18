import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X, Lock, Crown } from "lucide-react";
import { SquishButton } from "@/components/SparkleEffect";
import { themePacks } from "@/data/makeupItems";

const Themes = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <SquishButton size="md" onClick={() => navigate("/home")} className="bg-muted">
          <X className="w-7 h-7 text-foreground" strokeWidth={3} />
        </SquishButton>
        <h1 className="text-2xl font-bold font-kid">🎨 Themes</h1>
        <div className="w-16" />
      </div>

      {/* Premium banner */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mx-6 mb-6 p-4 gradient-splash rounded-3xl flex items-center gap-3"
      >
        <Crown className="w-8 h-8 text-primary-foreground" strokeWidth={3} />
        <div className="flex-1">
          <p className="text-primary-foreground font-bold font-kid">Get All Packs!</p>
          <p className="text-primary-foreground/80 text-sm font-kid">Unlock 500+ items ✨</p>
        </div>
        <SquishButton
          size="sm"
          onClick={() => navigate("/gate", { state: { destination: "/subscription" } })}
          className="bg-primary-foreground/20 px-4 py-2"
        >
          <span className="text-primary-foreground font-bold text-sm font-kid">⭐</span>
        </SquishButton>
      </motion.div>

      {/* Theme grid */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {themePacks.map((pack, i) => (
            <motion.button
              key={pack.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
              whileTap={{ scale: 0.92, rotate: -1 }}
              onClick={() => navigate("/camera")}
              className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-soft"
              style={{ backgroundColor: pack.color + "30" }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl mb-2">{pack.emoji}</span>
                <span className="text-lg font-bold font-kid text-foreground">{pack.name}</span>
              </div>

              {pack.free ? (
                <div className="absolute top-3 right-3 bg-accent px-3 py-1 rounded-full">
                  <span className="text-xs font-bold text-accent-foreground font-kid">FREE</span>
                </div>
              ) : (
                <div className="absolute top-3 right-3 bg-warning/80 w-8 h-8 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-warning-foreground" strokeWidth={3} />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Themes;
