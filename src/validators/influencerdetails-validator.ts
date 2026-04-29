import z from "zod";

export const ExtractSchema = z.object({
    username: z.string().min(1, "Username is required"),
    url: z.url("Enter valid Instagram URL"),
});

export type FormValues = z.infer<typeof ExtractSchema>;