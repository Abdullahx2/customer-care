import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const userText = body?.message || ''
    
    if (!userText.trim()) {
      return {
        id: 'empty-' + Date.now(),
        role: 'assistant',
        parts: [{ type: 'text', text: 'Please type your message.' }]
      }
    }
    
    // ✅ CUSTOMER CARE RULES
    const systemPrompt = `You are a customer care expert. Always be polite, never blame client, explain clearly.`
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userText }
      ],
      temperature: 0.7
    })
    
    const aiReply = completion.choices[0]?.message?.content || 
      'Thank you for contacting support.'
    
    // ✅ SAHI FORMAT
    return {
      id: 'ai-' + Date.now(),
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: aiReply
        }
      ]
    }
    
  } catch (error) {
    return {
      id: 'error-' + Date.now(),
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'Sorry, technical issue. Please try again.'
        }
      ]
    }
  }
})
