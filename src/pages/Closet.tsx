import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X, Camera, Video } from "lucide-react";
import { SquishButton } from "@/components/SparkleEffect";
import { useState } from "react";
import emptyCloset from "@/assets/empty-closet.png";

const Closet = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"photos" | "videos">("photos");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <SquishButton size="md" onClick={() => navigate("/home")} className="bg-muted">
          <X className="w-7 h-7 text-foreground" strokeWidth={3} />
        </SquishButton>
        <h1 className="text-2xl font-bold font-kid">👑 Closet</h1>
        <div className="w-16" />
      </div>

      {/* Tabs */}
      <div className="flex gap-3 px-6 mb-6">
        <SquishButton
          size="md"
          onClick={() => setTab("photos")}
          className={`flex-1 gap-2 px-4 ${tab === "photos" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
        >
          <Camera className="w-5 h-5" strokeWidth={3} />
          <span className="font-bold font-kid">📸</span>
        </SquishButton>
        <SquishButton
          size="md"
          onClick={() => setTab("videos")}
          className={`flex-1 gap-2 px-4 ${tab === "videos" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
        >
          <Video className="w-5 h-5" strokeWidth={3} />
          <span className="font-bold font-kid">🎬</span>
        </SquishButton>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <motion.img
          src={emptyCloset}
          alt="Empty closet"
          className="w-48 h-48 mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
        <p className="text-xl font-bold text-foreground font-kid text-center mb-2">
          Your closet is empty!
        </p>
        <p className="text-muted-foreground font-kid text-center">
          Start creating looks! ✨
        </p>
        <SquishButton
          size="lg"
          onClick={() => navigate("/camera")}
          className="bg-primary text-primary-foreground px-8 py-4 mt-8 font-bold font-kid"
        >
          📸 Create a Look!
        </SquishButton>
      </div>
    </div>
  );
};

export default Closet;
