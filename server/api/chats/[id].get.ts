export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {}
  
  return {
    id: id || 'demo',
    title: 'Training Chat',
    userId: 'trainee',
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [{ type: 'text', text: 'Hello! I am your customer care trainer. Type your message below.' }]
      }
    ]
  }
})
