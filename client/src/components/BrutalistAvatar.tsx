import { MouseTrackingAvatar } from "./MouseTrackingAvatar";

export function BrutalistAvatar() {
  return (
    <div className="border-brutal bg-black relative">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-3 py-1 bg-black border-b border-black">
        <span className="font-mono text-xs text-white/70">
          {">"} avatar.exe
        </span>
        <span className="cursor-blink font-mono text-xs text-red-500">_</span>
      </div>
      {/* Avatar container */}
      <div className="p-2 bg-[#F5F5F0]">
        <MouseTrackingAvatar disableGlow />
      </div>
      {/* Red corner accent */}
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-500" />
    </div>
  );
}
