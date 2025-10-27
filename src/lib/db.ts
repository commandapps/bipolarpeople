import { sql } from '@vercel/postgres'
import bcrypt from 'bcryptjs'

export interface User {
  id: string
  name: string | null
  email: string
  emailVerified: Date | null
  image: string | null
  password: string | null
  displayName: string | null
  createdAt: Date
  updatedAt: Date
}

export interface VerificationToken {
  identifier: string
  token: string
  expires: Date
}

export interface PasswordResetToken {
  email: string
  token: string
  expires: Date
}

// User CRUD operations
export async function createUser(userData: {
  name: string
  email: string
  password: string
  displayName?: string
}): Promise<User> {
  const hashedPassword = await bcrypt.hash(userData.password, 12)
  
  const result = await sql`
    INSERT INTO users (name, email, password, display_name, created_at, updated_at)
    VALUES (${userData.name}, ${userData.email}, ${hashedPassword}, ${userData.displayName || null}, NOW(), NOW())
    RETURNING id, name, email, email_verified, image, password, display_name, created_at, updated_at
  `
  
  return {
    id: result.rows[0].id,
    name: result.rows[0].name,
    email: result.rows[0].email,
    emailVerified: result.rows[0].email_verified,
    image: result.rows[0].image,
    password: result.rows[0].password,
    displayName: result.rows[0].display_name,
    createdAt: result.rows[0].created_at,
    updatedAt: result.rows[0].updated_at,
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await sql`
    SELECT id, name, email, email_verified, image, password, display_name, created_at, updated_at
    FROM users
    WHERE email = ${email}
  `
  
  if (result.rows.length === 0) return null
  
  const row = result.rows[0]
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    emailVerified: row.email_verified,
    image: row.image,
    password: row.password,
    displayName: row.display_name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function getUserById(id: string): Promise<User | null> {
  const result = await sql`
    SELECT id, name, email, email_verified, image, password, display_name, created_at, updated_at
    FROM users
    WHERE id = ${id}
  `
  
  if (result.rows.length === 0) return null
  
  const row = result.rows[0]
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    emailVerified: row.email_verified,
    image: row.image,
    password: row.password,
    displayName: row.display_name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function updateUser(id: string, updates: Partial<{
  name: string
  displayName: string
  emailVerified: Date
}>): Promise<User | null> {
  const setClause = []
  const values = []
  let paramIndex = 1
  
  if (updates.name !== undefined) {
    setClause.push(`name = $${paramIndex}`)
    values.push(updates.name)
    paramIndex++
  }
  
  if (updates.displayName !== undefined) {
    setClause.push(`display_name = $${paramIndex}`)
    values.push(updates.displayName)
    paramIndex++
  }
  
  if (updates.emailVerified !== undefined) {
    setClause.push(`email_verified = $${paramIndex}`)
    values.push(updates.emailVerified)
    paramIndex++
  }
  
  if (setClause.length === 0) return null
  
  setClause.push(`updated_at = NOW()`)
  values.push(id)
  
  const result = await sql`
    UPDATE users 
    SET ${sql.unsafe(setClause.join(', '))}
    WHERE id = ${id}
    RETURNING id, name, email, email_verified, image, password, display_name, created_at, updated_at
  `
  
  if (result.rows.length === 0) return null
  
  const row = result.rows[0]
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    emailVerified: row.email_verified,
    image: row.image,
    password: row.password,
    displayName: row.display_name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function updateUserPassword(id: string, newPassword: string): Promise<boolean> {
  const hashedPassword = await bcrypt.hash(newPassword, 12)
  
  const result = await sql`
    UPDATE users 
    SET password = ${hashedPassword}, updated_at = NOW()
    WHERE id = ${id}
  `
  
  return result.rowCount > 0
}

export async function deleteUser(id: string): Promise<boolean> {
  const result = await sql`
    DELETE FROM users WHERE id = ${id}
  `
  
  return result.rowCount > 0
}

// Verification token operations
export async function createVerificationToken(token: VerificationToken): Promise<void> {
  await sql`
    INSERT INTO verification_tokens (identifier, token, expires)
    VALUES (${token.identifier}, ${token.token}, ${token.expires})
  `
}

export async function getVerificationToken(token: string): Promise<VerificationToken | null> {
  const result = await sql`
    SELECT identifier, token, expires
    FROM verification_tokens
    WHERE token = ${token} AND expires > NOW()
  `
  
  if (result.rows.length === 0) return null
  
  const row = result.rows[0]
  return {
    identifier: row.identifier,
    token: row.token,
    expires: row.expires,
  }
}

export async function deleteVerificationToken(token: string): Promise<void> {
  await sql`
    DELETE FROM verification_tokens WHERE token = ${token}
  `
}

// Password reset token operations
export async function createPasswordResetToken(token: PasswordResetToken): Promise<void> {
  await sql`
    INSERT INTO password_reset_tokens (email, token, expires)
    VALUES (${token.email}, ${token.token}, ${token.expires})
  `
}

export async function getPasswordResetToken(token: string): Promise<PasswordResetToken | null> {
  const result = await sql`
    SELECT email, token, expires
    FROM password_reset_tokens
    WHERE token = ${token} AND expires > NOW()
  `
  
  if (result.rows.length === 0) return null
  
  const row = result.rows[0]
  return {
    email: row.email,
    token: row.token,
    expires: row.expires,
  }
}

export async function deletePasswordResetToken(token: string): Promise<void> {
  await sql`
    DELETE FROM password_reset_tokens WHERE token = ${token}
  `
}

// Password verification
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Check if email exists
export async function emailExists(email: string): Promise<boolean> {
  const result = await sql`
    SELECT 1 FROM users WHERE email = ${email}
  `
  
  return result.rows.length > 0
}
