import { cn } from "@/lib/utils";

/**
 * Device frames around real screenshots of the Hispal GYM app (taken from the public demo, fictitious data).
 * Width comes from `className`; the screenshot keeps the device's aspect ratio.
 */
export function PhoneShot({ src, alt, className, eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <div
      className={cn(
        "relative shrink-0 rounded-[2.4rem] bg-[#0b0b0d] p-[6px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.09),inset_0_0_0_1px_rgba(255,255,255,0.04)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-hg-bg">
        <img
          src={src}
          alt={alt}
          width={780}
          height={1688}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className="block aspect-[390/844] w-full select-none object-cover object-top"
        />
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/5" aria-hidden />
      </div>
    </div>
  );
}

export function TabletShot({ src, alt, className, eager = false, ratio = "820 / 1180" }: { src: string; alt: string; className?: string; eager?: boolean; ratio?: string }) {
  return (
    <div
      className={cn(
        "relative shrink-0 rounded-[1.7rem] bg-[#0b0b0d] p-[9px] shadow-[0_50px_90px_-35px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.09)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.15rem] bg-hg-bg">
        <img
          src={src}
          alt={alt}
          width={1100}
          height={1583}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          style={{ aspectRatio: ratio }}
          className="block w-full select-none object-cover object-top"
        />
      </div>
    </div>
  );
}
