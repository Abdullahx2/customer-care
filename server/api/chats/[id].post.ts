export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log('📨 Message received:', body)
    
    // 🔥 HAR MESSAGE KA FIXED REPLY
    return {
      id: 'ai-' + Date.now(),
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: 'Thank you for your message. I am your customer care AI assistant. How can I help you today?'
        }
      ]
    }
    
  } catch (error) {
    return {
      id: 'error',
      role: 'assistant',
      parts: [{ type: 'text', text: 'Sorry, technical issue.' }]
    }
  }
})
