import User from "@/pages/models/User"
import db from "@/utils/db";

const handler = async (req,res) => {
    //const session = await getSession({req})
    const { _id } = req.query;

    await db.connect()

    try{
         await User.findByIdAndDelete(_id);

        await db.disconnect();
        res.send({ message: 'User Deleted' });
    }catch(err){
        await db.disconnect()
        res.status(500).json({message : 'error fetching'})
    }
}
export default handler