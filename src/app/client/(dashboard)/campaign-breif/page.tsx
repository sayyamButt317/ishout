import { Input } from '@/components/ui/input';
import Button from '@/src/app/component/button';
import CampaignBreifHook from '@/src/routes/Admin/Hooks/CampaignBreif-hook';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'

const CampaignBreifPage = () => {
    const { mutate: generateCampaignBreif, isPending } = CampaignBreifHook();
    const [input, setInput] = useState('');
    const handleGenerateCampaignBreif = () => {
        generateCampaignBreif(input);
    }
    return (
        <div>
            <Input placeholder='Enter your campaign breif'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='w-full'
            />
            <Button onClick={handleGenerateCampaignBreif} disabled={isPending} className='w-full'>
                {isPending ? <Loader2 className='w-4 h-4 animate-spin' /> : 'Generate Campaign Breif'}
            </Button>
        </div>
    )
}

export default CampaignBreifPage
