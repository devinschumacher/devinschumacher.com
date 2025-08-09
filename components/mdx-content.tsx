import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { ImageLightbox } from './image-lightbox';

const components = {
  h1: (props: any) => <h1 className="mt-8 mb-4 text-4xl font-bold" {...props} />,
  h2: (props: any) => <h2 className="mt-8 mb-4 text-3xl font-semibold" {...props} />,
  h3: (props: any) => <h3 className="mt-6 mb-3 text-2xl font-semibold" {...props} />,
  h4: (props: any) => <h4 className="mt-4 mb-2 text-xl font-semibold" {...props} />,
  
  p: (props: any) => <p className="mb-4 leading-7" {...props} />,
  
  ul: (props: any) => <ul className="mb-4 ml-6 list-disc space-y-2" {...props} />,
  ol: (props: any) => <ol className="mb-4 ml-6 list-decimal space-y-2" {...props} />,
  li: (props: any) => <li className="leading-7" {...props} />,
  
  a: ({ href, children, ...props }: any) => {
    const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
    
    if (isInternal) {
      return (
        <Link href={href} className="text-primary underline underline-offset-2 hover:no-underline" {...props}>
          {children}
        </Link>
      );
    }
    
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:no-underline"
        {...props}
      >
        {children}
      </a>
    );
  },
  
  strong: (props: any) => <strong className="font-semibold" {...props} />,
  em: (props: any) => <em className="italic" {...props} />,
  
  blockquote: (props: any) => (
    <blockquote className="my-6 border-l-4 border-primary/20 pl-6 italic text-muted-foreground" {...props} />
  ),
  
  code: ({ children, ...props }: any) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm" {...props}>
      {children}
    </code>
  ),
  
  pre: ({ children, ...props }: any) => (
    <pre className="mb-4 overflow-x-auto rounded-lg bg-muted p-4" {...props}>
      {children}
    </pre>
  ),
  
  img: ({ src, alt, ...props }: any) => {
    if (!src) return null;
    
    return <ImageLightbox src={src} alt={alt || ''} />;
  },
  
  hr: (props: any) => <hr className="my-8 border-t border-muted" {...props} />,
  
  table: (props: any) => (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full border-collapse border border-muted" {...props} />
    </div>
  ),
  
  th: (props: any) => (
    <th className="border border-muted bg-muted/50 px-4 py-2 text-left font-semibold" {...props} />
  ),
  
  td: (props: any) => (
    <td className="border border-muted px-4 py-2" {...props} />
  ),
};

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:font-bold prose-headings:tracking-tight
                    prose-p:text-foreground/90
                    prose-ul:my-4 prose-ol:my-4
                    prose-li:my-1
                    prose-strong:text-foreground
                    prose-a:no-underline
                    prose-pre:bg-muted
                    prose-code:bg-muted
                    [&>ul]:list-disc [&>ul]:ml-6
                    [&>ol]:list-decimal [&>ol]:ml-6
                    [&_li]:marker:text-muted-foreground">
      <MDXRemote source={source} components={components} />
    </div>
  );
}