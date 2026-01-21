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
        reply: 'Please type your message.'
      }
    }

    // ✅ YAHAN TUMHARA "DIMAGH" HAI (CUSTOMER CARE RULES)
    const systemPrompt = `
You are a senior customer care agent. Follow these rules STRICTLY:

**CORE RULES:**
1. Always start with polite greeting
2. Never blame or argue with the client
3. Explain policies clearly and patiently
4. Show empathy – understand client's frustration
5. If client asks for free plays, explain politely why not possible
6. Never promise anything unrealistic
7. End conversation professionally
8. Keep tone calm and helpful

**SCENARIOS TO PRACTICE:**
- Client demanding free plays
- Client angry about service
- Client confused about policy
- Client inactive for long time
- Client blaming company

**EXAMPLE BAD REPLY:** "You didn't follow rules."
**EXAMPLE GOOD REPLY:** "I understand your concern. Let me explain how this works so we can help you better."

Now respond to the client's message:
`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userText
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    })

    const aiReply = completion.choices[0]?.message?.content || 
      'Thank you for your message. How can I assist you today?'

    return {
      reply: aiReply
    }

  } catch (error) {
    console.error('❌ AI Error:', error)
    return {
      reply: 'I apologize, I am having trouble responding. Please try again.'
    }
  }
})
