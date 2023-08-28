'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [list, setList] = useState<Array<{timestamp: string, role: string, id: string, content: string}> | null>([]);
  const [userId, setUserId] = useState('');
  const [userProfile, setUserProfile] = useState<{ displayName: string, pictureUrl: string, language: string } | null>(null);


  const fetchProfileAndMessages = async () => {
    try {
      // Fetch user messages
      const res = await fetch(`/api/messages/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const getMessages = await res.json();
      const messagesResult = getMessages.result;
      setList(messagesResult);

      // Fetch user profile
      const profileRes = await fetch(`/api/profiles/${userId}`);
      const profileResult = await profileRes.json();
      if (profileResult.displayName && profileResult.pictureUrl && profileResult.language) {
        setUserProfile(profileResult);
      }

    } catch (error) {
      console.error(error);
      setList([{ timestamp: '', role: '', id: '', content: 'Could not fetch messages' }]);
    }
  }

  useEffect(() => {
    fetchProfileAndMessages();
  }, [userId, fetchProfileAndMessages]);


  const handleClearMessages = async () => {
    try {
      // Make the delete request
      const res = await fetch(`/api/messages/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await res.json();

      // If there was an error returned from the server 
      if (result.error) {
        throw new Error(result.error);
      }else if(result.success) {
        // Clear the messages data in the state if delete was successful
        setList([]);
        alert(result.success);
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting messages. Please try again later.');
    }
  }

  return (
    <main className="max-w-xl min-w-md mx-auto mt-6">

      <div className="my-5 flex flex-col items-start flex-nowrap">
        <input className="border rounded border-slate-600 px-2 w-full bg-black" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter user ID" />
        <button className="border rounded mt-2 border-slate-600 px-2 w-full" onClick={() => setUserId(userId)}>Load Messages</button>
      </div>

      {userProfile ? (
        <div className="my-5">
          <Image src={userProfile.pictureUrl} alt={userProfile.displayName} className="rounded-full h-24 w-24" />
          <h1 className="text-2xl font-bold mt-4">{userProfile.displayName}</h1>
          <h2 className="text-xl mt-2">{`Preferred Language: ${userProfile.language}`}</h2>
      <button className="border rounded mt-2 border-slate-600 px-2 w-full" onClick={handleClearMessages}>Clear Messages</button>
        </div>
      ) : null}
      
      <table className="table-auto border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600 p-2">Timestamp</th>
            <th className="border border-slate-600 p-2">Role</th>
            <th className="border border-slate-600 p-2">Content</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((item, idx) => {return (<tr key={item.id}><td className="border border-slate-700 p-2">{item.timestamp}</td><td className="border border-slate-700 p-2">{item.role}</td><td className="border border-slate-700 p-2">{item.content}</td></tr>);})}
        </tbody>
      </table>
    </main>
  )
}