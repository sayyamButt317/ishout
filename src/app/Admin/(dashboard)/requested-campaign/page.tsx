"use client";
import TableComponent from "@/src/app/component/CustomTable";
import React from "react";

const RequestedCampaigns = () => {
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
