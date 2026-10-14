interface SectionHeaderProps {
  title: string;
  description?: string;
}

/** Shared section heading: title flanked by short divider lines + description. */
const SectionHeader = ({ title, description }: SectionHeaderProps) => (
  <div className="reveal mx-auto mb-10 max-w-2xl text-center md:mb-14">
    <div className="flex items-center justify-center gap-4 md:gap-6">
      <span
        aria-hidden
        className="h-0.5 w-10 rounded-full bg-gradient-to-r from-transparent to-hispaltech-blue sm:w-16 md:w-24"
      />
      <h2 className="text-3xl font-extrabold leading-tight text-primary md:text-4xl lg:text-5xl">
        {title}
      </h2>
      <span
        aria-hidden
        className="h-0.5 w-10 rounded-full bg-gradient-to-l from-transparent to-hispaltech-blue sm:w-16 md:w-24"
      />
    </div>
    {description && (
      <p className="mt-4 text-base text-muted-foreground md:text-lg">
        {description}
      </p>
    )}
  </div>
);

export default SectionHeader;
