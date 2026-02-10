import { signIn, signUp, signOut } from '@/lib/auth-client'

export const authAdapter = {
  signIn: async (email: string, password: string) => {
    const result = await signIn.email({ email, password })
    if (result.error) {
      throw new Error(result.error.message || 'Erreur de connexion')
    }
    return result.data
  },

  signUp: async (name: string, email: string, password: string) => {
    const result = await signUp.email({ name, email, password })
    if (result.error) {
      throw new Error(result.error.message || "Erreur lors de l'inscription")
    }
    return result.data
  },

  signOut: async () => {
    await signOut()
  },
}
