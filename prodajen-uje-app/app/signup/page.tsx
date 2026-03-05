"use client";
import { useState } from "react";
import Link from "next/link";
import { SignUpWithEmail } from "../middleware/auth";

type FieldErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
};

const baseInput = "w-full px-4 py-2 border rounded-lg outline-none transition";

const okInput =
  "border-gray-300 focus:ring-2 focus:ring-green-200 focus:border-green-600";

const badInput = "border-red-500 ring-2 ring-red-200";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormError(null);
  };

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};

    if (!formData.username.trim()) errors.username = "Username is required.";

    if (!formData.email.trim()) errors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errors.email = "Enter a valid email address.";

    if (!formData.phone.trim()) errors.phone = "Phone number is required.";
    else if (formData.phone.replace(/\s/g, "").length < 6)
      errors.phone = "Phone number seems too short.";

    if (!formData.password) errors.password = "Password is required.";
    else if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters.";

    if (!formData.confirmPassword)
      errors.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await SignUpWithEmail({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        phone: formData.phone,
      });

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });

      setFieldErrors({});
    } catch (err: any) {
      setFormError(err.message || "Registration failed");
      if (err.code === "23505") {
        setFormError("Username is already taken. Please choose another.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
          Create Account
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Sign up to join{" "}
          <span className="font-semibold text-green-700">Prodajen Uje</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className={`${baseInput} ${
                fieldErrors.username ? badInput : okInput
              }`}
            />
            {fieldErrors.username && (
              <p className="text-xs text-red-600 mt-1">
                {fieldErrors.username}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`${baseInput} ${fieldErrors.email ? badInput : okInput}`}
            />
            {fieldErrors.email && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`${baseInput} ${
                fieldErrors.password ? badInput : okInput
              }`}
            />
            {fieldErrors.password && (
              <p className="text-xs text-red-600 mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${baseInput} ${
                fieldErrors.confirmPassword ? badInput : okInput
              }`}
            />
            {fieldErrors.confirmPassword && (
              <p className="text-xs text-red-600 mt-1">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className={`${baseInput} ${fieldErrors.phone ? badInput : okInput}`}
            />
            {fieldErrors.phone && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.phone}</p>
            )}
          </div>

          {formError && <p className="text-sm text-red-600">{formError}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm disabled:opacity-60"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-700 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
