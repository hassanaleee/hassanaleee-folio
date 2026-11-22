export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  companyOrContext: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  secondaryScreenshots?: { label: string; url: string }[];
  caseStudy: {
    overview: string;
    challenge: string;
    approach: {
      step: string;
      title: string;
      description: string;
    }[];
    impact: {
      summary: string;
      metrics?: {
        label: string;
        before: string;
        after: string;
        note: string;
      }[];
    };
    contribution: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  statusBadge?: string;
  description: string;
  highlights?: string[];
  type: 'work' | 'education' | 'project';
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: string[];
}
