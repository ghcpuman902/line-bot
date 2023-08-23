'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [ex,setEx] = useState<string | null>('');
  const [inputValue, setInputValue] = useState('');

  const fetchExample = async () => {
    try {
      const data = {'newItem': inputValue};
      const res = await fetch('/api/kv/ListPush', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const getExample: string | null = await res.json();

      setEx(JSON.stringify(getExample));

    } catch (error) {
      console.error(error);
      setEx('Could not fetch example');
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-prose w-full items-center justify-between font-mono text-sm lg:flex">
        <input 
            className="form-input"
            type="text"
            placeholder="Enter your text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="ml-2 btn-blue" onClick={fetchExample}>
          Submit
        </button>
        <pre className="whitespace-pre overflow-auto mt-4">
          {ex}
        </pre>
      </div>
    </main>
  )
}