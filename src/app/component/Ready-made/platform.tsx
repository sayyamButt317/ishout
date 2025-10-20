import { Platforms } from "@/src/constant/platform";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
import SeletedItem from "../seleteditem";
import { PlatformType } from "@/src/types/readymadeinfluencers-type";

export function ChoosePlatform() {
  const { addToArray } = useReadyMadeTemplateStore();

  return (
    <div className="space-y-4 rounded-xl border border-section-overlays bg-background p-6 bg-gradient-to-r from-[#0c0c22]  via-[#3c69bb] to-[#1a1a3f]">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primaryButton text-white text-xs font-semibold">
          1
        </span>
        <h2 className="text-lg font-semibold text-Primary-text">
          Choose Platform
        </h2>
      </div>
      <div>
        <p className="text-sm text-Secondary-text">
          Select the platform where you want to find influencers.
        </p>
      </div>

      {/* Platform Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        role="radiogroup"
        aria-label="Choose Platform"
      >
        {Platforms.map((platform) => (
          <SeletedItem
            key={platform?.name}
            item={platform?.name as PlatformType}
            color={platform?.color}
            icon={platform?.icon}
            // isSelected={getField("isSelected")}
            onClick={() => {
              addToArray("platform", platform.name);
              // setField("isSelected", !getField("isSelected"));
            }}
          />
        ))}
      </div>
    </div>
  );
}
