import { useRef, useState, useCallback } from "react";

const MIME_CANDIDATES = [
  'video/mp4;codecs="avc1.42E01E,mp4a.40.2"',
  "video/mp4;codecs=h264,aac",
  "video/mp4",
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm",
];

const getSupportedMimeType = () =>
  MIME_CANDIDATES.find((type) => MediaRecorder.isTypeSupported(type)) ?? "";

export const useVideoRecorder = () => {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoMimeType, setVideoMimeType] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRecording = useCallback(
    (canvas: HTMLCanvasElement, audioStream?: MediaStream) => {
      chunksRef.current = [];
      setVideoUrl(null);
      setVideoMimeType(null);
      setElapsed(0);

      const canvasStream = canvas.captureStream(30);

      if (audioStream) {
        audioStream.getAudioTracks().forEach((track) => {
          canvasStream.addTrack(track);
        });
      }

      const preferredMimeType = getSupportedMimeType();
      let recorder: MediaRecorder;

      try {
        recorder = preferredMimeType
          ? new MediaRecorder(canvasStream, { mimeType: preferredMimeType })
          : new MediaRecorder(canvasStream);
      } catch {
        recorder = new MediaRecorder(canvasStream);
      }

      const resolvedMimeType = recorder.mimeType || preferredMimeType || "video/webm";

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const outputMimeType = resolvedMimeType.includes("mp4")
          ? "video/mp4"
          : resolvedMimeType.includes("webm")
            ? "video/webm"
            : resolvedMimeType;

        const blob = new Blob(chunksRef.current, { type: outputMimeType });
        const url = URL.createObjectURL(blob);

        setVideoMimeType(outputMimeType);
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

        if (secs >= 60 && recorder.state === "recording") {
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

  return {
    startRecording,
    stopRecording,
    recording,
    videoUrl,
    videoMimeType,
    elapsed,
    setVideoUrl,
  };
};
