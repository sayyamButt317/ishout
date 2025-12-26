"use client";
import ExcelJs from "exceljs";
import { toast } from "sonner";
import { ApprovedInfluencersStore } from "@/src/store/Campaign/influencers.store";

const ExportToExcel = () => {
  const data = ApprovedInfluencersStore.getState().approvedInfluencers;
  if (!data || data.length === 0) {
    toast.error("No approved influencers found");
    return;
  }

  const fileName = "ApprovedInfluencers.xlsx";
  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet("Approved Influencers", {
    views: [{ showGridLines: true }],
  });

  // Add title
  worksheet.getCell("A1").value = "Approved Influencers List";
  worksheet.getCell("A1").font = { size: 20, bold: true };
  worksheet.getCell("A1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };
  worksheet.getCell("A1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "c5d9f1" },
  };
  worksheet.mergeCells("A1:H1");
  worksheet.getCell("A1").border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  const headers = [
    "Username",
    "Platform",
    "Followers",
    "Engagement Rate",
    "Country",
    // "Category",
    // "Bio",
  ];

  // Add header row
  const headerRow = worksheet.getRow(3);
  headers.forEach((header, index) => {
    const cell = headerRow.getCell(index + 1);
    cell.value = header;
    cell.font = { bold: true, size: 12 };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "c5d9f1" },
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    cell.alignment = { horizontal: "center", vertical: "middle" };
  });

  // Add data rows starting from row 4
  data.forEach((influencer, index) => {
    const dataRow = worksheet.getRow(index + 4);
    const rowData = [
      influencer.username,
      influencer.platform,
      influencer.followers,
      `${(influencer.engagementRate * 100).toFixed(2)}%`,
      influencer.country,
      // influencer.category,
      // influencer.bio,
    ];

    rowData.forEach((value, colIndex) => {
      const cell = dataRow.getCell(colIndex + 1);
      cell.value = value;
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = { wrapText: true, vertical: "top" };
    });
  });

  // Set column widths
  const columnWidths = [25, 20, 15, 15, 18, 15, 15, 40];
  columnWidths.forEach((width, index) => {
    worksheet.getColumn(index + 1).width = width;
  });

  // Download the file
  workbook.xlsx
    .writeBuffer()
    .then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    })
    .catch((error) => {
      console.error("Error creating Excel file:", error);
      toast.error("Error creating Excel file. Please try again.");
    });
};

export default ExportToExcel;
