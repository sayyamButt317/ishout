import { useQuery } from "@tanstack/react-query"
import { ExtractAllInfluencerDemoGraphics } from "../../API/admin.routes"

export default function AllUsersHook(campaign_id: string) {
    return useQuery({
        queryKey: ['all-influencers', campaign_id],
        queryFn: () => ExtractAllInfluencerDemoGraphics(campaign_id),
        enabled: !!campaign_id,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}