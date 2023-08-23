import fs from 'fs/promises'
import crypto from 'crypto'
import { type NextRequest } from 'next/server'
import { headers } from 'next/headers'
import path from 'path';

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

    const filePath = path.join(process.cwd(), 'app', 'api', 'events.json');
    // Read the existing data from the JSON file
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    // Push the new data into the existing data
    data.push(parsedBody);

    // Write the updated data back to the file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    console.log('Webhook event saved.');
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