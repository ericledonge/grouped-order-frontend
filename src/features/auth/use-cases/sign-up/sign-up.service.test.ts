import { describe, it, expect } from 'vitest'
import { validateSignUpInput } from './sign-up.service'

describe('validateSignUpInput', () => {
  it('should return valid for correct input', () => {
    const result = validateSignUpInput({
      name: 'Jean Dupont',
      email: 'jean@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(true)
  })

  it('should return invalid for name too short', () => {
    const result = validateSignUpInput({
      name: 'J',
      email: 'jean@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Le nom doit contenir au moins 2 caractères',
      )
    }
  })

  it('should return invalid for malformed email', () => {
    const result = validateSignUpInput({
      name: 'Jean Dupont',
      email: 'not-an-email',
      password: 'password123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Adresse courriel invalide')
    }
  })

  it('should return invalid for password too short', () => {
    const result = validateSignUpInput({
      name: 'Jean Dupont',
      email: 'jean@example.com',
      password: '1234567',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Le mot de passe doit contenir au moins 8 caractères',
      )
    }
  })

  it('should return invalid for missing fields', () => {
    const result = validateSignUpInput({})
    expect(result.success).toBe(false)
  })
})
