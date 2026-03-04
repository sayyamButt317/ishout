import React from "react";
import CustomButton from "../button";
import Spinner from "../custom-component/spinner";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/campaign.store";
import { X, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import CreateCampaignHook from "@/src/routes/Company/api/Hooks/create-campaign.hook";
import useAuthStore from "@/src/store/AuthStore/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Platforms } from "@/src/constant/platform";
import { campaignNames } from "@/src/constant/campaignname";
import { rangeOfFollowers } from "@/src/constant/rangeoffollowers";
import { INSTAGRAM_INFLUENCERS_COUNTRIES } from "@/src/constant/country";
import { NumberofFollowers } from "@/src/constant/numberofInfluencers";

interface SummaryPopupProps {
  onClose: () => void;
}

interface FieldConfig {
  key: "platform" | "category" | "followers" | "country" | "limit";
  label: string;
  color: {
    dot: string;
    gradient: string;
    border: string;
    text: string;
    button: string;
    ring: string;
  };
  placeholder: string;
  isArray: boolean;
  displayValue?: (value: any) => string;
}

const fieldConfigs: FieldConfig[] = [
  {
    key: "platform",
    label: "Platform",
    color: {
      dot: "bg-blue-400",
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-400/30",
      text: "text-blue-100",
      button: "bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-100",
      ring: "ring-blue-400/50",
    },
    placeholder: "Enter platform (e.g., Instagram)",
    isArray: true,
  },
  {
    key: "category",
    label: "Category",
    color: {
      dot: "bg-purple-400",
      gradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-400/30",
      text: "text-purple-100",
      button: "bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-purple-100",
      ring: "ring-purple-400/50",
    },
    placeholder: "Enter category (e.g., Fashion)",
    isArray: true,
  },
  {
    key: "followers",
    label: "Follower Range",
    color: {
      dot: "bg-amber-400",
      gradient: "from-amber-500/20 to-orange-500/20",
      border: "border-amber-400/30",
      text: "text-amber-100",
      button: "bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-100",
      ring: "ring-amber-400/50",
    },
    placeholder: "Enter follower range (e.g., 10k-50k)",
    isArray: true,
  },
  {
    key: "limit",
    label: "Influencer Count",
    color: {
      dot: "bg-emerald-400",
      gradient: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-400/30",
      text: "text-emerald-100",
      button: "bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-100",
      ring: "ring-emerald-400/50",
    },
    placeholder: "Enter influencer count (e.g., 20)",
    isArray: false,
    displayValue: (value) => `${value} influencers`,
  },
  {
    key: "country",
    label: "Countries",
    color: {
      dot: "bg-rose-400",
      gradient: "from-rose-500/20 to-pink-500/20",
      border: "border-rose-400/30",
      text: "text-rose-100",
      button: "bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-rose-100",
      ring: "ring-rose-400/50",
    },
    placeholder: "Enter country (e.g., Saudi Arabia)",
    isArray: true,
  },
];

interface EditableFieldProps {
  config: FieldConfig;
  value: any;
  options: string[];
  onSelect: (item: string) => void;
  onRemove: (item: string) => void;
}

const EditableField = ({
  config,
  value,
  options,
  onSelect,
  onRemove,
}: EditableFieldProps) => {
  const [open, setOpen] = React.useState(false);

  const selectedItems = config.isArray
    ? (Array.isArray(value) ? value : [])
    : value
      ? [value]
      : [];

  const getDisplayText = () => {
    if (config.isArray) {
      if (selectedItems.length === 0) return config.placeholder;
      if (selectedItems.length === 1) return selectedItems[0];
      return `${selectedItems.length} selected`;
    } else {
      if (!value) return config.placeholder;
      return config.displayValue ? config.displayValue(value) : value;
    }
  };

  return (
    <div className="bg-white/5 rounded-lg p-3 lg:p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-2 lg:mb-3">
        <div className={`h-1.5 w-1.5 lg:h-2 lg:w-2 rounded-full ${config.color.dot}`} />
        <h4 className="text-xs lg:text-sm font-semibold text-white">{config.label}</h4>
      </div>
      <div className="flex flex-wrap gap-1.5 lg:gap-2 min-h-[24px] lg:min-h-[28px] mb-2 lg:mb-3">
        {selectedItems.length > 0
          ? selectedItems.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${config.color.gradient} ${config.color.border} border px-2 py-1 ${config.color.text} text-[10px] lg:text-xs font-medium`}
            >
              {config.isArray ? item : config.displayValue ? config.displayValue(item) : item}
              <button
                className="hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
                onClick={() => onRemove(item)}
              >
                <X className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
              </button>
            </span>
          ))
          : null}
      </div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className={`w-full flex items-center justify-between h-8 lg:h-10 px-3 lg:px-4 rounded-md text-xs lg:text-sm bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors ${config.color.ring} focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900`}
          >
            <span className="truncate">{getDisplayText()}</span>
            <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5 shrink-0 ml-2" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`z-[100] w-[var(--radix-dropdown-menu-trigger-width)] max-h-[250px] overflow-y-auto bg-slate-800/95 backdrop-blur-sm border-white/10 ${config.color.border}`}
          align="start"
          side="bottom"
          sideOffset={4}
          avoidCollisions={false}
          collisionPadding={0}
        >
          {config.isArray ? (
            options.map((option) => {
              const isSelected = selectedItems.includes(option);
              return (
                <DropdownMenuCheckboxItem
                  key={option}
                  checked={isSelected}
                  onCheckedChange={() => {
                    if (isSelected) {
                      onRemove(option);
                    } else {
                      onSelect(option);
                    }
                  }}
                  className={`text-xs lg:text-sm text-white focus:bg-white/10 ${config.color.text}`}
                >
                  {option}
                </DropdownMenuCheckboxItem>
              );
            })
          ) : (
            <DropdownMenuRadioGroup
              value={value || undefined}
              onValueChange={(val) => {
                if (val === value) {
                  onRemove(val);
                } else {
                  onSelect(val);
                }
              }}
            >
              {options.map((option) => (
                <DropdownMenuRadioItem
                  key={option}
                  value={option}
                  className={`text-xs lg:text-sm text-white focus:bg-white/10 ${config.color.text}`}
                >
                  {config.displayValue ? config.displayValue(option) : option}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const SummaryPopup = ({ onClose }: SummaryPopupProps) => {
  const {
    platform,
    category,
    limit,
    followers,
    country,
    brief_id,
    clearTemplate,
    removeFromArray,
    addToArray,
    setField,
  } = useReadyMadeTemplateStore();

  const { company_name } = useAuthStore();
  const { mutateAsync: findInfluencer, isPending } = CreateCampaignHook();

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const fieldValues = { platform, category, followers, country, limit };

  const getOptionsForField = (key: string): string[] => {
    switch (key) {
      case "platform":
        return Platforms.map((p) => p.name);
      case "category":
        return campaignNames;
      case "followers":
        return rangeOfFollowers;
      case "country":
        return INSTAGRAM_INFLUENCERS_COUNTRIES;
      case "limit":
        return NumberofFollowers;
      default:
        return [];
    }
  };

  const handleSelect = (config: FieldConfig, item: string) => {
    if (config.isArray) {
      addToArray(config.key as "platform" | "category" | "followers" | "country", item);
    } else {
      setField(config.key, item);
    }
  };

  const handleRemove = (config: FieldConfig, item: string) => {
    if (config.isArray) {
      removeFromArray(config.key as "platform" | "category" | "followers" | "country" | "limit", item);
    } else {
      setField(config.key, "");
    }
  };

  const handleLaunchCampaign = async () => {
    if (!platform || !category || !followers || !country || !limit) {
      toast.error(`Please select all fields to launch campaign`);
      return;
    }
    await findInfluencer({
      platform: platform,
      category: category,
      limit: limit,
      followers: followers,
      country: country,
      company_name: company_name,
      brief_id: brief_id || undefined,
    });
    clearTemplate();
    onClose();
  };

  const isFormComplete =
    platform?.length > 0 &&
    category?.length > 0 &&
    followers?.length > 0 &&
    country?.length > 0 &&
    limit;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-6 lg:p-8 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl my-8 pb-[300px]">
        <div className="group rounded-3xl border border-white/20 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 shadow-2xl backdrop-blur-sm p-6 md:p-8 lg:p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 via-transparent to-gray-500/10 opacity-50 rounded-3xl" />
          <div className="absolute -top-4 -right-4 h-24 w-24 lg:h-32 lg:w-32 rounded-full bg-gradient-to-br from-slate-400/20 to-gray-400/20 blur-xl" />
          <div className="absolute -bottom-4 -left-4 h-28 w-28 lg:h-36 lg:w-36 rounded-full bg-gradient-to-tr from-zinc-400/20 to-slate-400/20 blur-xl" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start justify-between mb-6 lg:mb-8 gap-3">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-500 to-gray-600 rounded-full blur-sm opacity-75" />
                  <div className="relative flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-gradient-to-r from-slate-500 to-gray-600 text-white text-xl lg:text-2xl font-bold shadow-lg">
                    📋
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 tracking-tight">
                    Campaign Summary
                  </h3>
                  <p className="text-slate-100/80 text-xs lg:text-sm leading-tight">
                    Review your campaign settings before launching
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200 self-end sm:self-start"
              >
                <X size={20} className="lg:w-6 lg:h-6" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs lg:text-sm mb-6">
              <div
                className={`h-2 w-2 rounded-full ${isFormComplete ? "bg-primaryButton animate-pulse" : "bg-amber-400"
                  }`}
              />
              <span
                className={`${isFormComplete ? "text-green-200" : "text-amber-200"}`}
              >
                {isFormComplete ? "Ready to launch" : "Complete all fields"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {fieldConfigs.map((config) => (
                <EditableField
                  key={config.key}
                  config={config}
                  value={fieldValues[config.key]}
                  options={getOptionsForField(config.key)}
                  onSelect={(item) => handleSelect(config, item)}
                  onRemove={(item) => handleRemove(config, item)}
                />
              ))}
            </div>

            <div className="mt-6 lg:mt-8 space-y-3 lg:space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <CustomButton
                  onClick={() => clearTemplate()}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105"
                >
                  Clear
                </CustomButton>
                <CustomButton
                  onClick={() => handleLaunchCampaign()}
                  disabled={!isFormComplete || isPending}
                  className={`flex-1 px-4 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105 ${isFormComplete
                    ? "bg-primaryButton hover:bg-primaryHover text-white"
                    : "bg-slate-600 text-slate-400 cursor-not-allowed"
                    }`}
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner size={16} />
                      Launching...
                    </div>
                  ) : (
                    "Launch Campaign"
                  )}
                </CustomButton>
              </div>
              <div className="text-center">
                <p className="text-xs lg:text-sm text-slate-400">
                  {isFormComplete
                    ? "🎉 Your campaign is ready to launch!"
                    : "Complete all fields above to launch your campaign"}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPopup;
