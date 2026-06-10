/** Public site configuration — set via environment variables in production. */

export const siteConfig = {
  bscJoinUrl: process.env.NEXT_PUBLIC_BSC_JOIN_URL ?? '',
  bipolarAwareUrl: process.env.NEXT_PUBLIC_BIPOLARAWARE_URL ?? '/app',
  adminEmail: process.env.ADMIN_EMAIL ?? 'stories@bipolarpeople.com',
  contactEmail: process.env.CONTACT_EMAIL ?? 'hello@bipolarpeople.com',
  /** 'amazon' | 'bookshop' — swap buy links site-wide when ready */
  bookLinks: (process.env.NEXT_PUBLIC_BOOK_LINKS as 'amazon' | 'bookshop') ?? 'amazon',
} as const
