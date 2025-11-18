import {
  Bell,
  CircleCheck,
  // FileText,
  Hourglass,
  LayoutGrid,
  Plus,
  UserCheck,
} from "lucide-react";

export const employeeSidebarLinks = [
  {
    //   img: '/images/community.png',
    label: "Create Campaign",
    route: "/client/create-campaign",
    icon: <Plus className="w-5 h-5" />,
  },

  // {
  //   //   img: '/images/users.png',
  //   label: "Approved Campaigns",
  //   route: "/client/approved-campaign",
  //   icon: <CircleCheck className="w-5 h-5" />,
  // },
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
    label: "OnBoarding",
    route: "/Admin/onboarding",
    icon: <UserCheck className="w-5 h-5" />,
  },
  {
    label: "Instagram Notifications",
    route: "/Admin/messages",
    icon: <Bell className="w-5 h-5" />,
  },
];
