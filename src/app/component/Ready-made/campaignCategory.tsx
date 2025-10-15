import React from "react";
import { campaignNames, getCategoryIcon } from "@/src/constant/campaignname";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";

const CampaignCategoryComponent = () => {
  const {setField  } = useReadyMadeTemplateStore();
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Choose Campaign Category</h3>
          <p className="text-sm text-slate-600">Select a category that best matches your campaign goals.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
        {campaignNames.map((category) => (
          <button
            key={category}
            onClick={() => setField("category", category)}
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
    </section>
  );
};

export default CampaignCategoryComponent;
