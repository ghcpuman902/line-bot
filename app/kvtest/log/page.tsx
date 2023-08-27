'use client';
import { useEffect, useState } from 'react';
import ReactJson from 'react-json-view'

export default function Home() {
  const [list,setList] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchExample = async () => {
      try {
        const res = await fetch('/api/kv/LogListAll', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
        })
        const getExample = await res.json()
        const result: Array<string> | null = getExample.result;
        console.log(result);
        setList(result?result:['']);

      } catch (error) {
        console.error(error);
        setList([`'error':"Could not fetch example"`]);
      }
    }

    fetchExample();
  }, []);

  return (
    <main className="mt-2">
        <ReactJson collapsed={2} enableClipboard={false} src={list.map(item => {
  let colonIndex = item.indexOf(`':`);
  let key = item.substring(1, colonIndex).trim();
  let value = item.substring(colonIndex + 2).trim();
  let parsedValue;
  try {
    parsedValue = JSON.parse(value);
  } catch(err) {
    console.error(`Unable to parse ${value}`);
  }
  return { [key]: parsedValue };
}).reduce((acc, curr) => ({...acc, ...curr}), {})} />
    </main>
  )
}
