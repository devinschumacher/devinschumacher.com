import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/site.config";

interface LogoProps {
  size?: number;
  showLink?: boolean;
  className?: string;
}

export function Logo({ size = 40, showLink = true, className = "" }: LogoProps) {
  const logoImage = (
    <Image 
      src="/logo.png" 
      alt={siteConfig.name}
      width={size}
      height={size}
      className={className || "h-10 w-auto"}
      priority
    />
  );

  if (showLink) {
    return (
      <Link href="/" className="flex items-center">
        {logoImage}
      </Link>
    );
  }

  return logoImage;
}