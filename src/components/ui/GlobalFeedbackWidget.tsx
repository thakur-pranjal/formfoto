"use client";

import React, { useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import FeedbackModal from "./FeedbackModal";

export function GlobalFeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Share Feedback"
        title="Share Feedback"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 hover:bg-brand-700 text-white hover:scale-110 active:scale-95 transition-all duration-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(var(--brand-600),0.3)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-2"
      >
        <MessageSquarePlus className="h-6 w-6 stroke-[2.2]" aria-hidden="true" />
      </button>

      <FeedbackModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default GlobalFeedbackWidget;
