import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    if (!params.userId) {
      return NextResponse.json({ error: 'params.userId parameter is required' })
    }
    
    const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
    };
    
    const lineProfileUrl = `https://api.line.me/v2/bot/profile/${params.userId}`;
    const apiResponse = await fetch(lineProfileUrl, {
        method: 'GET',
        headers,
    });
  
    if (!apiResponse.ok) {
        throw new Error(`HTTPError: ${apiResponse.statusText}`);
    }
    
    const result = await apiResponse.json();
    
    return NextResponse.json(result);
  } 