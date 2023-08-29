'use client';

export default function Home() {

  return (
    <main className="max-w-xl min-w-md mx-auto mt-6">
      <h1 className="text-4xl font-bold text-center mb-4">Welcome to Line Bot Webhook Endpoint</h1>
      <p className="text-center mb-6">
        This is a webhook endpoint for receiving events from a Line Bot and replying to them, with feature to store incoming messages in Vercel KV.
      </p>
      <p className="text-center">
        This project is developed by <a href="https://github.com/ghcpuman902" className="text-blue-500 hover:text-blue-400 underline">Mangle Kuo</a>. Check out the code and more information on <a href="https://github.com/ghcpuman902/line-bot" className="text-blue-500 hover:text-blue-400 underline">GitHub</a>.
      </p>
    </main>
  )
}