import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Code2,
  PenTool,
  Rocket,
  Users,
  BookOpen,
  Mail,
  Github,
  Twitter,
  Youtube,
  Linkedin,
  Calendar,
  Eye,
  Play,
  ShoppingBag,
  Building2,
  ExternalLink,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/site.config";
import { getFeaturedVideos } from "@/lib/videos";
import { getFeaturedProducts } from "@/lib/products";
import { getFeaturedBrands } from "@/lib/brands";

export default function HomePage() {

  const skills = [
    {
      icon: Code2,
      title: "AI & Software Development",
      description: "Building AI-powered software solutions that connect consumers with brands, with a mission to democratize access to artificial intelligence."
    },
    {
      icon: PenTool,
      title: "Content Creation & Production",
      description: "Music producer, actor, and content creator. Produced for GEIST and Old Man Saxon, featured in Austin Music Video Festival and more."
    },
    {
      icon: Rocket,
      title: "SEO",
      description: "10+ years running one of the top SEO companies in the country, managing SEO for 100+ international companies across 217+ industries."
    },
    {
      icon: Users,
      title: "Business Growth & Marketing",
      description: "5x Two Comma Club award winner. Generated hundreds of millions in revenue helping businesses scale through strategic digital marketing."
    }
  ];

  const recentPosts = [
    {
      title: "Building Scalable Web Applications",
      excerpt: "Learn the best practices for building web applications that can handle millions of users.",
      date: "2024-01-15",
      readTime: "5 min read"
    },
    {
      title: "The Future of AI in Web Development",
      excerpt: "Exploring how AI is transforming the way we build and interact with web applications.",
      date: "2024-01-10",
      readTime: "8 min read"
    },
    {
      title: "Mastering TypeScript for Production",
      excerpt: "Advanced TypeScript patterns and techniques for building robust applications.",
      date: "2024-01-05",
      readTime: "10 min read"
    }
  ];

  const projects = [
    {
      title: "SERP AI Platform",
      description: "AI software platform that connects consumers with brands using machine learning and artificial intelligence.",
      tags: ["AI/ML", "Python", "React"],
      link: "/projects/serp-ai"
    },
    {
      title: "SEO Agency Platform",
      description: "Enterprise SEO management platform serving 100+ international clients with advanced analytics and reporting.",
      tags: ["SEO", "Analytics", "Marketing"],
      link: "/projects/seo-platform"
    },
    {
      title: "AI Learning Hub",
      description: "Open platform providing free access to AI tools, datasets, models, research, and educational resources.",
      tags: ["Education", "AI", "Open Source"],
      link: "/projects/ai-hub"
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
                Founder @ SERP
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Hi, I'm Devin Schumacher
              </h1>
              <p className="mb-10 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
                widely regarded as the World's best SEO & grumpy cat impersonator.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row justify-center">
                <Button size="lg" className="px-8 py-6 text-base font-semibold" asChild>
                  <Link href="/blog">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Blog
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-6 text-base font-semibold" asChild>
                  <Link href="#contact">
                    <Mail className="mr-2 h-5 w-5" />
                    Get In Touch
                  </Link>
                </Button>
              </div>

              {/* Social Links */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
                <Link href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Youtube className="h-6 w-6" />
                </Link>
                <Link href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="https://github.com/devinschumacher" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-6 w-6" />
                </Link>
                <Link href="https://linkedin.com/in/devinschumacher" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="container py-20 md:py-28">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              About Me
            </h2>
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm an entrepreneur and SEO expert with over 10 years of experience in digital marketing. After graduating with a Finance degree from the University of Colorado Boulder's Leeds School of Business and working at JP Morgan Chase as a private banker, I left to start my own company.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                I founded SERP AI in 2019, a technology brand with subsidiary companies including an SEO agency, digital publishing network, software development, and artificial intelligence divisions. Our mission is "AI for the greatest good, for the greatest number" - democratizing access to AI, software, and entrepreneurial success.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                Beyond business, I'm a music producer, actor, and philanthropist. I've won 5 Two Comma Club awards and helped thousands of business owners grow their companies, generating hundreds of millions in revenue across 217+ industries. Currently serving as Director of SEO at The SEO Dentist while continuing to build SERP AI.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="border-y bg-muted/30">
          <div className="container py-20 md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                What I Do
              </h2>
              <p className="mb-12 text-lg text-muted-foreground">
                Combining technical expertise with creative problem-solving
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <Card key={index} className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{skill.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{skill.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recent Blog Posts Section */}
        <section className="container py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Recent Blog Posts
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Insights on SEO, AI, digital marketing, and entrepreneurship
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {recentPosts.map((post, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{post.readTime}</Badge>
                    <Link href="/blog" className="text-primary hover:underline text-sm font-medium">
                      Read more →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">
                View All Posts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Projects Section */}
        <section className="border-t bg-muted/30">
          <div className="container py-20 md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Featured Projects
              </h2>
              <p className="mb-12 text-lg text-muted-foreground">
                A selection of my recent work
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              {projects.map((project, index) => (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link href={project.link} className="text-primary hover:underline text-sm font-medium">
                      View Project →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* Contact Section */}
        <section className="container py-20 md:py-28" id="contact">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Get In Touch
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Let's connect and talk about AI, SEO, or whatever's on your mind
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group px-8 py-6 text-base font-semibold" asChild>
                <Link href={`mailto:${siteConfig.author.email}`}>
                  <Mail className="mr-2 h-5 w-5" />
                  Send Me an Email
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group px-8 py-6 text-base font-semibold" asChild>
                <Link href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="mr-2 h-5 w-5" />
                  Follow on Twitter
                </Link>
              </Button>
            </div>
            
            {/* Additional Contact Info */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <Link href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
                <span>YouTube</span>
              </Link>
              <Link href="https://github.com/devinschumacher" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </Link>
              <Link href="https://linkedin.com/in/devinschumacher" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}