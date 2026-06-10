import Button from './Button'

type Props = {
  subtitle?: string
  showMoreResources?: boolean
}

export default function CrisisBand({
  subtitle = "If you're in crisis, please reach out. Help is available 24/7.",
  showMoreResources = true,
}: Props) {
  return (
    <section
      id="crisis"
      className="bg-gradient-to-br from-accent-press to-accent text-white"
    >
      <div className="max-w-[var(--maxw)] mx-auto px-[clamp(1.25rem,5vw,2.5rem)] py-[2.6rem] flex flex-wrap items-center justify-between gap-8">
        <div>
          <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] text-white font-display font-medium">
            Need support right now?
          </h2>
          <p className="mt-1 text-white/90">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="tel:988" variant="white">
            Call or text 988
          </Button>
          <Button href="tel:911" variant="on-dark">
            Emergency: 911
          </Button>
          {showMoreResources && (
            <Button href="/crisis-resources" variant="on-dark">
              More resources
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
