import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Save, RotateCcw, Heart } from "lucide-react";
import { useState } from "react";

const frames = [
  { id: "none", label: "—" },
  { id: "soft", label: "Soft" },
  { id: "warm", label: "Warm" },
  { id: "cool", label: "Cool" },
];

const Review = () => {
  const navigate = useNavigate();
  const [selectedFrame, setSelectedFrame] = useState("none");
  const [saved, setSaved] = useState(false);
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-foreground">
      <div className="flex-1 relative flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`w-full max-w-[320px] aspect-[3/4] rounded-3xl overflow-hidden relative bg-muted ${
            selectedFrame === "soft" ? "brightness-110 saturate-75" :
            selectedFrame === "warm" ? "sepia-[0.2]" :
            selectedFrame === "cool" ? "hue-rotate-15" : ""
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground/40 text-sm">Your look</p>
          </div>
        </motion.div>
      </div>

      {/* Frame filters */}
      <div className="flex justify-center gap-3 py-4 px-6">
        {frames.map((frame) => (
          <button
            key={frame.id}
            onClick={() => setSelectedFrame(frame.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedFrame === frame.id
                ? "bg-primary-foreground text-foreground"
                : "text-primary-foreground/60"
            }`}
          >
            {frame.label}
          </button>
        ))}
      </div>

      {/* Bottom buttons */}
      <div className="flex justify-center items-center gap-6 px-8 pb-12">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/camera")}
          className="w-12 h-12 rounded-full glass-dark flex items-center justify-center"
        >
          <RotateCcw className="w-5 h-5 text-primary-foreground" strokeWidth={1.8} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setSaved(true)}
          className="bg-primary text-primary-foreground px-10 py-4 rounded-2xl flex items-center gap-2 font-medium"
        >
          {saved ? (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>✓ Saved</motion.span>
          ) : (
            <>
              <Save className="w-5 h-5" strokeWidth={1.8} />
              Save
            </>
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setFavorited(!favorited)}
          className="w-12 h-12 rounded-full glass-dark flex items-center justify-center"
        >
          <Heart
            className={`w-5 h-5 ${favorited ? "text-primary fill-primary" : "text-primary-foreground"}`}
            strokeWidth={1.8}
          />
        </motion.button>
      </div>
    </div>
  );
};

export default Review;
