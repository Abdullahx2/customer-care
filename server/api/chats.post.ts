import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { id, message } = body

    // ✅ SAFE text extraction
    const userText =
      message?.parts?.[0]?.text ||
      message?.content ||
      ''

    if (!userText) {
      throw new Error('Empty message')
    }

    // ✅ OpenAI call
    await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a customer care expert. Always be polite, clear, and professional.'
        },
        {
          role: 'user',
          content: userText
        }
      ],
      temperature: 0.7
    })

    // ✅ Frontend ko sirf chat meta chahiye
    return {
      id: id || crypto.randomUUID(),
      title: userText.substring(0, 30),
      userId: 'temporary-user'
    }
  } catch (error) {
    console.error('Chats API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Chat creation failed'
    })
  }
})
