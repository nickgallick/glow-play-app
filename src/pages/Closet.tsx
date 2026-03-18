import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Video } from "lucide-react";
import { useState } from "react";

const Closet = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"photos" | "videos">("photos");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex items-center gap-4 px-6 pt-14 pb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/home")}
          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" strokeWidth={1.8} />
        </motion.button>
        <h1 className="text-xl font-display font-semibold text-foreground">Closet</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mx-6 mb-6 p-1 bg-muted rounded-xl">
        <button
          onClick={() => setTab("photos")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            tab === "photos" ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
          }`}
        >
          <Camera className="w-4 h-4" strokeWidth={1.8} />
          Photos
        </button>
        <button
          onClick={() => setTab("videos")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            tab === "videos" ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
          }`}
        >
          <Video className="w-4 h-4" strokeWidth={1.8} />
          Videos
        </button>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
            <Camera className="w-8 h-8 text-muted-foreground/40" strokeWidth={1.5} />
          </div>
          <p className="text-lg font-display font-semibold text-foreground mb-2">
            Nothing here yet
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Your saved looks will appear here
          </p>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/camera")}
            className="bg-foreground text-background px-8 py-3 rounded-2xl text-sm font-medium"
          >
            Create a look
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Closet;
