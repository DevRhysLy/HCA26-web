"use client";

import { useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

const classOptions = [
  "Little Tigers (4-6 Years Old)",
  "Childrens Class (6 - 11 Years Old)",
  "Youth Class (12 - 17 Years Old)",
  "Adults (18+)",
  "Other",
];

const inputClass =
  "mt-2 w-full rounded-xl border border-black/10 px-4 py-3 outline-none transition focus:border-[#003478] focus:ring-2 focus:ring-[#003478]/15";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^(\+?61|0)[2-478](?:[ -]?\d){8}$/.test(phone);
}

function RequiredMark() {
  return (
    <span className="text-[#C60C30] ml-0.5" aria-hidden="true">
      *
    </span>
  );
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col items-center text-center py-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#003478]/10 mb-5">
            <svg
              className="h-8 w-8 text-[#003478]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-[#111111]">Enquiry Sent!</h3>

          <p className="mt-3 text-black/60 max-w-sm leading-relaxed">
            Thanks for reaching out. Our team will contact you shortly about
            trial class availability.
          </p>

          <div className="mt-6 flex h-1 w-28 overflow-hidden rounded-full">
            <div className="w-1/2 bg-[#C60C30]" />
            <div className="w-1/2 bg-[#003478]" />
          </div>

          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-8 text-sm font-semibold text-[#003478] hover:text-[#C60C30] transition-colors"
          >
            Send another enquiry →
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-sm"
    >
      <p className="mb-5 text-xs text-black/45">
        Fields marked <span className="text-[#C60C30]">*</span> are required.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-[#111111]">
            Name <RequiredMark />
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-semibold text-[#111111]">
            Email <RequiredMark />
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-semibold text-[#111111]">
            Phone <RequiredMark />
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="0412 345 678"
            autoComplete="tel"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="classOption" className="text-sm font-semibold text-[#111111]">
            Class Option <RequiredMark />
          </label>
          <select
            id="classOption"
            name="classOption"
            required
            className={inputClass}
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
          <label htmlFor="location" className="text-sm font-semibold text-[#111111]">
            Preferred Location
          </label>
          <select id="location" name="location" className={inputClass}>
            <option value="">Select a location</option>
            <option value="Croydon HQ">Croydon HQ</option>
            <option value="Ermington">Ermington</option>
            <option value="Belrose">Belrose</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="message" className="text-sm font-semibold text-[#111111]">
            Message <RequiredMark />
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-2xl bg-[#003478] px-8 py-4 font-semibold text-white transition hover:bg-[#002B63] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Submit Enquiry"}
      </button>

      {status === "error" && error && (
        <p role="alert" className="mt-4 text-sm font-semibold text-[#C60C30]">
          {error}
        </p>
      )}
    </form>
  );
}
