import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { 
  Trophy,
  Briefcase,
  GraduationCap,
  Music,
  Target,
  Rocket,
  Code2,
  TrendingUp,
  Users,
  Youtube,
  Instagram,
  Linkedin,
  Github,
  Twitter
} from "lucide-react";

export default function AboutPage() {
  const achievements = [
    { icon: Trophy, text: "5x Two Comma Club Award Winner" },
    { icon: TrendingUp, text: "Generated $100M+ in client revenue" },
    { icon: Briefcase, text: "Managed SEO for 100+ international companies" },
    { icon: Target, text: "Expertise across 217+ industries" },
  ];

  const timeline = [
    {
      year: "2019",
      title: "Founded SERP AI",
      description: "Launched AI technology brand with mission to democratize access to artificial intelligence"
    },
    {
      year: "2017",
      title: "Started SEO Agency",
      description: "Built one of the top SEO companies in the country from scratch"
    },
    {
      year: "2014",
      title: "Left JP Morgan Chase",
      description: "Departed private banking role to pursue entrepreneurship full-time"
    },
    {
      year: "2013",
      title: "University of Colorado Boulder",
      description: "Graduated with Finance degree from Leeds School of Business"
    },
    {
      year: "1994-2022",
      title: "Film Career",
      description: "Featured in Hollywood blockbusters including Lord of the Rings, Pulp Fiction, Jurassic Park, and The Bourne Identity",
      films: [
        "The Lord of the Rings (2001)",
        "The Bourne Identity (2002)",
        "Pulp Fiction (1994)",
        "Jurassic Park (1993)"
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="border-b">
          <div className="container py-20 md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <Logo size={120} showLink={false} className="h-28 w-auto mx-auto mb-8" />
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                about devin schumacher
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                entrepreneur, seo expert, grumpy cat impersonator, and founder of serp ai — on a mission to democratize access to ai, software, and entrepreneurial success
              </p>
            </div>
          </div>
        </section>

        {/* Main Bio Section */}
        <section className="container py-20">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                After graduating with a Finance degree from the University of Colorado Boulder&apos;s Leeds School of Business 
                and working at JP Morgan Chase as a private banker, I realized the corporate path wasn&apos;t for me. 
                I left to start my own company and never looked back.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-6">
                In 2019, I founded <strong>SERP AI</strong>, a technology brand with subsidiary companies including an SEO agency, 
                digital publishing network, software development, and artificial intelligence divisions. Our mission is simple 
                but powerful: <em>&ldquo;AI for the greatest good, for the greatest number&rdquo;</em> — democratizing access to AI, 
                software, and entrepreneurial success.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-6">
                Over the past 10+ years, I&apos;ve run one of the top SEO companies in the country, managing SEO for 100+ 
                international companies across 217+ industries. I&apos;ve helped thousands of business owners grow their 
                companies, generating hundreds of millions in revenue along the way.
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid gap-4 md:grid-cols-2 mt-12">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card key={index} className="border-2">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-lg font-medium">{achievement.text}</span>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="border-t bg-muted/30">
          <div className="container py-20">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center text-3xl font-bold">journey</h2>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2" />
                
                {timeline.map((item, index) => (
                  <div key={index} className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                  }`}>
                    <div className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12 md:ml-auto'
                    } pl-20 md:pl-0`}>
                      <Badge className="mb-2" variant="outline">{item.year}</Badge>
                      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                        {item.title}
                        {item.title === "Film Career" && (
                          <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                            <line x1="8" y1="21" x2="16" y2="21"/>
                            <line x1="12" y1="17" x2="12" y2="21"/>
                          </svg>
                        )}
                      </h3>
                      <p className="text-muted-foreground">{item.description}</p>
                      {item.films && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {item.films.map((film, filmIndex) => (
                            <Badge key={filmIndex} variant="secondary" className="text-xs">
                              {film}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Timeline dot */}
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Beyond Business Section */}
        <section className="border-t">
          <div className="container py-20">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center text-3xl font-bold">beyond business</h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Music className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">music producer</h3>
                  <p className="text-muted-foreground">
                    Produced for GEIST and Old Man Saxon, featured in Austin Music Video Festival
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">educator</h3>
                  <p className="text-muted-foreground">
                    Founded SERP University to provide free SEO education and resources
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Rocket className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">content creator</h3>
                  <p className="text-muted-foreground">
                    Sharing insights on entrepreneurship, SEO, and AI across social platforms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Focus */}
        <section className="border-t bg-muted/30">
          <div className="container py-20">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-8 text-3xl font-bold">current focus</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
             
                <p>
                  Working on democratizing access to artificial intelligence and helping entrepreneurs 
                  build successful businesses through technology and strategic marketing.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
                <Link href="https://youtube.com/@devinschumacher" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Youtube className="h-8 w-8" />
                </Link>
                <Link href="https://instagram.com/dvnschmchr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-8 w-8" />
                </Link>
                <Link href="https://www.linkedin.com/in/devinschumacher" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-8 w-8" />
                </Link>
                <Link href="https://github.com/devinschumacher" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-8 w-8" />
                </Link>
                <Link href="https://x.com/devinschumacher" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-8 w-8" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}