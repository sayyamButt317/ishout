"use client";

import { Card, CardContent } from "@/components/ui/card";
import CustomButton from "@/src/app/component/button";
import openWhatsApp from "@/src/app/component/custom-component/companywhastapp";
import { Sparkles, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const options = [
  {
    id: "template",
    title: "Quick Template",
    description: "Start fast with a ready-made campaign template.",
    icon: Sparkles,
    route: "/client/create-campaign",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Campaign",
    description: "Create and manage a full WhatsApp outreach campaign.",
    icon: MessageCircle,
  },
];

export default function ChooseCampaign() {
  const router = useRouter();
  return (
    <div className="col-span-12 w-full flex justify-center px-4 sm:px-6 lg:px-10">
      <Card className="w-full max-w-6xl items-center justify-center rounded-2xl bg-transparent border-none shadow-2xl p-6 sm:p-10">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white italic">
            Choose how you want to create your Campaign
          </h1>

          <p className="mt-2 text-xs sm:text-base text-[#606778] italic max-w-2xl mx-auto">
            Pick a quick template or follow guided steps to get tailored
            results. You can change this later.
          </p>
        </div>

        {/* Options */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {options.map((option) => {
            const Icon = option.icon;

            return (
              <Card
                key={option.id}
                className="cursor-pointer rounded-2xl border hover:shadow-lg transition flex-1 max-w-sm"
              >
                <CardContent className="flex flex-col items-center text-center p-6 h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-primaryButton text-primaryButton">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 text-lg font-medium text-white">
                    {option.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#606778]">
                    {option.description}
                  </p>

                  <CustomButton
                    onClick={() => {
                      if (option.id === "whatsapp") {
                        openWhatsApp();
                      } else {
                        router.push(option.route ?? "");
                      }
                    }}
                    className="mt-6 bg-primaryButton rounded-xl hover:text-white"
                  >
                    Select
                  </CustomButton>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
