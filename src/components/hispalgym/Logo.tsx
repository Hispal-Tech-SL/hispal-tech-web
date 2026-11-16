import { cn } from "@/lib/utils";

/**
 * Hispal GYM mark: the official logo (public/hispalgym/logo.png, transparent background).
 * The dumbbell carries its own white outline, so it reads on dark and light backgrounds without a tile.
 */
export function GymMark({ className }: { className?: string }) {
  return <img src="/hispalgym/logo.png" alt="Hispal GYM" className={cn("shrink-0 object-contain", className)} draggable={false} />;
}

/** Logo and name together. The text takes the colour of its container; "GYM" is always orange. */
export function GymLogo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display text-lg font-extrabold leading-none", className)}>
      <img src="/hispalgym/logo.png" alt="" className={cn("size-9 shrink-0 object-contain", markClassName)} draggable={false} />
      <span>
        Hispal <span className="text-primary">GYM</span>
      </span>
    </span>
  );
}
