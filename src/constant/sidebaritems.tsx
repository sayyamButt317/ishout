import {
  CircleCheck,
  FileText,
  Handshake,
  // FileText,
  Hourglass,
  LayoutGrid,
  Plus,
  User,
  UserCheck,
  Users,
} from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

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
    label: 'All Campaigns',
    route: '/Admin/all-campaign',
    icon: (
      <div className="p-2 bg-gradient-to-br from-gray-600 to-gray-400 rounded-xl">
        <LayoutGrid className="text-2xl text-white" />
      </div>
    ),
  },
  {
    label: 'Pending Campaign',
    route: '/Admin/pending-campaign',
    icon: (
      <div className="p-2 bg-gradient-to-br from-gray-600 to-gray-400 rounded-xl">
        <Hourglass className="text-2xl text-white" />
      </div>
    ),
  },
  {
    label: 'Approved Influencers',
    route: '/Admin/approved-campaign',
    icon: (
      <div className="p-2 bg-gradient-to-br from-green-600 to-green-400 rounded-xl">
        <CircleCheck className="text-2xl text-white" />
      </div>
    ),
  },
  {
    label: 'OnBoarding',
    route: '/Admin/onboarding',
    icon: (
      <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl">
        <UserCheck className="text-2xl text-white" />
      </div>
    ),
  },

  {
    label: 'User Management',
    route: '/Admin/user-management',
    icon: (
      <div className="p-2 bg-gradient-to-br from-gray-600 to-gray-400 rounded-xl">
        <Users className="text-2xl text-white" />
      </div>
    ),
  },
  {
    label: 'WhatsApp',
    route: '/Admin/whatsapp-chat',
    icon: (
      <div className="p-2 bg-gradient-to-br from-green-600 to-green-400 rounded-xl">
        <SiWhatsapp className="text-2xl text-white" />
      </div>
    ),
  },
  // {
  //   label: "Instagram",
  //   route: "/Admin/messages",
  //   icon: (
  //     <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
  //       <SiInstagram className="text-2xl text-white" />
  //     </div>
  //   ),
  // },
  {
    label: 'Negotiation',
    route: '/Admin/negotiation',
    icon: (
      <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl">
        <Handshake className="text-2xl text-white" />
      </div>
    ),
  },
  // {
  //   label: "Analytics",
  //   route: "/Admin/analytics",
  //   icon: (
  //     <div className="p-2 bg-gradient-to-br from-gray-600 to-gray-400 rounded-xl">
  //       <BarChart3 className="text-2xl text-white" />
  //     </div>
  //   ),
  // },
];
