import { z } from "zod";

const phoneRegex = /^\+?[1-9]\d{1,14}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const CompanyProfileFormSchema = z.object({
    company_name: z.string().min(3, { message: 'Company name must be at least 3 characters long.' }),
    contact_person: z.string().min(2, { message: 'Contact person must be at least 2 characters long.' }),
    phone: z.string().regex(phoneRegex, { message: 'Please enter a valid phone number.' }),
    email: z.string().regex(emailRegex, { message: 'Please enter a valid email address.' }),
});

export type CompanyProfileFormValidator = z.infer<typeof CompanyProfileFormSchema>;