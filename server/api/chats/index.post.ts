export default defineEventHandler(async () => {
  return {
    id: crypto.randomUUID(),
    title: 'New Chat',
    userId: 'guest'
  }
})
