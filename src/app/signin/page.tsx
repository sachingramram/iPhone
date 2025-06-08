// src/app/signin/page.tsx
'use client';

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => signIn("google")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}
