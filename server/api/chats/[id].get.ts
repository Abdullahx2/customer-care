export default defineEventHandler(async (event) => {
  const { id } = event.context.params!

  return {
    id,
    title: 'New Chat',
    messages: [
      {
        id: 'user-1',
        role: 'user',
        content: 'Hi'
      },
      {
        id: 'assistant-1',
        role: 'assistant',
        content: 'Hello 👋 How can I help you?'
      }
    ]
  }
})
