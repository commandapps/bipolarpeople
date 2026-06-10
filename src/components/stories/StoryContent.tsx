function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default function StoryContent({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/)

  return (
    <div className="space-y-5 text-muted leading-relaxed text-[1.05rem]">
      {blocks.map((block, i) => {
        const trimmed = block.trim()
        if (!trimmed) return null

        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={i} className="font-display text-xl text-ink font-medium mt-8 mb-2">
              {trimmed.slice(3)}
            </h2>
          )
        }

        if (trimmed.startsWith('*') && trimmed.endsWith('*')) {
          return (
            <p
              key={i}
              className="text-sm border-l-2 border-amber pl-4 py-2 bg-[color-mix(in_srgb,var(--amber)_10%,var(--surface-2))] rounded-r-lg italic"
            >
              {trimmed.slice(1, -1)}
            </p>
          )
        }

        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: escapeHtml(trimmed) }} />
        )
      })}
    </div>
  )
}
