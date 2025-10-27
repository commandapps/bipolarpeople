import crypto from 'crypto'

export interface DiscourseSSOUser {
  email: string
  username: string
  name: string
  external_id: string
  avatar_url?: string
  bio?: string
  admin?: boolean
  moderator?: boolean
  suppress_welcome_message?: boolean
}

export interface DiscourseSSOPayload {
  nonce: string
  email: string
  username: string
  name: string
  external_id: string
  avatar_url?: string
  bio?: string
  admin?: boolean
  moderator?: boolean
  suppress_welcome_message?: boolean
}

/**
 * Generate a random nonce for SSO
 */
export function generateNonce(): string {
  return crypto.randomBytes(16).toString('hex')
}

/**
 * Create HMAC-SHA256 signature for Discourse SSO
 */
export function createSignature(payload: string, secret: string): string {
  return crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
}

/**
 * Verify HMAC-SHA256 signature from Discourse
 */
export function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = createSignature(payload, secret)
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  )
}

/**
 * Encode SSO payload as base64
 */
export function encodePayload(payload: DiscourseSSOPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

/**
 * Decode base64 SSO payload
 */
export function decodePayload(encodedPayload: string): DiscourseSSOPayload {
  const decoded = Buffer.from(encodedPayload, 'base64').toString('utf-8')
  return JSON.parse(decoded)
}

/**
 * Generate SSO URL for Discourse
 */
export function generateSSOUrl(
  discourseUrl: string,
  user: DiscourseSSOUser,
  returnUrl?: string
): string {
  const secret = process.env.DISCOURSE_SSO_SECRET
  if (!secret) {
    throw new Error('DISCOURSE_SSO_SECRET environment variable is not set')
  }

  const nonce = generateNonce()
  
  const payload: DiscourseSSOPayload = {
    nonce,
    email: user.email,
    username: user.username,
    name: user.name,
    external_id: user.external_id,
    avatar_url: user.avatar_url,
    bio: user.bio,
    admin: user.admin || false,
    moderator: user.moderator || false,
    suppress_welcome_message: user.suppress_welcome_message || false,
  }

  const encodedPayload = encodePayload(payload)
  const signature = createSignature(encodedPayload, secret)

  const params = new URLSearchParams({
    sso: encodedPayload,
    sig: signature,
  })

  if (returnUrl) {
    params.append('return_sso_url', returnUrl)
  }

  return `${discourseUrl}/session/sso_provider?${params.toString()}`
}

/**
 * Validate and decode incoming SSO request from Discourse
 */
export function validateSSORequest(
  sso: string,
  sig: string,
  secret: string
): DiscourseSSOPayload | null {
  try {
    // Verify signature
    if (!verifySignature(sso, sig, secret)) {
      return null
    }

    // Decode payload
    const payload = decodePayload(sso)
    
    // Validate required fields
    if (!payload.nonce || !payload.email || !payload.username) {
      return null
    }

    return payload
  } catch (error) {
    console.error('SSO validation error:', error)
    return null
  }
}

/**
 * Create user object for Discourse SSO from our user data
 */
export function createDiscourseUser(
  user: {
    id: string
    name: string | null
    email: string
    image?: string | null
    displayName?: string | null
  }
): DiscourseSSOUser {
  // Use display name if available, otherwise use real name, fallback to email username
  const username = user.displayName || user.name || user.email.split('@')[0]
  
  // Clean username for Discourse (alphanumeric, underscores, hyphens only)
  const cleanUsername = username
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')

  return {
    email: user.email,
    username: cleanUsername,
    name: user.name || user.email.split('@')[0],
    external_id: user.id,
    avatar_url: user.image || undefined,
    bio: user.displayName ? `Display name: ${user.displayName}` : undefined,
    admin: false,
    moderator: false,
    suppress_welcome_message: false,
  }
}
