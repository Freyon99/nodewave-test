"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
  });

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !form.firstName ||
      !form.lastName ||
      !form.phone ||
      !form.country ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      showNotification("Please fill all fields", "error");
      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      showNotification("Password not match", "error");
      return;
    }

  const userData = {
  firstName: form.firstName,
  lastName: form.lastName,
  phone: form.phone,
  country: form.country,
  email: form.email,
  password: form.password,
  about: form.about,
};

localStorage.setItem(
  "user",
  JSON.stringify(userData)
);
showNotification("Registration successful! Redirecting…", "success");

window.setTimeout(() => {
  router.push("/login");
}, 800);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f5f5] px-4 py-10">
      {/* BG */}
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

      <div className="relative z-10 w-full max-w-2xl">
        {/* TITLE */}
        <div className="mb-10 text-center">
          <h1 className="text-6xl font-bold text-[#3f3d4d]">
            Register
          </h1>

          <p className="mt-4 text-sm text-neutral-400">
            Let&apos;s Sign up first for enter into website.
          </p>
        </div>

        {/* CARD */}
        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >
            {/* FIRST & LAST */}
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="h-12 rounded-xl"
              />

              <Input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="h-12 rounded-xl"
              />
            </div>

            {/* PHONE & COUNTRY */}
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="h-12 rounded-xl"
              />

              <Input
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                className="h-12 rounded-xl"
              />
            </div>

            {/* EMAIL */}
            <Input
              name="email"
              type="email"
              placeholder="Mail Address"
              value={form.email}
              onChange={handleChange}
              className="h-12 rounded-xl"
            />

            {/* PASSWORD */}
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="h-12 rounded-xl"
              />

              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="h-12 rounded-xl"
              />
            </div>

            {/* ABOUT */}
            <textarea
              name="about"
              placeholder="Tell us about yourself..."
              value={form.about}
              onChange={handleChange}
              className="min-h-35 w-full rounded-2xl border border-neutral-200 p-4 outline-none"
            />

            {/* BUTTONS */}
            <div className="grid grid-cols-2 gap-4">
              <Link href="/login">
                <Button
                  type="button"
                  variant="secondary"
                  className="h-12 w-full rounded-xl"
                >
                  Login
                </Button>
              </Link>

              <Button className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700">
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}