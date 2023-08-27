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
    const [timestamp, role, id, content] = message.split(': ');
    return { timestamp, role, id, content };
  });

  return NextResponse.json({ result });
}

export async function DELETE(request: NextRequest, { params }: { params: { userId: string } }) {
  // Check if userId is provided in the request parameters 
  if (!params.userId) {
    return NextResponse.json({ error: 'params.userId parameter is required' })
  }
  
  // Attempt to delete user messages from the database
  try {
    await kv.del(`user:${params.userId}`);
  } catch (e) {
    // If an error occurs, respond with the error message
    return NextResponse.json({ error: `Error deleting messages for user ${params.userId}, Error: ${e}`});
  }
  
  // If successful, return a success message
  return NextResponse.json({ success: `Successfully deleted messages for user ${params.userId}`});
}