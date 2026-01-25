import { useCallback, useRef } from "react";
import { useAudio } from "@/contexts/AudioContext";

const createOscillator = (
  ctx: AudioContext,
  frequency: number,
  type: OscillatorType,
  duration: number,
  gain: number = 0.1
): void => {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);

  gainNode.gain.setValueAtTime(gain, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
};

export function useRetroSfx() {
  const { enabled } = useAudio();
  const ctxRef = useRef<AudioContext | null>(null);

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const hover = useCallback(() => {
    if (!enabled) return;
    const ctx = getContext();
    createOscillator(ctx, 880, "square", 0.05, 0.05);
  }, [enabled, getContext]);

  const click = useCallback(() => {
    if (!enabled) return;
    const ctx = getContext();
    createOscillator(ctx, 440, "square", 0.05, 0.08);
    setTimeout(() => {
      createOscillator(ctx, 660, "square", 0.05, 0.08);
    }, 30);
  }, [enabled, getContext]);

  const navigate = useCallback(() => {
    if (!enabled) return;
    const ctx = getContext();
    const frequencies = [440, 550, 660];
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        createOscillator(ctx, freq, "square", 0.08, 0.06);
      }, i * 60);
    });
  }, [enabled, getContext]);

  return { hover, click, navigate };
}
