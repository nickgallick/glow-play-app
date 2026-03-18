import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Sparkles } from "lucide-react";
import { routinePacks } from "@/data/makeupItems";

const Themes = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 pt-14 pb-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/home")}
          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" strokeWidth={1.8} />
        </motion.button>
        <motion.h1 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-display font-semibold text-foreground"
        >
          Routines
        </motion.h1>
      </div>

      {/* Pro banner */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
        onClick={() => navigate("/gate", { state: { destination: "/subscription" } })}
        className="mx-6 mb-6 p-4 bg-foreground rounded-2xl flex items-center gap-3"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Sparkles className="w-5 h-5 text-accent" strokeWidth={1.8} />
        </motion.div>
        <div className="flex-1 text-left">
          <p className="text-primary-foreground text-sm font-medium">Unlock all routines</p>
          <p className="text-primary-foreground/50 text-xs">Access 500+ products & looks</p>
        </div>
        <motion.span 
          className="text-primary-foreground/40 text-xs"
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          →
        </motion.span>
      </motion.button>

      {/* Grid */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {routinePacks.map((pack, i) => (
            <motion.button
              key={pack.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => navigate("/camera")}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] flex flex-col items-center justify-center shadow-soft"
              style={{ backgroundColor: pack.color }}
            >
              <motion.span 
                className="text-4xl mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3, delay: i * 0.3 }}
              >
                {pack.emoji}
              </motion.span>
              <span className="text-sm font-medium text-foreground/80">{pack.name}</span>

              {pack.free ? (
                <div className="absolute top-2.5 right-2.5 bg-card/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  <span className="text-[10px] font-semibold text-foreground">FREE</span>
                </div>
              ) : (
                <div className="absolute top-2.5 right-2.5 bg-card/60 backdrop-blur-sm w-7 h-7 rounded-full flex items-center justify-center">
                  <Lock className="w-3 h-3 text-foreground/60" strokeWidth={2} />
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
