import z from "zod";

export const campaignValidator = z.object({
    name: z.string().min(1, "Please enter a campaign name"),
    description: z.string().min(1, "Please enter a campaign description"),
    start_date: z.string().min(1, "Please enter a start date"),
    end_date: z.string().min(1, "Please enter an end date"),
    budget: z.number().min(1, "Please enter a budget"),
    status: z.string().min(1, "Please enter a status"),
    created_at: z.string().min(1, "Please enter a created at"),
    updated_at: z.string().min(1, "Please enter an updated at"),
})

export type CampaignValidator = z.infer<typeof campaignValidator>;