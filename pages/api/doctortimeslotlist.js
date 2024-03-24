
import Slot from "../models/timeslots";
import db from "@/utils/db";

const handler = async (req,res) => {

    await db.connect()

    try{
        const doctorsslots = await Slot.find({})
        await db.disconnect()
        res.status(200).json(doctorsslots)
    }catch(err){
        await db.disconnect()
        res.status(500).json({message : 'error fetching'})
    }
}
export default handler