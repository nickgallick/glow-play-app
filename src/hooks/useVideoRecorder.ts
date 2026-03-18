import { useRef, useState, useCallback } from "react";

export const useVideoRecorder = () => {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const timerRef = useRef<number>(0);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRecording = useCallback(
    (canvas: HTMLCanvasElement, audioStream?: MediaStream) => {
      chunksRef.current = [];
      setVideoUrl(null);
      setElapsed(0);

      const canvasStream = canvas.captureStream(30);

      // Mix audio if available
      if (audioStream) {
        audioStream.getAudioTracks().forEach((track) => {
          canvasStream.addTrack(track);
        });
      }

      const recorder = new MediaRecorder(canvasStream, {
        mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
          ? "video/webm;codecs=vp9"
          : "video/webm",
      });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setRecording(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };

      recorder.start(100);
      recorderRef.current = recorder;
      setRecording(true);

      // Timer
      const startTime = Date.now();
      intervalRef.current = setInterval(() => {
        const secs = Math.floor((Date.now() - startTime) / 1000);
        setElapsed(secs);
        if (secs >= 60) {
          recorder.stop();
        }
      }, 200);
    },
    []
  );

  const stopRecording = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state === "recording") {
      recorderRef.current.stop();
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return { startRecording, stopRecording, recording, videoUrl, elapsed, setVideoUrl };
};
