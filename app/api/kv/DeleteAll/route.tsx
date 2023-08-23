import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server'
 
export async function GET() {
  const result = await kv.lrange( 'eventlist', 0 , -1);
  await kv.del( 'eventlist' );
  
  return NextResponse.json({ result })
}