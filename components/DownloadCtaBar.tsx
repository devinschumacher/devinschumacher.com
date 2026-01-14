import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type DownloadCtaBarProps = {
  slug: string;
  label?: string;
  className?: string;
};

function toTitleCase(value: string) {
  const titleCased = value
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
  const brandFixes: Record<string, string> = {
    Tiktok: 'TikTok',
    Youtube: 'YouTube',
    Onlyfans: 'OnlyFans',
    Serp: 'SERP',
    M3u8: 'M3U8',
  };
  return titleCased
    .split(' ')
    .map((word) => brandFixes[word] || word)
    .join(' ');
}

function normalizeSlug(slug: string) {
  if (!slug) return '';
  if (slug.startsWith('http://') || slug.startsWith('https://')) {
    return slug.replace(/\/+$/, '');
  }
  return slug.replace(/^\/+/, '').replace(/\/+$/, '');
}

export function DownloadCtaBar({ slug, label, className }: DownloadCtaBarProps) {
  const normalized = normalizeSlug(slug);
  if (!normalized) return null;

  const href = normalized.startsWith('http')
    ? normalized
    : `https://serp.ly/${normalized}`;
  const fallbackLabel = toTitleCase(
    normalized.replace(/^https?:\/\/(www\.)?serp\.ly\//, '')
  );
  const ctaLabel = label?.trim() || fallbackLabel;

  return (
    <div
      className={[
        'fixed bottom-4 left-4 right-4 z-50 md:bottom-auto md:left-auto md:right-8 md:top-1/2 md:w-[360px] md:-translate-y-1/2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Card className="border-primary/30 bg-background/95 shadow-xl shadow-primary/10 ring-1 ring-primary/20 backdrop-blur">
        <CardContent className="flex flex-col gap-4 p-6">
          <div>
            <p className="text-base font-semibold text-foreground">
              Get the {ctaLabel}
            </p>
            <p className="text-sm text-muted-foreground">
              Skip the manual steps and download in a couple clicks.
            </p>
          </div>
          <Button asChild size="lg" className="h-12 w-full text-base shadow-lg">
            <a href={href} target="_blank" rel="noopener noreferrer">
              Open {ctaLabel}
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
