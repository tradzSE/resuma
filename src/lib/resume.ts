export type Contact = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string;
};

export type Experience = {
  id: string;
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string;
};

export type Project = {
  id: string;
  name: string;
  link: string;
  technologies: string;
  bullets: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
};

export type ResumeData = {
  contact: Contact;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: string;
  certifications: Certification[];
};

export const createId = () => Math.random().toString(36).slice(2, 10);

export const defaultResume: ResumeData = {
  contact: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
  },
  summary: "",
  education: [{ id: "education-1", school: "", degree: "", location: "", startDate: "", endDate: "", details: "" }],
  experience: [{ id: "experience-1", organization: "", role: "", location: "", startDate: "", endDate: "", bullets: "" }],
  projects: [{ id: "project-1", name: "", link: "", technologies: "", bullets: "" }],
  skills: "",
  certifications: [{ id: "certification-1", name: "", issuer: "", date: "" }],
};

export const emptyEducation = (): Education => ({ id: createId(), school: "", degree: "", location: "", startDate: "", endDate: "", details: "" });
export const emptyExperience = (): Experience => ({ id: createId(), organization: "", role: "", location: "", startDate: "", endDate: "", bullets: "" });
export const emptyProject = (): Project => ({ id: createId(), name: "", link: "", technologies: "", bullets: "" });
export const emptyCertification = (): Certification => ({ id: createId(), name: "", issuer: "", date: "" });

export const sampleResume: ResumeData = {
  contact: {
    fullName: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "+63 917 123 4567",
    location: "Quezon City, Philippines",
    linkedin: "linkedin.com/in/mariasantos",
    portfolio: "mariasantos.dev",
  },
  summary: "Software engineering graduate focused on building reliable, user-friendly web applications. Experienced in React, Node.js, and MySQL through internships and academic projects.",
  education: [{ id: "education-sample", school: "Central Luzon State University", degree: "BS Information Technology", location: "Nueva Ecija, Philippines", startDate: "2022", endDate: "2026", details: "Relevant coursework: Software Engineering, Database Systems" }],
  experience: [{ id: "experience-sample", organization: "Acme Technologies", role: "Software Engineering Intern", location: "Makati City", startDate: "Jun 2025", endDate: "Sep 2025", bullets: "Improved processing time by 30% through workflow automation.\nAssisted in testing and documenting internal tools." }],
  projects: [{ id: "project-sample", name: "Campus Navigation App", link: "project.example.com", technologies: "React, Node.js, MySQL", bullets: "Built and deployed a responsive application used by 500 students.\nImplemented search and bookmark features." }],
  skills: "Languages: JavaScript, TypeScript, PHP\nFrameworks: React, Next.js, Node.js",
  certifications: [{ id: "certification-sample", name: "Computer Systems Servicing NC II", issuer: "TESDA", date: "June 2025" }],
};
