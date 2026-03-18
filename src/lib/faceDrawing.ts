import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { BeautyItem } from "@/data/makeupItems";

const LIPS_OUTER = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 409, 270, 269, 267, 0, 37, 39, 40, 185];
const LIPS_INNER = [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 415, 310, 311, 312, 13, 82, 81, 80, 191];

const LEFT_EYE_UPPER = [246, 161, 160, 159, 158, 157, 173];
const RIGHT_EYE_UPPER = [466, 388, 387, 386, 385, 384, 398];

const LEFT_EYE_SHADOW = [226, 247, 30, 29, 27, 28, 56, 190, 243, 173, 157, 158, 159, 160, 161, 246];
const RIGHT_EYE_SHADOW = [446, 467, 260, 259, 257, 258, 286, 414, 463, 398, 384, 385, 386, 387, 388, 466];

const LEFT_EYEBROW = [70, 63, 105, 66, 107, 55, 65, 52, 53, 46];
const RIGHT_EYEBROW = [300, 293, 334, 296, 336, 285, 295, 282, 283, 276];

const LEFT_CHEEK_CENTER = 50;
const RIGHT_CHEEK_CENTER = 280;

const FACE_OVAL = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109];

type Point = { x: number; y: number };

export type DrawProductOptions = {
  skincarePoints?: Array<{ x: number; y: number; size?: number }>;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

function adjustHexBrightness(hex: string, factor: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * factor, g * factor, b * factor);
}

function hexToRgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

function pointsFromIndices(landmarks: NormalizedLandmark[], indices: number[], w: number, h: number): Point[] {
  return indices.map((idx) => ({ x: landmarks[idx].x * w, y: landmarks[idx].y * h }));
}

function createSmoothPath(ctx: CanvasRenderingContext2D, points: Point[]) {
  if (points.length < 3) return;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;
    ctx.quadraticCurveTo(current.x, current.y, midX, midY);
  }

  ctx.closePath();
}

function fillSmoothPolygon(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  color: string,
  alpha: number,
  blur: number = 0
) {
  if (points.length < 3) return;

  ctx.save();
  if (blur > 0) ctx.filter = `blur(${blur}px)`;
  createSmoothPath(ctx, points);
  ctx.fillStyle = hexToRgba(color, alpha);
  ctx.fill();
  ctx.restore();
}

function cutoutSmoothPolygon(ctx: CanvasRenderingContext2D, points: Point[]) {
  if (points.length < 3) return;

  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  createSmoothPath(ctx, points);
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fill();
  ctx.restore();
}

function drawGradientSpot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  alpha: number,
  blur: number = 0
) {
  ctx.save();
  if (blur > 0) ctx.filter = `blur(${blur}px)`;

  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, hexToRgba(color, alpha * 0.95));
  gradient.addColorStop(0.5, hexToRgba(color, alpha * 0.45));
  gradient.addColorStop(1, hexToRgba(color, 0));

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.restore();
}

function drawLandmarkSpot(
  ctx: CanvasRenderingContext2D,
  landmarks: NormalizedLandmark[],
  centerIdx: number,
  color: string,
  alpha: number,
  w: number,
  h: number,
  radiusScale: number
) {
  const center = landmarks[centerIdx];
  drawGradientSpot(ctx, center.x * w, center.y * h, w * radiusScale, color, alpha, w * radiusScale * 0.25);
}

function drawEyeliner(
  ctx: CanvasRenderingContext2D,
  landmarks: NormalizedLandmark[],
  upperIndices: number[],
  color: string,
  alpha: number,
  w: number,
  h: number
) {
  const points = pointsFromIndices(landmarks, upperIndices, w, h);
  if (points.length < 2) return;

  ctx.save();
  ctx.filter = "blur(0.4px)";
  ctx.lineWidth = 2.2;
  ctx.strokeStyle = hexToRgba(color, alpha * 1.15);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const current = points[i];
    const midX = (prev.x + current.x) / 2;
    const midY = (prev.y + current.y) / 2;
    ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
  }

  ctx.stroke();
  ctx.restore();
}

