"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Check, Loader2, MessageSquarePlus, AlertCircle } from "lucide-react";

export interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  defaultText?: string;
  initialMessage?: string;
}

export function FeedbackModal({
  isOpen,
  onClose,
  title = "Share Your Feedback",
  description = "Report a bug, request a new feature, or tell us what specifications we should add next.",
  defaultText = "",
  initialMessage = "",
}: FeedbackModalProps) {
  const effectiveDefaultText = defaultText || initialMessage || "";
  const [message, setMessage] = useState(effectiveDefaultText);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isExamContext = title.toLowerCase().includes("exam");

  // Sync defaultText when modal opens
  useEffect(() => {
    if (isOpen) {
      if (effectiveDefaultText) {
        setMessage(effectiveDefaultText);
      }
      setIsSuccess(false);
      setErrorMessage(null);
    }
  }, [isOpen, effectiveDefaultText]);

  // Trap focus to textarea upon opening
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, isSubmitting]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("access_key", "ab3c10f6-24f0-4413-92bf-916d881ced69");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        setMessage("");
        setEmail("");
        // Set success state, show a checkmark, and close modal after 2 seconds
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 2000);
      } else {
        const data = await response.json().catch(() => null);
        setErrorMessage(
          data?.message || "Failed to submit feedback. Please try again."
        );
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (dialogRef.current && !dialogRef.current.contains(e.target as Node) && !isSubmitting) {
          onClose();
        }
      }}
      aria-hidden={!isOpen}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
        aria-describedby="feedback-modal-desc"
        className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-ff-border bg-ff-surface text-ff-foreground shadow-ff-lg transition-all"
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-slate-100 pb-4 mb-4 px-6 pt-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <MessageSquarePlus className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="feedback-modal-title"
                className="text-base font-semibold text-ff-foreground"
              >
                {title}
              </h2>
              <p
                id="feedback-modal-desc"
                className="mt-0.5 text-xs text-ff-foreground-muted"
              >
                {isExamContext
                  ? "Direct request to the FormFoto engineering team"
                  : "We read every message and continuously improve FormFoto"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close dialog"
            className="rounded-full p-1.5 text-ff-foreground-muted hover:bg-ff-surface-subtle hover:text-ff-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] disabled:opacity-50"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 pb-6">
          {isSuccess ? (
            /* Success State */
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60 animate-in zoom-in-75 duration-200">
                <Check className="h-7 w-7 stroke-[2.5]" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-ff-foreground">
                {isExamContext ? "Request Submitted!" : "Feedback Received!"}
              </h3>
              <p className="max-w-xs text-sm text-ff-foreground-secondary">
                {isExamContext
                  ? "Thank you! We've received your request and will work on adding this exam specification shortly."
                  : "Thank you for helping us improve FormFoto! We appreciate your feedback."}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-ff-foreground-muted pt-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Closing in a moment…
              </div>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs leading-relaxed text-ff-foreground-secondary">
                {description}
              </p>

              {errorMessage && (
                <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Web3Forms Meta Settings */}
              <input
                type="hidden"
                name="subject"
                value={
                  isExamContext
                    ? "New Exam Specification Request - FormFoto"
                    : "FormFoto User Feedback"
                }
              />
              <input
                type="hidden"
                name="from_name"
                value="FormFoto In-App Feedback"
              />
              {/* Botcheck honeypot */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="feedback-message"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  {isExamContext ? "Exam Name & Requirements" : "Your Message"}{" "}
                  <span className="text-brand-600">*</span>
                </label>
                <textarea
                  ref={textareaRef}
                  id="feedback-message"
                  name="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    isExamContext
                      ? "e.g. UPSC Combined Geo-Scientist, BPSC Teacher TRE 4.0, or specific dimensions/KB requirements if known…"
                      : "Tell us what you like, report an issue, or suggest what we should add next…"
                  }
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all duration-200 resize-none text-slate-900 placeholder:text-slate-400 disabled:opacity-60"
                />
              </div>

              {/* Optional Email Contact */}
              <div>
                <label
                  htmlFor="feedback-email"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Your Email{" "}
                  <span className="font-normal text-slate-400">
                    (Optional — if you&apos;d like a reply or notification)
                  </span>
                </label>
                <input
                  id="feedback-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all duration-200 resize-none text-slate-900 placeholder:text-slate-400 disabled:opacity-60"
                />
                <p className="mt-1.5 text-xs text-slate-400">
                  Prefer direct email? Contact us anytime at{" "}
                  <a
                    href="mailto:formfotohq@outlook.com"
                    className="text-brand-600 hover:underline font-medium"
                  >
                    formfotohq@outlook.com
                  </a>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="text-slate-600 hover:bg-slate-100 px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <span>{isExamContext ? "Submit Request" : "Send Feedback"}</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedbackModal;
