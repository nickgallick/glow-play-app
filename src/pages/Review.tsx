import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { RotateCcw, Heart, Share2 } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoUrl = (location.state as { videoUrl?: string })?.videoUrl;
  const [saved, setSaved] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const handleSave = useCallback(async () => {
    if (!videoUrl) return;

    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      // Try mp4 first for iOS Camera Roll compatibility
      const isMP4 = blob.type.includes("mp4");
      const ext = isMP4 ? "mp4" : "webm";
      const file = new File([blob], `glowup-${Date.now()}.${ext}`, { type: blob.type });

      // Use Web Share API → iOS share sheet → "Save Video" option
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "GlowUp Video",
        });
        setSaved(true);
        toast("✅ Video shared!");
        return;
      }
    } catch {
      // User cancelled share sheet - that's ok
    }

    // Fallback: direct download
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = `glowup-${Date.now()}.mp4`;
    a.click();
    setSaved(true);
    toast("✅ Video saved!");
  }, [videoUrl]);

  return (
    <div className="flex flex-col min-h-screen bg-foreground">
      <div className="flex-1 relative flex items-center justify-center px-6">
        {videoUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-[320px] aspect-[3/4] rounded-3xl overflow-hidden bg-black"
          >
            <video
              ref={videoPlayerRef}
              src={videoUrl}
              className="w-full h-full object-cover"
              controls
              autoPlay
              loop
              playsInline
            />
          </motion.div>
        ) : (
          <div className="text-center text-primary-foreground/40">
            <p className="text-sm">No video recorded</p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/camera")}
              className="mt-4 bg-primary text-primary-foreground px-6 py-3 rounded-2xl text-sm font-medium"
            >
              Record a video
            </motion.button>
          </div>
        )}
      </div>

      {videoUrl && (
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
            onClick={handleSave}
            className="bg-primary text-primary-foreground px-10 py-4 rounded-2xl flex items-center gap-2 font-medium"
          >
            {saved ? (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                ✓ Saved
              </motion.span>
            ) : (
              <>
                <Share2 className="w-5 h-5" strokeWidth={1.8} />
                Save to Camera Roll
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
      )}
    </div>
  );
};

export default Review;
