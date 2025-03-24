"use client";
import { useState, useEffect } from "react";
import userRegister from "@/libs/userRegister";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Validation patterns
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const telPattern = /^0[689]\d{8}$|^0[689]-\d{3}-\d{4}$/;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name) newErrors.name = "Name is required";
    if (!emailPattern.test(email)) newErrors.email = "Invalid email format";
    if (!telPattern.test(tel)) newErrors.tel = "Invalid Thai phone number format";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setErrors({});
    setLoading(true);

    try {
      const response = await userRegister(name, email, tel, password);
      if (response.success) {
        router.push("/api/auth/signin");
      }
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h1>

        {errors.form && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.name ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
              }`}
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.email ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
              }`}
              type="email"
              placeholder="john@example.com"
              pattern={emailPattern.source}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.tel ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
              }`}
              type="tel"
              placeholder="081-234-5678 or 0812345678"
              pattern={telPattern.source}
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
            {errors.tel && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tel} (Valid formats: 0812345678 or 081-234-5678)
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password (min 6 characters)
            </label>
            <input
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.password ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
              }`}
              type="password"
              minLength={6}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/api/auth/signin"
            className="text-blue-600 hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}