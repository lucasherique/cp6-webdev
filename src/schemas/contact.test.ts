import { describe, expect, it } from 'vitest'
import { contactSchema } from './contact'

const valid = {
  name: 'Ana Souza',
  email: 'ana@exemplo.com',
  message: 'Olá! Gostei muito do seu portfólio.',
}

const messageOf = (input: object, field: string) => {
  const result = contactSchema.safeParse({ ...valid, ...input })
  if (result.success) return null
  return result.error.issues.find((i) => i.path[0] === field)?.message ?? null
}

describe('contactSchema', () => {
  it('aceita dados válidos', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })
  it('rejeita e-mail inválido com mensagem específica', () => {
    expect(messageOf({ email: 'ana@' }, 'email')).toBe('E-mail inválido')
  })
  it('exige e-mail preenchido', () => {
    expect(messageOf({ email: '' }, 'email')).toBe('Informe seu e-mail')
  })
  it('exige nome com 2+ caracteres', () => {
    expect(messageOf({ name: 'A' }, 'name')).toBe('Informe seu nome (mínimo 2 caracteres)')
  })
  it('exige mensagem com no mínimo 20 caracteres', () => {
    expect(messageOf({ message: 'curta' }, 'message')).toBe('Mensagem com no mínimo 20 caracteres')
  })
  it('limita a mensagem a 1000 caracteres', () => {
    expect(messageOf({ message: 'a'.repeat(1001) }, 'message')).toBe(
      'Mensagem com no máximo 1000 caracteres',
    )
  })
})
