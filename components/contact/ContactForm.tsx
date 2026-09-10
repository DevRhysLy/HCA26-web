"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

type FormStatus = "idle" | "loading" | "success" | "error";

const classOptions = [
  "Little Tigers (4-6 Years Old)",
  "Childrens Class (6 - 11 Years Old)",
  "Youth Class (12 - 17 Years Old)",
  "Adults (18+)",
  "Other",
];

const fieldOrder = ["name", "email", "phone", "classOption", "message"] as const;

const inputClass =
  "hca-field mt-2 w-full rounded-xl border border-hca-border bg-hca-surface px-4 py-3 text-hca-ink outline-none focus:border-hca-blue focus:bg-hca-cream focus-visible:ring-2 focus-visible:ring-hca-blue/15";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^(\+?61|0)[2-478](?:[ -]?\d){8}$/.test(phone);
}

function RequiredMark() {
  return (
    <span className="ml-0.5 text-hca-red" aria-hidden="true">
      *
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="mt-2 text-sm font-semibold text-hca-red">
      {message}
    </p>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const classOptionRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function focusFirstError(errors: Record<string, string>) {
    for (const key of fieldOrder) {
      if (!errors[key]) continue;
      if (key === "name") nameRef.current?.focus();
      else if (key === "email") emailRef.current?.focus();
      else if (key === "phone") phoneRef.current?.focus();
      else if (key === "classOption") classOptionRef.current?.focus();
      else if (key === "message") messageRef.current?.focus();
      return;
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const classOption = String(formData.get("classOption") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const nextErrors: Record<string, string> = {};

    setFormError("");

    if (!name) {
      nextErrors.name = "Enter your name.";
    }

    if (!isValidEmail(email)) {
      nextErrors.email = "Enter a valid email address, e.g. name@example.com.";
    }

    if (!isValidPhone(phone)) {
      nextErrors.phone =
        "Enter a valid Australian phone number, e.g. 0412 345 678 or +61 412 345 678.";
    }

    if (!classOption) {
      nextErrors.classOption = "Choose a class option.";
    }

    if (!message) {
      nextErrors.message = "Tell us a little about who the trial is for.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setStatus("error");
      focusFirstError(nextErrors);
      return;
    }

    setFieldErrors({});
    setStatus("loading");

    const payload = {
      name,
      email,
      phone,
      location: formData.get("location"),
      classOption,
      message,
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
      setFormError(
        "Something went wrong. Please try again, or call us on (02) 9747 0822.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-hca-border bg-hca-surface p-6 md:p-8"
        aria-live="polite"
      >
        <div className="flex flex-col items-center py-8 text-center">
          <h3 className="font-serif text-xl font-semibold text-hca-ink">
            Enquiry sent
          </h3>

          <p className="mt-4 max-w-sm leading-relaxed text-hca-ink/60">
            Thanks for reaching out. Our team will contact you shortly about
            trial class availability.
          </p>

          <div className="korea-bar mt-6 w-28" aria-hidden="true">
            <span />
            <span />
          </div>

          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-8 text-sm font-semibold text-hca-blue hover:text-hca-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-hca-border bg-hca-surface p-6 md:p-8"
    >
      <p className="mb-4 text-xs text-hca-ink/45">
        Fields marked <span className="text-hca-red">*</span> are required.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-hca-ink">
            Name <RequiredMark />
          </label>
          <input
            ref={nameRef}
            id="name"
            name="name"
            required
            autoComplete="name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            className={inputClass}
          />
          <FieldError id="name-error" message={fieldErrors.name} />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-semibold text-hca-ink">
            Email <RequiredMark />
          </label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            spellCheck={false}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={inputClass}
          />
          <FieldError id="email-error" message={fieldErrors.email} />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-semibold text-hca-ink">
            Phone <RequiredMark />
          </label>
          <input
            ref={phoneRef}
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="0412 345 678…"
            autoComplete="tel"
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            className={inputClass}
          />
          <FieldError id="phone-error" message={fieldErrors.phone} />
        </div>

        <div>
          <label htmlFor="classOption" className="text-sm font-semibold text-hca-ink">
            Class Option <RequiredMark />
          </label>
          <select
            ref={classOptionRef}
            id="classOption"
            name="classOption"
            required
            aria-invalid={Boolean(fieldErrors.classOption)}
            aria-describedby={
              fieldErrors.classOption ? "classOption-error" : undefined
            }
            className={`${inputClass} bg-hca-surface text-hca-ink`}
          >
            <option value="">Select a class option</option>
            {classOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError id="classOption-error" message={fieldErrors.classOption} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="location" className="text-sm font-semibold text-hca-ink">
            Preferred Location
          </label>
          <select
            id="location"
            name="location"
            className={`${inputClass} bg-hca-surface text-hca-ink`}
          >
            <option value="">Select a location</option>
            <option value="Croydon HQ">Croydon HQ</option>
            <option value="Ermington">Ermington</option>
            <option value="Belrose">Belrose</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="message" className="text-sm font-semibold text-hca-ink">
            Message <RequiredMark />
          </label>
          <textarea
            ref={messageRef}
            id="message"
            name="message"
            required
            rows={5}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
            className={inputClass}
          />
          <FieldError id="message-error" message={fieldErrors.message} />
        </div>
      </div>

      <Button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Book Free Trial"}
      </Button>

      <div aria-live="polite">
        {status === "error" && formError && (
          <p role="alert" className="mt-4 text-sm font-semibold text-hca-red">
            {formError}
          </p>
        )}
      </div>
    </form>
  );
}
