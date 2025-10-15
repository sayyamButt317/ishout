import { Platforms } from "@/src/constant/platform"
import { PlatformType, useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
import SeletedItem from "@/src/app/component/seleteditem";

export function ChoosePlatform() {
    const {setField, platform} = useReadyMadeTemplateStore();
    const selected = platform;

    return (
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Choose Platform</h3>
          <p className="text-sm text-slate-600">
            Select the platform where you want to find influencers.
          </p>
        </div>
  
        {/* Platform Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Choose Platform">
          {Platforms.map((platform) => (
            <SeletedItem
              key={platform.name}
              item={platform.name as PlatformType}
              color={platform.color}
              icon={platform.icon}
              isSelected={selected === (platform.name as PlatformType)}
              onClick={() => setField("platform", platform.name as PlatformType)}
            />
          ))}
        </div>
      </div>
    );
  }