"use client";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function handleReset(e: any) {
    e.preventDefault();
    alert("Password reset link sent — Demo only");
  }

  return (
    <main className="flex flex-col items-center mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6">Reset Password</h1>

      <form onSubmit={handleReset} className="w-80 space-y-4">
        <input
          className="border p-2 rounded w-full"
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Send Reset Link
        </button>

        <p className="text-sm text-center mt-2">
          Go back to{" "}
          <Link href="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </main>
  );
}
