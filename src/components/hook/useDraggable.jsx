import React, { useEffect, useRef } from "react";

export default function useDraggable() {
  const boxref = useRef(null);
  const containerRef = useRef(null);
  const isClick = useRef(false);
  const coords = useRef({ startX: 0, startY: 0, lastX: 0, lastY: 0 });
  useEffect(() => {
    if (!boxref.current || !containerRef.current) return;
    const box = boxref.current;
    const container = containerRef.current;

    const onMouseDown = (e) => {
      isClick.current = true;
      console.log("click");
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };
    const onMouseUp = (e) => {
      isClick.current = false;
      coords.current.lastX = box.offsetLeft;
      coords.current.lastY = box.offsetLeft;
    };
    const onMouseMove = (e) => {
      if (!isClick.current) return;
      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;
      box.style.top = `${e.clientY}px`;
      box.style.left = `${e.clientX}px`;
    };
    box.addEventListener("mousedown", onMouseDown);
    box.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    const cleanup = () => {
      box.removeEventListener("mousedown", onMouseDown);
      box.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseUp);
    };
    return cleanup;
  }, []);
  return {
    boxref,
    containerRef,
  };
}
