export interface ServiceItem {
  id: string;
  name: string;
  description?: string;
  estimatedPrice: number; // approximate base price in PHP
}

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  services: ServiceItem[];
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  stats?: {
    value: string;
    label: string;
  }[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CoreValue {
  title: string;
  description: string;
  iconName: string;
}

export interface SevenC {
  title: string;
  description: string;
  iconName: string;
}

export interface Department {
  name: string;
  iconName: string;
  description: string;
}
