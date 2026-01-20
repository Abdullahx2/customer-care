import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { id, message } = body

    const userText =
      message?.parts?.[0]?.text ||
      message?.content ||
      String(message || '').slice(0, 500)

    if (!userText.trim()) {
      return {
        id: id || crypto.randomUUID(),
        title: 'Empty Query',
        userId: 'temp'
      }
    }

    const systemPrompt = `You are a senior customer care agent.
Always be polite, calm, professional, and helpful.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userText }
      ],
      temperature: 0.7,
      max_tokens: 300
    })

    const aiReply =
      completion.choices[0]?.message?.content ||
      "Thank you for contacting support."

    return {
      id: id || crypto.randomUUID(),
      title: userText.slice(0, 30),
      userId: 'customer',
      aiReply
    }
  } catch (error) {
    console.error(error)
    return {
      id: 'error',
      title: 'Support',
      userId: 'error',
      aiReply: 'Something went wrong. Please try again.'
    }
  }
})
