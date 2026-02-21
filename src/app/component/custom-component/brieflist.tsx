'use client';

import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';

export interface BriefItem {
    id: string;
    prompt: string;
    summary: string;
    createdAt: string;
}

interface Props {
    briefs: BriefItem[];
    onSelect: (brief: BriefItem) => void;
}

export const BriefList = ({ briefs, onSelect }: Props) => {
    if (!briefs?.length) return null;

    return (
        <div className="mt-12 space-y-6">
            <div className="flex items-center gap-2 text-white/50 text-sm">
                <Clock size={14} />
                Recent Generated Briefs
            </div>

            <div className="grid gap-4">
                {briefs.map((brief) => (
                    <motion.div
                        key={brief.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(brief)}
                        className="cursor-pointer p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition backdrop-blur-xl"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-white font-medium line-clamp-1">
                                {brief.prompt}
                            </h3>
                            <ArrowUpRight
                                size={16}
                                className="text-white/40 group-hover:text-white"
                            />
                        </div>

                        <p className="text-white/50 text-sm line-clamp-2">
                            {brief.summary}
                        </p>

                        <div className="mt-4 text-xs text-white/30">
                            {new Date(brief.createdAt).toLocaleDateString()}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};