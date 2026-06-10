'use client'

import { useTheme } from '@/components/theme/ThemeProvider'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

const navigation = [
  { name: 'Stories', href: '/stories' },
  { name: 'Resources', href: '/resources' },
  { name: 'The App', href: '/app' },
  { name: 'Research', href: '/research' },
]

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="grid place-items-center w-10 h-10 rounded-full border-[1.5px] border-line bg-transparent text-ink hover:border-accent hover:text-accent cursor-pointer transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title="Toggle theme"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3v2M12 19v2M5 12H3M21 12h-2M6 6 4.5 4.5M19.5 19.5 18 18M18 6l1.5-1.5M4.5 19.5 6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    </button>
  )
}

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2 font-display font-semibold text-[1.22rem] tracking-tight text-ink">
      <span
        className="w-4 h-4 rounded-full shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_18%,transparent)]"
        style={{
          background:
            'radial-gradient(circle at 35% 30%, var(--amber), var(--accent) 55%, var(--indigo))',
        }}
        aria-hidden="true"
      />
      BipolarPeople
    </Link>
  )
}

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <Disclosure as="header">
      {({ open }) => (
        <>
          <div
            className={clsx(
              'sticky top-0 z-50 backdrop-blur-[10px] backdrop-saturate-[1.2] transition-colors duration-300',
              'bg-[color-mix(in_srgb,var(--surface)_82%,transparent)]',
              scrolled ? 'border-b border-line' : 'border-b border-transparent'
            )}
          >
            <div className="max-w-[var(--maxw)] mx-auto px-[clamp(1.25rem,5vw,2.5rem)]">
              <div className="flex items-center justify-between h-[68px]">
                <Brand />

                <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        'font-medium text-[0.97rem] px-3 py-2 rounded-[10px] transition-colors',
                        isActive(item.href)
                          ? 'text-accent opacity-100'
                          : 'text-ink opacity-85 hover:opacity-100 hover:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]'
                      )}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/crisis-resources"
                    className="font-semibold text-[0.9rem] px-4 py-2 rounded-full border-[1.5px] border-accent text-accent hover:bg-accent hover:text-white transition-colors ml-1"
                  >
                    Crisis
                  </Link>
                  <ThemeToggle />
                </nav>

                <div className="md:hidden flex items-center gap-2">
                  <ThemeToggle />
                  <Disclosure.Button className="grid place-items-center w-10 h-10 rounded-full border-[1.5px] border-line text-ink">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden border-b border-line bg-surface-2">
            <nav className="max-w-[var(--maxw)] mx-auto px-[clamp(1.25rem,5vw,2.5rem)] py-4 flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'font-medium px-3 py-2.5 rounded-[10px]',
                    isActive(item.href) ? 'text-accent bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]' : 'text-ink'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/crisis-resources"
                className="font-semibold px-3 py-2.5 rounded-full border-[1.5px] border-accent text-accent text-center mt-2"
              >
                Crisis
              </Link>
            </nav>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
