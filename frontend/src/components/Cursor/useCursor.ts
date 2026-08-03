import { useEffect, useRef, useState, useCallback } from 'react';

export function useCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const trailingRef = useRef<HTMLDivElement | null>(null);

  // Exact mouse target coordinates
  const targetPos = useRef({ x: -100, y: -100 });
  // Trailing dot lerped coordinates
  const trailingPos = useRef({ x: -100, y: -100 });

  const rafIdRef = useRef<number | null>(null);

  // Detect mobile / touch screens
  useEffect(() => {
    const checkMobile = () => {
      const isSmall = window.innerWidth <= 768;
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent.toLowerCase()
      );
      setIsMobile(isSmall || isMobileUA);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetPos.current = { x: e.clientX, y: e.clientY };

    // Update exact dot position instantly for zero-latency response
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0px)`;
    }
  }, []);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

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

  // 60 FPS Animation loop for smooth trailing lag
  useEffect(() => {
    if (isMobile) return;

    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = 'none';

    const animate = () => {
      // Smooth lerp formula for lag behind target mouse position
      const ease = 0.14; // smooth lag factor
      const dx = targetPos.current.x - trailingPos.current.x;
      const dy = targetPos.current.y - trailingPos.current.y;

      trailingPos.current.x += dx * ease;
      trailingPos.current.y += dy * ease;

      if (trailingRef.current) {
        trailingRef.current.style.transform = `translate3d(${trailingPos.current.x}px, ${trailingPos.current.y}px, 0px)`;
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
    dotRef,
    trailingRef,
    isHovered,
    isClicking,
    isMobile,
  };
}
