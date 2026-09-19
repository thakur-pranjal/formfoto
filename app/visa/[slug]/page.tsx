import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getVisaCountryById, visaCountries } from '@/config/visas';
import VisaStudioClient from './VisaStudioClient';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return (visaCountries || []).map((c) => ({
        slug: c.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const country = getVisaCountryById(slug);

    if (!country) {
        return {
            title: 'Destination Not Found | FormFoto',
        };
    }

    // Use the default profile's SEO data for the page-level metadata
    const defaultProfile =
        country.profiles.find((p) => p.id === country.defaultProfileId) ??
        country.profiles[0];

    return {
        title: defaultProfile.seo.metaTitle,
        description: defaultProfile.seo.metaDescription,
        keywords: defaultProfile.seo.keywords,
    };
}

export default async function VisaCountryPage({ params }: PageProps) {
    const { slug } = await params;
    const country = getVisaCountryById(slug);

    if (!country) {
        return notFound();
    }

    return <VisaStudioClient country={country} />;
}
