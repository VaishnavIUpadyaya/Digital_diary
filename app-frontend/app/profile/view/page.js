"use client";

import { useEffect, useState } from "react";
import { getUserProfile } from "../../core/profileLogic";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function ViewProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [flashbacks, setFlashbacks] = useState([]);
  const [error, setError] = useState("");

  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setProfile(null);
        setFlashbacks([]);
        setError("");
        router.replace("/signup");
        return;
      }

      setUser(firebaseUser);
      setFlashbacks([]);
    });

    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(user.uid);
        if (!data || !data.profileCompleted) {
          router.replace("/profile");
          return;
        }
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [user, router]);

  useEffect(() => {
    if (!user) return;

    const fetchFlashbacks = async () => {
      try {
        const res = await fetch("http://localhost:8080/entry/flashback", {
          method: "GET",
          headers: {
            "Authorization": "Bearer testuser",
            "Content-Type": "application/json"
          },
          cache: "no-store"
        });

        if (!res.ok) throw new Error("Failed to fetch flashbacks");

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setFlashbacks(data);
          setError("");
        } else {
          setFlashbacks([]);
          setError("No entries yet");
        }
      } catch (err) {
        console.error(err);
        setFlashbacks([]);
        setError("Could not load entries");
      }
    };

    fetchFlashbacks();
  }, [user]);

  if (!user || !profile)
    return <p className="text-center mt-20">Loading...</p>;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#C8E0F5] via-[#F3C9D8] to-[#FBC7E0]
                 flex flex-row
                 max-md:flex-col"
    >

      {/* PROFILE CARD — DESKTOP SAME */}
      <div className="w-full flex justify-center mt-20 max-md:mt-10">
        <div
          className="bg-white/40 backdrop-blur-md p-10 rounded-xl shadow-xl
                     w-[500px] h-[320px]
                     max-md:w-full max-md:h-auto max-md:mx-4 max-md:p-6"
        >
          <h1 className="text-3xl font-bold mb-6 text-center font-[marcellus] text-black">
            My Profile
          </h1>

          <p className="mb-4 text-black">
            <b>Email:</b> {user.email}
          </p>
          <p className="mb-6 text-black">
            <b>Name:</b> {profile.name}
          </p>

          <button
            className="w-full bg-[#ECA49C] py-2 rounded hover:bg-[#a14e87]
                       font-bold font-[marcellus]"
            onClick={() => router.push("/profile")}
          >
            Edit Profile
          </button>

          <button
            className="w-full bg-[#ECA49C] py-2 mt-3 rounded hover:bg-[#a14e87]
                       font-bold font-[marcellus]"
            onClick={() => router.push("/home")}
          >
            Go to Home
          </button>
        </div>
      </div>

      {/* ENTRIES SECTION — DESKTOP SAME */}
      <div
        className="w-full mt-20 flex flex-col items-center
                   max-md:mt-10"
      >
        <h2
          className="text-4xl font-bold font-[marcellus] text-center mb-6 text-black
                     max-md:text-2xl"
        >
          Entries ✨
        </h2>

        {error && (
          <p className="text-red-600 text-lg font-semibold text-center mb-6
                        max-md:text-base max-md:px-4">
            {error}
          </p>
        )}

        {flashbacks.map((entry) => (
          <div
            key={entry.id}
            className="bg-blue-100 rounded-xl shadow-lg p-10
                       max-w-xl w-full text-center font-[marcellus] mb-6
                       max-md:p-5 max-md:mx-4"
          >
            <p className="text-sm text-gray-500 mb-2">
              📅{" "}
              {new Date(entry.created_at || entry.date).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              })}
            </p>

            <p className="text-xl text-black leading-relaxed max-md:text-base">
              {entry.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
