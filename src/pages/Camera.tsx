import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Undo2, Trash2 } from "lucide-react";
import { categories, beautyItems } from "@/data/makeupItems";
import { useCamera } from "@/hooks/useCamera";

const Camera = () => {
  const navigate = useNavigate();
  const { videoRef, hasPermission, flipCamera } = useCamera();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [appliedItems, setAppliedItems] = useState<string[]>([]);
  const [trayOpen, setTrayOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [intensity, setIntensity] = useState(70);

  const filteredItems = beautyItems.filter((item) => item.category === selectedCategory);

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
      {/* Live camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scaleX(-1)" }}
      />

      {/* Fallback if no camera */}
      {hasPermission === false && (
        <div className="absolute inset-0 bg-foreground/90 flex items-center justify-center">
          <div className="text-center text-primary-foreground/60 px-8">
            <p className="text-lg font-medium mb-2">Camera access needed</p>
            <p className="text-sm opacity-60">Allow camera access to try on products</p>
          </div>
        </div>
      )}

      {/* Applied items overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <AnimatePresence>
          {appliedItems.map((id) => {
            const item = beautyItems.find((m) => m.id === id);
            if (!item) return null;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: intensity / 100, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="absolute"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${20 + Math.random() * 30}%`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full shadow-lg"
                  style={{ backgroundColor: item.color + "80" }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Top controls */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-14">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/home")}
          className="glass-dark w-10 h-10 rounded-full flex items-center justify-center"
        >
          <X className="w-5 h-5 text-primary-foreground" strokeWidth={2} />
        </motion.button>

        {isRecording && (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="flex items-center gap-2 glass-dark px-4 py-2 rounded-full"
          >
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <span className="text-primary-foreground text-xs font-medium">REC</span>
          </motion.div>
        )}

        <div className="flex gap-2">
          <motion.button whileTap={{ scale: 0.95 }} onClick={flipCamera} className="glass-dark w-10 h-10 rounded-full flex items-center justify-center">
            <RotateCcw className="w-4 h-4 text-primary-foreground" strokeWidth={2} />
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setAppliedItems(prev => prev.slice(0, -1))} className="glass-dark w-10 h-10 rounded-full flex items-center justify-center">
            <Undo2 className="w-4 h-4 text-primary-foreground" strokeWidth={2} />
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setAppliedItems([])} className="glass-dark w-10 h-10 rounded-full flex items-center justify-center">
            <Trash2 className="w-4 h-4 text-primary-foreground" strokeWidth={2} />
          </motion.button>
        </div>
      </div>

      {/* Intensity slider */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <div className="relative w-8 h-40 bg-primary-foreground/10 backdrop-blur-md rounded-full overflow-hidden">
          <div
            className="absolute bottom-0 w-full bg-primary/50 rounded-full transition-all"
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
        </div>
        <p className="text-primary-foreground/50 text-[10px] text-center mt-1">{intensity}%</p>
      </div>

      {/* Bottom area */}
      <div className="relative z-10 mt-auto">
        {/* Record button */}
        <div className="flex justify-center mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!isRecording) navigate("/review");
            }}
            className="relative"
          >
            <div className="w-[72px] h-[72px] rounded-full border-[3px] border-primary-foreground/60 flex items-center justify-center">
              <motion.div
                className="w-[56px] h-[56px] rounded-full bg-primary"
                animate={isRecording ? { scale: [1, 0.85, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </div>
          </motion.button>
        </div>

        {/* Category toolbar */}
        <div className="glass rounded-t-3xl px-2 pt-3 pb-2">
          <div className="flex overflow-x-auto gap-1 px-1 pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectCategory(cat.id)}
                className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-foreground text-primary-foreground"
                    : "text-foreground"
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="text-[10px] font-medium">{cat.label}</span>
              </motion.button>
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
              className="bg-card rounded-t-3xl px-4 pt-2 pb-8 max-h-[40vh] overflow-y-auto"
            >
              <div className="flex justify-center mb-3">
                <button
                  onClick={() => setTrayOpen(false)}
                  className="w-10 h-1 bg-border rounded-full"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {filteredItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleItem(item.id)}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <div
                      className={`w-full aspect-square rounded-2xl flex items-center justify-center relative transition-all ${
                        appliedItems.includes(item.id) ? "ring-2 ring-primary ring-offset-2" : ""
                      }`}
                      style={{ backgroundColor: item.color + "20" }}
                    >
                      <span className="text-2xl">{item.image}</span>
                      {item.premium && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                          <span className="text-[10px] text-accent-foreground">✦</span>
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] font-medium text-foreground leading-tight">{item.name}</p>
                      <p className="text-[9px] text-muted-foreground">{item.brand}</p>
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
