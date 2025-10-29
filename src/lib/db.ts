import { sql } from '@vercel/postgres';

export interface User {
  id: number;
  email: string;
  username: string;
  display_name: string | null;
  password_hash: string;
  email_verified: boolean;
  discourse_user_id: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface Session {
  id: number;
  user_id: number;
  session_token: string;
  expires: Date;
}

export const db = {
  // User operations
  async getUserByEmail(email: string): Promise<User | null> {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `;
    return result.rows[0] as User || null;
  },

  async getUserById(id: number): Promise<User | null> {
    const result = await sql`
      SELECT * FROM users WHERE id = ${id} LIMIT 1
    `;
    return result.rows[0] as User || null;
  },

  async createUser(data: {
    email: string;
    username: string;
    password_hash: string;
    display_name?: string;
  }): Promise<User> {
    const result = await sql`
      INSERT INTO users (email, username, password_hash, display_name)
      VALUES (${data.email}, ${data.username}, ${data.password_hash}, ${data.display_name || null})
      RETURNING *
    `;
    return result.rows[0] as User;
  },

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const result = await sql`
      UPDATE users 
      SET 
        email = COALESCE(${data.email}, email),
        username = COALESCE(${data.username}, username),
        display_name = COALESCE(${data.display_name}, display_name),
        email_verified = COALESCE(${data.email_verified}, email_verified),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return result.rows[0] as User;
  },

  async updateUserPassword(id: number, hashedPassword: string): Promise<void> {
    await sql`
      UPDATE users 
      SET password_hash = ${hashedPassword}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `;
  },

  // Token operations
  async createVerificationToken(userId: number, token: string): Promise<void> {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await sql`
      INSERT INTO verification_tokens (user_id, token, expires_at)
      VALUES (${userId}, ${token}, ${expiresAt.toISOString()})
    `;
  },

  async getVerificationToken(token: string) {
    const result = await sql`
      SELECT * FROM verification_tokens 
      WHERE token = ${token} AND expires_at > NOW()
      LIMIT 1
    `;
    return result.rows[0] || null;
  },

  async deleteVerificationToken(token: string): Promise<void> {
    await sql`DELETE FROM verification_tokens WHERE token = ${token}`;
  },

  // Password reset tokens
  async createPasswordResetToken(userId: number, token: string): Promise<void> {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await sql`
      INSERT INTO password_reset_tokens (user_id, token, expires_at)
      VALUES (${userId}, ${token}, ${expiresAt.toISOString()})
    `;
  },

  async getPasswordResetToken(token: string) {
    const result = await sql`
      SELECT * FROM password_reset_tokens 
      WHERE token = ${token} AND expires_at > NOW()
      LIMIT 1
    `;
    return result.rows[0] || null;
  },

  async deletePasswordResetToken(token: string): Promise<void> {
    await sql`DELETE FROM password_reset_tokens WHERE token = ${token}`;
  },

  // Session operations (for NextAuth)
  async createSession(userId: number, sessionToken: string, expires: Date): Promise<void> {
    await sql`
      INSERT INTO sessions (user_id, session_token, expires)
      VALUES (${userId}, ${sessionToken}, ${expires.toISOString()})
    `;
  },

  async getSession(sessionToken: string): Promise<Session | null> {
    const result = await sql`
      SELECT * FROM sessions 
      WHERE session_token = ${sessionToken} AND expires > NOW()
      LIMIT 1
    `;
    return result.rows[0] as Session || null;
  },

  async deleteSession(sessionToken: string): Promise<void> {
    await sql`DELETE FROM sessions WHERE session_token = ${sessionToken}`;
  },
};