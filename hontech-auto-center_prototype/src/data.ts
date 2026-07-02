import { ServiceCategory, Milestone, CoreValue, SevenC, Department, FAQItem } from "./types";

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: "major",
    name: "Preventive Maintenance Services (PMS)",
    iconName: "ShieldCheck",
    tagline: "Comprehensive check with condition/status report and expert recommendations",
    services: [
      { id: "pms-brakes", name: "Clean/Check Brake Systems", description: "Brake shoe/pad cleaning and caliper sliding pins lubrication for maximum stopping safety.", estimatedPrice: 850 },
      { id: "pms-tires", name: "Check/Rotate Tires", description: "Ensuring even tire tread wear, balancing and inspection of wheel alignment and suspension.", estimatedPrice: 450 },
      { id: "pms-lights", name: "Check All Light Bulbs Operations", description: "Full signal and illumination inspection to ensure night-time visibility and safety compliance.", estimatedPrice: 150 },
      { id: "pms-air", name: "Check Air Intake System", description: "Inspecting clean airflow into the engine to preserve fuel efficiency and horsepower.", estimatedPrice: 200 },
      { id: "pms-ac", name: "Check A/C System & Filter", description: "A/C refrigerant check and cabin filter inspection for crisp, cold air conditioning.", estimatedPrice: 500 },
      { id: "pms-coolant", name: "Check Coolant & Radiator", description: "Coolant level check and radiator structural inspection to prevent engine overheating.", estimatedPrice: 300 },
      { id: "pms-belt", name: "Check Drive Belt Tension", description: "Inspecting condition and tightness of serpentine belts driving alternator and water pumps.", estimatedPrice: 250 },
      { id: "pms-spark", name: "Check Spark Plugs Condition", description: "Clean and gap check to guarantee proper cylinder ignition and smooth idle.", estimatedPrice: 400 },
    ]
  },
  {
    id: "basic",
    name: "Basic Maintenance Services",
    iconName: "Droplet",
    tagline: "Essential fluid and filter swaps to keep your engine running smooth, quiet, and healthy",
    services: [
      { id: "basic-oil", name: "Change Engine Oil", description: "Premium oil replacement tailored to your engine specifications (Fully Synthetic/Semi).", estimatedPrice: 2400 },
      { id: "basic-oilfilter", name: "Change Oil Filter", description: "Premium replacement of filter cartridge to keep circulating oil free of abrasive particles.", estimatedPrice: 450 },
      { id: "basic-airfilter", name: "Change Engine Air Filter", description: "Replacement of dirty or clogged air filter element to optimize engine combustion.", estimatedPrice: 650 },
      { id: "basic-labor", name: "Standard Labor & Calibration", description: "Certified casa-grade mechanical labor and precision torque-spec checkups.", estimatedPrice: 950 },
    ]
  },
  {
    id: "added",
    name: "Additional & Specialty Services",
    iconName: "Sparkles",
    tagline: "Added body care, paint, undercoating, detailing, and roadside safety coverage",
    services: [
      { id: "add-carwash", name: "Car Wash", description: "Foam wash, deep tire-shine, and interior vacuum to restore showroom cleanliness.", estimatedPrice: 180 },
      { id: "add-enginewash", name: "Engine Wash", description: "High-pressure detailing of engine bay to clean dirt and oil grease safely.", estimatedPrice: 450 },
      { id: "add-paint", name: "Body and Paint (per panel)", description: "Oven-baked premium painting and scuff repair to match original factory coat.", estimatedPrice: 3500 },
      { id: "add-home", name: "Home Service / Pick-up", description: "Convenient car pickup or technician dispatch to your residence in Marikina area.", estimatedPrice: 1200 },
      { id: "add-detail", name: "Car Detailing & Wax", description: "Deep exterior claying, single-stage paint correction, and premium wax coating.", estimatedPrice: 3200 },
      { id: "add-undercoat", name: "Undercoating", description: "Rust-proof sealing applied underneath the chassis to protect against water/mud.", estimatedPrice: 4500 },
      { id: "add-roadside", name: "Road Assistance", description: "24/7 towing and minor on-site troubleshooting for registered Hontech customers.", estimatedPrice: 1500 },
      { id: "add-parts", name: "Parts & Materials Supply", description: "Genuine OEM parts and consumables matching international quality standards.", estimatedPrice: 1000 },
      { id: "add-record", name: "Record Monitoring Assistance", description: "Continuous log tracker keeping history of your PMS milestones with text alerts.", estimatedPrice: 0 },
    ]
  }
];

