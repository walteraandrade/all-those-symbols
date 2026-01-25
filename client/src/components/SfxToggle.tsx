import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

export function SfxToggle() {
  const { enabled, toggle } = useAudio();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-md transition-colors hover:bg-secondary"
      aria-label={enabled ? "Mute sound effects" : "Enable sound effects"}
    >
      {enabled ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
    </button>
  );
}
