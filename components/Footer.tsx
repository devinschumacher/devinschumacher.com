import Link from "next/link";
import {Logo} from "../components/Logo";
import { siteConfig } from "@/site.config";
import { Github, Twitter, Youtube, Linkedin, Instagram } from "lucide-react";


export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-5">
          <div>
              <Logo size={100} showLink={false} className="h-30 mb-6" />
            
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">projects</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a 
                  href="https://serp.co" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary"
                >
                  serp
                </a>
              </li>
              <li>
                <a 
                  href="https://serp.ai" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary"
                >
                  serp ai
                </a>
              </li>
              <li>
                <a 
                  href="https://boxingundefeated.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary"
                >
                  boxing undefeated
                </a>
              </li>
              <li>
                <a 
                  href="https://daft.fm" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary"
                >
                  daft fm
                </a>
              </li>
              <li>
                <a 
                  href="https://youtube.com/@devingoessnowboarding" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary"
                >
                  @devingoessnowboarding
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a 
                  href="https://serp.ly/@serp/community" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary"
                >
                  serp university
                </a>
              </li>
              <li>
                <a 
                  href="https://serpdownloaders.github.io" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary"
                >
                  serp downloaders
                </a>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary">
                  blog
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-primary">
                  videos
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">socials</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a 
                  href="https://youtube.com/@devinschumacher" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary flex items-center gap-2"
                >
                  <Youtube className="h-4 w-4" />
                  youtube
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/dvnschmchr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary flex items-center gap-2"
                >
                  <Instagram className="h-4 w-4" />
                  instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://tiktok.com/@dvnschmchr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                  tiktok
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/devinschumacher" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary flex items-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  linkedin
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/devinschumacher" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  github
                </a>
              </li>
              <li>
                <a 
                  href="https://serp.ly/@devin/twitter" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary flex items-center gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  twitter
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/legal/privacy" className="hover:text-primary">privacy policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-primary">terms of service</Link></li>
              <li><Link href="/legal/dmca" className="hover:text-primary">dmca</Link></li>
              <li><Link href="/contact" className="hover:text-primary">contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}