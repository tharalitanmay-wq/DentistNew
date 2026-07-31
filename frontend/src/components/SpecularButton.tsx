'use client';

import React, { useRef, useEffect, MouseEventHandler, ReactNode } from 'react';
import './SpecularButton.css';

const PAD = 20;

export interface SpecularButtonProps {
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const SpecularButton: React.FC<SpecularButtonProps> = ({
  children = 'Get Started',
  size = 'lg',
  radius = 18,
  tint = '#ffffff',
  tintOpacity = 0,
  blur = 0,
  textColor = '#f5f5f5',
  lineColor = '#ffffff',
  baseColor = '#525252',
  intensity = 1,
  shineSize = 10,
  shineFade = 40,
  thickness = 1.5,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button'
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const fxRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const propsRef = useRef<Record<string, any>>({});

  propsRef.current = {
    radius,
    lineColor,
    baseColor,
    intensity,
    shineSize,
    shineFade,
    thickness,
    speed,
    followMouse,
    proximity,
    autoAnimate
  };

  useEffect(() => {
    const btn = btnRef.current;
    const fx = fxRef.current;
    if (!btn || !fx) return;

    // Create Canvas dynamically
    const canvas = document.createElement('canvas');
    canvasRef.current = canvas;
    fx.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const sizeRef = { w: 1, h: 1 };

    const resize = () => {
      const rect = btn.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      sizeRef.w = w;
      sizeRef.h = h;
      canvas.width = (w + PAD * 2) * dpr;
      canvas.height = (h + PAD * 2) * dpr;
      canvas.style.width = `${w + PAD * 2}px`;
      canvas.style.height = `${h + PAD * 2}px`;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(btn);
    resize();

    let pointerAngle: number | null = null;
    let proximityT = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const dist = Math.hypot(dx, dy);

      if (dist === 0) {
        const nx = (e.clientX - cx) / (rect.width / 2);
        const ny = (cy - e.clientY) / (rect.height / 2);
        pointerAngle = Math.atan2(2 / rect.height, -2 / rect.width) + nx * 0.3 + ny * 0.15;
      } else {
        pointerAngle = Math.atan2(cy - e.clientY, e.clientX - cx);
      }
      const t = Math.max(0, 1 - dist / Math.max(propsRef.current.proximity, 1));
      proximityT = t * t * (3 - 2 * t);
    };

    window.addEventListener('pointermove', onPointerMove);

    let angle = 2.4;
    let idleAngle = 2.4;
    let bright = 0;
    let last = performance.now();
    let raf = 0;

    // Helper to draw rounded rectangle path
    const drawRoundedRect = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) => {
      const clampedR = Math.min(r, Math.min(w, h) / 2);
      context.beginPath();
      context.moveTo(x + clampedR, y);
      context.lineTo(x + w - clampedR, y);
      context.arcTo(x + w, y, x + w, y + clampedR, clampedR);
      context.lineTo(x + w, y + h - clampedR);
      context.arcTo(x + w, y + h, x + w - clampedR, y + h, clampedR);
      context.lineTo(x + clampedR, y + h);
      context.arcTo(x, y + h, x, y + h - clampedR, clampedR);
      context.lineTo(x, y + clampedR);
      context.arcTo(x, y, x + clampedR, y, clampedR);
      context.closePath();
    };

    const update = (now: number) => {
      raf = requestAnimationFrame(update);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const p = propsRef.current;

      idleAngle += p.speed * dt;
      const steer = p.followMouse && pointerAngle != null && (!p.autoAnimate || proximityT > 0);
      const target = steer ? (pointerAngle as number) : idleAngle;
      const diff = ((target - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      angle += diff * (1 - Math.exp(-dt * 7));

      const brightTarget = p.autoAnimate ? 1 : proximityT;
      bright += (brightTarget - bright) * (1 - Math.exp(-dt * 8));

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = sizeRef.w * dpr;
      const h = sizeRef.h * dpr;
      const pad = PAD * dpr;
      const cx = pad + w / 2;
      const cy = pad + h / 2;

      ctx.save();

      // Draw base border line
      drawRoundedRect(ctx, pad, pad, w, h, p.radius * dpr);
      ctx.lineWidth = p.thickness * dpr;
      ctx.strokeStyle = p.baseColor;
      ctx.globalAlpha = 0.45;
      ctx.stroke();

      // Draw specular highlight shine streak
      if (bright > 0.01) {
        const lx = Math.cos(angle) * w * 0.75;
        const ly = Math.sin(angle) * h * 0.75;

        const grad = ctx.createLinearGradient(cx - lx, cy - ly, cx + lx, cy + ly);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.4, p.lineColor);
        grad.addColorStop(0.5, '#ffffff');
        grad.addColorStop(0.6, p.lineColor);
        grad.addColorStop(1, 'transparent');

        drawRoundedRect(ctx, pad, pad, w, h, p.radius * dpr);
        ctx.lineWidth = p.thickness * dpr * 1.5;
        ctx.strokeStyle = grad;
        ctx.globalAlpha = Math.min(1, p.intensity * bright);
        ctx.shadowColor = p.lineColor;
        ctx.shadowBlur = 10 * dpr * bright;
        ctx.stroke();
      }

      ctx.restore();
    };

    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      if (canvas.parentNode === fx) {
        fx.removeChild(canvas);
      }
    };
  }, []);

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`specular-button specular-button--${size}${className ? ` ${className}` : ''}`}
      style={{
        '--sb-radius': `${radius}px`,
        '--sb-tint': tint,
        '--sb-tint-opacity': tintOpacity,
        '--sb-blur': `${blur}px`,
        '--sb-text-color': textColor
      } as React.CSSProperties}
    >
      <span ref={fxRef} className="specular-button__fx" aria-hidden="true" />
      <span className="specular-button__label">{children}</span>
    </button>
  );
};

export default SpecularButton;
