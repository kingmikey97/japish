import { Metadata } from 'next';

interface OpenGraphOptions {
  title?: string;
  description?: string;
  image?: string;
}

export function generateBaseMetadata(
  title: string,
  description: string,
  ogOptions?: OpenGraphOptions
): Metadata {
  return {
    title: `${title} | ValhallaTechnology`,
    description,
    openGraph: {
      title: ogOptions?.title || title,
      description: ogOptions?.description || description,
      images: ogOptions?.image ? [{ url: ogOptions.image }] : [],
      type: 'website',
      locale: 'es_BO',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogOptions?.title || title,
      description: ogOptions?.description || description,
      images: ogOptions?.image ? [ogOptions.image] : [],
    },
  };
}
