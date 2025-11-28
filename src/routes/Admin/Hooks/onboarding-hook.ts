import { useQuery } from "@tanstack/react-query";
import { ApprovedOnBoardingInfluencers } from "../API/admin.routes";

export default function OnboardingHook(campaign_id: string, page: number = 1) {
    return useQuery({
        queryKey: ['onboarding', campaign_id, page],
        queryFn: () => ApprovedOnBoardingInfluencers(campaign_id, page),
        enabled: !!campaign_id,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}