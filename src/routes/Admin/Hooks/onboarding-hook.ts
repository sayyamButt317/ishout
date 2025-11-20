import { useQuery } from "@tanstack/react-query";
import { ApprovedOnBoardingInfluencers } from "../API/admin.routes";

export default function OnboardingHook(page: number = 1) {
    return useQuery({
        queryKey: ['onboarding', page],
        queryFn: () => ApprovedOnBoardingInfluencers(page),
        refetchOnWindowFocus: false, // Don't refetch on window focus
        refetchOnReconnect: false,
        refetchOnMount: (query) => !query.getObserversCount(),
    })
}