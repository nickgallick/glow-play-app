import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { BeautyItem } from "@/data/makeupItems";

// MediaPipe Face Mesh landmark indices for facial regions
const LIPS_OUTER = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 409, 270, 269, 267, 0, 37, 39, 40, 185];
const LIPS_INNER = [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 415, 310, 311, 312, 13, 82, 81, 80, 191];

const LEFT_EYE_UPPER = [246, 161, 160, 159, 158, 157, 173];
const LEFT_EYE_LOWER = [33, 7, 163, 144, 145, 153, 154, 155, 133];
const RIGHT_EYE_UPPER = [466, 388, 387, 386, 385, 384, 398];
const RIGHT_EYE_LOWER = [263, 249, 390, 373, 374, 380, 381, 382, 362];

// Extended eye shadow area (above the eye)
const LEFT_EYE_SHADOW = [226, 247, 30, 29, 27, 28, 56, 190, 243, 173, 157, 158, 159, 160, 161, 246];
const RIGHT_EYE_SHADOW = [446, 467, 260, 259, 257, 258, 286, 414, 463, 398, 384, 385, 386, 387, 388, 466];

const LEFT_EYEBROW = [70, 63, 105, 66, 107, 55, 65, 52, 53, 46];
const RIGHT_EYEBROW = [300, 293, 334, 296, 336, 285, 295, 282, 283, 276];

// Cheek blush points (center of cheek area)
const LEFT_CHEEK_CENTER = 50;
const RIGHT_CHEEK_CENTER = 280;

// Forehead/face contour for foundation
const FACE_OVAL = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109];

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawPolygon(
  ctx: CanvasRenderingContext2D,
  landmarks: NormalizedLandmark[],
  indices: number[],
  color: string,
  alpha: number,
  w: number,
  h: number
) {
  if (indices.length < 3) return;
  ctx.beginPath();
  const first = landmarks[indices[0]];
  ctx.moveTo(first.x * w, first.y * h);
  for (let i = 1; i < indices.length; i++) {
    const pt = landmarks[indices[i]];
    ctx.lineTo(pt.x * w, pt.y * h);
  }
  ctx.closePath();
  ctx.fillStyle = hexToRgba(color, alpha);
  ctx.fill();
}

function drawCircleBlush(
  ctx: CanvasRenderingContext2D,
  landmarks: NormalizedLandmark[],
  centerIdx: number,
  color: string,
  alpha: number,
  w: number,
  h: number,
  radiusScale: number = 0.04
) {
  const center = landmarks[centerIdx];
  const cx = center.x * w;
  const cy = center.y * h;
  const radius = w * radiusScale;

  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  gradient.addColorStop(0, hexToRgba(color, alpha * 0.8));
  gradient.addColorStop(0.6, hexToRgba(color, alpha * 0.4));
  gradient.addColorStop(1, hexToRgba(color, 0));

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
}

