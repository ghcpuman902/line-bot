import { kv } from '@vercel/kv';

async function getData() {
  const eventlist = await kv.lrange( 'eventlist', 0 , -1);
  const result = eventlist;
  return result;
}

export default async function Page() {
    const list = await getData();
    const logs = list.map(item => {
        let colonIndex = item.indexOf(`': `);
        let key = item.substring(1, colonIndex).trim();
        let value = item.substring(colonIndex + 3).trim();
        return {[key]:JSON.parse(value)};
    });
    return (
        <div className="w-full text-xs">
            <pre>{JSON.stringify(logs, null, 2)}</pre>
        </div>
    );
}



