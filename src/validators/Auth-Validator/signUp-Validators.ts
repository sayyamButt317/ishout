import { z } from 'zod';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const SignUpFormSchema = z
    .object({
        company_name: z
            .string()
            .min(3, { message: 'Company name must be at least 3 characters long.' }),
        contact_person: z.string().min(2, { message: 'Contact person must be at least 2 characters long.' }),
        phone: z.string().regex(phoneRegex, { message: 'Please enter a valid phone number.' }),
        // industry: z.string().min(1, { message: 'Industry type is required.' }),
        // company_size: z.string().min(1, { message: 'Company size is required.' }),
        email: z.string().regex(emailRegex, { message: 'Please enter a valid email address.' }),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long.' }),
    });


export type SignUpFormValidator = z.infer<typeof SignUpFormSchema>;
