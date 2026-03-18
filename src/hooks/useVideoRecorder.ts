import { useRef, useState, useCallback } from "react";

export const useVideoRecorder = () => {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
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

      // Prefer mp4 for iOS compatibility, fall back to webm
      let mimeType = "video/webm";
      if (MediaRecorder.isTypeSupported("video/mp4")) {
        mimeType = "video/mp4";
      } else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
        mimeType = "video/webm;codecs=vp9";
      }

      const recorder = new MediaRecorder(canvasStream, { mimeType });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const isMP4 = mimeType.includes("mp4");
        const blob = new Blob(chunksRef.current, {
          type: isMP4 ? "video/mp4" : "video/webm",
        });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setRecording(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };

      recorder.start(100);
      recorderRef.current = recorder;
      setRecording(true);

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
