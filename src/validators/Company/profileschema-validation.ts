import { z } from "zod";
import { isValidPhoneNumber } from 'react-phone-number-input';
import { isValidPhoneLength, normalizePhoneNumberForDisplay } from '@/src/utils/phone.utils';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const CompanyProfileFormSchema = z.object({
    company_name: z.string().min(3, { message: 'Company name must be at least 3 characters long.' }),
    contact_person: z.string().min(2, { message: 'Contact person must be at least 2 characters long.' }),
    phone: z
        .string()
        .min(1, { message: 'Please enter your phone number.' })
        .refine((value) => {
            if (!isValidPhoneLength(value)) {
                return false;
            }
            const normalizedValue = normalizePhoneNumberForDisplay(value);
            if (!normalizedValue) {
                return false;
            }
            try {
                return isValidPhoneNumber(normalizedValue);
            } catch {
                return false;
            }
        }, {
            message: 'Please enter a valid phone number (7-15 digits).',
        }),
    email: z.string().regex(emailRegex, { message: 'Please enter a valid email address.' }),
});

export type CompanyProfileFormValidator = z.infer<typeof CompanyProfileFormSchema>;