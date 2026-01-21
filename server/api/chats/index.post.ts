export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Extract user message
    const userMessage = body?.message?.content || 
                       body?.message?.parts?.[0]?.text || 
                       body?.message || 
                       ''
    
    // Create chat ID
    const chatId = crypto.randomUUID()
    
    console.log('✅ Chat created:', chatId, 'Message:', userMessage.substring(0, 50))
    
    // Return what frontend expects
    return {
      id: chatId,
      title: userMessage.substring(0, 30) || 'Customer Query',
      userId: 'trainee'
    }
    
  } catch (error) {
    console.error('❌ Chat creation error:', error)
    
    // Still return valid chat ID even on error
    return {
      id: 'error-' + Date.now(),
      title: 'Error Chat',
      userId: 'error'
    }
  }
})
