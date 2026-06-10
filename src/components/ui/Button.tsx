import Link from 'next/link'
import clsx from 'clsx'

type ButtonVariant = 'primary' | 'ghost' | 'white' | 'on-dark'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-press text-white hover:bg-accent hover:-translate-y-0.5 border-transparent',
  ghost:
    'bg-transparent text-ink border-line hover:border-accent hover:text-accent hover:-translate-y-0.5',
  white:
    'bg-white text-accent-press font-bold hover:-translate-y-0.5 border-transparent',
  'on-dark':
    'bg-transparent text-white border-white/35 hover:border-white hover:-translate-y-0.5',
}

type Props = {
  href?: string
  variant?: ButtonVariant
  className?: string
  children: React.ReactNode
  type?: 'button' | 'submit'
  onClick?: () => void
}

export default function Button({
  href,
  variant = 'primary',
  className,
  children,
  type = 'button',
  onClick,
}: Props) {
  const classes = clsx(
    'inline-flex items-center gap-2 font-sans font-semibold text-base px-[1.4rem] py-[0.85rem] rounded-full cursor-pointer border-[1.5px] transition-all duration-200',
    variants[variant],
    className
  )

  if (href) {
    if (/^(tel:|mailto:|sms:)/.test(href)) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
