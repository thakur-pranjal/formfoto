'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { visaStandards } from '@/config/visas';

export default function VisaHubPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDocuments = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        if (!q) return visaStandards || [];
        return (visaStandards || []).filter(
            (doc) =>
                doc.title.toLowerCase().includes(q) ||
                doc.country.toLowerCase().includes(q) ||
                doc.id.toLowerCase().includes(q)
        );
    }, [searchQuery]);

    return (
        <main className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center space-y-3">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-100">
                        Visa Photo Standards
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base">
                        Select your destination country. Instantly resize and compress your visa photo to the exact consular or e-Visa specification.
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Search country (e.g., India, United States, Canada)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDocuments.map((doc) => (
                        <Link
                            key={doc.id}
                            href={`/visa/${doc.id}`}
                            className="group p-5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-emerald-500/50 rounded-2xl transition-all duration-200 flex flex-col justify-between space-y-4"
                        >
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 group-hover:text-emerald-400 transition-colors uppercase tracking-wider">
                                        {doc.countryCode}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        {doc.physical.widthMm} × {doc.physical.heightMm} mm
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-200 group-hover:text-white mt-3">
                                    {doc.title}
                                </h3>
                            </div>
                            <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-800/50">
                                <span>{doc.country}</span>
                                <span className="text-emerald-400 font-medium group-hover:translate-x-0.5 transition-transform">
                                    Open Tool →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredDocuments.length === 0 && (
                    <div className="text-center py-12 text-slate-500 text-sm">
                        No visa standard found matching &quot;{searchQuery}&quot;.
                    </div>
                )}
            </div>
        </main>
    );
}
