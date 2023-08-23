import fs from 'fs';
import path from 'path';

export default function Page() {
  const filePath = path.join(process.cwd(), 'app', 'edit', 'events.json');
  fs.appendFile(filePath, 'test' + '\n', ()=>{});
  const events = fs.readFileSync(filePath, 'utf8');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-prose w-full items-center justify-between font-mono text-sm lg:flex">
        <pre className="whitespace-pre overflow-auto">
          {events}
        </pre>
      </div>
    </main>
  )
}