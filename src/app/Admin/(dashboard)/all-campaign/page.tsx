"use client";
import { Button } from "@/components/ui/button";
import TableComponent from "@/src/app/component/CustomTable";
import { WhatsAppShareButton } from "@/src/app/component/custom-component/whatsappshare";
import AllCampaignHook from "@/src/routes/Admin/Hooks/Allcampaign-hook";
import { RefreshCcw, Trash } from "lucide-react";
import React, { useState } from "react";
import { AdminAllCampaignApiResponse } from "@/src/types/Admin-Type/Campaign.type";
import PlatformBadge from "@/src/app/component/custom-component/platformbadge";
import CountButton from "@/src/app/component/custom-component/countbutton";
import { Badge } from "@/components/ui/badge";
import UpdateStatusHook from "@/src/routes/Admin/Hooks/updateStatus-hook";
import { DropDownCustomStatus } from "@/src/app/component/custom-component/dropdownstatus";
import { DropdownMenuAction } from "@/src/app/component/custom-component/action";
import StatusBadge from "@/src/app/component/custom-component/statusbadge";
import DeleteCampaignHook from "@/src/routes/Admin/Hooks/deleteCampaign.hook";

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
  const deleteCampaignHook = DeleteCampaignHook();
  const appliedStatus =
    statusFilter === "all" ? undefined : statusFilter.toLowerCase();

  const { data, isLoading, refetch, isRefetching } = AllCampaignHook(
    currentPage,
    appliedStatus
  );

  const updateStatusHook = UpdateStatusHook();

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
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-row items-center gap-2">
            <h1 className="italic text-xl md:text-3xl font-semibold text-white tracking-tight">
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
                className={`mt-5 w-4 h-4 text-primary-text cursor-pointer ${isRefetching ? "animate-spin" : ""
                  }`}
              />
            </Button>
          </div>
          <p className="italic text-xs text-slate-200 mt-2">
            Showing {campaigns?.length} of {totalCount} campaigns
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="campaign-status-filter"
            className="italic text-sm text-white/80"
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
          "Company Name",
          "Campaign Name",
          "Source",
          "Platform",
          "Category",
          "Followers",
          "Country",
          "Requested",
          "Status",
          "Created At",
          "Chat",
          "Action",
        ]}
        imageUrls={campaigns.map((campaign: AdminAllCampaignApiResponse) => campaign?.logo_url || null)}
        statuses={campaigns.map((campaign: AdminAllCampaignApiResponse) => campaign.status)}
        campaignIds={campaigns.map((campaign: AdminAllCampaignApiResponse) => campaign._id)}
        subheader={campaigns.map((campaign: AdminAllCampaignApiResponse) => [
          <div key={`company-name-${campaign._id}`} className="truncate">
            {campaign?.company_name}
          </div>,
          <div key={`campaign-name-${campaign._id}`} className="truncate">
            {campaign?.name}
          </div>,
          <div key={`source-${campaign._id}`} className="truncate">
            {campaign?.user_type}
          </div>,
          <div key={`platform-${campaign._id}`} className="truncate">
            <PlatformBadge platform={campaign?.platform} />
          </div>,
          <div key={`category-${campaign._id}`} className="truncate">
            {campaign?.category?.join(", ") || "-"}
          </div>,
          <div key={`followers-${campaign._id}`} className="truncate">
            {campaign?.followers?.join(", ") || "-"}
          </div>,
          <div key={`country-${campaign._id}`} className="truncate">
            {campaign?.country?.join(", ") || "-"}
          </div>,
          <div key={`requested-${campaign._id}`} className="truncate">
            <CountButton count={campaign?.limit} />
          </div>,
          <div key={`status-${campaign._id}`} className="truncate">
            <DropDownCustomStatus
              status={campaign.status}
              updateStatus={(status: string) => {
                updateStatusHook.mutate({
                  campaign_id: campaign._id,
                  status: status,
                });
              }}
            />
          </div>,
          <div key={`created-at-${campaign._id}`} className="truncate">
            {new Date(campaign.created_at).toLocaleDateString()}
          </div>,
          <div
            key={`share-${campaign._id}`}
            className="truncate cursor-pointer"
          >
            {campaign?.user_type === "Website" ? (
              <WhatsAppShareButton userId={campaign?.user_id ?? ""} />
            ) : (
              <WhatsAppShareButton userId={campaign?.user_id ?? ""} />
            )}
          </div>,
          <div key={`delete-${campaign._id}`} className="truncate">
            <Button
              variant="ghost"
              size="icon"
              disabled={deleteCampaignHook.isPending}
              onClick={() => {
                deleteCampaignHook.mutate(campaign._id);
              }}
            >
              <Trash className="size-5 text-red-300 cursor-pointer" />
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
