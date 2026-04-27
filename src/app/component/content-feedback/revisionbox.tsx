import { Card } from '@/components/ui/card'
import useRevisionMessageStore from '@/src/store/Feedback/revisionmessage-store'
import CustomButton from '../button'
import SendRevisionHook from '@/src/routes/Admin/Hooks/feedback/send-revision-hook'
import { MessageCircleWarning, TimerIcon } from 'lucide-react';

interface TimestampItem {
    time: number
    feedback: string
}

export const RevisionBox = () => {
    const sendinfo = SendRevisionHook()
    const { buildPayload, removeTimestamp, timestamps } = useRevisionMessageStore()

    const sendRevisionTimeandMessage = () => {
        const payload = buildPayload()
        sendinfo.mutate(payload)
    }

    return (
        <div className="mt-3 space-y-2">
            <Card className='px-2'>
                <h1 className='text-xl font-semibold'>Revision Timeline</h1>
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

                <CustomButton
                    onClick={sendRevisionTimeandMessage}
                    className='w-full bg-primaryButton'
                >
                    Send Feedback
                </CustomButton>
            </Card>
        </div>
    )
}