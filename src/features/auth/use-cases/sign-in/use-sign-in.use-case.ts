import { useState } from 'react'
import { useRouter, useSearch } from '@tanstack/react-router'
import { authAdapter } from '@/features/auth/domain/auth.adapter'
import { validateSignInInput } from './sign-in.service'

export function useSignIn() {
  const router = useRouter()
  const { redirect: redirectTo } = useSearch({ from: '/login' })
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  const handleSignIn = async (email: string, password: string) => {
    setError(null)

    const validation = validateSignInInput({ email, password })
    if (!validation.success) {
      setError(validation.error.issues[0].message)
      return
    }

    setIsPending(true)
    try {
      await authAdapter.signIn(email, password)
      await router.invalidate()
      await router.navigate({ to: redirectTo || '/' })
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erreur de connexion',
      )
    } finally {
      setIsPending(false)
    }
  }

  return { handleSignIn, error, isPending }
}
