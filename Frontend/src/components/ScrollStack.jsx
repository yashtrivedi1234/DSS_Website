import { useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

/* =========================
   ScrollStackItem
========================= */
export const ScrollStackItem = ({ children, itemClassName = "" }) => {
  return (
    <div
      className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`}
      style={{
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
};

/* =========================
   ScrollStack
========================= */
const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const lenisRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTransformsRef = useRef(new Map());
  const stackCompletedRef = useRef(false);
  const isUpdatingRef = useRef(false);

  /* =========================
     Helpers
  ========================= */
  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, height) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * height;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    }
    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller.scrollTop,
      containerHeight: scroller.clientHeight,
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (el) => {
      if (useWindowScroll) {
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY;
      }
      return el.offsetTop;
    },
    [useWindowScroll]
  );

  /* =========================
     Update Cards
  ========================= */
  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPosPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPx = parsePercentage(scaleEndPosition, containerHeight);

    const endEl = useWindowScroll
      ? document.querySelector(".scroll-stack-end")
      : scrollerRef.current?.querySelector(".scroll-stack-end");

    const endTop = endEl ? getElementOffset(endEl) : 0;

    cardsRef.current.forEach((card, i) => {
      const cardTop = getElementOffset(card);

      const triggerStart = cardTop - stackPosPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPx;
      const pinStart = triggerStart;
      const pinEnd = endTop - containerHeight / 2;

      const scaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd
      );

      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPosPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPosPx + itemStackDistance * i;
      }

      let blur = 0;
      if (blurAmount) {
        let topIndex = 0;
        cardsRef.current.forEach((c, idx) => {
          const ct = getElementOffset(c);
          if (scrollTop >= ct - stackPosPx - itemStackDistance * idx) {
            topIndex = idx;
          }
        });
        if (i < topIndex) blur = (topIndex - i) * blurAmount;
      }

      const transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${
        i * rotationAmount * scaleProgress
      }deg)`;

      const filter = blur ? `blur(${blur}px)` : "";

      const last = lastTransformsRef.current.get(i);
      if (!last || last.transform !== transform || last.filter !== filter) {
        card.style.transform = transform;
        card.style.filter = filter;
        lastTransformsRef.current.set(i, { transform, filter });
      }

      if (i === cardsRef.current.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (inView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        }
        if (!inView) stackCompletedRef.current = false;
      }
    });

    isUpdatingRef.current = false;
  }, [
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
  ]);

  /* =========================
     Setup Lenis
  ========================= */
  const setupLenis = useCallback(() => {
    const lenis = new Lenis({
      wrapper: useWindowScroll ? undefined : scrollerRef.current,
      content: useWindowScroll
        ? undefined
        : scrollerRef.current.querySelector(".scroll-stack-inner"),
      duration: 1.2,
      smoothWheel: true,
      lerp: 0.1,
    });

    lenis.on("scroll", updateCardTransforms);

    const raf = (time) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
  }, [updateCardTransforms, useWindowScroll]);

  /* =========================
     Lifecycle
  ========================= */
  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    cardsRef.current = Array.from(
      useWindowScroll
        ? document.querySelectorAll(".scroll-stack-card")
        : scroller.querySelectorAll(".scroll-stack-card")
    );

    cardsRef.current.forEach((card, i) => {
      if (i < cardsRef.current.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform, filter";
    });

    setupLenis();
    updateCardTransforms();

    return () => {
      animationFrameRef.current &&
        cancelAnimationFrame(animationFrameRef.current);
      lenisRef.current?.destroy();
      lastTransformsRef.current.clear();
    };
  }, [setupLenis, updateCardTransforms, itemDistance, useWindowScroll]);

  /* =========================
     Render
  ========================= */
  return (
    <div
      ref={scrollerRef}
      className={`relative w-full h-full overflow-y-auto ${className}`}
    >
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
