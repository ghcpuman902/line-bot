import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server'

export async function POST() {
  const result = await kv.lrange( 'eventlist', 0 , -1);
  await kv.del( 'eventlist' );
  
  return NextResponse.json({ result })
}