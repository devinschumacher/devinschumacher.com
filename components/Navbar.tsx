"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { siteConfig } from "@/site.config";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = siteConfig.categories;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Site Name */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">{siteConfig.name.toLowerCase()}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              blog
            </Link>
            <Link
              href="/projects"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              projects
            </Link>
            <Link
              href="/videos"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              videos
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t py-4 md:hidden">
            {/* Mobile Navigation */}
            <div className="space-y-1">
              <Link
                href="/blog"
                className="block px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                blog
              </Link>
              <Link
                href="/projects"
                className="block px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                projects
              </Link>
              <Link
                href="/videos"
                className="block px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                videos
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}