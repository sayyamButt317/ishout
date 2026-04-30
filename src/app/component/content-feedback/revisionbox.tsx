import { Card } from '@/components/ui/card'
import useRevisionMessageStore from '@/src/store/Feedback/revisionmessage-store'
import CustomButton from '../button'
import SendRevisionHook from '@/src/routes/Admin/Hooks/feedback/send-revision-hook'
import { MessageCircleWarning, RefreshCw, TimerIcon } from 'lucide-react';

interface TimestampItem {
    time: number
    feedback: string
}

type RevisionBoxProps = {
    reviewSide?: 'admin' | 'brand'
}

export const RevisionBox = ({ reviewSide = 'admin' }: RevisionBoxProps) => {
    const sendinfo = SendRevisionHook()

    const {
        buildPayload,
        removeTimestamp,
        timestamps,
        reset,
    } = useRevisionMessageStore()

    const sendRevisionTimeandMessage = () => {
        const payload = buildPayload()

        if (!payload) return // ✅ prevent invalid send

        sendinfo.mutate({ ...payload, review_side: reviewSide }, {
            onSuccess: () => {
                reset() // ✅ CLEAR STORE + LOCAL STORAGE
            },
        })
    }

    return (
        <div className="mt-3 space-y-2">
            <Card className='px-4 py-3'>

                {/* HEADER */}
                <div className="flex items-center justify-between mb-3">
                    <h1 className='text-lg font-semibold'>Revision Timeline</h1>

                    <CustomButton
                        onClick={sendRevisionTimeandMessage}
                        disabled={!timestamps.length}
                        className='bg-primaryButton cursor-pointer flex items-center gap-2 px-4 py-2 disabled:opacity-50'
                    >
                        <RefreshCw className="size-4" />
                        Request Revision
                    </CustomButton>
                </div>

                {/* TIMELINE */}
                <div className="space-y-2">
                    {timestamps.map((item: TimestampItem, index: number) => (
                        <div
                            key={index}
                            className="flex items-start justify-between rounded-lg border border-white/10 bg-white/5 p-3"
                        >
                            <div>
                                <p className="text-xs text-white/50 flex items-center gap-1">
                                    <TimerIcon size={14} /> {item.time}s
                                </p>
                                <p className="text-sm text-white flex items-center gap-1">
                                    <MessageCircleWarning size={14} /> {item.feedback}
                                </p>
                            </div>

                            <button
                                onClick={() => removeTimestamp(index)}
                                className="text-xs text-red-400 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

            </Card>
        </div>
    )
}