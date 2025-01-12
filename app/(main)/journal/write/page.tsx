'use client'
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { journalSchema } from '@/app/lib/schema';
import { BarLoader } from 'react-spinners';
const ReactQuill = dynamic(()=> import("react-quill-new"),{ssr:false});

const JournalEntrypage = () => {
    const [isloading, setIsLoading] = useState<Boolean>(false)

    const {register, handleSubmit, control} = useForm({
        resolver: zodResolver(journalSchema),
        defaultValues:{
            title: "",
            content:"",
            mood:"",
            collectionid:""
        },
    })
  return (
    <div className='py-8'>
        <form action="">
            <h1 className='text-5xl md:text-6xl gradient-title'>
                What&apos;s on your mind?
            </h1>
            {isloading && <BarLoader color='orange' width={"100%"} />}

        </form>
    </div>
  )
}

export default JournalEntrypage;
