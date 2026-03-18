import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { RotateCcw, Heart, Share2 } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

const isIOSDevice = () => {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
};

const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as { videoUrl?: string; videoMimeType?: string } | null) ?? null;
  const videoUrl = state?.videoUrl;
  const videoMimeType = state?.videoMimeType;

  const [saved, setSaved] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const handleSave = useCallback(async () => {
    if (!videoUrl) return;

    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();

      const preferredType = (videoMimeType || blob.type || "video/mp4").includes("mp4")
        ? "video/mp4"
        : blob.type || "video/webm";

      const ext = preferredType.includes("mp4") ? "mp4" : "webm";
      const normalizedBlob = blob.type === preferredType ? blob : new Blob([blob], { type: preferredType });
      const file = new File([normalizedBlob], `glowup-${Date.now()}.${ext}`, { type: preferredType });

      const canShareFiles =
        typeof navigator.canShare === "function"
          ? navigator.canShare({ files: [file] })
          : true;

      if (typeof navigator.share === "function" && canShareFiles) {
        await navigator.share({
          files: [file],
          title: "GlowUp Video",
        });

        setSaved(true);
        toast(isIOSDevice() ? "Share sheet opened — tap ‘Save Video’." : "Video shared.");
        return;
      }

      if (typeof navigator.share === "function") {
        await navigator.share({ title: "GlowUp Video" });
        setSaved(true);
        toast("Share sheet opened.");
        return;
      }
    } catch {
      // User cancelled or share not available
    }

    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = `glowup-${Date.now()}.mp4`;
    a.click();
    setSaved(true);
    toast(isIOSDevice() ? "If needed, open file and tap Share → Save Video." : "Video downloaded.");
  }, [videoUrl, videoMimeType]);

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
