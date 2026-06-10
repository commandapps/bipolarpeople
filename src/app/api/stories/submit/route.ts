import { NextResponse } from 'next/server'
import { sendStorySubmissionEmail } from '@/lib/email'

type StoryPayload = {
  title?: string
  category?: string
  story?: string
  authorName?: string
  useRealName?: boolean
  email?: string
  agreeToTerms?: boolean
}

function validate(body: StoryPayload): string | null {
  if (!body.title?.trim()) return 'Title is required.'
  if (!body.category?.trim()) return 'Category is required.'
  if (!body.story?.trim() || body.story.trim().length < 100)
    return 'Please share at least a few paragraphs (100+ characters).'
  if (!body.authorName?.trim()) return 'Display name is required.'
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    return 'A valid email is required.'
  if (!body.agreeToTerms) return 'You must agree to the submission terms.'
  return null
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as StoryPayload
    const error = validate(body)
    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.log('[story submission — RESEND_API_KEY not set]', {
        title: body.title,
        email: body.email,
      })
      return NextResponse.json({ ok: true, dev: true })
    }

    await sendStorySubmissionEmail({
      title: body.title!.trim(),
      category: body.category!.trim(),
      story: body.story!.trim(),
      authorName: body.authorName!.trim(),
      useRealName: Boolean(body.useRealName),
      email: body.email!.trim(),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Story submission failed:', err)
    return NextResponse.json(
      { error: 'Something went wrong sending your story. Please try again later.' },
      { status: 500 }
    )
  }
}
