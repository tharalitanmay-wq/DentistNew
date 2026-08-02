import { useEffect, useRef, useState, useCallback } from 'react';

export interface CursorState {
  x: number;
  y: number;
  rotation: number;
  isHovered: boolean;
  isClicking: boolean;
  isMobile: boolean;
}

export function useCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const posRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const targetPosRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const rotationRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const cursorElementRef = useRef<HTMLDivElement | null>(null);

  // Check if device is strictly mobile / phone
  useEffect(() => {
    const checkMobile = () => {
      const isSmall = window.innerWidth <= 768;
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent.toLowerCase()
      );
      // Only treat as mobile if screen is small OR user agent is explicitly mobile
      setIsMobile(isSmall || isMobileUA);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update target cursor coordinates
  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetPosRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Click state handlers
  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  // Check if target is an interactive hover element
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const interactiveSelector =
      'button, a, input, select, textarea, [role="button"], .pixel-card, .glass-card, .cursor-target';
    
    if (target.closest(interactiveSelector) || target.matches(interactiveSelector)) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  }, []);

  // 60 FPS RequestAnimationFrame render loop with GPU acceleration
  useEffect(() => {
    if (isMobile) return;

    // Hide default cursor across entire document
    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = 'none';

    const animate = () => {
      const targetX = targetPosRef.current.x;
      const targetY = targetPosRef.current.y;

      // Lerp positioning for ultra-smooth 60 FPS movement
      const ease = 0.25;
      const dx = targetX - posRef.current.x;
      const dy = targetY - posRef.current.y;

      posRef.current.x += dx * ease;
      posRef.current.y += dy * ease;

      // Velocity calculation for dynamic movement tilt
      velRef.current.vx = dx;
      velRef.current.vy = dy;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Subtle tilt rotation based on mouse movement angle & velocity
      let targetRotation = 0;
      if (speed > 1.5) {
        const moveAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
        // Dampen tilt to maintain needle-forward direction
        targetRotation = Math.max(-25, Math.min(25, (moveAngle - 45) * 0.15));
      }

      rotationRef.current += (targetRotation - rotationRef.current) * 0.1;

      // Apply GPU-accelerated transform directly to DOM element for max performance
      if (cursorElementRef.current) {
        const { x, y } = posRef.current;
        const rot = rotationRef.current;

        cursorElementRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate(${rot}deg)`;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = originalCursor;
    };
  }, [isMobile, handleMouseMove, handleMouseDown, handleMouseUp, handleMouseOver]);

  return {
    cursorElementRef,
    isHovered,
    isClicking,
    isMobile
  };
}
