
import { QuestionGuided } from "@/src/routes/Company/api/company.routes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { GuidedQuestionsType } from "../types/guidedquestion-type";
import { useGuidedQuestionStore } from "../store/Campaign/guidedQuestion-store";

export default function QuestionGuidedhook() {
    const setGuidedQuestion = useGuidedQuestionStore((s) => s.setMultipleFields);
    return useMutation({
        mutationFn: (guidedQuestion: GuidedQuestionsType) => QuestionGuided(guidedQuestion),
        onSuccess: async (data) => {
            setGuidedQuestion(data);
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to find influencer', {
                description:
                    axiosError.response?.data?.detail || 'An error occurred during influencer finding.',
            });
        },
    });
}
