import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { chatId, message } = body

    const userText =
      message?.content ||
      message?.parts?.[0]?.text ||
      ''

    if (!userText.trim()) {
      return {
        role: 'assistant',
        content: 'Please type a message.'
      }
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a polite, professional customer care assistant.'
        },
        {
          role: 'user',
          content: userText
        }
      ],
      temperature: 0.7
    })

    const reply =
      completion.choices[0]?.message?.content ||
      'Sorry, I could not reply.'

    return {
      role: 'assistant',
      content: reply
    }
  } catch (error) {
    console.error('Messages API error:', error)
    return {
      role: 'assistant',
      content: 'Something went wrong. Please try again.'
    }
  }
})
