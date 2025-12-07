"use client";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: any) {
    e.preventDefault();
    alert("Demo Login - No backend connected yet");
  }

  return (
    <main className="flex flex-col items-center mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <form onSubmit={handleLogin} className="w-80 space-y-4">
        <input
          className="border p-2 rounded w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          type="submit"
        >
          Login
        </button>

        <div className="text-sm flex justify-between">
          <Link href="/forgot-password" className="text-blue-500">Forgot Password?</Link>
          <Link href="/signup" className="text-blue-500">Create Account</Link>
        </div>
      </form>
    </main>
  );
}
