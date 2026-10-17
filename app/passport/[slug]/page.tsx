import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPassportConfigById, passportStandards } from '@/config/passports';
import BiometricStudio from '@/components/BiometricStudio';

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
        <main className="min-h-screen bg-ff-background text-ff-foreground pb-ff-12 px-4 sm:px-6 lg:px-8 pt-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* ── Breadcrumb / header ── */}
                <div className="border-b border-ff-border pb-6">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-600">
                        <span>{config.country ?? config.title}</span>
                        <span>•</span>
                        <span>Passport Photo</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mt-1 text-ff-foreground">
                        {config.title}
                    </h1>
                    <p className="text-sm text-ff-foreground-muted mt-1">
                        Official Size: {config.physical.widthMm} × {config.physical.heightMm} mm ({config.physical.targetDpi} DPI) | Verified via {config.sourceVerification.authority}
                    </p>
                </div>

                {/* ── Studio wrapper ── */}
                <div className="bg-ff-surface border border-ff-border rounded-ff-xl shadow-ff-sm p-6">
                    <BiometricStudio mode="passport" config={config} />
                </div>
            </div>
        </main>
    );
}
