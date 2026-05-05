import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Project {
  name: string;
  description: string;
  content: string;
  url: string;
  category: string;
  logo?: string;
  order?: number;
}

const hiddenProjectNames = new Set(["DAFT FM"]);

export async function getProjects(
  projectsDirectory = path.join(process.cwd(), "content", "projects"),
): Promise<Project[]> {
  const fileNames = fs.readdirSync(projectsDirectory);

  const projects = fileNames.map((fileName) => {
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      ...data,
      content,
    } as Project;
  });

  return projects
    .filter((project) => !hiddenProjectNames.has(project.name))
    .sort((a, b) => (a.order || 999) - (b.order || 999));
}
