'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [list,setList] = useState<Array<string> | null>([]);

  useEffect(() => {
    const fetchExample = async () => {
      try {
        const res = await fetch('/api/kv/DeleteAll', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const getExample = await res.json()
        const result: Array<string> | null = getExample.result;
        console.log(result);
        setList(result);

      } catch (error) {
        console.error(error);
        setList(['Could not fetch example']);
      }
    }

    fetchExample();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-prose w-full items-left justify-between font-mono text-sm flex flex-col">
        <h1>Deleted:</h1>
          {list?.map((item, idx) => {return (<div key={idx}>{item}</div>);})}
      </div>
    </main>
  )
}
