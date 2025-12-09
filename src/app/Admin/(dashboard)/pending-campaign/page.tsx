"use client";
import { Button } from "@/components/ui/button";
import TableComponent from "@/src/app/component/CustomTable";
import { Loader2Icon, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PlatformBadge from "@/src/app/component/custom-component/platformbadge";
import CountButton from "@/src/app/component/custom-component/countbutton";
import { DropDownCustomStatus } from "@/src/app/component/custom-component/dropdownstatus";
import { usePendingCampaigns } from "@/src/routes/Admin/Hooks/pendingCampaign-hook";
import AdminGenerateInfluencersHook from "@/src/routes/Admin/Hooks/generateInfluencers-hook";
import UpdateCampaignStatusHook from "@/src/routes/Admin/Hooks/updateCamapignStatus-hook";
import { AdminAllCampaignApiResponse } from "@/src/types/Admin-Type/Campaign.type";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/campaign.store";
import { ApprovedInfluencersStore } from "@/src/store/Campaign/approved-influencers.store";

export default function AdminPendingCampaigns() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isRefetching } =
    usePendingCampaigns(currentPage);
  const { clearTemplate } = useReadyMadeTemplateStore();
  const { clearApprovedInfluencers } = ApprovedInfluencersStore.getState();

  const generateInfluencers = AdminGenerateInfluencersHook();
  const { setCompanyUserId } = useAuthStore();

  const updateCampaignStatusHook = UpdateCampaignStatusHook();

  const [loadingCampaignId, setLoadingCampaignId] = useState<string | null>(
    null
  );
  const router = useRouter();

  return (
    <>
      <div className="flex flex-row ">
        <h1 className="italic text-2xl md:text-4xl font-semibold text-white tracking-tight">
          Pending Campaigns
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
            className={`mt-5 w-4 h-4 text-primary-text cursor-pointer ${
              isRefetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>
      <p className="italic text-xs text-slate-200 mt-2 mb-2">
        Showing {data?.campaigns.length} of {data?.total} pending campaigns
      </p>
      <TableComponent
        header={[
          "#Campaign ID",
          "User",
          "Source",
          "Platform",
          "Requested ",
          "Status",
          "Created At",
          "Generate",
        ]}
        subheader={data?.campaigns.map(
          (campaign: AdminAllCampaignApiResponse) => [
            campaign._id,
            <div key={`company-name-${campaign._id}`} className="truncate">
              {campaign?.company_name}
            </div>,
            <div key={`source-${campaign._id}`} className="truncate">
              {campaign?.user_type}
            </div>,
            <div key={`platform-${campaign._id}`} className="truncate">
              <PlatformBadge platform={[campaign.platform]} />
            </div>,
            <div key={`requested-${campaign._id}`} className="truncate">
              <CountButton count={campaign.limit} />
            </div>,
            <div key={`status-${campaign._id}`} className="truncate">
              <DropDownCustomStatus
                status={campaign.status}
                updateStatus={(status: string) => {
                  updateCampaignStatusHook.mutate({
                    campaign_id: campaign._id,
                    status: status,
                  });
                  // updateCampaignStatusHook.onSuccess(() => {
                  //   router.replace(`/Admin/pending-campaign`);
                  // });
                }}
              />
            </div>,
            <div key={`created-at-${campaign._id}`} className="truncate">
              {new Date(campaign.created_at).toLocaleDateString()}
            </div>,
            <div key={`view-${campaign._id}`} className="truncate">
              <Button
                key={`generate-${campaign._id}`}
                className="bg-primaryButton hover:bg-primaryHover text-white"
                onClick={() => {
                  clearTemplate();
                  clearApprovedInfluencers();
                  setLoadingCampaignId(campaign._id);
                  generateInfluencers.mutate(
                    {
                      campaign_id: campaign._id,
                      limit: campaign.limit,
                    },
                    {
                      onSuccess: () => {
                        setCompanyUserId(campaign.user_id);
                        setLoadingCampaignId(null);
                        router.push(`/Admin/pending-campaign/${campaign._id}`);
                      },
                      onError: () => {
                        setLoadingCampaignId(null);
                      },
                    }
                  );
                }}
                disabled={loadingCampaignId === campaign._id}
              >
                {loadingCampaignId === campaign._id ? (
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                ) : (
                  "Generate"
                )}
              </Button>
            </div>,
          ]
        )}
        paginationstart={data?.page ?? 1}
        paginationend={data?.total_pages ?? 1}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
        isLoading={isLoading}
      />
    </>
  );
}
