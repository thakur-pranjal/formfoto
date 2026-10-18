import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FORMATS } from '@/config/formats';
import SmartEditor from '@/components/SmartEditor';

export async function generateStaticParams() {
  return FORMATS
    .filter((format) => format.category === 'exam')
    .map((format) => ({ slug: format.id }));
}

export async function generateMetadata({
  params,  
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const format = FORMATS.find((f) => f.id === slug);

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
  const format = FORMATS.find((f) => f.id === slug);

  if (!format) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-ff-background text-ff-foreground pb-ff-12 flex flex-col items-center px-4 pt-10 lg:px-8">
      <div className="w-full max-w-6xl flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-ff-foreground">
          {format.title}
        </h1>
        <p className="text-ff-foreground-muted text-lg leading-relaxed">
          {format.description}
        </p>
        <SmartEditor config={format} />
      </div>
    </main>
  );
}
