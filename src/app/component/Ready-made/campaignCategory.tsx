import React from "react";
import { campaignNames, getCategoryIcon } from "@/src/constant/campaignname";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";

const CampaignCategoryComponent = () => {
  const { addToArray } = useReadyMadeTemplateStore();

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
        {campaignNames.map((category) => (
          <button
            key={category}
            onClick={() => addToArray("category", category)}
            className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 transition-all hover:shadow-md hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl shrink-0">
                {getCategoryIcon(category)}
              </span>
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate">
                {category}
              </span>
            </div>
          </button>
        ))}
      </div>
      {/* {getField("iseditable") && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 mt-4">
          <Input
            type="text"
            className="w-full"
            value={getField("category")}
            onChange={(e) => addToArray("category", e.target.value)}
          />
        </div>
      )} */}
      {/* <Button
        className="mt-4 cursor-pointer rounded-full bg-transparent text-black border hover:text-white hover:bg-[#f7941D] hover:border-transparent"
        type="button"
        onClick={addnewInput}
      >
        <CirclePlus />
        {getField("iseditable") ? "save" : "add manually"}
      </Button> */}
    </section>
  );
};

export default CampaignCategoryComponent;
