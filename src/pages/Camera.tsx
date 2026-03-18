import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Undo2, Trash2, Loader2, Check, Camera as CameraIcon } from "lucide-react";
import { categories, beautyItems } from "@/data/makeupItems";
import { useCamera } from "@/hooks/useCamera";
import { useFaceLandmarks } from "@/hooks/useFaceLandmarks";
import { useVideoRecorder } from "@/hooks/useVideoRecorder";
import { drawProductOnFace } from "@/lib/faceDrawing";
import { toast } from "sonner";

const Camera = () => {
  const navigate = useNavigate();
  const { videoRef, hasPermission, flipCamera, stream } = useCamera();
  const { detect, ready: faceReady, loading: faceLoading } = useFaceLandmarks();
  const { startRecording, stopRecording, recording, videoUrl, elapsed } = useVideoRecorder();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [appliedItems, setAppliedItems] = useState<string[]>([]);
  const [trayOpen, setTrayOpen] = useState(false);
  const [intensity, setIntensity] = useState(70);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

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

  const handleConfirmSelection = () => {
    setTrayOpen(false);
  };

  // Photo capture during recording
  const capturePhoto = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `glowup-photo-${Date.now()}.png`, { type: "image/png" });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        navigator.share({ files: [file], title: "GlowUp Photo" });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
      }
      toast("📸 Photo captured!");
    }, "image/png");
  }, []);

  // Slider drag handling
  const handleSliderInteraction = useCallback((clientY: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const percentage = Math.round(Math.max(10, Math.min(100, 100 - (relativeY / rect.height) * 100)));
    setIntensity(percentage);
  }, []);

  const handleSliderPointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleSliderInteraction(e.clientY);
  }, [handleSliderInteraction]);

  const handleSliderPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    handleSliderInteraction(e.clientY);
  }, [isDragging, handleSliderInteraction]);

  const handleSliderPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Main render loop
  const renderLoop = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) {
      animFrameRef.current = requestAnimationFrame(renderLoop);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
    }

    const w = canvas.width;
    const h = canvas.height;

    ctx.save();
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, w, h);
    ctx.restore();

    if (faceReady && appliedItems.length > 0) {
      const timestamp = performance.now();
      const results = detect(video, timestamp);

      if (results && results.faceLandmarks && results.faceLandmarks.length > 0) {
        const landmarks = results.faceLandmarks[0];
        const mirroredLandmarks = landmarks.map((lm) => ({
          ...lm,
          x: 1 - lm.x,
        }));

        for (const itemId of appliedItems) {
          const item = beautyItems.find((b) => b.id === itemId);
          if (item) {
            drawProductOnFace(ctx, mirroredLandmarks, item, intensity, w, h);
          }
        }
      }
    }

    animFrameRef.current = requestAnimationFrame(renderLoop);
  }, [faceReady, appliedItems, intensity, detect, videoRef]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [renderLoop]);

  useEffect(() => {
    if (videoUrl) {
      navigate("/review", { state: { videoUrl } });
    }
  }, [videoUrl, navigate]);

  const handleRecord = () => {
    if (recording) {
      stopRecording();
    } else {
      const canvas = canvasRef.current;
      if (canvas) {
        const audioStream = stream && stream.getAudioTracks().length > 0 ? stream : undefined;
        startRecording(canvas, audioStream || undefined);
      }
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col min-h-screen bg-foreground relative overflow-hidden">
      <video ref={videoRef} autoPlay playsInline muted className="hidden" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {hasPermission === false && (
        <div className="absolute inset-0 bg-foreground flex items-center justify-center z-20">
          <div className="text-center text-primary-foreground/60 px-8">
            <p className="text-lg font-medium mb-2">Camera access needed</p>
            <p className="text-sm opacity-60">Allow camera to try on products</p>
          </div>
        </div>
      )}

      {faceLoading && hasPermission !== false && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 glass-dark px-4 py-3 rounded-2xl flex items-center gap-2">
          <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
          <span className="text-primary-foreground text-sm">Loading AR...</span>
        </div>
      )}

      {/* Top controls */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-14">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/home")}
          className="glass-dark w-10 h-10 rounded-full flex items-center justify-center"
        >
          <X className="w-5 h-5 text-primary-foreground" strokeWidth={2} />
        </motion.button>

        {recording && (
          <div className="flex items-center gap-2 glass-dark px-4 py-2 rounded-full">
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-2 h-2 rounded-full bg-destructive"
            />
            <span className="text-primary-foreground text-xs font-medium font-body">
              {formatTime(elapsed)}
            </span>
          </div>
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

      {/* Applied items indicator */}
      {appliedItems.length > 0 && !recording && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10 glass-dark px-3 py-1.5 rounded-full">
          <span className="text-primary-foreground text-xs">
            {appliedItems.length} product{appliedItems.length > 1 ? "s" : ""} applied
          </span>
        </div>
      )}

      {/* Dynamic intensity slider */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <div
          ref={sliderRef}
          className="relative w-10 h-44 glass-dark rounded-full overflow-hidden cursor-pointer touch-none select-none"
          onPointerDown={handleSliderPointerDown}
          onPointerMove={handleSliderPointerMove}
          onPointerUp={handleSliderPointerUp}
          onPointerCancel={handleSliderPointerUp}
        >
          {/* Fill */}
          <motion.div
            className="absolute bottom-0 w-full bg-primary/60 rounded-full"
            animate={{ height: `${intensity}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          {/* Thumb indicator */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-8 h-1.5 bg-primary-foreground rounded-full shadow-lg"
            animate={{ bottom: `calc(${intensity}% - 3px)` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          {/* Percentage label */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            animate={{ bottom: `calc(${intensity}% + 8px)` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <span className="text-primary-foreground text-[11px] font-bold drop-shadow-md">
              {intensity}%
            </span>
          </motion.div>
        </div>
        <p className="text-primary-foreground/40 text-[9px] text-center mt-1.5 font-medium">
          Intensity
        </p>
      </div>

      {/* Bottom area */}
      <div className="relative z-10 mt-auto">
        {/* Record + photo buttons */}
        <div className="flex justify-center items-center gap-6 mb-4">
          {/* Photo capture button (visible while recording) */}
          {recording && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={capturePhoto}
              className="glass-dark w-12 h-12 rounded-full flex items-center justify-center"
            >
              <CameraIcon className="w-5 h-5 text-primary-foreground" strokeWidth={2} />
            </motion.button>
          )}

          {/* Record button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRecord}
            className="relative"
          >
            <div className={`w-[72px] h-[72px] rounded-full border-[3px] flex items-center justify-center transition-colors ${
              recording ? "border-destructive" : "border-primary-foreground/60"
            }`}>
              {recording ? (
                <motion.div
                  className="w-7 h-7 rounded-md bg-destructive"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              ) : (
                <div className="w-[56px] h-[56px] rounded-full bg-destructive" />
              )}
            </div>
            {!recording && (
              <p className="text-primary-foreground/50 text-[10px] text-center mt-1">
                Tap to record
              </p>
            )}
          </motion.button>

          {/* Spacer for symmetry when recording */}
          {recording && <div className="w-12" />}
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

        {/* Item tray with confirm button */}
        <AnimatePresence>
          {trayOpen && selectedCategory && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-card rounded-t-3xl px-4 pt-2 pb-8 max-h-[40vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setTrayOpen(false)}
                  className="w-10 h-1 bg-border rounded-full"
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirmSelection}
                  className="flex items-center gap-1.5 bg-foreground text-background px-4 py-2 rounded-full text-xs font-medium"
                >
                  <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  Confirm
                </motion.button>
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
                        appliedItems.includes(item.id)
                          ? "ring-2 ring-primary ring-offset-2"
                          : ""
                      }`}
                      style={{ backgroundColor: item.color + "25" }}
                    >
                      <span className="text-2xl">{item.image}</span>
                      {appliedItems.includes(item.id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                        </motion.div>
                      )}
                      {item.premium && !appliedItems.includes(item.id) && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                          <span className="text-[10px] text-accent-foreground">✦</span>
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] font-medium text-foreground leading-tight">
                        {item.name}
                      </p>
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
