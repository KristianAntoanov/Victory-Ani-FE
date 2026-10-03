import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '@/constants';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  canonicalPath?: string;
}

export default function Seo({ title, description, image, canonicalPath }: SeoProps) {
  const fullTitle = `${title} | V&A Projects`;
  const canonicalUrl = canonicalPath ? new URL(canonicalPath, SITE_URL).toString() : undefined;
  const imageUrl = image ? new URL(image, SITE_URL).toString() : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
    </Helmet>
  );
}
