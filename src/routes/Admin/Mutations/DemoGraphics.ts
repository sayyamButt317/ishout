import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { AddInfluencerByUrlApi, DemographicsOcrApi, InfluencerPostingDetailsApi, PostingDetailsApi, ReadyForPostingApi } from "../API/admin.routes";
import { InfluencerPostingDetailsRequest } from "@/src/types/Posting/posting-type";
import usePostingStore from "@/src/store/Report/posting-store";
import useAddInfluencerStore from "@/src/store/Influencer/AddInfluencer.store";

export default function DemographicsOcrHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (url: string[]) => DemographicsOcrApi(url),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["demographics-ocr"] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to demographics ocr', {
                description: axiosError.response?.data?.detail as string
            });
        },
    })
}

export function ReadyForPostingHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ campaign_id, content_url, thread_id }: { campaign_id: string; content_url: string; thread_id: string }) =>
            ReadyForPostingApi(campaign_id, content_url, thread_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ready-for-posting"] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to ready for posting', {
                description: axiosError.response?.data?.detail as string
            });
        },
    })
}

export function PostingDetailsHook() {
    return useQuery({
        queryKey: ['posting-details'],
        queryFn: () => PostingDetailsApi(),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}

export function InfluencerPostingDetailsHook() {
    const { reset } = usePostingStore();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: InfluencerPostingDetailsRequest) => InfluencerPostingDetailsApi(payload),
        onSuccess: () => {
            reset();
            queryClient.invalidateQueries({ queryKey: ['influencer-posting-details'] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to get influencer posting details', {
                description: axiosError.response?.data?.detail as string
            });
        },

    })
}

export function AddInfluencerByUrlHook() {
    const queryClient = useQueryClient();
    const { setAddInfluencerResponse } = useAddInfluencerStore();
    return useMutation({
        mutationFn: ({
            campaign_id,
            username,
        }: {
            campaign_id: string;
            username: string;
        }) => AddInfluencerByUrlApi(campaign_id, username),

        onSuccess: (response) => {
            toast.success('Influencer added successfully');
            setAddInfluencerResponse(response);
            queryClient.invalidateQueries({
                queryKey: ['add-influencer-by-url'],
            });
        },

        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;

            toast.error('Failed to add influencer by url', {
                description: axiosError.response?.data?.detail as string,
            });
        },
    });
}