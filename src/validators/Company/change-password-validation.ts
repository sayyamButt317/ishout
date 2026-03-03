import { z } from 'zod';

export const ChangePasswordFormSchema = z
    .object({
        old_password: z
            .string()
            .min(1, { message: 'Password is required.' }),
        new_password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long.' }),
    });

export type ChangePasswordFormValidator = z.infer<typeof ChangePasswordFormSchema>;

