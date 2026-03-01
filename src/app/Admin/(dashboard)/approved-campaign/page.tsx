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
      <div className="mb-6">
        <div className="flex flex-row ">
          <h1 className="italic text-xl md:text-3xl font-semibold text-white tracking-tight">
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
        <p className="italic text-xs text-slate-200 mt-2">
          Showing {data?.campaigns.length} of {data?.total} approved campaigns
        </p>
      </div>
      <TableComponent
        header={[
          "Company Name",
          "Campaign Name",
          "Source",
          "Platform",
          "Category",
          "Followers",
          "Country",
          "Requested",
          "Approved",
          "Status",
          "Created At",
          "View",
        ]}
        imageUrls={data?.campaigns?.map((campaign: ApprovedCampaignResponse) => campaign?.logo_url || null)}
        subheader={data?.campaigns?.map(
          (campaign: ApprovedCampaignResponse) => [
            <div key={`company-name-${campaign?._id}`} className="truncate">
              {campaign?.company_name}
            </div>,
            <div key={`campaign-name-${campaign?.campaign_id}`} className="truncate">
              {campaign?.name}
            </div>,
            <div key={`source-${campaign?._id}`} className="truncate">
              {campaign?.user_type}
            </div>,
            <div key={`platform-${campaign._id}`} className="truncate">
              <PlatformBadge platform={campaign?.platform} />
            </div>,
            <div key={`category-${campaign._id}`} className="truncate">
              {(campaign)?.category?.join(", ") || "-"}
            </div>,
            <div key={`followers-${campaign._id}`} className="truncate">
              {(campaign as any)?.followers?.join(", ") || "-"}
            </div>,
            <div key={`country-${campaign._id}`} className="truncate">
              {(campaign as any)?.country?.join(", ") || "-"}
            </div>,
            <div key={`requested-${campaign._id}`} className="truncate">
              <CountButton count={campaign?.limit} />
            </div>,
            <div key={`approved-${campaign._id}`} className="truncate">
              <CountButton count={(campaign as any)?.approved_influencer_count || 0} />
            </div>,
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
                className="cursor-pointer w-[60px] sm:w-[80px] h-6 sm:h-9 text-[10px] sm:text-sm whitespace-nowrap px-2 sm:px-4"
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
