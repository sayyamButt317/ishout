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
            <p className="text-md text-white/65 leading-relaxed ">
                {value || <span className="italic text-white/25">—</span>}
            </p>
        );
    }
    return (
        <textarea
            rows={rows}
            className='w-full bg-black/30 border border-white/10 rounded-xl  px-6 py-3 text-md text-white placeholder:text-white/30 focus:outline-none focus:border-primaryButton/50 focus:ring-1 focus:ring-primaryButton/20 transition-all resize-none disabled:opacity-50 disabled:cursor-default leading-relaxed'
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}