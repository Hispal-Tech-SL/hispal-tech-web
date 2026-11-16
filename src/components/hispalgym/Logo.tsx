import { cn } from "@/lib/utils";

/**
 * Hispal GYM mark: the official logo (public/hispalgym/logo.png, transparent background).
 * Its dumbbell outline is transparent, so it always sits on a white rounded tile to stay legible
 * on dark screens, orange sections and light backgrounds alike.
 */
export function GymMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-grid shrink-0 place-items-center rounded-[22%] bg-white shadow-sm", className)}>
      <img src="/hispalgym/logo.png" alt="Hispal GYM" className="size-[84%] object-contain" draggable={false} />
    </span>
  );
}

/** Logo and name as one piece: both live inside the same white tile. */
export function GymLogo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-2xl bg-white py-1 pl-1.5 pr-3 font-display text-lg font-extrabold text-[#1a120b] shadow-sm ring-1 ring-black/5", className)}>
      <img src="/hispalgym/logo.png" alt="" className={cn("size-9 shrink-0 object-contain", markClassName)} draggable={false} />
      <span>
        Hispal <span className="text-primary">GYM</span>
      </span>
    </span>
  );
}
