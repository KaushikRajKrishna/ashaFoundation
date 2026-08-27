"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import contact from "@/content/contact.json";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const { fields, submitLabel, submittingLabel, success, error } = contact.form;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      console.error(
        "Missing NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY — the contact form cannot send email without it."
      );
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    setStatus("submitting");

    try {
      const formData = new FormData(form);
      // Web3Forms requires a JSON body (not multipart FormData) for JS/fetch
      // submissions — sending FormData directly triggers a redirect that
      // breaks CORS for AJAX requests. See docs.web3forms.com/getting-started/troubleshooting.
      const payload = Object.fromEntries(formData.entries());
      payload.access_key = WEB3FORMS_ACCESS_KEY;

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.success) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative rounded-3xl bg-blush/40 p-8 ring-1 ring-ink/5 sm:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3 py-10 text-center"
          >
            <CheckCircle2 className="text-sage-deep" size={40} />
            <h3 className="font-display text-xl font-semibold text-ink">{success.heading}</h3>
            <p className="max-w-sm text-sm text-ink-soft">{success.description}</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-2 text-sm font-semibold text-maroon hover:underline"
            >
              {success.resetLabel}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Honeypot spam trap: hidden from real visitors, Web3Forms flags submissions where it's filled in. */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                {fields.name.label}
                <input
                  required
                  type="text"
                  name="name"
                  placeholder={fields.name.placeholder}
                  className="rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm outline-none focus:border-maroon"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                {fields.email.label}
                <input
                  required
                  type="email"
                  name="email"
                  placeholder={fields.email.placeholder}
                  className="rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm outline-none focus:border-maroon"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
              {fields.subject.label}
              <input
                required
                type="text"
                name="subject"
                placeholder={fields.subject.placeholder}
                className="rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm outline-none focus:border-maroon"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
              {fields.message.label}
              <textarea
                required
                rows={5}
                name="message"
                placeholder={fields.message.placeholder}
                className="resize-none rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm outline-none focus:border-maroon"
              />
            </label>

            {status === "error" ? (
              <div className="flex items-start gap-2 rounded-xl bg-maroon-soft/60 px-4 py-3 text-sm text-maroon-deep">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">{error.heading}</p>
                  <p>{error.description}</p>
                </div>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-maroon-deep disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? submittingLabel : submitLabel}
              {status !== "submitting" ? <Send size={16} /> : null}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