export const SIX_CS: SevenC[] = [
  {
    title: "Compliant",
    description: "Compliant in maintenance standard practice same as casa, following periodic schedule or as needed.",
    iconName: "ClipboardCheck"
  },
  {
    title: "Competent",
    description: "Competent people employed who are casa-trained and experienced technicians from top car companies in the Philippines.",
    iconName: "Award"
  },
  {
    title: "Competitive",
    description: "Competitive in price without compromising quality. Offers longer warranty period because of our quality-first principle.",
    iconName: "TrendingUp"
  },
  {
    title: "Customer-Centric",
    description: "Values customer satisfaction. Validates and reviews feedback after services to ensure continuous improvement.",
    iconName: "HeartHandshake"
  },
  {
    title: "Certificate Provided",
    description: "Issues certificate of records maintenance upon request, ensuring transparent service documentation for resale value.",
    iconName: "FileBadge"
  },
  {
    title: "Convenient",
    description: "Convenient and accessible location to all basic requirements. Easy booking with immediate support.",
    iconName: "MapPin"
  }
];

export const CORE_VALUES: CoreValue[] = [
  {
    title: "Policies",
    description: "Certificate of record maintenance, no questions asked in related repeated jobs, and clear warranty on selected parts/service.",
    iconName: "ScrollText"
  },
  {
    title: "People",
    description: "Co-owners, ex-casa employees, and casa-trained & experienced professionals dedicated to genuine service.",
    iconName: "Users"
  },
  {
    title: "Principles",
    description: "Quality over Profit, Safety is our priority concern, and Customer Satisfaction is our ultimate inspiration.",
    iconName: "Compass"
  },
  {
    title: "Partnership",
    description: "Workers, Customers, Stakeholders, and Shareholders—all working together on a unified trust-based network.",
    iconName: "Handshake"
  },
  {
    title: "Procedures",
    description: "Casa-concept approach with optimized, cost-efficient processes to deliver maximum speed and precision.",
    iconName: "Settings2"
  }
];

export const MILESTONES: Milestone[] = [
  {
    year: "2020",
    title: "Foundation & Launch",
    description: "Despite the immense global challenges brought by the pandemic, the company successfully launched its operations in a 240 sqm office with a highly dedicated team of 8 personnel, specializing in emergency automotive repair.",
    stats: [
      { value: "240 SQM", label: "Initial Service Space" },
      { value: "8 Experts", label: "Founding Mechanics" }
    ]
  },
  {
    year: "2022 - Present",
    title: "Remarkable Expansion",
    description: "The company experienced remarkable growth, expanding its service bay space to five times the previous area and doubling its elite workforce—a true testament to our commitment to exceptional services and transparent pricing.",
    stats: [
      { value: "1,200 SQM", label: "Expanded Service Area" },
      { value: "16+ Elite", label: "Casa-Trained Technicians" }
    ]
  }
];

export const DEPARTMENTS: Department[] = [
  {
    name: "General Services",
    iconName: "Settings",
    description: "Routine checkups, quick lubrication, tire rotation, and initial mechanical safety inspections."
  },
  {
    name: "Marketing and Service Care",
    iconName: "Megaphone",
    description: "Client service coordination, customer feedback validation, and transparent quote estimations."
  },
  {
    name: "Admin and Supporting Group",
    iconName: "Briefcase",
    description: "Managing service records, compliance, warranty support, and long-term customer partnerships."
  },
  {
    name: "Technical and Services",
    iconName: "Wrench",
    description: "Deep engines rebuild, advanced electrical troubleshooting, aircon repairs, and heavy chassis work."
  },
  {
    name: "Purchasing and Logistics",
    iconName: "Package",
    description: "Sourcing premium OEM parts and authentic high-grade oils directly to minimize cost for clients."
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What does 'Casa-Grade' or 'Casa-Like' mean?",
    answer: "Casa-grade refers to the premium quality standards and procedures followed by official dealership centers. Hontech's supervisors and senior mechanics are former supervisors and technicians from top car dealerships in the Philippines. We follow the exact same diagnostic and maintenance checklists, but at a fraction of dealership prices."
  },
  {
    question: "Do you offer warranties on your services?",
    answer: "Yes! Hontech operates on a quality-first principle. We offer warranties on our selected replacement parts and services. For any related repeated jobs within the warranty period, we resolve them with a strict 'no questions asked' policy."
  },
  {
    question: "Can I request a record of my maintenance history?",
    answer: "Absolutely. Upon request, Hontech issues an official Certificate of Maintenance Records. This documentation is highly valuable for vehicle resale, proving your car was cared for under strict schedule."
  },
  {
    question: "Do you accept walk-ins, or should I schedule an appointment?",
    answer: "We accept walk-ins; however, to ensure zero waiting time and instant diagnostics, we highly recommend booking an appointment online or calling in advance, especially during weekends."
  },
  {
    question: "Where is Hontech located?",
    answer: "We are located at 70 Bayan-bayanan Ave. corner SW Narra St., Marikina Heights, Marikina City, Metro Manila. Our service area is a fully-equipped 1,200 sqm center capable of handling multiple vehicles simultaneously."
  }
];
