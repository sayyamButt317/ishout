import { NumberofFollowers } from "@/src/constant/numberofInfluencers";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
import React from "react";
import SeletedItem from "../seleteditem";

export function NumberofInfluencers() {
  const { setField, getField, removeFromArray } = useReadyMadeTemplateStore();
  const selectedLimit = getField("limit");

  return (
    <section className=" rounded-2xl border p-6 shadow-sm bg-background bg-gradient-to-r from-[#0c0c22]  via-[#3c69bb] to-[#1a1a3f]">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primaryButton text-white text-xs font-semibold">
              5
            </span>
            <h2 className="text-lg font-semibold text-Primary-text">
              Number of Influencers
            </h2>
          </div>
          <p className="text-sm text-Secondary-text">Pick a number.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
        {NumberofFollowers?.map((influencer) => (
          <SeletedItem
            key={influencer}
            item={influencer}
            color="bg-white hover:bg-gray-50 border border-slate-200 hover:border-primaryButton focus:ring-2 focus:ring-primaryButton focus:ring-offset-2"
            icon={
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                {influencer}
              </span>
            }
            isSelected={selectedLimit === influencer}
            onClick={() => {
              if (selectedLimit === influencer) {
                removeFromArray("limit", influencer);
              } else {
                setField("limit", influencer);
              }
            }}
          />
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
}
