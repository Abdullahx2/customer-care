import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // ✅ MULTIPLE WAYS TO GET USER MESSAGE
    const userText = 
      body?.message?.content ||
      body?.message?.parts?.[0]?.text ||
      body?.message?.text ||
      body?.text ||
      (typeof body === 'string' ? body : '')
    
    console.log('📨 Received body:', JSON.stringify(body).substring(0, 200))
    console.log('📝 Extracted text:', userText)
    
    if (!userText || userText.trim().length < 1) {
      return {
        id: 'empty-' + Date.now(),
        role: 'assistant',
        parts: [{ type: 'text', text: 'I received an empty message. Please type something.' }]
      }
    }
    
    // ✅ CUSTOMER CARE PROMPT
    const systemPrompt = `You are a senior customer care agent. Rules:
1. Always be polite and calm
2. Never blame or argue with client
3. Explain policies clearly
4. Show empathy
5. End conversation professionally

Example good reply: "Hello, thank you for contacting us. I understand your concern about free plays. Let me explain how our system works."`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userText }
      ],
      temperature: 0.7,
      max_tokens: 300
    })
    
    const aiReply = completion.choices[0]?.message?.content || 
      'Thank you for your message. How can I assist you?'
    
    console.log('🤖 AI Reply:', aiReply.substring(0, 100))
    
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
    
  } catch (error: any) {
    console.error('❌ AI Error:', error.message)
    
    return {
      id: 'error-' + Date.now(),
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'I apologize for the technical issue. Please try again.'
        }
      ]
    }
  }
})
