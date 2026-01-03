"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AddEntryPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/entry/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer testuser",
      },
      body: JSON.stringify({
        title,
        content,
        mood,
        date: new Date().toISOString(),
      }),
    });

    if (res.ok) {
      setMessage("Entry added successfully!");
      setTitle("");
      setContent("");
      setMood("");
    } else {
      setMessage("Failed to add entry.");
    }
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        router.push("/delete");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [message, router]);

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #9cc8edff 0%, #F3C9D8 45%, #FBC7E0 100%)",
      }}
      className="min-h-screen"
    >
      {/* TITLE — DESKTOP SAME */}
      <h1
        className="text-5xl font-bold ml-115 text-black font-[marcellus] py-20
                   max-md:ml-0 max-md:text-center max-md:text-3xl max-md:py-12"
      >
        Add New Diary Entry
      </h1>

      {/* FORM — DESKTOP SAME */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 -mt-5 ml-70 w-[60%]
                   max-md:ml-0 max-md:w-full max-md:px-4"
      >
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
          className="text-black p-3 text-lg border border-gray-300 rounded-md bg-white"
        />

        <textarea
          value={content}
          placeholder="Write your diary entry..."
          onChange={(e) => setContent(e.target.value)}
          required
          rows={6}
          className="text-black p-3 text-lg border border-gray-300 rounded-md bg-white resize-none"
        />

        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
          className="text-black p-3 text-lg border border-gray-300 rounded-md bg-white"
        >
          <option value="">Select Mood</option>
          <option value="happy">😊 Happy</option>
          <option value="sad">😔 Sad</option>
          <option value="angry">😡 Angry</option>
          <option value="excited">🤩 Excited</option>
          <option value="stressed">😫 Stressed</option>
        </select>

        <button
          type="submit"
          className="p-3 text-lg rounded-md mt-2"
          style={{
            backgroundColor: "#a1f1deff",
            color: "black",
          }}
        >
          Add Entry
        </button>

        {/* BACK BUTTON — DESKTOP SAME */}
        <button
          type="button"
          className="bg-[#a1f1deff] p-2 h-10 w-30 text-black ml-90 rounded
                     max-md:ml-0 max-md:mx-auto"
          onClick={() => router.push("/home")}
        >
          Back
        </button>
      </form>

      {/* MESSAGE */}
      {message && (
        <p
          className="flex justify-center items-center mt-5 py-5
                     text-[#9cc8edff] font-bold text-lg
                     max-md:text-base max-md:px-4 text-center"
        >
          {message}
        </p>
      )}
    </div>
  );
}
