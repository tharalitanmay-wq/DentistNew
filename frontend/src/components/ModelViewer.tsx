'use client';

import React, { useRef, useEffect, useState } from 'react';

export interface ModelViewerProps {
  url?: string;
  width?: number | string;
  height?: number | string;
  modelXOffset?: number;
  modelYOffset?: number;
  defaultRotationX?: number;
  defaultRotationY?: number;
  defaultZoom?: number;
  minZoomDistance?: number;
  maxZoomDistance?: number;
  enableMouseParallax?: boolean;
  enableManualRotation?: boolean;
  enableHoverRotation?: boolean;
  enableManualZoom?: boolean;
  ambientIntensity?: number;
  keyLightIntensity?: number;
  fillLightIntensity?: number;
  rimLightIntensity?: number;
  environmentPreset?: string;
  autoFrame?: boolean;
  placeholderSrc?: string;
  showScreenshotButton?: boolean;
  fadeIn?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  onModelLoaded?: () => void;
  className?: string;
}

// 3D Point interface for procedural wireframe/solid 3D stethoscope rendering
interface Point3D {
  x: number;
  y: number;
  z: number;
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  width = 400,
  height = 400,
  autoRotate = true,
  autoRotateSpeed = 0.35,
  enableManualRotation = true,
  showScreenshotButton = false,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ lastX: 0, lastY: 0 });
  const rotationRef = useRef({ rotX: 0.3, rotY: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = typeof width === 'number' ? width : rect.width || 400;
      const h = typeof height === 'number' ? height : rect.height || 400;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    resize();
    window.addEventListener('resize', resize);

    // 3D Projection transform helper
    const project = (p: Point3D, rx: number, ry: number, cx: number, cy: number, scale: number) => {
      // Rotation around Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      let x1 = p.x * cosY + p.z * sinY;
      let z1 = -p.x * sinY + p.z * cosY;

      // Rotation around X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      let y2 = p.y * cosX - z1 * sinX;
      let z2 = p.y * sinX + z1 * cosX;

      // Perspective projection
      const perspective = 400 / (400 + z2);
      return {
        x: cx + x1 * scale * perspective,
        y: cy + y2 * scale * perspective,
        z: z2,
        scale: perspective
      };
    };

    // Build 3D Stethoscope Rings & Tubes Data
    const generateStethoscope3DNodes = () => {
      const chestpieceNodes: Point3D[] = [];
      const tubeNodes: Point3D[] = [];
      const earpieceNodes: Point3D[] = [];

      // Chestpiece circle nodes
      for (let i = 0; i <= 32; i++) {
        const angle = (i / 32) * Math.PI * 2;
        chestpieceNodes.push({
          x: Math.cos(angle) * 45,
          y: Math.sin(angle) * 45,
          z: 0
        });
      }

      // Inner diaphragm ring
      const innerRingNodes: Point3D[] = [];
      for (let i = 0; i <= 32; i++) {
        const angle = (i / 32) * Math.PI * 2;
        innerRingNodes.push({
          x: Math.cos(angle) * 35,
          y: Math.sin(angle) * 35,
          z: 5
        });
      }

      // Arch tube nodes
      for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        const angle = Math.PI * t;
        tubeNodes.push({
          x: Math.cos(angle) * 55,
          y: -60 - Math.sin(angle) * 50,
          z: (t - 0.5) * 20
        });
      }

      // Earpieces
      earpieceNodes.push({ x: -55, y: -110, z: -10 });
      earpieceNodes.push({ x: 55, y: -110, z: 10 });

      return { chestpieceNodes, innerRingNodes, tubeNodes, earpieceNodes };
    };

    const model3D = generateStethoscope3DNodes();

    let lastTime = performance.now();

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (autoRotate && !isDragging) {
        rotationRef.current.rotY += autoRotateSpeed * dt;
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2 + 20 * dpr;
      const scale = dpr;

      const rx = rotationRef.current.rotX;
      const ry = rotationRef.current.rotY;

      // Draw Chestpiece Outer Ring (Cyan Glow Metallic)
      ctx.beginPath();
      model3D.chestpieceNodes.forEach((node, i) => {
        const p = project(node, rx, ry, cx, cy, scale);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.lineWidth = 6 * dpr;
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 15 * dpr;
      ctx.stroke();

      // Draw Inner Diaphragm Metallic Ring
      ctx.beginPath();
      model3D.innerRingNodes.forEach((node, i) => {
        const p = project(node, rx, ry, cx, cy, scale);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.lineWidth = 3 * dpr;
      ctx.strokeStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10 * dpr;
      ctx.stroke();

      // Draw Arch Tubing (Sky Blue / Deep Navy)
      ctx.beginPath();
      model3D.tubeNodes.forEach((node, i) => {
        const p = project(node, rx, ry, cx, cy, scale);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.lineWidth = 8 * dpr;
      ctx.strokeStyle = '#0ea5e9';
      ctx.shadowColor = '#0ea5e9';
      ctx.shadowBlur = 12 * dpr;
      ctx.stroke();

      // Draw Earpieces
      model3D.earpieceNodes.forEach((node) => {
        const p = project(node, rx, ry, cx, cy, scale);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8 * dpr * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#f8fafc';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 8 * dpr;
        ctx.fill();
      });
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [autoRotate, autoRotateSpeed, height, width, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!enableManualRotation) return;
    setIsDragging(true);
    dragRef.current = { lastX: e.clientX, lastY: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !enableManualRotation) return;
    const dx = e.clientX - dragRef.current.lastX;
    const dy = e.clientY - dragRef.current.lastY;
    dragRef.current = { lastX: e.clientX, lastY: e.clientY };

    rotationRef.current.rotY += dx * 0.01;
    rotationRef.current.rotX += dy * 0.01;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      className={`relative inline-block cursor-grab active:cursor-grabbing ${className}`}
      style={{ width, height }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {showScreenshotButton && (
        <button
          onClick={() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const a = document.createElement('a');
            a.download = '3d-stethoscope-model.png';
            a.href = canvas.toDataURL('image/png');
            a.click();
          }}
          className="absolute top-3 right-3 z-20 text-[10px] font-bold text-cyan-400 bg-navy-900/90 border border-cyan-500/30 px-3 py-1.5 rounded-full hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-lg"
        >
          Take Screenshot
        </button>
      )}
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default ModelViewer;
