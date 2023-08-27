import fs from 'fs/promises'
import crypto from 'crypto'
import { headers } from 'next/headers'
import { kv } from '@vercel/kv';
import { type NextRequest, NextResponse } from 'next/server'
 
async function generateSignature(body: ArrayBuffer, channelSecret: string) {
  const keyData = new TextEncoder().encode(channelSecret);
  const key = await crypto.subtle.importKey(
    "raw", keyData,
    { name: "HMAC", hash: "SHA-256" },
    false, ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, body);
  const signatureArray = new Uint8Array(signature);
  const signatureBase64 = Buffer.from(signatureArray.buffer).toString('base64');
  return signatureBase64;
}

async function reply(replyToken: string, text: string) {
  const url = 'https://api.line.me/v2/bot/message/reply';
  const channelAccessToken = process.env.CHANNEL_ACCESS_TOKEN; // From your environment variables

  // Set headers
  const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${channelAccessToken}`,
  };

  // Set data to reply
  const data = {
      replyToken: replyToken,
      messages: [
          {
              type: 'text',
              text: text,
          },
      ],
  };

  // Use fetch to send the request
  await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
  });
}

// Example of LINE bot server
export async function POST(request: NextRequest) {
  try {
    const requestHeaders = headers();
    const lineSignature = requestHeaders.get('x-line-signature')

    if (!lineSignature) {
      return new Response('No signature', {
        status: 401
      })
    }

    const channelSecret = process.env.CHANNEL_SECRET;
    if (!channelSecret) {
      throw new Error("CHANNEL_SECRET is not defined");
    }

    const bodyBuffer = await request.arrayBuffer();
    const body = new TextDecoder('utf-8').decode(bodyBuffer);
    const parsedBody = JSON.parse(body);

    const signature = await generateSignature(bodyBuffer, channelSecret);
    if (signature !== lineSignature) {
      return new Response('Unauthorized', {
        status: 401
      });
    }

    for (const event of parsedBody.events) {
        if (event.type === 'message' && event.message.type === 'text') {
            await reply(event.replyToken, event.message.text);
        }
    }

    // Save raw input as a log
    const newItem = JSON.stringify(parsedBody);
    const now = new Date(); // Current date and time
    const utcTimestamp = now.toISOString(); 
    await kv.lpush('eventlist', `${utcTimestamp}: ${newItem}`);

    // Save user messages with just the time and content
    for (const event of parsedBody.events) {
      if (event.type === 'message' && event.message.type === 'text') {
        const userId = event.source.userId;
        const messageContent = event.message.text;
        const messageTimestamp = new Date(event.timestamp).toISOString();
        await kv.rpush(`user:${userId}`, `${messageTimestamp}: ${messageContent}`);
      }
    }

    console.log('Webhook events saved.');
  } catch (error) {
    console.error('Error saving webhook event: ', error);
    return new Response('Internal Server Error', {
      status: 500
    });
  }

  return new Response('OK', {
    status: 200
  });
}