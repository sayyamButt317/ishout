'use client';

export const EditableText = ({
    value,
    editable,
    onChange,
    placeholder,
    rows = 6,
}: {
    value: string;
    editable: boolean;
    onChange: (v: string) => void;
    placeholder?: string;
    rows?: number;
}) => {
    if (!editable) {
        return (
            <p className="text-md text-foreground/65 leading-relaxed ">
                {value || <span className="italic text-foreground/25">—</span>}
            </p>
        );
    }
    return (
        <textarea
            rows={rows}
            className='w-full bg-white border-slate-300  dark:bg-black/30 border dark:border-white/10 rounded-xl  px-6 py-3 text-md text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primaryButton/50 focus:ring-1 focus:ring-primaryButton/20 transition-all resize-none disabled:opacity-50 disabled:cursor-default leading-relaxed'
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}