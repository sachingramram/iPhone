// 'use client';

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-blue-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-sm text-gray-500">Sign in to continue</p>
        
        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center gap-3 px-5 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
        >
          <FcGoogle className="text-2xl" />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
