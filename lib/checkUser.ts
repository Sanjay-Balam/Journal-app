import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";

export const checkUser = async() => {
    const user = await currentUser();
    console.log("This is user",user);

    if(!user) {
        return null;
    }
    try{
        const loggedInUser = await db.user.findUnique({
            where: {
                clerkUserId : user.id
            }
        });

        if(loggedInUser) {
            return loggedInUser;
        }
        const name = `${user.firstName} ${user.lastName}`
        const newUser = await db.user.create({
            data:{
                clerkUserId : user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress
            }
        });
        return newUser
    }catch(e:any) {
        console.log(e.message)
    }
}