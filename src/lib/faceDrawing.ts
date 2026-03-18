import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { BeautyItem } from "@/data/makeupItems";

// MediaPipe Face Mesh landmark indices
const LIPS_OUTER = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 409, 270, 269, 267, 0, 37, 39, 40, 185];
const LIPS_INNER = [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 415, 310, 311, 312, 13, 82, 81, 80, 191];

const LEFT_EYE_UPPER = [246, 161, 160, 159, 158, 157, 173];
const LEFT_EYE_LOWER = [33, 7, 163, 144, 145, 153, 154, 155, 133];
const RIGHT_EYE_UPPER = [466, 388, 387, 386, 385, 384, 398];
const RIGHT_EYE_LOWER = [263, 249, 390, 373, 374, 380, 381, 382, 362];

const LEFT_EYE_SHADOW = [226, 247, 30, 29, 27, 28, 56, 190, 243, 173, 157, 158, 159, 160, 161, 246];
const RIGHT_EYE_SHADOW = [446, 467, 260, 259, 257, 258, 286, 414, 463, 398, 384, 385, 386, 387, 388, 466];

const LEFT_EYEBROW = [70, 63, 105, 66, 107, 55, 65, 52, 53, 46];
const RIGHT_EYEBROW = [300, 293, 334, 296, 336, 285, 295, 282, 283, 276];

const LEFT_CHEEK_CENTER = 50;
const RIGHT_CHEEK_CENTER = 280;

const FACE_OVAL = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109];

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function hexToRgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawSmoothPolygon(
  ctx: CanvasRenderingContext2D,
  landmarks: NormalizedLandmark[],
  indices: number[],
  color: string,
  alpha: number,
  w: number,
  h: number,
  blur: number = 0
) {
  if (indices.length < 3) return;
  ctx.save();
  if (blur > 0) ctx.filter = `blur(${blur}px)`;
  ctx.beginPath();
  
  // Use quadratic curves for smoother edges
  const points = indices.map(i => ({ x: landmarks[i].x * w, y: landmarks[i].y * h }));
  ctx.moveTo(points[0].x, points[0].y);
  
  for (let i = 0; i < points.length; i++) {
    const curr = points[i];
    const next = points[(i + 1) % points.length];
    const midX = (curr.x + next.x) / 2;
    const midY = (curr.y + next.y) / 2;
    ctx.quadraticCurveTo(curr.x, curr.y, midX, midY);
  }
  
  ctx.closePath();
  ctx.fillStyle = hexToRgba(color, alpha);
  ctx.fill();
  ctx.restore();
}

