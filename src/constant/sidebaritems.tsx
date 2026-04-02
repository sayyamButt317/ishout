// employee + adminSidebarLinks.tsx
import {
  LayoutGrid, CheckCircle,
  CircleCheck,
  Hourglass,
  Plus,
  User,
  UserCheck,
  Video,
  FileText, Users, Handshake, MessageCircle,
} from 'lucide-react';
import Image from 'next/image';
export const employeeSidebarLinks = [
  {
    label: 'Create Campaign',
    route: '/client/choose-campaign',
    icon: (
      <Plus className="w-5 h-5 text-secondarytext group-hover:text-primarytext transition-colors" />
    ),
  },
  {
    label: 'Review Influencer',
    route: '/client/influencer-review',
    icon: (
      <UserCheck className="w-5 h-5 text-slate-700 group-hover:text-primarytext transition-colors" />
    ),
  },
  {
    label: 'All Campaigns',
    route: '/client/all-campaign',
    icon: (
      <LayoutGrid className="w-5 h-5 text-slate-700 group-hover:text-primarytext transition-colors" />
    ),
  },
  {
    label: 'Campaign Brief',
    route: '/client/briefs',
    icon: (
      <FileText className="w-5 h-5 text-slate-700 group-hover:text-primarytext transition-colors" />
    ),
  },
  {
    label: 'Image Studio',
    route: '/client/image-studio',
    icon: (
      <Image
        src="/assets/studio.png"
        alt="Image Studio"
        width={50}
        height={50}
        className="w-full h-full rounded-full"
      />
    ),
  },
  {
    label: 'Video Studio',
    route: '/client/video-studio',
    icon: (
      <Video className="w-5 h-5 text-slate-700 group-hover:text-primarytext transition-colors" />
    ),
  },
  {
    label: 'Content Feedback',
    route: '/client/content-feedback',
    icon: (
      <FileText className="w-5 h-5 text-slate-700 group-hover:text-primarytext transition-colors" />
    ),
  },
  {
    label: 'Approved Content',
    route: '/client/approved-contents',
    icon: (
      <CheckCircle className="w-5 h-5 text-slate-700 group-hover:text-primarytext transition-colors" />
    ),
  },
  {
    label: 'Profile',
    route: '/client/profile',
    icon: (
      <User className="w-5 h-5 text-slate-700 group-hover:text-primarytext transition-colors" />
    ),
  },
];

// {
//   label: "Contents",
//   route: "/client/content",
//   icon: <FileText className="w-5 h-5" />,
// },

export const adminSidebarLinks = [
  {
    label: 'Campaigns',
    icon: <LayoutGrid size={15} />,
    iconBg: 'bg-violet-500/20',
    iconColor: 'text-violet-400',
    children: [
      { label: 'All Campaigns',    route: '/Admin/all-campaign' },
      { label: 'Pending',          route: '/Admin/pending-campaign' },
      { label: 'iShout Approved',  route: '/Admin/approved-campaign' },
      { label: 'Brand Approved',   route: '/Admin/brand-approved' },
    ],
  },
  {
    label: 'Workflow',
    icon: <CircleCheck size={15} />,
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    children: [
      { label: 'Negotiation', route: '/Admin/onboarding' },
      { label: 'Content',     route: '/Admin/content' },
      { label: 'Report',      route: '/Admin/report' },
    ],
  },
  {
    label: 'Users & Messaging',
    icon: <Users size={15} />,
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    children: [
      { label: 'User Management', route: '/Admin/user-management' },
      { label: 'WhatsApp',        route: '/Admin/whatsapp-chat' },
      { label: 'Negotiation',     route: '/Admin/negotiation' },
    ],
  },
];