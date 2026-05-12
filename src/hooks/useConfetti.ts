import canvasConfetti from "canvas-confetti";

export function useConfetti() {
  return () =>
    canvasConfetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
}
