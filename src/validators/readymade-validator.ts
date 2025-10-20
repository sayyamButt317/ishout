import z from "zod";

export const readymadeValidator = z.object({
    platform: z.array(z.string()).min(1, "Please select at least one platform"),
    category: z.array(z.string()).min(1, "Please select at least one category"),
    limit: z.string().min(1, "Please select a limit"),
    followers: z.array(z.string()).min(1, "Please select at least one follower"),
    country: z.array(z.string()).min(1, "Please select at least one country"),
})

export type ReadymadeValidatorType = z.infer<typeof readymadeValidator>;