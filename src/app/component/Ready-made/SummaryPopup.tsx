import React, { useState } from "react";
import CustomButton from "../button";
import Spinner from "../custom-component/spinner";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/campaign.store";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";
import CreateCampaignHook from "@/src/routes/Company/api/Hooks/create-campaign.hook";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { Input } from "@/components/ui/input";

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
  inputValue: string;
  onInputChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (item: string) => void;
}

const EditableField = ({
  config,
  value,
  inputValue,
  onInputChange,
  onAdd,
  onRemove,
}: EditableFieldProps) => {
  return (
    <div className="bg-white/5 rounded-lg p-1.5 border border-white/10">
      <div className="flex items-center gap-1 mb-1">
        <div className={`h-1 w-1 rounded-full ${config.color.dot}`} />
        <h4 className="text-[10px] font-semibold text-white">{config.label}</h4>
      </div>
      <div className="flex flex-wrap gap-1 min-h-[16px]">
        {config.isArray && Array.isArray(value) && value.length > 0
          ? value.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className={`inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r ${config.color.gradient} ${config.color.border} px-1.5 py-0.5 ${config.color.text} text-[10px] font-medium`}
              >
                {item}
                <button
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
                  onClick={() => onRemove(item)}
                >
                  <X className="w-1.5 h-1.5" />
                </button>
              </span>
            ))
          : !config.isArray && value && (
              <span
                className={`inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r ${config.color.gradient} ${config.color.border} px-1.5 py-0.5 ${config.color.text} text-[10px] font-medium`}
              >
                {config.displayValue ? config.displayValue(value) : value}
              </span>
            )}
      </div>
      <div className="flex gap-1 mt-1">
          <Input
            type="text"
            placeholder={config.placeholder}
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAdd();
              }
            }}
            className={`flex-1 h-6 text-[10px] bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus-visible:${config.color.ring}`}
          />
          <button
            onClick={onAdd}
            className={`px-1.5 py-0.5 ${config.color.button} rounded-md text-xs font-medium transition-colors`}
          >
            <Plus size={10} />
          </button>
        </div>
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
    clearTemplate,
    removeFromArray,
    addToArray,
    setField,
  } = useReadyMadeTemplateStore();

  const { company_name } = useAuthStore();
  const { mutateAsync: findInfluencer, isPending } = CreateCampaignHook();

  const [inputs, setInputs] = useState({
    platform: "",
    category: "",
    followers: "",
    country: "",
    limit: "",
  });

  const fieldValues = { platform, category, followers, country, limit };

  const handleAddValue = (config: FieldConfig) => {
    const value = inputs[config.key].trim();
    if (!value) return;

    if (config.isArray) {
      addToArray(config.key as "platform" | "category" | "followers" | "country", value);
    } else {
      setField(config.key, value);
    }

    setInputs((prev) => ({ ...prev, [config.key]: "" }));
  };

  const handleRemoveValue = (config: FieldConfig, item: string) => {
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-6 md:pt-8 p-3 md:p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl lg:max-w-3xl max-h-[85vh]">
        <div className="group rounded-2xl border border-white/20 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 shadow-2xl backdrop-blur-sm p-3 md:p-4 max-h-[85vh] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 via-transparent to-gray-500/10 opacity-50 rounded-2xl" />
          <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br from-slate-400/20 to-gray-400/20 blur-xl" />
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-gradient-to-tr from-zinc-400/20 to-slate-400/20 blur-xl" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start justify-between mb-2 gap-1.5">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-500 to-gray-600 rounded-full blur-sm opacity-75" />
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-slate-500 to-gray-600 text-white text-sm font-bold shadow-lg">
                    📋
                  </div>
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white mb-0 tracking-tight">
                    Campaign Summary
                  </h3>
                  <p className="text-slate-100/80 text-[10px] leading-tight">
                    Review your campaign settings before launching
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white hover:bg-white/10 rounded-full p-1 transition-all duration-200 self-end sm:self-start"
              >
                <X size={16} className="md:w-4 md:h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1 text-[10px] mb-2">
              <div
                className={`h-1 w-1 rounded-full ${
                  isFormComplete ? "bg-green-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span
                className={`${isFormComplete ? "text-green-200" : "text-amber-200"}`}
              >
                {isFormComplete ? "Ready to launch" : "Complete all fields"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 md:gap-2">
              {fieldConfigs.map((config) => (
                <EditableField
                  key={config.key}
                  config={config}
                  value={fieldValues[config.key]}
                  inputValue={inputs[config.key]}
                  onInputChange={(value) =>
                    setInputs((prev) => ({ ...prev, [config.key]: value }))
                  }
                  onAdd={() => handleAddValue(config)}
                  onRemove={(item) => handleRemoveValue(config, item)}
                />
              ))}
            </div>

            <div className="mt-2 space-y-1.5">
              <div className="flex flex-col sm:flex-row gap-1.5">
                <CustomButton
                  onClick={() => clearTemplate()}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all duration-200 hover:scale-105"
                >
                  Clear
                </CustomButton>
                <CustomButton
                  onClick={() => handleLaunchCampaign()}
                  disabled={!isFormComplete || isPending}
                  className={`flex-1 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all duration-200 hover:scale-105 ${
                    isFormComplete
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25"
                      : "bg-slate-600 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-1">
                      <Spinner size={12} />
                      Creating...
                    </div>
                  ) : (
                    "Create Campaign"
                  )}
                </CustomButton>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-400">
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
