import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const Section = ({ title, items, editable, onChange, }: {
    title: string;
    items: string[];
    editable: boolean;
    onChange: (updated: string[]) => void;
}) => {
    const [open, setOpen] = useState(true);

    const handleEdit = (index: number, value: string) => {
        const updated = [...items];
        updated[index] = value;
        onChange(updated);
    };

    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 transition hover:border-white/20">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <h3 className="text-lg font-semibold text-white/80">{title}</h3>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 space-y-3 text-sm text-white/65"
                    >
                        {items.map((item, i) =>
                            editable ? (
                                <textarea
                                    key={i}
                                    value={item}
                                    onChange={(e) => handleEdit(i, e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 resize-none focus:outline-none focus:border-white/30"
                                />
                            ) : (
                                <div key={i} className="flex gap-3">
                                    <span className="mt-2 w-1.5 h-1.5 bg-white/40 rounded-full" />
                                    <span>{item}</span>
                                </div>
                            )
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};