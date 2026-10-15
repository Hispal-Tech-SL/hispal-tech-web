import { cn } from "@/lib/utils";

const INK = "#1a120b";

// Dumbbell in its own coordinates (horizontal, centred on 0,0): [x, y, w, h, radius]
const DUMBBELL: [number, number, number, number, number][] = [
  [-100, -28, 200, 56, 24],
  [-165, -95, 65, 190, 20],
  [100, -95, 65, 190, 20],
  [-205, -58, 40, 116, 16],
  [165, -58, 40, 116, 16],
];

/**
 * Hispal GYM mark: the Hispal Tech "H" in orange, with a small dumbbell laid diagonally
 * across its top-left corner. The H is /hispalgym/logo-h.png (the Hispal Tech logo recoloured).
 */
export function GymMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-120 -120 1200 1200" role="img" aria-label="Hispal GYM" className={cn("shrink-0 overflow-visible", className)}>
      <image href="/hispalgym/logo-h.png" width="1080" height="1059" />
      <g transform="translate(170 160) rotate(-45) scale(1.15)">
        <g fill={INK} stroke={INK} strokeWidth="38" strokeLinejoin="round">
          {DUMBBELL.map(([x, y, w, h, r]) => <rect key={`o${x}`} x={x} y={y} width={w} height={h} rx={r} />)}
        </g>
        <g fill="#fff">
          {DUMBBELL.map(([x, y, w, h, r]) => <rect key={`f${x}`} x={x} y={y} width={w} height={h} rx={r} />)}
        </g>
      </g>
    </svg>
  );
}

export function GymLogo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("flex items-center gap-2 font-display text-lg font-extrabold", className)}>
      <GymMark className={cn("size-9", markClassName)} />
      <span>
        Hispal <span className="text-primary">GYM</span>
      </span>
    </span>
  );
}
