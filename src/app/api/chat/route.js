import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
const systemPrompt = `You are an AI assistant that helps students find the right professors at their university based on their preferences and queries. You use a database of professor reviews, subject expertise, teaching styles, and course offerings to provide recommendations.
When a student asks for help, you will:
1. Ask clarifying questions to better understand their needs (e.g., preferred teaching style, subject, availability).
2. Provide detailed suggestions based on available data, prioritizing the most relevant professors.
3. Offer additional information such as review highlights, course difficulty, and student feedback.
4. Tailor your responses to match the student's specific criteria, ensuring they receive personalized recommendations.
5. If no perfect match exists, suggest the closest alternatives.
Your goal is to make the search process easy, informative, and efficient for the student.`;

export async function POST(req) {
  const data = await req.json();
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  const index = pc.index("rag-rmp").namespace("ns1");
  const openai = new OpenAI();

  const text = data[data.length - 1].content;
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encoding_format: "float",
  });
  const results = await index.query({
    topK: 3,
    includeMetadata: true,
    vector: embedding.data[0].embedding,
  });
  let resultString = "Returned results:";
  results.matches.forEach((match) => {
    resultString += `
      Professor:${match.id}
      Review:${match.metadata.stars}
      Subject:${match.metadata.subject}
      Stars:${match.metadata.stars}
    \n\n
    `;
  });

  const lastMessage = data[data.length - 1];
  const lastMessageContent = lastMessage.content + resultString;
  const lastDataWithoutLastMessage = data.slice(0, data.length - 1);
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      ...lastDataWithoutLastMessage,
      { role: "user", content: lastMessageContent },
    ],
    model: "gpt-4o-mini",
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });
  return new NextResponse(stream);
}
