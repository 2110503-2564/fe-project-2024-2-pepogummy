"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Tent, LogOut, ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { useState } from "react";

const SignOut = () => {
  const router = useRouter();
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-amber-200">
        <div className="flex flex-col items-center mb-6">
          <Tent className="h-10 w-10 text-amber-700 mb-2" />
          <h1 className="text-2xl font-bold text-amber-900">Ready to Leave?</h1>
          <p className="text-amber-600 text-sm">We hope to see you back soon for more adventures</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            disabled={isLoading}
            className={`w-full bg-[#8B5A2B] hover:bg-[#A67C52] text-white py-3 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="animate-pulse">Signing out...</span>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </>
            )}
          </button>

          <Link
            href="/"
            className="w-full border border-amber-300 text-amber-700 hover:bg-amber-50 py-3 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Link>
        </div>

        <p className="text-center text-amber-700 mt-6 text-sm">
          Changed your mind? Stay logged in and keep planning your next trip!
        </p>
      </div>
    </main>
  );
};

export default SignOut;