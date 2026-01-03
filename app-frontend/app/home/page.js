"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export default function HomePage() {
  const router=useRouter();
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/"); 
      } else {
        setLoading(false);  
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#95c9f7] via-[#ffcedf] to-[#FBC7E0]
                    flex p-6 max-md:flex-col max-md:p-4">

      {/* LEFT SECTION — DESKTOP SAME */}
      <div className="w-1/2 flex flex-col space-y-1
                      max-md:w-full max-md:items-center">

        <div>
          <img
            src="/image/logo.jpg"
            alt="Digital Diary"
            className="mx-auto mb-8 w-24 h-24 rounded-full shadow-lg border-purple-500 border-2"
          />
        </div>

        <div className="bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-10 max-w-2xl w-full
                        max-md:p-6">

          <h1 className="text-4xl font-bold text-gray-800 mb-6 font-[marcellus]
                         max-md:text-center max-md:text-2xl">
            Welcome to Digital Diary
          </h1>

          <p className="text-gray-700 text-lg mb-10
                        max-md:text-center max-md:text-base">
            Organize your memories, track your mood, and reflect on your day.
          </p>

          <div className="flex flex-col gap-4">

            <a
              href="/add"
              className="w-full py-3 bg-purple-200 hover:bg-blue-300 transition-colors rounded-lg font-medium text-gray-800"
            >
              ➕ Add New Entry
            </a>

            <a
              href="/delete"
              className="w-full py-3 bg-purple-200 hover:bg-red-300 transition-colors rounded-lg font-medium text-gray-800"
            >
              🗑️ Delete Entry
            </a>

            <a
              href="/about"
              className="w-full py-3 bg-purple-200 hover:bg-purple-300 transition-colors rounded-lg font-medium text-gray-800"
            >
              ℹ️ About Us
            </a>

            <a
              href="/streak"
              className="w-full py-3 bg-purple-200 hover:bg-purple-300 transition-colors rounded-lg font-medium text-gray-800"
            >
              🔥 Streak
            </a>

            <a
              href="/flashback"
              className="w-full py-3 bg-purple-200 hover:bg-red-300 transition-colors rounded-lg font-medium text-gray-800"
            >
              ⏳ Flashback
            </a>

            <a
              href="/profile/view"
              className="w-full py-3 bg-purple-200 hover:bg-red-300 transition-colors rounded-lg font-medium text-gray-800"
            >
              👤 Profile
            </a>

            <button
              type="button"
              className="bg-purple-200 p-2 h-10 w-30 text-black mt-4 rounded
                         max-md:mx-auto"
              onClick={() => router.push("/")}
            >
              Back
            </button>

          </div>
        </div>
      </div>

      {/* RIGHT SECTION — DESKTOP SAME */}
      <div className="grid grid-cols-2 mx-3 gap-5 w-1/2
                      max-md:w-full max-md:mx-0 max-md:mt-6">

        <img className="border-purple-500 border-2 opacity-75 rounded-3xl
                        max-md:h-36 max-md:object-cover"
             src="/image/img1.jpg"/>

        <img className="border-purple-500 border-2 rounded-3xl opacity-75
                        max-md:h-36 max-md:object-cover"
             src="/image/img2.jpg"/>

        <img className="border-purple-500 border-2 opacity-75 rounded-3xl
                        max-md:h-36 max-md:object-cover"
             src="/image/img3.jpg"/>

        <img className="border-purple-500 border-2 opacity-75 rounded-3xl
                        max-md:h-36 max-md:object-cover"
             src="/image/img4.jpg"/>

      </div>
    </div>
  );
}
