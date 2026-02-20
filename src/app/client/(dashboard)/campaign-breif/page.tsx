'use client';
import { Input } from '@/components/ui/input';
import Button from '@/src/app/component/button';
import CampaignBreifHook from '@/src/routes/Company/api/Hooks/CampaignBreif-hook';
import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const CampaignBreifPage = () => {
    const { mutate: generateCampaignBreif, isPending } = CampaignBreifHook();
    const [input, setInput] = useState('');
    
    const handleGenerateCampaignBreif = () => {
        if (input.trim()) {
            generateCampaignBreif(input);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isPending && input.trim()) {
            handleGenerateCampaignBreif();
        }
    }

    return (
        <div className="relative min-h-screen w-full bg-black overflow-hidden text-white flex flex-col items-center justify-center">
     
            <Image
                src="https://ik.imagekit.io/dtdxnyskk/leftVector.svg"
                alt="leftVector"
                unoptimized={true}
                loading="lazy"
                width={800}
                height={800}
                className="absolute left-0 top-0 h-full w-auto object-contain pointer-events-none opacity-40"
            />
            <Image
                src="https://ik.imagekit.io/dtdxnyskk/rightVector.svg"
                alt="rightVector"
                unoptimized={true}
                loading="lazy"
                width={800}
                height={800}
                className="absolute right-0 top-0 h-full w-auto object-contain pointer-events-none opacity-40"
            />

          
            <div className="relative z-10 w-full max-w-3xl px-6 md:px-8 lg:px-10">
                
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl italic font-light text-white leading-tight">
                        How Can I Assist You Today
                    </h1>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="relative w-full">
                        <div className="relative flex items-center px-5 py-3 md:px-6 md:py-4 rounded-2xl border border-white/30 bg-white/5 backdrop-blur-md hover:border-white/40 transition-all duration-300">
                            <input
                                type="text"
                                placeholder="Write down your prompt here...."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="flex-1 bg-transparent text-white placeholder:text-white/50 outline-none text-sm md:text-base font-normal"
                            />
                            <button
                                onClick={handleGenerateCampaignBreif}
                                disabled={isPending || !input.trim()}
                                className="flex-shrink-0 flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-white hover:bg-white/95 text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg ml-3"
                                aria-label="Send prompt"
                            >
                                {isPending ? (
                                    <Loader2 className='w-5 h-5 md:w-5 md:h-5 animate-spin' />
                                ) : (
                                    <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CampaignBreifPage
