'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [list, setList] = useState<Array<{timestamp: string, id: string, content: string}> | null>([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const getMessages = await res.json()
        const result: Array<{timestamp: string, id: string, content: string}> | null = getMessages.result;
        console.log(result);
        setList(result);

      } catch (error) {
        console.error(error);
        setList([{ timestamp: '', id: '', content: 'Could not fetch messages' }]);
      }
    }

    if (userId) {
      fetchMessages();
    }
  }, [userId]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter user ID" />
        <button onClick={() => setUserId(userId)}>Load Messages</button>
      </div>
      <div className="z-10 max-w-prose w-full items-left justify-between font-mono text-sm flex flex-col">
          {list?.map((item, idx) => {return (<div key={item.id}>{item.timestamp} - {item.content}</div>);})}
      </div>
    </main>
  )
}