import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse courriel invalide'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
})

export type SignUpInput = z.infer<typeof signUpSchema>

export function validateSignUpInput(input: unknown) {
  return signUpSchema.safeParse(input)
}
