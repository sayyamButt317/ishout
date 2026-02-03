"use client";

import { Card, CardContent } from "@/components/ui/card";
import CustomButton from "@/src/app/component/button";
import openWhatsApp from "@/src/app/component/custom-component/companywhastapp";
import { Sparkles, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const options = [
  {
    id: "template",
    title: "Quick Template",
    description:
      "Start fast with a ready-made campaign template to launch quickly and save time.",
    icon: Sparkles,
    route: "/client/create-campaign",
    img: "/assets/quick-template.png",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Campaign",
    description:
      "Create and manage a full WhatsApp campaign easily with AI support to help you create a campaign or by directly messaging the ishout on this number : +971 50 305 4372",
    icon: MessageCircle,
    img: "/assets/whatsapp-campaign.png",
  },
];


export default function ChooseCampaign() {
  const router = useRouter();
  // const messages = useWhatsAppChatStore((s) => s.chats[Id ?? ""] || []);
  // const addMessage = useWhatsAppChatStore((s) => s.addMessage);
  // const setMessages = useWhatsAppChatStore((s) => s.setMessages);
  // const { playMessageSentSound } = useNotificationSound();

  // const sendMessage = SendWhatsappMessageHook(Id ?? "");

  // const handleSend = useCallback(
  //   (msg: string) => {

  //     const newMessage: ChatMessage = {
  //       _id: crypto.randomUUID(),
  //       thread_id: Id!,
  //       sender: "ADMIN",
  //       message: msg,
  //       timestamp: new Date().toISOString(),
  //     };
  //     addMessage(Id!, newMessage);
  //     playMessageSentSound();
  //     sendMessage.mutate(msg);
  //   },
  //   [adminTakeover, playMessageSentSound, Id, addMessage, sendMessage]
  // );
  return (
    <div className="col-span-12 w-full flex justify-center px-4 sm:px-6 lg:px-10">
      <Card className="w-full max-w-6xl rounded-4xl bg-transparent border-none shadow-2xl p-6 sm:p-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-white italic text-center">
            Choose how you want to create your Campaign
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#606778] italic max-w-2xl mx-auto">
            Pick a quick template or WhatsApp flow to get started faster.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-2 grid gap-6">
          {options?.map((option) => {
            const Icon = option.icon;

            return (
              <Card
                key={option.id}
                className="bg-transparent border border-white/10 rounded-4xl hover:shadow-xl transition-all"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* LEFT CONTENT */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-[#ff4e7415] flex items-center justify-center">
                          <Icon className="h-6 w-6 text-[#ff4e73]" />
                        </div>
                        <h3 className="text-2xl font-bold italic text-white">
                          {option.title}
                        </h3>
                      </div>

                      <p className="mt-4 text-sm text-[#b0b6c3] italic max-w-md">
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
                        className="mt-6 px-6 py-2 italic font-semibold bg-primaryButton hover:bg-primaryHover"
                      >
                        Get Started
                      </CustomButton>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="flex-shrink-0">
                      <Image
                        src={option.img}
                        alt={option.title}
                        width={250}
                        height={180}
                        className="rounded-xl object-contain"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
