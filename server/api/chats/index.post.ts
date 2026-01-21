export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('🎯 Chat create body:', body)
  
  return {
    id: crypto.randomUUID(),
    title: 'Customer Care Chat',
    userId: 'trainee'
  }
})
