import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { message } = body

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
          content: message
        }
      ],
      temperature: 0.7
    })

    const reply = completion.choices[0]?.message?.content || 'Sorry, I could not generate a reply.'

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: reply
    }
  } catch (error) {
    console.error('OpenAI error:', error)
    return {
      id: 'error',
      role: 'assistant',
      content: 'I am having trouble responding. Please try again.'
    }
  }
})
