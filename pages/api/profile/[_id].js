import User from "@/pages/models/User"
import db from "@/utils/db";

const handler = async (req, res) => {
    if (req.method === "GET") {
        //const session = await getSession({req})
        const { _id } = req.query;

        await db.connect()

        try {
            const products = await User.find({})
            await db.disconnect()
            res.status(200).json(products)
        } catch (err) {
            await db.disconnect()
            res.status(500).json({ message: 'error fetching' })
        }
    }
}
export default handler