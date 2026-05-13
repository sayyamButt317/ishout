import z from "zod";

export const ExtractSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(512, "Input is too long"),
});

export type FormValues = z.infer<typeof ExtractSchema>;




export const ReelExtractSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(512, "Input is too long"),
  url: z.url("Enter valid Instagram URL"),
});

export type ReelFormValues = z.infer<typeof ReelExtractSchema>;


