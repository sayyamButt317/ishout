"use client";
import TableComponent from "@/src/app/component/CustomTable";
import Spinner from "@/src/app/component/spinner";
import AllCampaignHook from "@/src/routes/Admin/Hooks/Allcampaign-hook";
import { useRouter } from "next/navigation";
import React from "react";

const RequestedCampaigns = () => {
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
    <div>
      <h1>List of Requested Campaigns</h1>
      <TableComponent
        header={[
          "#",
          "Campaign Name",
          "Client Name",
          "Requested Date",
          "Status",
          "View",
          "Action",
        ]}
        subheader={[
          [
            "1",
            "Campaign Name",
            "Client Name",
            "Requested Date",
            "Status",
            "View",
            "Delete",
          ],
          [
            "2",
            "Campaign Name",
            "Client Name",
            "Requested Date",
            "Status",
            "View",
            "Delete",
          ],
          [
            "3",
            "Campaign Name",
            "Client Name",
            "Requested Date",
            "Status",
            "View",
            "Delete",
          ],
          [
            "4",
            "Campaign Name",
            "Client Name",
            "Requested Date",
            "Status",
            "View",
            "Delete",
          ],
        ]}
        paginationstart={1}
        paginationend={10}
        onPageChange={(page: number) => {
          console.log(page);
        }}
        // header={HomeTableTile}
        // subheader={DATA}
        // paginationstart={DashboardTableData?.current_page}
        // paginationend={DashboardTableData?.pages}
        // onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
};

export default RequestedCampaigns;
