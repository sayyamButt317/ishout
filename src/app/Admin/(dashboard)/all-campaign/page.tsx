"use client";
import { Button } from "@/components/ui/button";
import TableComponent from "@/src/app/component/CustomTable";
import Spinner from "@/src/app/component/spinner";
import AllCampaignHook from "@/src/routes/Admin/Hooks/Allcampaign-hook";
import { Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function AllCampaignPage() {
  const { data, isLoading, error } = AllCampaignHook();
  const router = useRouter();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-2xl font-bold">
          Error: {error.message}
        </div>
      </div>
    );
  }
  if (!data?.campaigns) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-primary-text text-2xl font-bold">
          No data found
        </div>
      </div>
    );
  }
  console.log("response data ", data);
  return (
    <>
      <TableComponent
        header={[
          "#",
          "Campaign Name",
          "Company Name",
          "Platform",
          "Requested Date",
          "Approved Influencers",
          "Rejected Influencers",
          "Status",
          "View",
          "Delete",
        ]}
        subheader={data?.campaigns.map((campaign: any) => [
          campaign._id,
          <div key={`name-${campaign._id}`} className="truncate">
            {campaign.name}
          </div>,
          <div key={`company-name-${campaign._id}`} className="truncate">
            {campaign.company_name}
          </div>,
          <div key={`platform-${campaign._id}`} className="truncate">
            {campaign.platform}
          </div>,
          <div key={`requested-date-${campaign._id}`} className="truncate">
            {campaign.requested_date}
          </div>,
          <div
            key={`approved-influencers-${campaign._id}`}
            className="truncate"
          >
            {campaign.approved_influencers_count}
          </div>,
          <div
            key={`rejected-influencers-${campaign._id}`}
            className="truncate"
          >
            {campaign.rejected_influencers_count}
          </div>,
          <div key={`status-${campaign._id}`} className="truncate">
            {campaign.status}
          </div>,
          <div key={`view-${campaign._id}`} className="truncate">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push(`/Admin/all-campaign/${campaign._id}`)}
            >
              <Eye className="w-4 h-4 text-primary-text cursor-pointer" />
            </Button>
          </div>,
          <div key={`delete-${campaign._id}`} className="truncate">
            <Button variant="ghost" size="icon">
              <Trash className="w-4 h-4 text-delete-text cursor-pointer" />
            </Button>
          </div>,
        ])}
        paginationstart={1}
        paginationend={10}
        onPageChange={(page: number) => {
          console.log(page);
        }}
        isLoading={isLoading}
      />
    </>
  );
}
