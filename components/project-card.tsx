import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export interface Project {
  name: string;
  description: string;
  content: string;
  url: string;
  category: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
  showDescription?: boolean;
  showVisitLink?: boolean;
  categoryColors: Record<string, string>;
  wrapWithLink?: boolean;
}

export function ProjectCard({ 
  project, 
  index, 
  showDescription = false, 
  showVisitLink = false, 
  categoryColors,
  wrapWithLink = false 
}: ProjectCardProps) {
  const cardContent = (
    <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full">
      <CardHeader>
        <div className={`${showDescription ? 'flex items-start justify-between' : ''} mb-2`}>
          <Badge 
            className={`${categoryColors[project.category] || 'bg-gray-500/10 text-gray-700 dark:text-gray-400'}`}
            variant="secondary"
          >
            {project.category.replace('-', ' ')}
          </Badge>
          {project.featured && (
            <Badge variant="default" className="bg-primary">
              Featured
            </Badge>
          )}
        </div>
        <CardTitle className="text-2xl">{project.name}</CardTitle>
        {showDescription && (
          <CardDescription className="mt-2 text-base">
            {project.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 mb-6">
          {project.content}
        </p>
        {showVisitLink && (
          <Link 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium group-hover:text-primary/80 transition-colors"
          >
            Visit Project
            <ExternalLink className="h-4 w-4" />
          </Link>
        )}
      </CardContent>
    </Card>
  );

  if (wrapWithLink) {
    return (
      <Link 
        key={index}
        href={project.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}