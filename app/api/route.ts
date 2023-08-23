import fs from 'fs/promises'
import crypto from 'crypto'
import { type NextRequest } from 'next/server'
import { headers } from 'next/headers'

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

// Example of LINE bot server
export async function POST(request: NextRequest) {
  try {
    // Get x-line-signature header value
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
    const signature = await generateSignature(bodyBuffer, channelSecret);
    if (signature !== lineSignature) {
      return new Response('Unauthorized', { status: 401 });
    }
    const body = await request.json();

    // Read the existing data from the JSON file
    const data = JSON.parse(await fs.readFile('../../public/events.json', 'utf-8'))

    // Push the new data into the existing data
    data.push(body)

    // Write the updated data back to the file
    await fs.writeFile('events.json', JSON.stringify(data, null, 2))

    console.log('Webhook event saved.')
  } catch (error) {
    console.error('Error saving webhook event: ', error)
  }

  // Process the event and send response back to the LINE platform
  return new Response(request.body, {
    status: 200
  })
}