// types.ts

export interface ProfileBanner {
  backgroundimage: { url: string }; // Note: lowercase in GraphQL
  headline: string;
  resumeLink: string | { url: string }; // Currently a String, should be File type
  linkedinlink: string; // Note: lowercase in GraphQL
  profilesummary: string; // Note: lowercase in GraphQL
}

export interface WorkPermit {
  summary: string;
  visaStatus?: string; // Field needs to be created in DatoCMS
  expiryDate?: Date; // Field needs to be created in DatoCMS
  additionalInfo?: string; // Field needs to be created in DatoCMS
}

export interface TimelineItem {
  name: string;
  title: string;
  position?: number;
  timelinetype?: 'work' | 'education'; // Field needs to be created in DatoCMS
  techstack?: string; // Field needs to be created in DatoCMS
  summarypoints?: string[]; // Field needs to be created in DatoCMS
  daterange: string; // Field needs to be created in DatoCMS
}

export interface Project {
  title: string;
  description: string;
  techUsed: string;
  image: { url: string };
}

export interface Certification {
  title: string;
  issuer: string;
  issuedDate: string;
  link: string;
  iconName: string;
}

export interface ContactMe {
  profilePicture: { url: string };
  name: string;
  title: string;
  summary: string;
  companyUniversity: string;
  linkedinLink: string;
  email: string;
  phoneNumber: string;
}

export interface Skill { 
  name: string;
  category: string;
  description: string;
  icon: string;
}

export interface Book {
  title: string;
  author: string;
  description: string;
  image: { url: string };
}