export function drawProductOnFace(
  ctx: CanvasRenderingContext2D,
  landmarks: NormalizedLandmark[],
  item: BeautyItem,
  intensity: number,
  canvasWidth: number,
  canvasHeight: number,
  options?: DrawProductOptions
) {
  const w = canvasWidth;
  const h = canvasHeight;

  const alpha = 0.22 + (intensity / 100) * 0.5;
  const brightnessFactor = 0.65 + (intensity / 100) * 0.7;
  const productColor = adjustHexBrightness(item.color, brightnessFactor);

  ctx.save();

  switch (item.category) {
    case "lips": {
      ctx.globalCompositeOperation = "source-over";

      const outerPoints = pointsFromIndices(landmarks, LIPS_OUTER, w, h);
      const innerPoints = pointsFromIndices(landmarks, LIPS_INNER, w, h);

      fillSmoothPolygon(ctx, outerPoints, productColor, alpha, 1.4);

      // Critical fix: cut inner mouth out so open mouth does not get filled with lipstick
      cutoutSmoothPolygon(ctx, innerPoints);

      ctx.save();
      createSmoothPath(ctx, outerPoints);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = hexToRgba(productColor, alpha * 0.55);
      ctx.stroke();
      ctx.restore();

      const lowerCenter = landmarks[17];
      drawGradientSpot(
        ctx,
        lowerCenter.x * w,
        lowerCenter.y * h,
        w * 0.015,
        "#FFFFFF",
        alpha * 0.25
      );
      break;
    }

    case "eyes": {
      ctx.globalCompositeOperation = "source-over";
      fillSmoothPolygon(ctx, pointsFromIndices(landmarks, LEFT_EYE_SHADOW, w, h), productColor, alpha * 0.72, 3.4);
      fillSmoothPolygon(ctx, pointsFromIndices(landmarks, RIGHT_EYE_SHADOW, w, h), productColor, alpha * 0.72, 3.4);
      drawEyeliner(ctx, landmarks, LEFT_EYE_UPPER, productColor, alpha * 0.9, w, h);
      drawEyeliner(ctx, landmarks, RIGHT_EYE_UPPER, productColor, alpha * 0.9, w, h);
      break;
    }

    case "face": {
      ctx.globalCompositeOperation = "source-over";
      fillSmoothPolygon(ctx, pointsFromIndices(landmarks, FACE_OVAL, w, h), productColor, alpha * 0.2, 6);
      break;
    }

    case "blush": {
      ctx.globalCompositeOperation = "source-over";
      drawLandmarkSpot(ctx, landmarks, LEFT_CHEEK_CENTER, productColor, alpha * 0.95, w, h, 0.055);
      drawLandmarkSpot(ctx, landmarks, RIGHT_CHEEK_CENTER, productColor, alpha * 0.95, w, h, 0.055);
      break;
    }

    case "brows": {
      ctx.globalCompositeOperation = "source-over";
      fillSmoothPolygon(ctx, pointsFromIndices(landmarks, LEFT_EYEBROW, w, h), productColor, alpha * 0.8, 1);
      fillSmoothPolygon(ctx, pointsFromIndices(landmarks, RIGHT_EYEBROW, w, h), productColor, alpha * 0.8, 1);
      break;
    }

    case "skincare": {
      ctx.globalCompositeOperation = "screen";
      const points = options?.skincarePoints ?? [];

      for (const point of points) {
        const radius = w * (point.size ?? 0.03);
        drawGradientSpot(ctx, point.x * w, point.y * h, radius, productColor, alpha * 0.65, radius * 0.25);
        drawGradientSpot(ctx, point.x * w, point.y * h, radius * 0.45, "#FFFFFF", alpha * 0.2);
      }
      break;
    }

    case "accessories": {
      ctx.globalCompositeOperation = "source-over";
      const topHead = landmarks[10];
      ctx.font = `${w * 0.12}px serif`;
      ctx.textAlign = "center";
      ctx.globalAlpha = clamp(intensity / 100, 0, 1);
      ctx.fillText(item.image, topHead.x * w, topHead.y * h - w * 0.02);
      break;
    }

    case "looks": {
      ctx.globalCompositeOperation = "source-over";

      const lipOuter = pointsFromIndices(landmarks, LIPS_OUTER, w, h);
      const lipInner = pointsFromIndices(landmarks, LIPS_INNER, w, h);
      fillSmoothPolygon(ctx, lipOuter, productColor, alpha * 0.88, 1.2);
      cutoutSmoothPolygon(ctx, lipInner);

      fillSmoothPolygon(ctx, pointsFromIndices(landmarks, LEFT_EYE_SHADOW, w, h), productColor, alpha * 0.45, 3.2);
      fillSmoothPolygon(ctx, pointsFromIndices(landmarks, RIGHT_EYE_SHADOW, w, h), productColor, alpha * 0.45, 3.2);
      drawLandmarkSpot(ctx, landmarks, LEFT_CHEEK_CENTER, productColor, alpha * 0.6, w, h, 0.045);
      drawLandmarkSpot(ctx, landmarks, RIGHT_CHEEK_CENTER, productColor, alpha * 0.6, w, h, 0.045);
      break;
    }
  }

  ctx.restore();
}
