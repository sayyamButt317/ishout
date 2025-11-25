import { useQuery } from "@tanstack/react-query";
import { ApprovedOnBoardingInfluencers } from "../API/admin.routes";

export default function OnboardingHook(page: number = 1) {
    return useQuery({
        queryKey: ['onboarding', page],
        queryFn: () => ApprovedOnBoardingInfluencers(page),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}