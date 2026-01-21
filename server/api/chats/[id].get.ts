export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {}
  
  // Return dummy chat data
  return {
    id: id || 'demo-chat',
    title: 'Customer Care Training',
    userId: 'trainee',
    messages: [
      {
        id: 'welcome-msg',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: 'Hello! I am your customer care training assistant. How can I help you today?'
          }
        ],
        createdAt: new Date().toISOString()
      }
    ]
  }
})
