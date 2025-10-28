"use client";
import TableComponent from "@/src/app/component/CustomTable";
import AllCampaignHook from "@/src/routes/Admin/Hooks/Allcampaign-hook";
import React from "react";

export default function AllCampaignPage() {
  const { data, isLoading, error } = AllCampaignHook();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data?.data) {
    return <div>No data found</div>;
  }
  console.log(data?.data);
  return (
    <div>
      <h1>All Campaigns</h1>
      <TableComponent
        header={[
          "#",
          "Campaign Name",
          "Client Name",
          "Requested Date",
          "Status",
        ]}
        subheader={[
          ["1", "Campaign Name", "Client Name", "Requested Date", "Status"],
        ]}
        paginationstart={1}
        paginationend={10}
        onPageChange={(page: number) => {
          console.log(page);
        }}
      />
    </div>
  );
}
