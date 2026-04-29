import { Pencil, RefreshCw, Timer } from "lucide-react";

export const reviewCards = [
    {
        name: 'Marcus Chen', role: 'Project Admin', time: '0:12',
        message: 'The color grading in this transition feels a bit too warm. Can we pull back the magenta levels by about 15%?',
        badge: 'Action Required', badgeClass: 'bg-red-500/10 text-red-300 border-red-400/30', ringClass: 'border-pink-300',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqbVGJUfHWU4DERH0SNnans2IIwxhopZD0QGBoJv2tTBOPAOW8NFqHygSoyJwakffjw_OGq2ACO23aULACVEW6AE5GBknW5SqZSYgmh_wUNsv0ko_hPVwVFmovFvBCsMdhBLVd0MaO_IbYUTy6GUU--0rVkaFj_3EjTs04sQaLDIJuag70HRcLdxdjdoBQOHyHx5FLzjWNEO7Fo427RNiSbW-evYOFAlykAxOBCnwlD3cuyxp9mfnaZ0LDudf3W8zWxoyObdLpRA8',
    },
    {
        name: 'Luxury Brand X', role: 'Brand Partner', time: '0:45',
        message: 'Logo placement approved. The motion blur on the reveal looks professional and matches our brand guidelines perfectly.',
        badge: 'Fixed & Approved', badgeClass: 'bg-indigo-500/10 text-indigo-200 border-indigo-300/30', ringClass: 'border-indigo-300',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY4XWaWlRp-pUrokPGDUJwFA72O6PQjlBUDwzVs_bHa49zFg19UORLwUJOa0IYziLSsjNzi4gnGt0YBcrQwYUqX7GC9_DNt84fq4VW4cMo9CWr16nXRMkbqEuhKCKkphhi-KxRBt7yk0UKKtB-g5b4wCnDwfQi8zXMjKnr7KClzFg2G9tXOByPMKnh5MLK9zSPfijrH-gWD-ftlAk0l7agP9LdmPGQ7XTwDDA2NSvMCR6jVABvvEGd4pjxmTeN9vuns51l_sOK_Fc',
    },
    {
        name: 'Sofia Rivera', role: 'Senior Reviewer', time: '1:12',
        message: 'Note for the final export: please ensure we use the ProRes 4444 XQ format for the master file to preserve dynamic range.',
        badge: 'Admin Note', badgeClass: 'bg-sky-500/10 text-sky-200 border-sky-300/30', ringClass: 'border-sky-300',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRkv_dFhk_wMOm2zeKSBFl85_SfFN7BaFl-ZocbMxYAYDsCPZS1OzlltX5knDL6yyw91V52FQK9hybjXUqaxLenL3kdAmgBlDDQA6yVlertwDopdrNZ8sTl6NeCWE18iDV7CxF2M1EntP1Myu4ZnqeoJSTH96vRf59_CYk8mxoDD_N2vWIy5GUu3DXtoAcdKvhdLN1_XJ-_izNjGYTZwemv7t6iF2dju9v09eV16QyL8KX_CbZGP8sykVrqa97CIHmysPg-qV3SQU',
    },
];

export const chaosCards = [
    { channel: 'WhatsApp • 10:42 AM', cls: 'top-0 right-0 -rotate-6 z-10', msg: '"Change the text color on the third clip to something more \'pop-y\'."' },
    { channel: 'Email • 11:15 AM', cls: 'bottom-10 left-10 rotate-12 z-20', msg: '"Subject: RE: RE: Feedback V2 - Let\'s use that other take for the intro."' },
];

export const contextFeatures = [
    { icon: Timer, color: 'text-[#ff4e7e]', bg: 'bg-[#ff4e7e]/10', title: 'Frame-Specific', desc: 'Every comment is hardcoded to a timestamp. Click the comment, jump to the moment.' },
    { icon: Pencil, color: 'text-[#d2bbff]', bg: 'bg-[#d2bbff]/10', title: 'Visual Annotations', desc: 'Draw directly on the video player to highlight exact pixels that need adjustment.', highlight: true },
    { icon: RefreshCw, color: 'text-[#b2c5ff]', bg: 'bg-[#b2c5ff]/10', title: 'Auto-V Syncing', desc: 'Versions are automatically stacked. Compare V1 and V2 side-by-side in real-time.' },
];
