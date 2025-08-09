import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard, type Project as ProjectCardProject } from "@/components/project-card";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Project extends ProjectCardProject {
  logo?: string;
  order?: number;
}

async function getProjects(): Promise<Project[]> {
  const projectsDirectory = path.join(process.cwd(), 'content', 'projects');
  const fileNames = fs.readdirSync(projectsDirectory);
  
  const projects = fileNames.map((fileName) => {
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      ...data,
      content
    } as Project;
  });
  
  return projects.sort((a, b) => (a.order || 999) - (b.order || 999));
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  
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
        {/* Header Section */}
        <section className="border-b bg-gradient-to-b from-primary/5 to-background">
          <div className="container py-12 md:py-20">
            <Button variant="ghost" size="sm" className="mb-6" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Projects
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                A collection of ventures and platforms I&apos;ve built and manage
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="container py-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index}
                  showDescription={true}
                  showVisitLink={true}
                  categoryColors={categoryColors}
                  wrapWithLink={false}
                />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}