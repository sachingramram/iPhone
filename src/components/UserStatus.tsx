// src/components/UserStatus.tsx
'use client';
import { useSession, signOut, signIn } from "next-auth/react";

export default function UserStatus() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>Welcome, {session.user?.name}</p>
        <button onClick={() => signOut()} className="text-red-500">Logout</button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("google")} className="text-blue-500">
      Login
    </button>
  );
}
