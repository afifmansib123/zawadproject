import { getSession, useSession } from "next-auth/react";
import User from "../models/User";
import db from "@/utils/db";

const handler = async (req,res) => {
    //const session = await getSession({req})

    await db.connect()

    try{
        const products = await User.find({})
        await db.disconnect()
        res.status(200).json(products)
    }catch(err){
        await db.disconnect()
        res.status(500).json({message : 'error fetching'})
    }
}
export default handler