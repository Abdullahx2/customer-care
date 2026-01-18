import type { UIMessage } from 'ai'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { id, message } = await readValidatedBody(
    event,
    z.object({
      id: z.string(),
      message: z.custom<UIMessage>(),
    }).parse
  )

  // 🔴 DB COMPLETELY DISABLED FOR VERCEL
  // Direct response so chat works

  return {
    id,
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: 'Message received. AI response will be handled on frontend.',
      },
    ],
  }
})