function drawGradientBlush(
  ctx: CanvasRenderingContext2D,
  landmarks: NormalizedLandmark[],
  centerIdx: number,
  color: string,
  alpha: number,
  w: number,
  h: number,
  radiusScale: number = 0.05
) {
  const center = landmarks[centerIdx];
  const cx = center.x * w;
  const cy = center.y * h;
  const radius = w * radiusScale;

  ctx.save();
  ctx.filter = `blur(${radius * 0.3}px)`;
  
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  gradient.addColorStop(0, hexToRgba(color, alpha * 0.9));
  gradient.addColorStop(0.4, hexToRgba(color, alpha * 0.5));
  gradient.addColorStop(0.7, hexToRgba(color, alpha * 0.2));
  gradient.addColorStop(1, hexToRgba(color, 0));

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.restore();
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
  ctx.save();
  ctx.filter = "blur(0.5px)";
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = hexToRgba(color, alpha * 1.2);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  
  ctx.beginPath();
  const points = upperIndices.map(i => ({ x: landmarks[i].x * w, y: landmarks[i].y * h }));
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
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
  canvasHeight: number
) {
  const alpha = (intensity / 100) * 0.65;
  const w = canvasWidth;
  const h = canvasHeight;

  ctx.save();
  ctx.globalCompositeOperation = "multiply";

  switch (item.category) {
    case "lips": {
      // Smooth lip fill with blur for realistic blending
      ctx.globalCompositeOperation = "source-over";
      drawSmoothPolygon(ctx, landmarks, LIPS_OUTER, item.color, alpha * 1.0, w, h, 2);
      // Inner gloss highlight
      drawSmoothPolygon(ctx, landmarks, LIPS_INNER, item.color, alpha * 0.4, w, h, 1);
      // Specular highlight on center of lower lip
      const lowerCenter = landmarks[17];
      const hlGrad = ctx.createRadialGradient(
        lowerCenter.x * w, lowerCenter.y * h, 0,
        lowerCenter.x * w, lowerCenter.y * h, w * 0.015
      );
      hlGrad.addColorStop(0, hexToRgba("#FFFFFF", alpha * 0.3));
      hlGrad.addColorStop(1, hexToRgba("#FFFFFF", 0));
      ctx.beginPath();
      ctx.arc(lowerCenter.x * w, lowerCenter.y * h, w * 0.015, 0, Math.PI * 2);
      ctx.fillStyle = hlGrad;
      ctx.fill();
      break;
    }

    case "eyes": {
      ctx.globalCompositeOperation = "source-over";
      // Gradient eyeshadow that fades upward
      drawSmoothPolygon(ctx, landmarks, LEFT_EYE_SHADOW, item.color, alpha * 0.7, w, h, 4);
      drawSmoothPolygon(ctx, landmarks, RIGHT_EYE_SHADOW, item.color, alpha * 0.7, w, h, 4);
      // Subtle eyeliner
      drawEyeliner(ctx, landmarks, LEFT_EYE_UPPER, item.color, alpha * 0.9, w, h);
      drawEyeliner(ctx, landmarks, RIGHT_EYE_UPPER, item.color, alpha * 0.9, w, h);
      break;
    }

    case "face": {
      ctx.globalCompositeOperation = "source-over";
      drawSmoothPolygon(ctx, landmarks, FACE_OVAL, item.color, alpha * 0.2, w, h, 8);
      break;
    }

    case "blush": {
      ctx.globalCompositeOperation = "source-over";
      drawGradientBlush(ctx, landmarks, LEFT_CHEEK_CENTER, item.color, alpha, w, h, 0.055);
      drawGradientBlush(ctx, landmarks, RIGHT_CHEEK_CENTER, item.color, alpha, w, h, 0.055);
      break;
    }

    case "brows": {
      ctx.globalCompositeOperation = "source-over";
      // Fill brows with smooth polygon + blur for natural look
      drawSmoothPolygon(ctx, landmarks, LEFT_EYEBROW, item.color, alpha * 0.8, w, h, 1.5);
      drawSmoothPolygon(ctx, landmarks, RIGHT_EYEBROW, item.color, alpha * 0.8, w, h, 1.5);
      break;
    }

    case "skincare": {
      ctx.globalCompositeOperation = "screen";
      // Dewy glow highlights
      drawGradientBlush(ctx, landmarks, LEFT_CHEEK_CENTER, "#FFFFFF", alpha * 0.25, w, h, 0.035);
      drawGradientBlush(ctx, landmarks, RIGHT_CHEEK_CENTER, "#FFFFFF", alpha * 0.25, w, h, 0.035);

      const noseTip = landmarks[4];
      const forehead = landmarks[10];

      // Nose highlight
      ctx.save();
      ctx.filter = "blur(3px)";
      const nGrad = ctx.createRadialGradient(
        noseTip.x * w, noseTip.y * h, 0,
        noseTip.x * w, noseTip.y * h, w * 0.02
      );
      nGrad.addColorStop(0, hexToRgba("#FFFFFF", alpha * 0.35));
      nGrad.addColorStop(1, hexToRgba("#FFFFFF", 0));
      ctx.beginPath();
      ctx.arc(noseTip.x * w, noseTip.y * h, w * 0.02, 0, Math.PI * 2);
      ctx.fillStyle = nGrad;
      ctx.fill();
      ctx.restore();

      // Forehead glow
      ctx.save();
      ctx.filter = "blur(5px)";
      const fGrad = ctx.createRadialGradient(
        forehead.x * w, forehead.y * h, 0,
        forehead.x * w, forehead.y * h, w * 0.045
      );
      fGrad.addColorStop(0, hexToRgba("#FFFFFF", alpha * 0.25));
      fGrad.addColorStop(1, hexToRgba("#FFFFFF", 0));
      ctx.beginPath();
      ctx.arc(forehead.x * w, forehead.y * h, w * 0.045, 0, Math.PI * 2);
      ctx.fillStyle = fGrad;
      ctx.fill();
      ctx.restore();
      break;
    }

    case "accessories": {
      ctx.globalCompositeOperation = "source-over";
      const topHead = landmarks[10];
      ctx.font = `${w * 0.12}px serif`;
      ctx.textAlign = "center";
      ctx.globalAlpha = intensity / 100;
      ctx.fillText(item.image, topHead.x * w, topHead.y * h - w * 0.02);
      break;
    }

    case "looks": {
      ctx.globalCompositeOperation = "source-over";
      drawSmoothPolygon(ctx, landmarks, LIPS_OUTER, item.color, alpha * 0.9, w, h, 2);
      drawSmoothPolygon(ctx, landmarks, LEFT_EYE_SHADOW, item.color, alpha * 0.5, w, h, 4);
      drawSmoothPolygon(ctx, landmarks, RIGHT_EYE_SHADOW, item.color, alpha * 0.5, w, h, 4);
      drawGradientBlush(ctx, landmarks, LEFT_CHEEK_CENTER, item.color, alpha * 0.5, w, h, 0.045);
      drawGradientBlush(ctx, landmarks, RIGHT_CHEEK_CENTER, item.color, alpha * 0.5, w, h, 0.045);
      break;
    }
  }

  ctx.restore();
}
