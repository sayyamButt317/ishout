"use client";
import { Button } from "@/components/ui/button";
import TableComponent from "@/src/app/component/CustomTable";
import { WhatsAppShareButton } from "@/src/app/component/custom-component/sharebutton";
import Spinner from "@/src/app/component/custom-component/spinner";
import AllCampaignHook from "@/src/routes/Admin/Hooks/Allcampaign-hook";
import { Eye, Share2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DeleteCampaignHook from "@/src/routes/Admin/Hooks/deleteCampaign.hook";
import { AdminAllCampaignApiResponse } from "@/src/types/Admin-Type/Campaign.type";
import { DropDownCustomStatus } from "@/src/app/component/custom-component/dropdownstatus";
import UpdateCampaignStatusHook from "@/src/routes/Admin/Hooks/updateCamapignStatus-hook";

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

  const appliedStatus =
    statusFilter === "all" ? undefined : statusFilter.toLowerCase();

  const { data, isLoading, error } = AllCampaignHook(
    currentPage,
    appliedStatus
  );

  const deleteCampaignHook = DeleteCampaignHook();
  const updateCampaignStatusHook = UpdateCampaignStatusHook();
  const router = useRouter();

  const campaigns = (data?.campaigns ?? []) as AdminAllCampaignApiResponse[];
  const totalPages = Math.max(data?.total_pages ?? 1, 1);
  const totalCount = data?.total ?? campaigns.length;

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
          <h1 className="text-2xl font-bold text-white">
            Company Generated Campaigns
          </h1>
          <p className="text-sm text-white/70">
            Showing {campaigns.length} of {totalCount} campaigns
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

      {campaigns.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed border-white/20 text-center text-white/70">
          No campaigns found for the selected criteria.
        </div>
      ) : (
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
          subheader={campaigns.map((campaign: AdminAllCampaignApiResponse) => [
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
          ])}
          paginationstart={data?.page ?? currentPage}
          paginationend={totalPages}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
