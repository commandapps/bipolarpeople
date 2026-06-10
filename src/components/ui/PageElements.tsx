import Link from 'next/link'

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`font-sans font-semibold text-[0.78rem] tracking-[0.14em] uppercase text-accent ${className ?? ''}`}
    >
      {children}
    </span>
  )
}

export function PageWrap({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`max-w-[var(--maxw)] mx-auto px-[clamp(1.25rem,5vw,2.5rem)] ${className ?? ''}`}>
      {children}
    </div>
  )
}

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[]
}) {
  return (
    <nav className="pt-5 text-[0.9rem] text-muted" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-accent transition-colors">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export function TextLink({ href, children, muted }: { href: string; children: React.ReactNode; muted?: boolean }) {
  return (
    <Link
      href={href}
      className={`font-semibold inline-flex items-center gap-1.5 transition-all hover:gap-2.5 ${muted ? 'text-muted' : 'text-accent'}`}
    >
      {children}
    </Link>
  )
}

export function SectionBand({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`py-[var(--section-pad)] ${className ?? ''}`}>
      {children}
    </section>
  )
}
