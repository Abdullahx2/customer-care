import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const userText =
      body?.message?.content ||
      body?.message?.parts?.[0]?.text ||
      ""

    if (!userText.trim()) {
      return {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Please type a message."
      }
    }

    // ✅ CORRECT OpenAI v4 CALL
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: userText
    })

    const aiReply =
      response.output_text ||
      "Thank you for contacting support. How can I help you?"

    return {
      id: crypto.randomUUID(),
      role: "assistant",
      content: aiReply
    }
  } catch (error: any) {
    console.error("❌ Chat API Error:", error)

    return {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Sorry, there was a technical issue. Please try again."
    }
  }
})
