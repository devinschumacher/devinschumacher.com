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
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">{siteConfig.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Blog
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`#${category.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {category}
              </Link>
            ))}
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
                Blog
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`#${category.toLowerCase().replace(" ", "-")}`}
                  className="block px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}