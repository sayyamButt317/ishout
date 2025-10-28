import { z } from 'zod';

export const SignUpFormSchema = z
    .object({
        company_name: z
            .string()
            .min(2, { message: 'Company name must be at least 3 characters long.' }),
        contact_person: z.string().min(1, { message: 'Contact person is required.' }),
        phone: z.string().min(1, { message: 'Phone number is required.' }),
        industry: z.string().min(1, { message: 'Industry type is required.' }),
        company_size: z.string().min(1, { message: 'Company size is required.' }),
        email: z.string().email({ message: 'Please enter a valid email address.' }),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long.' }),
    });


export type SignUpFormValidator = z.infer<typeof SignUpFormSchema>;
