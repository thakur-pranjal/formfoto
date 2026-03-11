import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FORMATS } from '../../../src/config/formats';
import SmartEditor from '../../../src/components/SmartEditor';

export async function generateStaticParams() {
  return Object.entries(FORMATS)
    .filter(([, format]) => format.category === 'exam')
    .map(([key]) => ({ slug: key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const format = FORMATS[slug];

  if (!format) {
    return {};
  }

  return {
    title: format.title,
    description: format.description,
  };
}

export default async function FormatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const format = FORMATS[slug];

  if (!format) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-sky-400">
          {format.title}
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          {format.description}
        </p>
        <SmartEditor config={format} />
      </div>
    </main>
  );
}
