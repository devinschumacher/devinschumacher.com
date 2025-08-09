"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Download,
  FileVideo,
  FileAudio,
  FileText,
  Zap,
  Shield,
  Globe,
  CheckCircle,
  ArrowRight,
  Chrome,
  Monitor,
  Smartphone,
  Star
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (!videoUrl) return;
    setIsLoading(true);
    // TODO: Implement download logic
    setTimeout(() => setIsLoading(false), 2000);
  };

  const features = [
    {
      icon: FileVideo,
      title: "HD Video Downloads",
      description: "Download Loom videos in multiple resolutions including 1080p, 720p, 480p, and more."
    },
    {
      icon: FileAudio,
      title: "Audio Extraction",
      description: "Extract high-quality audio from Loom videos in MP3 or other audio formats."
    },
    {
      icon: FileText,
      title: "Transcript Download",
      description: "Download video transcripts and subtitles when available."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Our optimized servers ensure quick processing and download speeds."
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your privacy is our priority."
    },
    {
      icon: Globe,
      title: "Works Everywhere",
      description: "Compatible with Chrome, Firefox, Safari, and all major browsers."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Copy Loom URL",
      description: "Go to Loom and copy the URL of the video you want to download."
    },
    {
      number: "2",
      title: "Paste & Analyze",
      description: "Paste the URL in our downloader and click the download button."
    },
    {
      number: "3",
      title: "Choose Format",
      description: "Select your preferred video quality or audio format."
    },
    {
      number: "4",
      title: "Download",
      description: "Click download and save the file to your device."
    }
  ];

  // FAQs based on Google's People Also Ask for "Loom video download"
  const faqs = [
    {
      question: "Can you download Loom videos as MP4?",
      answer: "Yes, Looma allows you to download Loom videos in MP4 format, which is compatible with all devices and video players. Simply paste the Loom link and select MP4 as your preferred format."
    },
    {
      question: "How do I download someone else&apos;s Loom video?",
      answer: "You can download any publicly shared Loom video by copying its URL and pasting it into our downloader. Note that private or password-protected videos require proper access permissions."
    },
    {
      question: "Can viewers download my Loom videos?",
      answer: "If your Loom video is publicly accessible, viewers may be able to download it using third-party tools. To prevent downloads, use Loom&apos;s privacy settings to restrict access or disable download permissions."
    },
    {
      question: "Is there a way to save Loom videos offline?",
      answer: "Yes, our tool lets you save Loom videos for offline viewing. Download the video in MP4 format to your device, and you can watch it anytime without an internet connection."
    },
    {
      question: "Can I download Loom videos without an account?",
      answer: "Absolutely! Looma doesn&apos;t require any account or registration. Just paste the Loom video URL and download instantly - no sign-up needed."
    },
    {
      question: "How do I extract audio from a Loom video?",
      answer: "Our tool can extract audio from Loom videos and save it as MP3. This is perfect for podcasts, lectures, or when you only need the audio content."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background">
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
          <div className="container relative py-20 md:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4" variant="secondary">
                <Zap className="mr-1 h-3 w-3" />
                Fast Loom Downloader
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Get Looma
              </h1>
              <p className="mb-10 text-lg text-muted-foreground md:text-xl">
                Download Loom videos, audio, and transcripts easily.
                Works on all devices and browsers.
              </p>
              
              {/* Download Form */}
              <div className="mx-auto max-w-2xl">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Input
                    type="url"
                    placeholder="Paste Loom video URL here..."
                    className="flex-1 px-6 py-6 text-base"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                  <Button 
                    size="lg" 
                    className="px-8 py-6 text-base font-semibold"
                    onClick={handleDownload}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Download className="mr-2 h-5 w-5" />
                        Download Video
                      </>
                    )}
                  </Button>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Example: https://www.loom.com/share/...
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>No Registration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Unlimited Downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>High Speed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>HD Quality</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Everything You Need to Download Loom Content
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Our powerful downloader supports all types of Loom content with advanced features.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="border-y bg-muted/30">
          <div className="container py-20 md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                How to Download Loom Videos
              </h2>
              <p className="mb-12 text-lg text-muted-foreground">
                Download any Loom video in 4 simple steps
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {step.number}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute -right-4 top-8 hidden h-6 w-6 text-muted-foreground lg:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Platforms Section */}
        <section className="container py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Works on All Platforms
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Download Loom videos from any device or browser
            </p>

            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center gap-3">
                <Chrome className="h-12 w-12 text-primary" />
                <span className="font-medium">Chrome</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Globe className="h-12 w-12 text-primary" />
                <span className="font-medium">Firefox</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Monitor className="h-12 w-12 text-primary" />
                <span className="font-medium">Desktop</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Smartphone className="h-12 w-12 text-primary" />
                <span className="font-medium">Mobile</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t bg-muted/30">
          <div className="container py-20 md:py-28">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Start Downloading Vimeo Videos Now
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join millions of users who trust our Vimeo downloader
            </p>
            <Button size="lg" className="group px-8 py-6 text-base font-semibold" asChild>
              <Link href="#download">
                Start Downloading Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            {/* Rating */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                4.9/5 from 10,000+ users
              </span>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}