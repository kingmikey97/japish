interface SectionTitleProps {
  eyebrow?: string;
  children: React.ReactNode;
  variant?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  eyebrow,
  children,
  variant = "dark",
  align = "center",
  className = "",
}: SectionTitleProps) {
  const eyebrowColor = variant === "dark" ? "text-white" : "text-[var(--blue)]";
  const dotColor = variant === "dark" ? "bg-white" : "bg-[var(--blue)]";
  
  const alignClass = align === "center" ? "flex flex-col items-center text-center" : "flex flex-col items-start text-left";

  return (
    <div className={`${alignClass} ${className}`}>
      {eyebrow && (
        <div
          className={`flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase ${eyebrowColor} mb-6`}
        >
          <span
            className={`w-[7px] h-[7px] rounded-full ${dotColor}`}
          />
          {eyebrow}
        </div>
      )}
      {children}
    </div>
  );
}
