"use client";
import { Button } from "@/components/ui/button";
import TableComponent from "@/src/app/component/CustomTable";
import { WhatsAppShareButton } from "@/src/app/component/custom-component/whatsappshare";
import AllCampaignHook from "@/src/routes/Admin/Hooks/Allcampaign-hook";
import { RefreshCcw, Trash } from "lucide-react";
import React, { useState } from "react";
import DeleteCampaignHook from "@/src/routes/Admin/Hooks/deleteCampaign.hook";
import { AdminAllCampaignApiResponse } from "@/src/types/Admin-Type/Campaign.type";
import UpdateCampaignStatusHook from "@/src/routes/Admin/Hooks/updateCamapignStatus-hook";
import PlatformBadge from "@/src/app/component/custom-component/platformbadge";
import CountButton from "@/src/app/component/custom-component/countbutton";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/src/app/component/custom-component/statusbadge";

const STATUS_OPTIONS = [
  { label: "All statuses", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Approved", value: "approved" },
  { label: "Completed", value: "completed" },
  { label: "Rejected", value: "rejected" },
] as const;

export default function AllCampaignPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  // const router = useRouter();

  const appliedStatus =
    statusFilter === "all" ? undefined : statusFilter.toLowerCase();

  const { data, isLoading, refetch, isRefetching } = AllCampaignHook(
    currentPage,
    appliedStatus
  );

  const deleteCampaignHook = DeleteCampaignHook();
  const updateCampaignStatusHook = UpdateCampaignStatusHook();

  const campaigns = (data?.campaigns ?? []) as AdminAllCampaignApiResponse[];
  const totalPages = Math.max(data?.total_pages ?? 1, 1);
  const totalCount = data?.total ?? campaigns.length;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-row items-center gap-2">
            <h1 className="italic text-2xl font-bold text-white">
              Company Generated Campaigns
            </h1>
            <Button
              className="cursor-pointer"
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
            Showing {campaigns?.length} of {totalCount} campaigns
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="campaign-status-filter"
            className="text-sm text-white/80"
          >
            Filter by status
          </label>
          <select
            id="campaign-status-filter"
            value={statusFilter}
            onChange={handleStatusChange}
            className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-primaryButton"
          >
            {STATUS_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="text-black"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <TableComponent
        header={[
          "#Campaign ID",
          "Company",
          "Category",
          "Platform",
          "Followers",
          "Influencers",
          "Requested At",
          "Status",
          // "View",
          "Share",
          "Delete",
        ]}
        subheader={campaigns.map((campaign: AdminAllCampaignApiResponse) => [
          campaign._id,
          <div key={`company-name-${campaign._id}`} className="truncate">
            {campaign?.company_name}
          </div>,
          <div key={`category-${campaign._id}`} className="truncate">
            <Badge className="text-xs capitalize">{campaign?.category}</Badge>
          </div>,
          <div key={`platform-${campaign._id}`} className="truncate">
            <PlatformBadge platform={[campaign?.platform]} />
          </div>,
          <div key={`followers-${campaign._id}`} className="truncate">
            {campaign?.followers?.join(", ")}
          </div>,
          <div
            key={`requested-influencers-${campaign._id}`}
            className="flex items-center justify-center"
          >
            <CountButton count={campaign?.limit} />
          </div>,
          <div key={`requested-date-${campaign._id}`} className="truncate">
            {new Date(campaign.created_at).toLocaleDateString()}
          </div>,

          // <div
          //   key={`rejected-influencers-${campaign._id}`}
          //   className="truncate"
          // >
          //   {campaign.rejected_influencers_count}
          // </div>,
          <div key={`status-${campaign._id}`} className="truncate">
            <StatusBadge status={campaign.status} />
            {/* <DropDownCustomStatus
              status={campaign.status}
              updateStatus={(status: string) => {
                updateCampaignStatusHook.mutate({
                  campaign_id: campaign._id,
                  status: status,
                });
              }}
            /> */}
          </div>,
          // <div key={`view-${campaign._id}`} className="truncate">
          //   <Button
          //     className="cursor-pointer"
          //     variant="outline"
          //     size="icon"
          //     onClick={() => router.push(`/Admin/all-campaign/${campaign._id}`)}
          //   >
          //     <Eye className="w-4 h-4 text-primary-text cursor-pointer" />
          //   </Button>
          // </div>,
          <div
            key={`share-${campaign._id}`}
            className="truncate cursor-pointer"
          >
            <WhatsAppShareButton userId={campaign?.user_id ?? ""} />
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
        ])}
        paginationstart={data?.page ?? currentPage}
        paginationend={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </>
  );
}
