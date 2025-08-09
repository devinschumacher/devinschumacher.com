import Link from "next/link";
import { siteConfig } from "@/site.config";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-5">
          <div>
            <h3 className="mb-4 text-lg font-semibold">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Brands</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary"
                >
                  #
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary"
                >
                  #
                </a>
              </li>
              <li>
                <a 
                  href="https://serpdownloaders.github.io" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary"
                >
                  SERP Downloaders
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/dmca" className="hover:text-primary">DMCA</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
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