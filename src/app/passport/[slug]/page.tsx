import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPassportConfigById, passportStandards } from '@/config/passports';
import PhotoEditor from '@/components/PhotoEditor';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return (passportStandards || []).map((item) => ({
        slug: item.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const config = getPassportConfigById(slug);

    if (!config) {
        return {
            title: 'Document Not Found | FormFoto',
        };
    }

    return {
        title: config.seo.metaTitle,
        description: config.seo.metaDescription,
        keywords: config.seo.keywords,
    };
}

export default async function PassportSpokePage({ params }: PageProps) {
    const { slug } = await params;
    const config = getPassportConfigById(slug);

    if (!config) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="border-b border-slate-800 pb-6">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        <span>{config.country}</span>
                        <span>•</span>
                        <span>Passport Photo</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mt-1 text-slate-100">
                        {config.title}
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Official Size: {config.physical.widthMm} × {config.physical.heightMm} mm ({config.physical.targetDpi} DPI) | Verified via {config.sourceVerification.authority}
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <PhotoEditor config={config} />
                </div>
            </div>
        </main>
    );
}