import { kv } from '@vercel/kv';
import { type NextRequest, NextResponse } from 'next/server'

// The userId should be passed as a parameter
export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  if (!params.userId) {
    return NextResponse.json({ error: 'params.userId parameter is required' })
  }
  
  // Fetch user messages from Redis
  const messages = await kv.lrange(`user:${params.userId}`, 0, -1);

  // Convert the string messages to an array of objects
  const result = messages.map(message => {
    const [timestamp, id, content] = message.split(': ');
    return { timestamp, id, content };
  });

  return NextResponse.json({ result });
}