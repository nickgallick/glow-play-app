import { useRef, useState, useEffect, useCallback } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const useFaceLandmarks = () => {
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        if (cancelled) return;

        const landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numFaces: 1,
          outputFaceBlendshapes: false,
          outputFacialTransformationMatrixes: false,
        });

        if (cancelled) {
          landmarker.close();
          return;
        }

        landmarkerRef.current = landmarker;
        setReady(true);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load face landmarker:", err);
        setLoading(false);
      }
    };

    init();

    return () => {
      cancelled = true;
      landmarkerRef.current?.close();
    };
  }, []);

  const detect = useCallback(
    (video: HTMLVideoElement, timestamp: number) => {
      if (!landmarkerRef.current || !ready) return null;
      try {
        return landmarkerRef.current.detectForVideo(video, timestamp);
      } catch {
        return null;
      }
    },
    [ready]
  );

  return { detect, ready, loading };
};
