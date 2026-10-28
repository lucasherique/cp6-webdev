import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome (mínimo 2 caracteres)'),
  email: z.string().trim().min(1, 'Informe seu e-mail').email('E-mail inválido'),
  message: z
    .string()
    .trim()
    .min(20, 'Mensagem com no mínimo 20 caracteres')
    .max(1000, 'Mensagem com no máximo 1000 caracteres'),
  website: z.string().optional(), // honeypot anti-spam: humanos não preenchem
})

export type ContactFormValues = z.infer<typeof contactSchema>
