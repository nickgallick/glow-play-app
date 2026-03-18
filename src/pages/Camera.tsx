import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Undo2, Trash2, Camera as CameraIcon } from "lucide-react";
import { SquishButton, SparkleEffect } from "@/components/SparkleEffect";
import { categories, makeupItems } from "@/data/makeupItems";

const Camera = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [appliedItems, setAppliedItems] = useState<string[]>([]);
  const [trayOpen, setTrayOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [intensity, setIntensity] = useState(70);

  const filteredItems = makeupItems.filter((item) => item.category === selectedCategory);

  const toggleItem = (id: string) => {
    setAppliedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectCategory = (id: string) => {
    setSelectedCategory(id);
    setTrayOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-foreground relative overflow-hidden">
      {/* Camera placeholder */}
      <div className="absolute inset-0 gradient-pink-lavender opacity-30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-8xl opacity-40">📸</div>
      </div>

      {/* Applied items overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <AnimatePresence>
          {appliedItems.map((id) => {
            const item = makeupItems.find((m) => m.id === id);
            if (!item) return null;
            return (
              <motion.span
                key={id}
                initial={{ scale: 0 }}
                animate={{ scale: 1.2 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="absolute text-4xl"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${20 + Math.random() * 30}%`,
                  opacity: intensity / 100,
                }}
              >
                {item.icon}
              </motion.span>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Sparkle on apply */}
      {appliedItems.length > 0 && <SparkleEffect count={4} />}

      {/* Top controls */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-12">
        <SquishButton size="md" onClick={() => navigate("/home")} className="bg-card/80 backdrop-blur-sm">
          <X className="w-7 h-7 text-foreground" strokeWidth={3} />
        </SquishButton>

        {isRecording && (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="flex items-center gap-2 bg-destructive/80 px-4 py-2 rounded-full"
          >
            <div className="w-3 h-3 rounded-full bg-primary-foreground" />
            <span className="text-primary-foreground text-sm font-bold font-kid">REC</span>
          </motion.div>
        )}

        <div className="flex gap-3">
          <SquishButton size="md" className="bg-card/80 backdrop-blur-sm">
            <RotateCcw className="w-6 h-6 text-foreground" strokeWidth={3} />
          </SquishButton>
          <SquishButton size="md" onClick={() => setAppliedItems(prev => prev.slice(0, -1))} className="bg-card/80 backdrop-blur-sm">
            <Undo2 className="w-6 h-6 text-foreground" strokeWidth={3} />
          </SquishButton>
          <SquishButton size="md" onClick={() => setAppliedItems([])} className="bg-card/80 backdrop-blur-sm">
            <Trash2 className="w-6 h-6 text-foreground" strokeWidth={3} />
          </SquishButton>
        </div>
      </div>

      {/* Intensity slider (left side) */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-primary-foreground/60 text-xs font-kid">✨</span>
        <div className="relative w-12 h-48 bg-card/40 backdrop-blur-sm rounded-full overflow-hidden">
          <motion.div
            className="absolute bottom-0 w-full bg-primary/60 rounded-full"
            style={{ height: `${intensity}%` }}
          />
          <input
            type="range"
            min={10}
            max={100}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            style={{ writingMode: "vertical-lr", direction: "rtl" }}
          />
          <div
            className="absolute w-14 h-14 -left-1 bg-card rounded-full shadow-soft border-4 border-primary flex items-center justify-center"
            style={{ bottom: `calc(${intensity}% - 28px)` }}
          >
            <span className="text-xs font-bold text-foreground font-kid">{intensity}</span>
          </div>
        </div>
        <span className="text-primary-foreground/60 text-xs font-kid">💫</span>
      </div>

      {/* Bottom area */}
      <div className="relative z-10 mt-auto">
        {/* Record button */}
        <div className="flex justify-center mb-4">
          <SquishButton
            size="xl"
            onClick={() => {
              if (!isRecording) {
                navigate("/review");
              }
            }}
            className="relative"
          >
            <div className="w-20 h-20 rounded-full border-4 border-primary-foreground/80 flex items-center justify-center">
              <motion.div
                className="w-14 h-14 rounded-full bg-primary"
                animate={isRecording ? { scale: [1, 0.8, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </div>
          </SquishButton>
        </div>

        {/* Category toolbar */}
        <div className="bg-card/90 backdrop-blur-md rounded-t-4xl px-2 pt-4 pb-2">
          <div className="flex overflow-x-auto gap-2 px-2 pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <SquishButton
                key={cat.id}
                size="lg"
                onClick={() => selectCategory(cat.id)}
                className={`flex-shrink-0 flex-col gap-1 px-4 ${
                  selectedCategory === cat.id ? "bg-primary/20 ring-2 ring-primary" : "bg-muted"
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
              </SquishButton>
            ))}
          </div>
        </div>

        {/* Item tray */}
        <AnimatePresence>
          {trayOpen && selectedCategory && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-card rounded-t-4xl px-4 pt-2 pb-8 max-h-[40vh] overflow-y-auto"
            >
              {/* Handle */}
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setTrayOpen(false)}
                  className="w-12 h-1.5 bg-muted rounded-full"
                />
              </div>

              <div className="grid grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.92, rotate: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    onClick={() => toggleItem(item.id)}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={`w-full aspect-square rounded-full flex items-center justify-center shadow-soft relative ${
                        appliedItems.includes(item.id) ? "ring-4 ring-primary" : ""
                      }`}
                      style={{ backgroundColor: item.color + "30" }}
                    >
                      <span className="text-3xl">{item.icon}</span>
                      {item.premium && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-warning rounded-full flex items-center justify-center">
                          <span className="text-xs">⭐</span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Camera;
