import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in the environment variables.');
}
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateBlogPost(prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that generates short blog post content." },
        { role: "user", content: `Write a blog post about: ${prompt}. Keep it under 50 words.` }
      ],
      max_tokens: 60,
      temperature: 0.7,
    });

    return response.choices[0].message.content || 'Unable to generate content';
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw new Error('Failed to generate blog post');
  }
}