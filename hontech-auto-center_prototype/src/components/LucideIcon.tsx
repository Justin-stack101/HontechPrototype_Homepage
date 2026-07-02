import React from "react";
import {
  ShieldCheck,
  Droplet,
  Sparkles,
  ClipboardCheck,
  Award,
  TrendingUp,
  HeartHandshake,
  FileBadge,
  MapPin,
  ScrollText,
  Users,
  Compass,
  Handshake,
  Settings2,
  Settings,
  Megaphone,
  Briefcase,
  Wrench,
  Package,
  Eye,
  Target,
  Phone,
  Mail,
  Instagram,
  PlayCircle,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar,
  Car,
  Calculator,
  AlertCircle,
  CheckCircle2,
  User,
  Activity
} from "lucide-react";

interface LucideIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
  size?: number;
}

const iconsMap: Record<string, React.ComponentType<any>> = {
  ShieldCheck,
  Droplet,
  Sparkles,
  ClipboardCheck,
  Award,
  TrendingUp,
  HeartHandshake,
  FileBadge,
  MapPin,
  ScrollText,
  Users,
  Compass,
  Handshake,
  Settings2,
  Settings,
  Megaphone,
  Briefcase,
  Wrench,
  Package,
  Eye,
  Target,
  Phone,
  Mail,
  Instagram,
  PlayCircle,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar,
  Car,
  Calculator,
  AlertCircle,
  CheckCircle2,
  User,
  Activity
};

export const LucideIcon: React.FC<LucideIconProps> = ({ name, className = "", size = 24, ...props }) => {
  const IconComponent = iconsMap[name] || Wrench; // Fallback to Wrench
  return <IconComponent className={className} size={size} {...props} />;
};
