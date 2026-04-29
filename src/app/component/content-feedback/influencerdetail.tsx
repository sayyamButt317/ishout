"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import ExtractPostDemoGraphicsHook from "@/src/routes/Admin/Hooks/feedback/report-hook";
import CustomButton from "../button";

const ExtractSchema = z.object({
    username: z.string().min(1, "Username is required"),
    url: z.url("Enter valid Instagram URL"),
});

type FormValues = z.infer<typeof ExtractSchema>;

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const InfluencerDetailDialog = ({ open, onOpenChange }: Props) => {
    const { mutate: extractdemographics, isPending } =
        ExtractPostDemoGraphicsHook();

    const form = useForm<FormValues>({
        resolver: zodResolver(ExtractSchema),
        defaultValues: {
            username: "",
            url: "",
        },
    });

    const onSubmit = (data: FormValues) => {
        extractdemographics({
            username: data.username,
            url: data.url,
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <CustomButton className="bg-primarytext text-white">
                    Open Extract Dialog
                </CustomButton>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Extract Reel Analytics</DialogTitle>
                </DialogHeader>

                <Card className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            {/* Username */}
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="@username"
                                                {...field}
                                                className="h-12 rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Reel URL */}
                            <FormField
                                control={form.control}
                                name="url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="https://instagram.com/reel/..."
                                                {...field}
                                                className="h-12 rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full h-12 rounded-xl bg-primarytext text-white"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <Loader2 className="animate-spin items-center justify-center" />
                                ) : (
                                    "Extract Analytics"
                                )}
                            </button>
                        </form>
                    </Form>
                </Card>
            </DialogContent>
        </Dialog>
    );
};

export default InfluencerDetailDialog;