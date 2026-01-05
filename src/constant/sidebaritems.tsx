import {
  Bell,
  ChartBar,
  CircleCheck,
  // FileText,
  Hourglass,
  LayoutGrid,
  MessageCircle,
  Plus,
  User,
  UserCheck,
} from "lucide-react";

export const employeeSidebarLinks = [
  {
    //   img: '/images/community.png',
    label: "Create Campaign",
    route: "/client/choose-campaign",
    icon: <Plus className="w-5 h-5" />,
  },

  {
    label: "Review Influencer",
    route: "/client/influencer-review",
    icon: <UserCheck className="w-5 h-5" />,
  },
  {
    label: "All Campaigns",
    route: "/client/all-campaign",
    icon: <LayoutGrid className="w-5 h-5" />,
  },
  {
    label: "Profile",
    route: "/client/profile",
    icon: <User className="w-5 h-5" />,
  },

  // {
  //   label: "Contents",
  //   route: "/client/content",
  //   icon: <FileText className="w-5 h-5" />,
  // },
];

export const adminSidebarLinks = [
  {
    label: "Pending Campaign",
    route: "/Admin/pending-campaign",
    icon: <Hourglass className="w-5 h-5" />,
  },
  {
    label: "Approved Campaign",
    route: "/Admin/approved-campaign",
    icon: <CircleCheck className="w-5 h-5" />,
  },
  {
    label: "All Campaigns",
    route: "/Admin/all-campaign",
    icon: <LayoutGrid className="w-5 h-5" />,
  },
  {
    label: "User Management",
    route: "/Admin/user-management",
    icon: <User className="w-5 h-5" />,
  },
  {
    label: "OnBoarding",
    route: "/Admin/onboarding",
    icon: <UserCheck className="w-5 h-5" />,
  },
  {
    label: "WhatsApp Chat",
    route: "/Admin/whatsapp-chat",
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    label: "Instagram Notifications",
    route: "/Admin/messages",
    icon: <Bell className="w-5 h-5" />,
  },
  {
    label: "Analytics",
    route: "/Admin/analytics",
    icon: <ChartBar className="w-5 h-5" />,
  },
];
