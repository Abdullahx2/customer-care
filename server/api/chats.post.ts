import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { id, message } = body

    // OpenAI call
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a customer care expert. Always be polite, never blame the client, explain clearly, and end professionally.`
        },
        {
          role: 'user',
          content: message.parts?.[0]?.text || message
        }
      ],
      temperature: 0.7
    })

    const reply = completion.choices[0]?.message?.content || 'Sorry, I could not generate a reply.'

    // ✅ Frontend expects this structure
    return {
      id: id || crypto.randomUUID(),
      title: (message.parts?.[0]?.text || 'New Chat').substring(0, 30),
      userId: 'temporary-user'
    }
  } catch (error) {
    console.error('OpenAI error:', error)
    return {
      id: 'error',
      title: 'Error',
      userId: 'error'
    }
  }
})
