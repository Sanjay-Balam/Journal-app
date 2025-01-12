'use server';

import { MOODS } from "@/app/lib/moods";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { request } from "@arcjet/next";
import aj from "@/lib/arcjet";
import { getPixabayImage } from "./public";
import { revalidatePath } from "next/cache";


type MoodId = keyof typeof MOODS;

export async function createJournalEntry(data: any) {
    try{
        const {userId} = await auth();
        if(!userId) {
            throw new Error("Unauthorized");
        } 

        // Arc jet rate limiting 
            // Get request data for ArcJet
        const req = await request();

        // Check rate limit
        const decision = await aj.protect(req, {
        userId,
        requested: 1, // Specify how many tokens to consume
        });
        const user = await db.user.findUnique({
            where:{
                clerkUserId: userId
            }
        });
        if(!user) {
            throw new Error("User not found ")
        }

        const mood = MOODS[data.mood.toUpperCase() as MoodId];
        if(!mood) {
            throw new Error("Invalid mood")
        }
        // getting the mood from the pixabey 
        const moodImageUrl = await getPixabayImage(data.moodQuery);

        // create mood entry in the database 
        const entry = await db.entry.create({
            data:{
                title:data.title,
                content: data.content,
                mood: mood.id,
                moodScore: mood.score,
                moodImageUrl,
                userId: user.id,
                collectionId: data.collectionId || null,
            },
        });

        // Delete existing draft after successful publication
        await db.draft.deleteMany({
            where: { userId: user.id },
        });
        revalidatePath("/dashboard");

        return entry;
    }catch(error:any) {
        throw new Error(error.message);
    }
}