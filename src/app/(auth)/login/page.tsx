import { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Sign In - Bipolar People',
  description: 'Sign in to your Bipolar People account to access our community forum and resources.',
}

export default function LoginPage() {
  return <LoginForm />
}
