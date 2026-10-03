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