export function drawProductOnFace(
  ctx: CanvasRenderingContext2D,
  landmarks: NormalizedLandmark[],
  item: BeautyItem,
  intensity: number,
  canvasWidth: number,
  canvasHeight: number
) {
  const alpha = (intensity / 100) * 0.6;
  const w = canvasWidth;
  const h = canvasHeight;

  ctx.save();

  switch (item.category) {
    case "lips": {
      // Fill outer lips, cut out inner for more realistic look
      drawPolygon(ctx, landmarks, LIPS_OUTER, item.color, alpha * 1.2, w, h);
      // Add slight gloss highlight on upper lip
      const glossAlpha = alpha * 0.3;
      drawPolygon(ctx, landmarks, LIPS_INNER, item.color, glossAlpha, w, h);
      break;
    }

    case "eyes": {
      // Eye shadow on upper lid area
      drawPolygon(ctx, landmarks, LEFT_EYE_SHADOW, item.color, alpha * 0.8, w, h);
      drawPolygon(ctx, landmarks, RIGHT_EYE_SHADOW, item.color, alpha * 0.8, w, h);
      break;
    }

    case "face": {
      // Foundation/concealer — very subtle face-wide overlay
      drawPolygon(ctx, landmarks, FACE_OVAL, item.color, alpha * 0.25, w, h);
      break;
    }

    case "blush": {
      // Blush on cheeks
      drawCircleBlush(ctx, landmarks, LEFT_CHEEK_CENTER, item.color, alpha, w, h, 0.05);
      drawCircleBlush(ctx, landmarks, RIGHT_CHEEK_CENTER, item.color, alpha, w, h, 0.05);
      break;
    }

    case "brows": {
      // Darken/shape eyebrows
      ctx.lineWidth = 3;
      ctx.strokeStyle = hexToRgba(item.color, alpha * 1.5);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Left brow
      ctx.beginPath();
      LEFT_EYEBROW.forEach((idx, i) => {
        const pt = landmarks[idx];
        if (i === 0) ctx.moveTo(pt.x * w, pt.y * h);
        else ctx.lineTo(pt.x * w, pt.y * h);
      });
      ctx.stroke();

      // Right brow
      ctx.beginPath();
      RIGHT_EYEBROW.forEach((idx, i) => {
        const pt = landmarks[idx];
        if (i === 0) ctx.moveTo(pt.x * w, pt.y * h);
        else ctx.lineTo(pt.x * w, pt.y * h);
      });
      ctx.stroke();
      break;
    }

    case "skincare": {
      // Subtle dewy glow effect — highlights on forehead, nose, cheeks
      const noseTip = landmarks[4];
      const forehead = landmarks[10];
      drawCircleBlush(ctx, landmarks, LEFT_CHEEK_CENTER, "#FFFFFF", alpha * 0.3, w, h, 0.03);
      drawCircleBlush(ctx, landmarks, RIGHT_CHEEK_CENTER, "#FFFFFF", alpha * 0.3, w, h, 0.03);

      // Nose highlight
      const gradient = ctx.createRadialGradient(
        noseTip.x * w, noseTip.y * h, 0,
        noseTip.x * w, noseTip.y * h, w * 0.02
      );
      gradient.addColorStop(0, hexToRgba("#FFFFFF", alpha * 0.4));
      gradient.addColorStop(1, hexToRgba("#FFFFFF", 0));
      ctx.beginPath();
      ctx.arc(noseTip.x * w, noseTip.y * h, w * 0.02, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Forehead glow
      const fGrad = ctx.createRadialGradient(
        forehead.x * w, forehead.y * h, 0,
        forehead.x * w, forehead.y * h, w * 0.04
      );
      fGrad.addColorStop(0, hexToRgba("#FFFFFF", alpha * 0.3));
      fGrad.addColorStop(1, hexToRgba("#FFFFFF", 0));
      ctx.beginPath();
      ctx.arc(forehead.x * w, forehead.y * h, w * 0.04, 0, Math.PI * 2);
      ctx.fillStyle = fGrad;
      ctx.fill();
      break;
    }

    case "accessories": {
      // Draw emoji/icon at relevant position
      const topHead = landmarks[10];
      ctx.font = `${w * 0.12}px serif`;
      ctx.textAlign = "center";
      ctx.globalAlpha = intensity / 100;
      ctx.fillText(item.image, topHead.x * w, topHead.y * h - w * 0.02);
      break;
    }

    case "looks": {
      // Full look = lips + eyes + blush combined
      drawPolygon(ctx, landmarks, LIPS_OUTER, item.color, alpha, w, h);
      drawPolygon(ctx, landmarks, LEFT_EYE_SHADOW, item.color, alpha * 0.5, w, h);
      drawPolygon(ctx, landmarks, RIGHT_EYE_SHADOW, item.color, alpha * 0.5, w, h);
      drawCircleBlush(ctx, landmarks, LEFT_CHEEK_CENTER, item.color, alpha * 0.6, w, h, 0.04);
      drawCircleBlush(ctx, landmarks, RIGHT_CHEEK_CENTER, item.color, alpha * 0.6, w, h, 0.04);
      break;
    }
  }

  ctx.restore();
}
