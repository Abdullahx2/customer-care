import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const userText =
      body?.message?.content ||
      body?.message?.parts?.[0]?.text ||
      ''

    if (!userText) {
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

    return {
      role: 'assistant',
      content:
        completion.choices[0]?.message?.content ||
        'Thank you for contacting support.'
    }
  } catch (error) {
    return {
      role: 'assistant',
      content: 'Something went wrong. Please try again.'
    }
  }
})
