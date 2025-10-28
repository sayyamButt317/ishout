"use client";
import TableComponent from "@/src/app/component/CustomTable";
import React from "react";

const ApprovedCampaignPage = () => {
  return (
    <div>
      <h1>Approved Campaigns</h1>
      <TableComponent
        header={[
          "#",
          "Campaign Name",
          "Client Name",
          "Requested Date",
          "Status",
          "View",
          "Delete",
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
      />
    </div>
  );
};

export default ApprovedCampaignPage;
