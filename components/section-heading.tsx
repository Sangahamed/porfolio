export function SectionHeading({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <span className="text-sm font-semibold uppercase tracking-widest text-primary">
        {label}
      </span>
      <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </div>
  )
}
