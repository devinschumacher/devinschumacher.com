import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
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
  Instagram
} from "lucide-react";
import { siteConfig } from "@/site.config";

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
      title: "What is SEO",
      excerpt: "SEO is the science and art of bringing people to your website from search engines who are interested in your products and services.",
      date: "2022-09-23",
      readTime: "8 min read",
      slug: "/what-is-seo/",
      category: "SEO"
    },
    {
      title: "Best AI Chatbots",
      excerpt: "Comprehensive guide to the top AI chatbot platforms for business and personal use.",
      date: "2024-01-15",
      readTime: "12 min read",
      slug: "/best/ai-chatbots/",
      category: "Best"
    },
    {
      title: "Python Lists Guide",
      excerpt: "Master Python lists with this comprehensive guide covering all list operations and methods.",
      date: "2023-11-20",
      readTime: "7 min read",
      slug: "/python-lists/",
      category: "Python"
    },
    {
      title: "TypeScript Enum Types",
      excerpt: "Learn how to use enums in TypeScript for better type safety and code organization.",
      date: "2023-09-10",
      readTime: "5 min read",
      slug: "/typescript-enum-types/",
      category: "TypeScript"
    },
    {
      title: "Arrays in TypeScript",
      excerpt: "Complete guide to working with arrays in TypeScript, including type annotations and methods.",
      date: "2023-09-15",
      readTime: "8 min read",
      slug: "/arrays-in-typescript/",
      category: "TypeScript"
    },
    {
      title: "Git Fundamentals",
      excerpt: "Everything you need to know about Git version control system for effective collaboration.",
      date: "2023-10-15",
      readTime: "15 min read",
      slug: "/git/",
      category: "Git"
    }
  ];

  const projects = [
    {
      name: "SERP",
      description: "Business services directory and AI tools marketplace platform",
      category: "software",
      featured: true,
      url: "https://serp.co",
      content: "SERP is a comprehensive directory platform that connects businesses with various services and AI-powered tools. The platform serves as a marketplace for discovering and accessing business solutions across multiple industries."
    },
    {
      name: "SERP AI",
      description: "AI-powered tools and services aggregator platform",
      category: "artificial-intelligence",
      featured: true,
      url: "https://serp.ai",
      content: "SERP AI showcases cutting-edge AI-powered tools and services across diverse industries. From protein engineering to content creation and legal services automation, the platform curates innovative AI solutions."
    },
    {
      name: "Boxing Undefeated",
      description: "Your comprehensive guide to the sweet science",
      category: "boxing",
      featured: true,
      url: "https://boxingundefeated.com",
      content: "Boxing Undefeated is the definitive online resource for boxing enthusiasts, featuring an extensive database of professional boxer profiles, detailed fight records, and career statistics."
    },
    {
      name: "DAFT FM",
      description: "All things audio - music discovery and audio content platform",
      category: "music",
      featured: true,
      url: "https://daft.fm",
      content: "DAFT FM is an audio-focused platform dedicated to music discovery and audio content curation. Featuring song collections, ratings, and audio equipment reviews."
    },
    {
      name: "@devingoessnowboarding",
      description: "Snowboarding content creator sharing mountain adventures",
      category: "snowboarding",
      featured: true,
      url: "https://instagram.com/devingoessnowboarding",
      content: "Devin Goes Snowboarding is a snowboarding-focused social media brand documenting mountain adventures, riding sessions, and the snowboarding lifestyle."
    },
    {
      name: "SERP University",
      description: "Learn SEO, digital marketing, programming while building a brand online and making money on your own terms.",
      category: "education",
      featured: true,
      url: "https://serp.ly/@serp/community",
      content: "SERP University is a comprehensive SEO education platform providing free courses, tutorials, and resources for digital marketers and business owners."
    }
  ];
  
  const categoryColors: Record<string, string> = {
    'software': 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    'artificial-intelligence': 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
    'boxing': 'bg-green-500/10 text-green-700 dark:text-green-400',
    'music': 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
    'snowboarding': 'bg-pink-500/10 text-pink-700 dark:text-pink-400',
    'education': 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400'
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background">
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
          <div className="container relative py-10 md:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <Logo size={200} showLink={false} className="h-40 w-auto mx-auto mb-6" />
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
                  <Link href="https://serp.ly/@serp/community" target="_blank" rel="noopener noreferrer">
                    <Users className="mr-2 h-5 w-5" />
                    SERP University
                  </Link>
                </Button>
              </div>

              {/* Social Links */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
                <Link href="https://tiktok.com/@dvnschmchr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </Link>
                <Link href="https://instagram.com/dvnschmchr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-6 w-6" />
                </Link>
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

        {/* About Section - Hidden */}
        {/* <section className="container py-20 md:py-28">
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
        </section> */}

        {/* Skills Section - Hidden */}
        {/*
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
        </section> */}

        {/* Projects Section */}
        <section className="border-t bg-muted/30">
          <div className="container py-20 md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              </h2>
              <p className="mb-12 text-lg text-muted-foreground">
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Link 
                  key={index}
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full">
                    <CardHeader>
                      <div className="mb-2">
                        <Badge 
                          className={`${categoryColors[project.category] || 'bg-gray-500/10 text-gray-700 dark:text-gray-400'}`}
                          variant="secondary"
                        >
                          {project.category.replace('-', ' ')}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl">{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
                        {project.content}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects">
                  Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>


        {/* Recent Blog Posts Section */}
        <section className="border-t">
          <div className="container py-20 md:py-28">
            <div className="mx-auto max-w-4xl space-y-4">
              {recentPosts.map((post, index) => (
                <div key={index} className="group relative">
                  <div className="flex items-start gap-6 p-6 rounded-lg border bg-card hover:bg-accent/5 transition-all hover:shadow-md cursor-pointer">
                    <Link href={post.slug} className="absolute inset-0 z-0">
                      <span className="sr-only">Read {post.title}</span>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        {post.category && (
                          <Link 
                            href={`/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
                            className="relative z-10"
                          >
                            <Badge className="hover:bg-secondary/80 transition-colors" variant="secondary">
                              {post.category}
                            </Badge>
                          </Link>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/blog">
                  Blog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="border-t container py-20 md:py-28" id="contact">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">

            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group px-8 py-6 text-base font-semibold" asChild>
                <Link href="https://serp.ly/@serp/community">
                  SERP University
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group px-8 py-6 text-base font-semibold" asChild>
                <Link href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer">
                  <Youtube className="mr-2 h-5 w-5" />
                  Linkedin
                </Link>
              </Button>
            </div>
            
            {/* Additional Contact Info */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <Link href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="https://github.com/devinschumacher" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com/in/devinschumacher" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}