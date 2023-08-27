import { kv } from '@vercel/kv';
import { type NextRequest, NextResponse } from 'next/server'
 
export async function POST(request: NextRequest) {

    const reqData = await request.json();
    const newItem = reqData.newItem;
    const now = new Date(); // Current date and time
    const utcTimestamp = now.toISOString(); 
  await kv.lpush( 'eventlist', `${utcTimestamp}: ${newItem}`);
  
  return NextResponse.json('success')
}