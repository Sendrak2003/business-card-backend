export interface Link {
  id: string;
  label: string;
  url: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  achievements: string[];
}

export interface Project {
  id: string;
  name: string;
  url: string;
}

export interface Profile {
  id: string;
  name: string;
  description: string;
  links: Link[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
}
