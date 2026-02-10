import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { authAdapter } from '@/features/auth/domain/auth.adapter'
import { validateSignUpInput } from './sign-up.service'

export function useSignUp() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  const handleSignUp = async (
    name: string,
    email: string,
    password: string,
  ) => {
    setError(null)

    const validation = validateSignUpInput({ name, email, password })
    if (!validation.success) {
      setError(validation.error.issues[0].message)
      return
    }

    setIsPending(true)
    try {
      await authAdapter.signUp(name, email, password)
      await router.invalidate()
      await router.navigate({ to: '/' })
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de l'inscription",
      )
    } finally {
      setIsPending(false)
    }
  }

  return { handleSignUp, error, isPending }
}
