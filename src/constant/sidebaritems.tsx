import React from 'react';
import { LayoutGrid, User, Video, Users} from 'lucide-react';

// ─── Shared types ─────────────────────────────────────────────────────────────

export interface SidebarChildLink {
  label: string;
  route: string;
}

export interface SidebarGroupLink {
  label: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  children: SidebarChildLink[];
}

// ─── Employee (Company/Client) Sidebar ───────────────────────────────────────

export const employeeSidebarLinks: SidebarGroupLink[] = [
  {
    label: 'Campaigns',
    icon: React.createElement(LayoutGrid, { size: 15 }),
    iconBg: 'bg-primaryButton/10',
    iconColor: 'text-primarytext',
    children: [
      { label: 'All Campaigns',      route: '/client/all-campaign' },
      { label: 'Create Campaign',    route: '/client/choose-campaign' },
      { label: 'Campaign Brief',     route: '/client/briefs' },
      { label: 'Review Influencers', route: '/client/influencer-review' },
      { label: 'Content Feedback',   route: '/client/influncers-content' },
      { label: 'Approved Content',   route: '/client/approved-contents/all-campaigns' },
    ],
  },
  {
    label: 'Studio',
    icon: React.createElement(Video, { size: 15 }),
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
    children: [
      { label: 'Image Studio', route: '/client/image-studio' },
      { label: 'Video Studio', route: '/client/video-studio' },
    ],
  },
  {
    label: 'Account',
    icon: React.createElement(User, { size: 15 }),
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    children: [
      { label: 'Profile', route: '/client/profile' },
    ],
  },
];

// ─── Admin Sidebar ────────────────────────────────────────────────────────────

export const adminSidebarLinks: SidebarGroupLink[] = [
  {
    label: 'Campaigns',
    icon: React.createElement(LayoutGrid, { size: 15 }),
    iconBg: 'bg-primaryButton/10',
    iconColor: 'text-primarytext',
    children: [
      { label: 'All Campaigns',   route: '/Admin/all-campaign' },
      { label: 'Pending',         route: '/Admin/pending-campaign' },
      { label: 'iShout Approved', route: '/Admin/approved-campaign' },
      { label: 'Brand Approved',  route: '/Admin/brand-approved' },
      { label: 'Onboarding',      route: '/Admin/onboarding' },
      { label: 'Content',         route: '/Admin/content' },
      { label: 'Report',          route: '/Admin/report' },
    ],
  },
  {
    label: 'Users & Messaging',
    icon: React.createElement(Users, { size: 15 }),
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
    children: [
      { label: 'User Management', route: '/Admin/user-management' },
      { label: 'WhatsApp',        route: '/Admin/whatsapp-chat' },
      { label: 'Negotiation',     route: '/Admin/negotiation' },
    ],
  },
];