"use client";
import { Button } from "@/components/ui/button";
import TableComponent from "@/src/app/component/CustomTable";
import { WhatsAppShareButton } from "@/src/app/component/custom-component/sharebutton";
import Spinner from "@/src/app/component/custom-component/spinner";
import AllCampaignHook from "@/src/routes/Admin/Hooks/Allcampaign-hook";
import { Eye, Share2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import DeleteCampaignHook from "@/src/routes/Admin/Hooks/deleteCampaign.hook";
import { AdminAllCampaignApiResponse } from "@/src/types/Admin-Type/Campaign.type";
import { DropDownCustomStatus } from "@/src/app/component/custom-component/dropdownstatus";
import UpdateCampaignStatusHook from "@/src/routes/Admin/Hooks/updateCamapignStatus-hook";

export default function AllCampaignPage() {
  const { data, isLoading, error } = AllCampaignHook();
  const deleteCampaignHook = DeleteCampaignHook();
  const updateCampaignStatusHook = UpdateCampaignStatusHook();
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
        <div className="text-slate-50 text-sm font-thin text-center border border-red-500 rounded-md p-4 bg-red-500/10">
          Error: {error.message}
        </div>
      </div>
    );
  }
  if (!data?.campaigns || data?.campaigns.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-primary-text text-2xl font-bold">
          No data found
        </div>
      </div>
    );
  }
  return (
    <>
      <TableComponent
        header={[
          "#",
          "Campaign Name",
          "Company Name",
          "Platform",
          "Requested Date",
          // "Approved Influencers",
          // "Rejected Influencers",
          "Status",
          "View",
          "Share",
          "Delete",
        ]}
        subheader={data?.campaigns.map(
          (campaign: AdminAllCampaignApiResponse) => [
            campaign._id,
            <div key={`name-${campaign._id}`} className="truncate">
              {campaign.name}
            </div>,
            <div key={`company-name-${campaign._id}`} className="truncate">
              {campaign.user_details?.company_name}
            </div>,
            <div key={`platform-${campaign._id}`} className="truncate">
              {campaign.platform}
            </div>,
            <div key={`requested-date-${campaign._id}`} className="truncate">
              {new Date(campaign.created_at).toLocaleDateString()}
            </div>,
            // <div
            //   key={`approved-influencers-${campaign._id}`}
            //   className="truncate"
            // >
            //   {campaign.approved_influencers_count}
            // </div>,
            // <div
            //   key={`rejected-influencers-${campaign._id}`}
            //   className="truncate"
            // >
            //   {campaign.rejected_influencers_count}
            // </div>,
            <div key={`status-${campaign._id}`} className="truncate">
              <DropDownCustomStatus
                status={campaign.status}
                updateStatus={(status: string) => {
                  updateCampaignStatusHook.mutate({
                    campaign_id: campaign._id,
                    status: status,
                  });
                }}
              />
            </div>,
            <div key={`view-${campaign._id}`} className="truncate">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  router.push(`/Admin/all-campaign/${campaign._id}`)
                }
              >
                <Eye className="w-4 h-4 text-primary-text cursor-pointer" />
              </Button>
            </div>,
            <div key={`share-${campaign._id}`} className="truncate">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  WhatsAppShareButton({
                    phone: campaign?.user_details?.phone,
                    company_name: campaign?.user_details?.company_name,
                  });
                }}
              >
                <Share2 className="w-4 h-4 text-primary--text cursor-pointer" />
              </Button>
            </div>,
            <div key={`delete-${campaign._id}`} className="truncate">
              <Button
                variant="outline"
                size="icon"
                disabled={deleteCampaignHook.isPending}
                onClick={() => {
                  deleteCampaignHook.mutate(campaign._id);
                }}
              >
                <Trash className="w-4 h-4 text-primary--text cursor-pointer" />
              </Button>
            </div>,
          ]
        )}
        paginationstart={1}
        paginationend={10}
        onPageChange={(page: number) => {
          console.log("page", page);
        }}
        isLoading={isLoading}
      />
    </>
  );
}
