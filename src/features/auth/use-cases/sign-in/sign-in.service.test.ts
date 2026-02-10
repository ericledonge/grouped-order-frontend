import { describe, it, expect } from 'vitest'
import { validateSignInInput } from './sign-in.service'

describe('validateSignInInput', () => {
  it('should return valid for correct input', () => {
    const result = validateSignInInput({
      email: 'test@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(true)
  })

  it('should return invalid for empty email', () => {
    const result = validateSignInInput({
      email: '',
      password: 'password123',
    })
    expect(result.success).toBe(false)
  })

  it('should return invalid for malformed email', () => {
    const result = validateSignInInput({
      email: 'not-an-email',
      password: 'password123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Adresse courriel invalide')
    }
  })

  it('should return invalid for empty password', () => {
    const result = validateSignInInput({
      email: 'test@example.com',
      password: '',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Le mot de passe est requis',
      )
    }
  })

  it('should return invalid for missing fields', () => {
    const result = validateSignInInput({})
    expect(result.success).toBe(false)
  })
})
