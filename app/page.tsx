import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
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
      url: "https://youtube.com/@devingoessnowboarding",
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

  const films = [
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      year: "2001",
      role: "Party Hobbit",
      rating: "8.9",
      type: "Epic Fantasy",
      poster: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
      imdbUrl: "https://www.imdb.com/name/nm1590539/#:~:text=The%20Lord%20of%20the%20Rings%3A%20The%20Fellowship%20of%20the%20Ring"
    },
    {
      title: "Pulp Fiction", 
      year: "1994",
      role: "Diner Patron",
      rating: "8.8",
      type: "Crime Drama",
      poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      imdbUrl: "https://www.imdb.com/name/nm1590539/#:~:text=1995-,Pulp%20Fiction,-8.8"
    },
    {
      title: "Jurassic Park",
      year: "1993", 
      role: "Lab Technician",
      rating: "8.2",
      type: "Sci-Fi Adventure",
      poster: "https://image.tmdb.org/t/p/original/fjTU1Bgh3KJu4aatZil3sofR2zC.jpg",
      imdbUrl: "https://www.imdb.com/name/nm1590539/#:~:text=1994-,Jurassic%20Park,-8.2"
    },
    {
      title: "The Bourne Identity",
      year: "2002",
      role: "Policeman", 
      rating: "7.8",
      type: "Action Thriller",
      poster: "https://image.tmdb.org/t/p/original/vklZuhqnjVn4NMv5npOt86KXUhf.jpg",
      imdbUrl: "https://www.imdb.com/name/nm1590539/#:~:text=2015-,The%20Bourne%20Identity,-7.8"
    },
    {
      title: "American Psycho",
      year: "2000",
      role: "Restaurant Patron",
      rating: "7.6",
      type: "Psychological Thriller",
      poster: "https://image.tmdb.org/t/p/original/9uGHEgsiUXjCNq8wdq4r49YL8A1.jpg",
      imdbUrl: "https://www.imdb.com/name/nm1590539/#:~:text=2001-,American%20Psycho,-7.6"
    },
    {
      title: "Starship Troopers",
      year: "1997",
      role: "Trooper",
      rating: "7.3",
      type: "Sci-Fi Action",
      poster: "https://image.tmdb.org/t/p/original/wlveVIVxvI7AHR4u5X9J0n31gmE.jpg",
      imdbUrl: "https://www.imdb.com/name/nm1590539/#:~:text=1997-,Starship%20Troopers,-7.3"
    },
    {
      title: "Independence Day",
      year: "1996",
      role: "Homeless Man",
      rating: "7.0",
      type: "Sci-Fi Blockbuster",
      poster: "https://image.tmdb.org/t/p/original/v6kq2l5lly6YsRXOpq3c6vZMFHv.jpg",
      imdbUrl: "https://www.imdb.com/name/nm1590539/#:~:text=1996-,Independence%20Day,-7.0"
    },
    {
      title: "Rocky V",
      year: "1990",
      role: "Druggy",
      rating: "5.4",
      type: "Sports Drama",
      poster: "https://image.tmdb.org/t/p/w1280/tevHaVxtrMTaUi8f3YjLWYSSY8A.jpg",
      imdbUrl: "https://www.imdb.com/name/nm1590539/#:~:text=1990-,Rocky%20V,-5.4"
    },
    {
      title: "RoboCop",
      year: "1987",
      role: "News Crew",
      rating: "7.6",
      type: "Cyberpunk Action",
      poster: "https://image.tmdb.org/t/p/original/iPPelvG1AVXY3zOJ875oSVaN24W.jpg",
      imdbUrl: "https://www.imdb.com/name/nm1590539/#:~:text=1990-,RoboCop,-7.6"
    }
  ];

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
                widely regarded as the World&apos;s best SEO, grumpy cat impersonator & <Link href="https://www.imdb.com/name/nm1590539/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">occasional actor</Link>.
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
                <Link href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Youtube className="h-6 w-6" />
                </Link>
                <Link href="https://instagram.com/dvnschmchr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-6 w-6" />
                </Link>
                <Link href="https://linkedin.com/in/devinschumacher" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link href="https://github.com/devinschumacher" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-6 w-6" />
                </Link>
                <Link href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="https://tiktok.com/@dvnschmchr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="border-t bg-muted/30">
          <div className="container py-20 md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                projects
              </h2>
              <p className="mb-12 text-lg text-muted-foreground">
                a collection of ventures and platforms I&apos;ve built and manage
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

        {/* Film Credits Section */}
        <section className="border-t">
          <div className="container py-20 md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                film credits
              </h2>
              <p className="mb-12 text-lg text-muted-foreground">
                featured in hollywood blockbusters and indie films
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {films.map((film, index) => (
                <Link
                  key={index}
                  href={film.imdbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="h-full overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 bg-gradient-to-b from-card to-card/50 cursor-pointer">
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <Image 
                        src={film.poster} 
                        alt={`${film.title} poster`}
                        width={300}
                        height={450}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-2 left-2 inline-flex items-center gap-1 text-sm font-semibold text-white bg-black/50 px-2 py-1 rounded">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        {film.rating}
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-sm font-medium">{film.role}</p>
                      </div>
                      <div className="absolute top-2 right-2">
                        <svg className="h-4 w-4 text-white bg-black/50 p-1 rounded" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <Badge className="w-fit mb-2" variant="secondary">
                        {film.type}
                      </Badge>
                      <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {film.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-1">{film.year}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="https://www.imdb.com/name/nm1590539/" target="_blank" rel="noopener noreferrer">
                  full filmography
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section className="border-t">
          <div className="container py-20 md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                videos
              </h2>
              <p className="mb-12 text-lg text-muted-foreground">
                educational content on seo, ai, programming, and entrepreneurship
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  url: "https://www.youtube.com/watch?v=ak2JiS2Ntyw",
                  thumbnail: "https://img.youtube.com/vi/ak2JiS2Ntyw/maxresdefault.jpg",
                  platform: "youtube"
                },
                {
                  url: "https://www.youtube.com/watch?v=jhdNMmI3ZOA", 
                  thumbnail: "https://img.youtube.com/vi/jhdNMmI3ZOA/maxresdefault.jpg",
                  platform: "youtube"
                },
                {
                  url: "https://www.youtube.com/watch?v=NcZYnZHl4w8",
                  thumbnail: "https://img.youtube.com/vi/NcZYnZHl4w8/maxresdefault.jpg",
                  platform: "youtube"
                }
              ].map((video, index) => (
                <Link
                  key={index}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="h-full overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="relative aspect-video overflow-hidden">
                      <Image 
                        src={video.thumbnail} 
                        alt="Video thumbnail"
                        width={480}
                        height={270}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all flex items-center justify-center">
                        <svg className="h-12 w-12 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10"/>
                          <polygon points="10,8 16,12 10,16"/>
                        </svg>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <div className="flex justify-end">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/videos">
                  videos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Recent Blog Posts Section */}
        <section className="border-t">
          <div className="container py-20 md:py-28">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                latest posts
              </h2>
              <p className="text-lg text-muted-foreground">
                insights on seo, ai, programming, and entrepreneurship
              </p>
            </div>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group px-8 py-6 text-base font-semibold" asChild>
                <Link href="https://serp.ly/@serp/community">
                  SERP University
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group px-8 py-6 text-base font-semibold" asChild>
                <Link href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer">
                  <Youtube className="mr-2 h-5 w-5" />
                  Youtube
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