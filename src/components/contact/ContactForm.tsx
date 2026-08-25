"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import contact from "@/content/contact.json";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const { fields, submitLabel, success } = contact.form;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Frontend-only demo: no backend wired up yet.
    setSent(true);
  }

  return (
    <div className="relative rounded-3xl bg-blush/40 p-8 ring-1 ring-ink/5 sm:p-10">
      <AnimatePresence mode="wait">
        {sent ? (
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
              onClick={() => setSent(false)}
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
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                {fields.name.label}
                <input
                  required
                  type="text"
                  placeholder={fields.name.placeholder}
                  className="rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm outline-none focus:border-maroon"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                {fields.email.label}
                <input
                  required
                  type="email"
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
                placeholder={fields.subject.placeholder}
                className="rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm outline-none focus:border-maroon"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
              {fields.message.label}
              <textarea
                required
                rows={5}
                placeholder={fields.message.placeholder}
                className="resize-none rounded-xl border border-ink/10 bg-cream px-4 py-2.5 text-sm outline-none focus:border-maroon"
              />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-maroon-deep"
            >
              {submitLabel} <Send size={16} />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
