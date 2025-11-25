import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github: string;
  category: 'Web' | 'Mobile' | 'AI' | 'Design';
}

export interface Skill {
  name: string;
  icon: React.ElementType;
  level: number;
  color: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface EducationItem {
  id: number;
  degree: string;
  school: string;
  year: string;
  description: string;
}