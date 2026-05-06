import { useQuery } from "@tanstack/react-query";
import { AdminOnBoardingCampaigns } from "../API/admin.routes";

export default function OnboardingCampaignHook(page: number = 1) {
    return useQuery({
        queryKey: ['onboarding-campaign', page],
        queryFn: () => AdminOnBoardingCampaigns(page),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}