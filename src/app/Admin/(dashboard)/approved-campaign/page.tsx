"use client";
import { Button } from "@/components/ui/button";
import CountButton from "@/src/app/component/custom-component/countbutton";
import { DropDownCustomStatus } from "@/src/app/component/custom-component/dropdownstatus";
import PlatformBadge from "@/src/app/component/custom-component/platformbadge";
import TableComponent from "@/src/app/component/CustomTable";
import ApprovedCampaignHook from "@/src/routes/Admin/Hooks/approvedCampaign-hook";
import UpdateCampaignStatusHook from "@/src/routes/Admin/Hooks/updateCamapignStatus-hook";
import { ApprovedCampaignResponse } from "@/src/types/Admin-Type/Campaign.type";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ApprovedCampaignPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isRefetching } =
    ApprovedCampaignHook(currentPage);

  const updateCampaignStatusHook = UpdateCampaignStatusHook();

  const router = useRouter();
  return (
    <>
      <div className="flex flex-row ">
        <h1 className="italic text-2xl md:text-4xl font-semibold text-white tracking-tight">
          Approved Campaigns
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            refetch();
          }}
          disabled={isRefetching}
        >
          <RefreshCcw
            className={`mt-5 w-4 h-4 text-primary-text cursor-pointer ${isRefetching ? "animate-spin" : ""
              }`}
          />
        </Button>
      </div>
      <p className="italic text-xs text-slate-200 mt-2 mb-2">
        Showing {data?.campaigns.length} of {data?.total} approved campaigns
      </p>
      <TableComponent
        header={[
          "Company Name",
          "Source",
          "Campaign Name",
          "Platform",
          "Requested ",
          "Status",
          "Created At",
          "View",
        ]}
        subheader={data?.campaigns?.map(
          (campaign: ApprovedCampaignResponse) => [
            <div key={`company-name-${campaign?._id}`} className="truncate">
              {campaign?.company_name}
            </div>,
            <div key={`source-${campaign?._id}`} className="truncate">
              {campaign?.user_type}
            </div>,
            <div key={`name-${campaign?.campaign_id}`} className="truncate">
              {campaign?.name}
            </div>,
            <div key={`platform-${campaign._id}`} className="truncate">
              <PlatformBadge platform={campaign?.platform} />
            </div>,
            <div key={`requested-${campaign._id}`} className="truncate">
              <CountButton count={campaign?.limit} />
            </div>,
            // <div key={`approved-${campaign._id}`} className="truncate">
            //   <CountButton count={campaign?.approved_influencers_count} />
            // </div>,
            // <div key={`rejected-${campaign._id}`} className="truncate">
            //   <CountButton count={campaign?.rejected_influencers_count} />
            // </div>,
            <div key={`status-${campaign?._id}`} className="truncate">
              <DropDownCustomStatus
                status={campaign?.status}
                updateStatus={(status: string) => {
                  updateCampaignStatusHook.mutate({
                    campaign_id: campaign?.campaign_id,
                    status: status,
                  });
                }}
              />
            </div>,
            <div key={`created-at-${campaign._id}`} className="truncate">
              {new Date(campaign?.created_at).toLocaleDateString()}
            </div>,
            <div key={`view-${campaign._id}`} className="truncate">
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => {
                  router.push(
                    `/Admin/approved-campaign/${campaign?.campaign_id}`
                  );
                }}
              >
                View
              </Button>
            </div>,
            // <div key={`delete-${campaign._id}`} className="truncate">
            //   <Button variant="outline" size="icon">
            //     <Download className="w-4 h-4 text-delete-text cursor-pointer" />
            //   </Button>
            // </div>,
          ]
        )}
        paginationstart={currentPage}
        paginationend={data?.total_pages ?? 1}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
        isLoading={isLoading}
      />
    </>
  );
};

export default ApprovedCampaignPage;
