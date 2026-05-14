"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Search,
  Star,
  UserRound,
  LogOut,
} from "lucide-react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  selected: boolean;
}

export default function DashboardPage() {
const [search, setSearch] =
  useState("");

const [newTodo, setNewTodo] =
  useState("");

const [username, setUsername] =
  useState("");

const [todos, setTodos] = useState<
  Todo[]
>([
  {
    id: 1,
    title: "Hello",
    completed: false,
    selected: false,
  },
  {
    id: 2,
    title: "This",
    completed: true,
    selected: false,
  },
  {
    id: 3,
    title: "Good",
    completed: false,
    selected: false,
  },
]);

  // CTRL + /
  useEffect(() => {
    const handleShortcut = (
      e: KeyboardEvent
    ) => {
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();

        const input =
          document.getElementById(
            "search-input"
          ) as HTMLInputElement;

        input?.focus();
      }
    };

    window.addEventListener(
      "keydown",
      handleShortcut
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleShortcut
      );
    };
  }, []);
  
// GET USER
useEffect(() => {
  const savedUser =
    localStorage.getItem("user");

  if (savedUser) {
    const parsed =
      JSON.parse(savedUser);

    setUsername(
      `${parsed.firstName} ${parsed.lastName}`
    );
  }
}, []);

  // ADD TODO
  const handleAddTodo = () => {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now(),
      title: newTodo,
      completed: false,
      selected: false,
    };

    setTodos((prev) => [todo, ...prev]);

    setNewTodo("");
  };

  // COMPLETE
  const handleToggleComplete = (
    id: number
  ) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed:
                !todo.completed,
            }
          : todo
      )
    );
  };

  // SELECT
  const handleSelect = (
    id: number
  ) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              selected:
                !todo.selected,
            }
          : todo
      )
    );
  };

  // DELETE
  const handleDeleteSelected = () => {
    setTodos((prev) =>
      prev.filter(
        (todo) => !todo.selected
      )
    );
  };

  // SEARCH
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );
  }, [todos, search]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f5f5]">
      {/* TOP SHAPE */}
      <div className="absolute top-0 h-70 w-full rounded-b-[60px] bg-white" />

      {/* HEADER */}
      <header className="relative z-10 flex items-center justify-between px-10 py-6">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* STAR */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md">
            <Star className="h-6 w-6 text-yellow-500" />
          </div>

          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

            <input
              id="search-input"
              type="text"
              placeholder="Search... (Ctrl+/)"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-85 rounded-2xl border border-neutral-200 bg-white py-3 pl-12 pr-4 outline-none shadow-sm"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-2 shadow-md">
          {/* USER ICON */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
            <UserRound className="h-5 w-5 text-white" />
          </div>
          {/* USERNAME */}
          <span className="font-medium text-neutral-700">
          {username || "Loading..."}
          </span>

          {/* LOGOUT */}
          <button
            onClick={() => {
              localStorage.removeItem(
                "token"
              );

              window.location.href =
                "/login";
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500 transition hover:bg-red-200"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto mt-10 max-w-3xl rounded-[32px] bg-white p-10 shadow-xl">
        {/* TITLE */}
        <h1 className="mb-10 text-center text-5xl font-bold text-[#21428f]">
          To Do
        </h1>

        {/* ADD TODO */}
        <div className="mb-8 flex gap-4">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) =>
              setNewTodo(
                e.target.value
              )
            }
            className="h-14 flex-1 rounded-2xl border border-neutral-200 px-5 outline-none"
          />

          <button
            onClick={handleAddTodo}
            className="rounded-2xl bg-blue-600 px-8 font-medium text-white hover:bg-blue-700"
          >
            Add Todo
          </button>
        </div>

        {/* TODOS */}
        <div className="space-y-5">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              {/* LEFT */}
              <div className="flex items-center gap-5">
                {/* CHECKBOX */}
                <button
                  onClick={() =>
                    handleSelect(todo.id)
                  }
                  className={`flex h-6 w-6 items-center justify-center rounded-md border-2 ${
                    todo.selected
                      ? "border-blue-500 bg-blue-500"
                      : "border-neutral-300"
                  }`}
                >
                  {todo.selected && (
                    <span className="text-sm text-white">
                      ✓
                    </span>
                  )}
                </button>

                {/* TITLE */}
                <span
                  className={`text-2xl font-medium ${
                    todo.completed
                      ? "line-through text-neutral-400"
                      : "text-neutral-700"
                  }`}
                >
                  {todo.title}
                </span>
              </div>

              {/* STATUS */}
              <button
                onClick={() =>
                  handleToggleComplete(
                    todo.id
                  )
                }
                className={`flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold ${
                  todo.completed
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {todo.completed
                  ? "✓"
                  : "✕"}
              </button>
            </div>
          ))}
        </div>

        {/* DELETE */}
        <button
          onClick={handleDeleteSelected}
          className="mt-10 rounded-2xl bg-red-500 px-6 py-3 font-medium text-white hover:bg-red-600"
        >
          Delete Selected
        </button>
      </div>
    </main>
  );
}