import { useQuery } from "@tanstack/react-query";
import { ApprovedOnBoardingInfluencers } from "../API/admin.routes";

export default function OnboardingHook() {
    return useQuery({
        queryKey: ['onboarding'],
        queryFn: () => ApprovedOnBoardingInfluencers(),
    })
}