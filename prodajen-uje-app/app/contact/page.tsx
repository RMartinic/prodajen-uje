"use client";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative w-full h-[45vh]">
        <Image
          src="/hero-contact.jpg"
          alt="Contact Prodajen Uje"
          fill
          priority
          className="object-cover brightness-90"
        />
      </section>

      <div className="text-center -mt-10">
        <h1 className="inline-block bg-white/80 backdrop-blur-sm px-8 py-3 rounded-lg shadow-md text-4xl md:text-5xl font-bold text-green-700">
          Contact Prodajen Uje
        </h1>
      </div>

      <section className="max-w-3xl mx-auto px-6 py-10 text-gray-800">
        <p className="text-lg text-center mb-10 leading-relaxed">
          We’d love to hear from you — whether you’re a local olive grower
          having interest in
          <strong> Prodajen Uje</strong>, or a customer who values fair,
          eco-friendly olive oil. Reach out and let’s grow together!
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-8 space-y-6 border border-gray-100"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>

        <div className="mt-16 text-center">
          <p className="text-2xl italic text-green-700">
            “Together, we grow — one olive tree at a time.”
          </p>
        </div>
      </section>
    </main>
  );
}
