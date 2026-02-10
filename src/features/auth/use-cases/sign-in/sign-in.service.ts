import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('Adresse courriel invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
})

export type SignInInput = z.infer<typeof signInSchema>

export function validateSignInInput(input: unknown) {
  return signInSchema.safeParse(input)
}
