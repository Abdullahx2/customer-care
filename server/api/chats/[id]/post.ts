import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { message } = body

    const userText =
      message?.content ||
      message?.parts?.[0]?.text ||
      String(message || '')

    if (!userText.trim()) {
      return { reply: 'Please type a message.' }
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a polite and helpful customer care assistant.'
        },
        {
          role: 'user',
          content: userText
        }
      ],
      temperature: 0.7
    })

    return {
      reply:
        completion.choices[0]?.message?.content ||
        'How can I help you?'
    }
  } catch (err) {
    console.error(err)
    return {
      reply:
        'Sorry, something went wrong. Please try again.'
    }
  }
})
