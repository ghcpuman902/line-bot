import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server'

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
 
export async function GET() {
  
  const result = await kv.lrange( 'eventlist', 0 , -1);
  
  return NextResponse.json({ result })
}