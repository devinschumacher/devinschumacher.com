import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// YouTube embed component
function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="my-10 relative w-full rounded-lg overflow-hidden shadow-xl border border-border/50" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

const components = {
  h1: (props: any) => <h1 className="mt-12 mb-6 text-4xl md:text-5xl font-bold tracking-tight text-foreground" {...props} />,
  h2: (props: any) => <h2 className="mt-10 mb-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground" {...props} />,
  h3: (props: any) => <h3 className="mt-8 mb-4 text-2xl md:text-3xl font-semibold tracking-tight text-foreground" {...props} />,
  h4: (props: any) => <h4 className="mt-6 mb-3 text-xl md:text-2xl font-semibold tracking-tight text-foreground" {...props} />,
  
  p: (props: any) => <p className="mb-6 leading-7 text-base md:text-lg text-foreground/90" {...props} />,
  
  ul: (props: any) => <ul className="mb-6 ml-4 md:ml-8 list-disc space-y-3 marker:text-primary/60" {...props} />,
  ol: (props: any) => <ol className="mb-6 ml-4 md:ml-8 list-decimal space-y-3 marker:text-primary/60" {...props} />,
  li: (props: any) => <li className="leading-7 text-foreground/90 pl-2" {...props} />,
  
  a: ({ href, children, ...props }: any) => {
    if (!href) return <a {...props}>{children}</a>;
    
    // Check if this is a YouTube link for embedding
    const youtubeVideoId = getYouTubeVideoId(href);
    if (youtubeVideoId) {
      return <YouTubeEmbed videoId={youtubeVideoId} />;
    }
    
    const isInternal = href.startsWith('/') || href.startsWith('#');
    
    if (isInternal) {
      return (
        <Link href={href} className="text-primary font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors" {...props}>
          {children}
        </Link>
      );
    }
    
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  },
  
  strong: (props: any) => <strong className="font-bold text-foreground" {...props} />,
  em: (props: any) => <em className="italic text-foreground/90" {...props} />,
  
  blockquote: (props: any) => (
    <blockquote className="my-8 border-l-4 border-primary/30 bg-muted/30 pl-6 pr-4 py-4 italic text-foreground/80 rounded-r-lg" {...props} />
  ),
  
  code: ({ children, ...props }: any) => (
    <code className="rounded-md bg-muted/70 border border-border/50 px-1.5 py-0.5 font-mono text-sm text-primary" {...props}>
      {children}
    </code>
  ),
  
  pre: ({ children, ...props }: any) => (
    <pre className="my-8 overflow-x-auto rounded-lg bg-muted/30 border border-border/50 p-6 text-sm font-mono leading-6" {...props}>
      {children}
    </pre>
  ),
  
  img: ({ src, alt, ...props }: any) => {
    if (!src) return null;
    
    // Handle all images consistently to avoid hydration mismatch
    return (
      <div className="my-8 rounded-lg overflow-hidden shadow-lg border border-border/50">
        <img 
          src={src} 
          alt={alt || ''} 
          className="w-full h-auto"
          loading="lazy"
          {...props}
        />
      </div>
    );
  },
  
  hr: (props: any) => <hr className="my-12 border-t-2 border-border/50" {...props} />,
  
  table: (props: any) => (
    <div className="my-8 overflow-x-auto rounded-lg border border-border/50">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  
  th: (props: any) => (
    <th className="border-b border-border bg-muted/30 px-6 py-3 text-left font-semibold text-foreground" {...props} />
  ),
  
  td: (props: any) => (
    <td className="border-b border-border/30 px-6 py-3 text-foreground/90" {...props} />
  ),
  
  iframe: ({ src, title, width, height, frameborder, allowfullscreen, ...props }: any) => (
    <div className="my-10 relative w-full rounded-lg overflow-hidden shadow-xl border border-border/50" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={src}
        title={title || 'Embedded content'}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder={frameborder || '0'}
        allowFullScreen={allowfullscreen !== undefined ? allowfullscreen : true}
        {...props}
      />
    </div>
  ),
};

// Custom remark plugin to convert bare YouTube URLs to embeds
function remarkYouTubeEmbed() {
  return (tree: any) => {
    const { visit } = require('unist-util-visit');
    
    visit(tree, 'paragraph', (node: any) => {
      if (node.children && node.children.length === 1 && node.children[0].type === 'text') {
        const text = node.children[0].value;
        const youtubeVideoId = getYouTubeVideoId(text);
        
        if (youtubeVideoId) {
          // Replace the paragraph with a custom YouTube embed node
          node.type = 'html';
          node.value = `<div data-youtube-embed="${youtubeVideoId}"></div>`;
          node.children = undefined;
        }
      }
    });
  };
}

export function MDXContent({ source }: { source: string }) {
  // Pre-process the source to convert bare YouTube URLs to a custom component syntax
  const processedSource = source.replace(
    /^(https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})[^\s]*)$/gm,
    (match) => {
      const videoId = getYouTubeVideoId(match);
      return videoId ? `<YouTubeEmbed videoId="${videoId}" />` : match;
    }
  );

  return (
    <div className="mx-auto max-w-none">
      <MDXRemote 
        source={processedSource} 
        components={{
          ...components,
          YouTubeEmbed: ({ videoId }: { videoId: string }) => <YouTubeEmbed videoId={videoId} />
        }}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}