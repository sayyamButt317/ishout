import React from "react";
import { campaignNames, getCategoryIcon } from "@/src/constant/campaignname";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
import SeletedItem from "../seleteditem";

const CampaignCategoryComponent = () => {
  const { addToArray, getField, removeFromArray } = useReadyMadeTemplateStore();
  const selectedCategory = getField("category");

  return (
    <section className=" rounded-xl border border-section-overlays bg-background p-6 bg-gradient-to-r from-[#0c0c22]  via-[#3c69bb] to-[#1a1a3f]">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primaryButton text-white text-xs font-semibold">
              2
            </span>
            <h2 className="text-lg font-semibold text-Primary-text">
              Campaign Category
            </h2>
          </div>
          <p className="text-sm text-Secondary-text">
            Select a category that best matches your campaign goals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
        {campaignNames?.map((category) => (
          <SeletedItem
            key={category}
            item={category}
            color="bg-white hover:bg-gray-50 border border-slate-200 hover:border-primaryButton focus:ring-2 focus:ring-primaryButton focus:ring-offset-2"
            icon={
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                {getCategoryIcon(category)} {category}
              </span>
            }
            onClick={() => {
              if (selectedCategory?.includes(category)) {
                removeFromArray("category", category);
              } else {
                addToArray("category", category);
              }
            }}
            isSelected={selectedCategory?.includes(category)}
          />
        ))}
      </div>
    </section>
  );
};

export default CampaignCategoryComponent;
