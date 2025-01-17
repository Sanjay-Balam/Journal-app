'use client'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { journalSchema } from '@/app/lib/schema';
import { BarLoader } from 'react-spinners';
import { Input } from '@/components/ui/input';
import { getMoodById, MOODS } from '@/app/lib/moods';
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { createJournalEntry } from '@/actions/journal';
import router from 'next/router';

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface ActionResult {
    collectionId?: string; 
}

const JournalEntryPage = () => {
    // Fetch Hooks
    const [isEditMode, setIsEditMode] = useState(false);
    const { loading: actionLoading, fn: actionFn, data: actionResult } = useFetch<ActionResult>(createJournalEntry);
    
    const { register, handleSubmit, control, formState: { errors }, getValues } = useForm({
        resolver: zodResolver(journalSchema),
        defaultValues: {
            title: "",
            content: "",
            mood: "",
            collectionId: ""
        }
    })
    const isLoading = actionLoading;
      // Handle successful submission
    useEffect(() => {
        if (actionResult && !actionLoading) {

            console.log("inside the useEffect hook")
            router.push(
                `/collection/${
                    actionResult.collectionId ? actionResult.collectionId : "unorganized"
                }`
            );

            toast.success(
                `Entry ${isEditMode ? "updated" : "created"} successfully!`
            );
        }
  }, [actionResult, actionLoading]);
    const onSubmit = handleSubmit(async (data) => {
        const mood = getMoodById(data.mood as keyof typeof MOODS);
        actionFn({
          ...data,
          moodScore: mood.score,
          moodQuery: mood.pixabayQuery,
        });
        console.log("Form data",data)
      });
    return (
        <div className='py-8'>
            <form className='space-y-2 mx-auto' onSubmit={onSubmit}>
                <h1 className='text-5xl md:text-6xl gradient-title'>
                    What&apos;s on your mind?
                </h1>
                {isLoading && <BarLoader color='orange' width={"100%"} />}

                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input 
                        disabled = {isLoading}
                        {...register("title")}
                        placeholder='Give your entry a title....'
                        className={`py-5 md:text-md ${errors.title ? "border-red-500" : ""
                            }`}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">How are you feeling?</label>
                    <Controller
                        name="mood"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className={errors.mood ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select a mood..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(MOODS).map((mood) => (
                                        <SelectItem key={mood.id} value={mood.id}>
                                            <span className="flex items-center gap-2">
                                                {mood.emoji} {mood.label}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.mood && (
                        <p className="text-red-500 text-sm">{errors.mood.message}</p>
                    )}
                </div>


                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        {getMoodById(getValues("mood") as keyof typeof MOODS)?.prompt ?? "Write your thoughts..."}
                    </label>
                    <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                            <ReactQuill
                                readOnly={isLoading}
                                theme="snow"
                                value={field.value}
                                onChange={field.onChange}
                                modules={{
                                    toolbar: [
                                        [{ header: [1, 2, 3, false] }],
                                        ["bold", "italic", "underline", "strike"],
                                        [{ list: "ordered" }, { list: "bullet" }],
                                        ["blockquote", "code-block"],
                                        ["link"],
                                        ["clean"],
                                    ],
                                }}
                            />
                        )}
                    />
                    {errors.content && (
                        <p className="text-red-500 text-sm">{errors.content.message}</p>
                    )}
                </div>

                <div className="space-y-2 mt-2">
                    <Button type='submit' variant='journal'>Publish</Button>
                </div>
            </form>
        </div>
    )
}

export default JournalEntryPage
