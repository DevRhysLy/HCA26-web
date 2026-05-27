"use client";

import { useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

const classOptions = [
  "Little Tigers (4-6 Years Old)",
  "Childrens Class (6 - 11 Years Old)",
  "Youth Class (12- 17 Years Old)",
  "Adults (18 +)",
  "Other",
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^(\+?61|0)[2-478](?:[ -]?\d){8}$/.test(phone);
}

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();

    setError("");

    if (!isValidEmail(email)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    if (!isValidPhone(phone)) {
      setStatus("error");
      setError(
        "Please enter a valid Australian phone number, e.g. 0412 345 678 or +61 412 345 678.",
      );
      return;
    }

    setStatus("loading");

    const payload = {
      name: formData.get("name"),
      email,
      phone,
      location: formData.get("location"),
      classOption: formData.get("classOption"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-sm"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-[#111111]">Name</label>
          <input
            name="name"
            required
            className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#003478]"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-[#111111]">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#003478]"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-[#111111]">Phone</label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="0412 345 678"
            className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#003478]"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-[#111111]">
            Class Option
          </label>
          <select
            name="classOption"
            required
            className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#003478]"
          >
            <option value="">Select a class option</option>
            {classOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-[#111111]">
            Preferred Location
          </label>
          <select
            name="location"
            className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#003478]"
          >
            <option value="">Select a location</option>
            <option value="Croydon HQ">Croydon HQ</option>
            <option value="Ermington">Ermington</option>
            <option value="Belrose">Belrose</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-[#111111]">
            Message
          </label>
          <textarea
            name="message"
            required
            rows={5}
            className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#003478]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-2xl bg-[#003478] px-8 py-4 font-semibold text-white transition hover:bg-[#002B63] disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Submit Enquiry"}
      </button>

      {status === "success" && (
        <p className="mt-4 text-sm font-semibold text-green-700">
          Thanks! Your enquiry has been sent.
        </p>
      )}

      {status === "error" && error && (
        <p className="mt-4 text-sm font-semibold text-[#C60C30]">{error}</p>
      )}
    </form>
  );
}
