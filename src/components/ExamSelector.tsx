"use client";

import React from "react";
import Link from "next/link";
import { SearchX, Settings2, MessageSquarePlus } from "lucide-react";

export interface ExamSelectorProps {
  searchQuery?: string;
  onRequestExam: () => void;
}

export function ExamSelector({
  searchQuery = "",
  onRequestExam,
}: ExamSelectorProps) {
  return (
    <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center">
      <div className="w-14 h-14 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-5 text-slate-400">
        <SearchX className="w-7 h-7" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        {searchQuery.trim()
          ? `No specifications found for "${searchQuery.trim()}"`
          : "We couldn't find that specification"}
      </h3>
      <p className="text-slate-500 max-w-sm mx-auto mb-6 text-sm leading-relaxed">
        We are constantly adding official government photo & signature specifications. In a rush? You can manually customize dimensions, or request this exam to have it added.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
        <button
          type="button"
          onClick={onRequestExam}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 active:bg-brand-800 transition-colors shadow-ff-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-2"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Request this Exam
        </button>
        <Link
          href="/manual"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-ff-surface text-ff-foreground text-sm font-semibold rounded-xl border border-ff-border hover:bg-ff-surface-subtle transition-colors shadow-ff-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)]"
        >
          <Settings2 className="w-4 h-4" />
          Open Pro Manual Editor
        </Link>
      </div>
    </div>
  );
}

export default ExamSelector;
