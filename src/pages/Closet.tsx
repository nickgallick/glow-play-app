import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Camera, Video, Sparkles } from "lucide-react";
import { useState } from "react";

const Closet = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"photos" | "videos">("photos");

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      <div className="flex items-center gap-4 px-6 pt-14 pb-4">
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
          Closet
        </motion.h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mx-6 mb-6 p-1 bg-muted rounded-xl">
        {[
          { key: "photos", icon: Camera, label: "Photos" },
          { key: "videos", icon: Video, label: "Videos" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as "photos" | "videos")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              tab === t.key ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
            }`}
          >
            <t.icon className="w-4 h-4" strokeWidth={1.8} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col items-center justify-center px-8"
        >
          <motion.div 
            className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            {tab === "photos" ? (
              <Camera className="w-8 h-8 text-muted-foreground/40" strokeWidth={1.5} />
            ) : (
              <Video className="w-8 h-8 text-muted-foreground/40" strokeWidth={1.5} />
            )}
          </motion.div>
          <p className="text-lg font-display font-semibold text-foreground mb-2">
            Nothing here yet
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Your saved {tab} will appear here
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/camera")}
            className="bg-foreground text-background px-8 py-3 rounded-2xl text-sm font-medium flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Create a look
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Closet;
