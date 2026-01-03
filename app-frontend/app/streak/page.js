"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StreakPage() {
  const router = useRouter();
  const [streak, setStreak] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStreak() {
      try {
        const res = await fetch("http://localhost:8080/entry/streak", {
          headers: {
            Authorization: "Bearer testuser",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch streak");
        }

        const data = await res.json();
        setStreak(typeof data === "number" ? data : data.streak);
      } catch (err) {
        setError("Could not load streak");
      }
    }

    fetchStreak();
  }, []);

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #9cc8edff 0%, #F3C9D8 45%, #FBC7E0 100%)",
      }}
      className="min-h-screen flex flex-col items-center"
    >
      {/* TITLE — DESKTOP SAME */}
      <h1
        className="text-5xl font-bold text-black font-[marcellus] py-20
                   max-md:text-3xl max-md:py-12 max-md:text-center"
      >
        Your Writing Streak
      </h1>

      {error && (
        <p
          className="text-red-600 text-lg font-semibold
                     max-md:text-base max-md:px-4 text-center"
        >
          {error}
        </p>
      )}

      {/* STREAK CARD */}
      {streak !== null && (
        <div
          className="bg-white rounded-xl shadow-lg p-10 text-center
                     max-md:p-6 max-md:mx-4 max-md:w-full"
        >
          <p className="text-7xl font-bold text-black max-md:text-5xl">
            {streak}
          </p>
          <p className="text-xl mt-4 text-gray-700 max-md:text-base">
            🔥 Days in a row
          </p>
        </div>
      )}

      {/* BUTTONS — DESKTOP SAME */}
      <div className="flex flex-col mt-10">
        {streak !== null && (
          <button
            type="button"
            className="bg-[#a1f1deff] p-2 h-10 w-44 text-black rounded font-bold
                       max-md:w-full"
            onClick={() => router.push("/add")}
          >
            Continue Streak
          </button>
        )}

        <button
          type="button"
          className="bg-[#a1f1deff] p-2 h-10 mt-5 w-30 ml-6 text-black rounded font-bold
                     max-md:ml-0 max-md:w-full"
          onClick={() => router.push("/home")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
