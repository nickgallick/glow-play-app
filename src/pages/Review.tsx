import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Save, RotateCcw, Star, Heart } from "lucide-react";
import { SquishButton } from "@/components/SparkleEffect";
import { useState } from "react";

const frames = [
  { id: "none", label: "✨" },
  { id: "polaroid", label: "🖼️" },
  { id: "sparkle", label: "💫" },
  { id: "hearts", label: "💖" },
];

const Review = () => {
  const navigate = useNavigate();
  const [selectedFrame, setSelectedFrame] = useState("none");
  const [saved, setSaved] = useState(false);
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-foreground">
      {/* Photo/Video area */}
      <div className="flex-1 relative flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`w-80 aspect-[3/4] rounded-3xl overflow-hidden relative gradient-pink-lavender flex items-center justify-center ${
            selectedFrame === "polaroid" ? "p-4 bg-card" :
            selectedFrame === "sparkle" ? "ring-4 ring-warning" :
            selectedFrame === "hearts" ? "ring-4 ring-primary" : ""
          }`}
        >
          <div className="text-6xl">📸✨</div>
          {selectedFrame === "polaroid" && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-card" />
          )}
        </motion.div>
      </div>

      {/* Frame options */}
      <div className="flex justify-center gap-4 py-4">
        {frames.map((frame) => (
          <SquishButton
            key={frame.id}
            size="md"
            onClick={() => setSelectedFrame(frame.id)}
            className={`${selectedFrame === frame.id ? "bg-primary ring-2 ring-primary" : "bg-card/20"}`}
          >
            <span className="text-2xl">{frame.label}</span>
          </SquishButton>
        ))}
      </div>

      {/* Bottom buttons */}
      <div className="flex justify-center gap-6 px-8 pb-12">
        <SquishButton
          size="lg"
          onClick={() => navigate("/camera")}
          className="bg-card/20 flex-col gap-1"
        >
          <RotateCcw className="w-7 h-7 text-primary-foreground" strokeWidth={3} />
        </SquishButton>

        <SquishButton
          size="xl"
          onClick={() => setSaved(true)}
          className="bg-primary px-10 gap-3"
        >
          {saved ? (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-2xl">✅</motion.span>
          ) : (
            <Save className="w-8 h-8 text-primary-foreground" strokeWidth={3} />
          )}
        </SquishButton>

        <SquishButton
          size="lg"
          onClick={() => setFavorited(!favorited)}
          className="bg-card/20 flex-col gap-1"
        >
          {favorited ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1.2 }} transition={{ type: "spring" }}>
              <Heart className="w-7 h-7 text-primary fill-primary" strokeWidth={3} />
            </motion.div>
          ) : (
            <Star className="w-7 h-7 text-primary-foreground" strokeWidth={3} />
          )}
        </SquishButton>
      </div>
    </div>
  );
};

export default Review;
