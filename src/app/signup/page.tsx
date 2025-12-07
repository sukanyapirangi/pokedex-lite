"use client";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(e: any) {
    e.preventDefault();
    alert("Demo Signup - No backend yet");
  }

  return (
    <main className="flex flex-col items-center mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>

      <form onSubmit={handleSignup} className="w-80 space-y-4">
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
          placeholder="Password (min 6)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Sign Up
        </button>

        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">Login</Link>
        </div>
      </form>
    </main>
  );
}
