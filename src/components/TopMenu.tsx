"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import TopMenuItem from "./TopMenuItem";
import getUserProfile from "@/libs/getUserProfile";

export default function TopMenu() {
  const { data: session } = useSession();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session?.user.token) {
        try {
          const userProfile = await getUserProfile(session.user.token);
          setRole(userProfile.data.role);
        } catch (error) {
          console.error("Failed to load user profile:", error);
          setError("Failed to load user profile");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);  // Ensure loading is false if there's no token
      }
    };

    if (session?.user.token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [session]);

  return (
    <div className="fixed top-0 left-0 right-0 z-30 h-[60px] bg-white shadow-md flex items-center justify-between px-8">
      <div className="flex items-center space-x-8">
        <Link href="/">
          <div className="text-2xl font-bold text-blue-600 transform transition-all hover:scale-105">
            Campground Booking
          </div>
        </Link>
        <TopMenuItem title="My Booking" pageRef="/mybooking" />
        <TopMenuItem title="Booking" pageRef="/campbooking" />

        {role === "admin" && (
          <Link href="/createcampground">
            <TopMenuItem title="Create Campground" pageRef="/createcampground" />
          </Link>
        )}
      </div>

      <div className="flex items-center space-x-6">
        {session ? (
          <>
            <Link href="/api/auth/signout">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                Sign Out
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/api/auth/signin">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
