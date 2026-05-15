"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [notification, setNotification] = useState({
    type: "" as "success" | "error" | "",
    message: "",
  });

  const showNotification = (
    message: string,
    type: "success" | "error"
  ) => {
    setNotification({ message, type });

    window.setTimeout(() => {
      setNotification({ type: "", message: "" });
    }, 5000);
  };

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      showNotification("Please fill all fields", "error");
      return;
    }

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      showNotification("Account not found", "error");
      return;
    }

    const parsedUser = JSON.parse(savedUser);

    if (
      parsedUser.email === email &&
      parsedUser.password === password
    ) {
      localStorage.setItem("token", "login-success");
      showNotification("Login success! Redirecting…", "success");

      window.setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } else {
      showNotification("Wrong email or password", "error");
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f5f5] px-4">
      <div className="absolute top-0 h-70 w-full rounded-b-[60px] bg-white" />

      {/* NOTIFICATION POPUP */}
      {notification.message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div
            className={`rounded-3xl border px-6 py-4 text-sm font-medium shadow-lg ${
              notification.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-6xl font-bold text-[#3f3d4d]">
            Sign In
          </h1>
          <p className="mt-4 text-sm text-neutral-400">
            Just sign in if you have an account in here.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-medium text-sky-500">
                Your Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="h-12 rounded-xl"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-red-400">
                Password
              </label>

              <Input type="password" placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="h-12 rounded-xl"
              />
            </div>
            <Button className="h-12 w-full rounded-xl bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
          </form>
        </div>
        <p className="mt-6 text-center text-sm text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-blue-600"> Register </Link>
        </p>
      </div>
    </main>
  );
}