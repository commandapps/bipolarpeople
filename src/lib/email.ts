import { Resend } from 'resend'

export async function sendStorySubmissionEmail(data: {
  title: string
  category: string
  story: string
  authorName: string
  useRealName: boolean
  email: string
}) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const to = process.env.ADMIN_EMAIL ?? 'stories@bipolarpeople.com'

  const html = `
    <h2>New story submission — BipolarPeople.com</h2>
    <p><strong>Title:</strong> ${escapeHtml(data.title)}</p>
    <p><strong>Category:</strong> ${escapeHtml(data.category)}</p>
    <p><strong>Display name:</strong> ${escapeHtml(data.authorName)}</p>
    <p><strong>Real name:</strong> ${data.useRealName ? 'Yes' : 'No / pseudonym'}</p>
    <p><strong>Contact email (private):</strong> ${escapeHtml(data.email)}</p>
    <hr />
    <pre style="white-space:pre-wrap;font-family:sans-serif;">${escapeHtml(data.story)}</pre>
  `

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'noreply@bipolarpeople.com',
    to,
    replyTo: data.email,
    subject: `[Story submission] ${data.title}`,
    html,
  })
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
