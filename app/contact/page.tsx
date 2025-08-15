import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Linkedin, Instagram, Github } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="container max-w-4xl py-12 md:py-20">
          <div className="text-center mb-12">
            <Logo size={150} showLink={false} className="h-32 w-auto mx-auto" />
          </div>

          <Card className="mx-auto max-w-2xl border-0 shadow-none">
            <CardContent className="pt-6 space-y-4">
              <div className="grid gap-4">
                <Link 
                  href="https://x.com/devinschumacher" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <Twitter className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">twitter</p>
                    <p className="text-sm text-muted-foreground">@devinschumacher</p>
                  </div>
                </Link>

                <Link 
                  href="https://instagram.com/dvnschmchr" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">instagram</p>
                    <p className="text-sm text-muted-foreground">@dvnschmchr</p>
                  </div>
                </Link>

                <Link 
                  href="https://www.linkedin.com/in/devinschumacher" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">linkedin</p>
                    <p className="text-sm text-muted-foreground">devinschumacher</p>
                  </div>
                </Link>

                <Link 
                  href="https://youtube.com/@devinschumacher" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <div className="text-left">
                    <p className="font-medium">youtube</p>
                    <p className="text-sm text-muted-foreground">@devinschumacher</p>
                  </div>
                </Link>

                <Link 
                  href="https://github.com/devinschumacher" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <Github className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">github</p>
                    <p className="text-sm text-muted-foreground">devinschumacher</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Footer />
      </main>
    </>
  );
}