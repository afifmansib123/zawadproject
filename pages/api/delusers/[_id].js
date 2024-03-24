
import db from "@/utils/db";
import User from "@/pages/models/User";
export default async function handler(req, res) {
  if (req.method === "PUT") {  

  const { _id , password } = req.body;


  try {
    await db.connect();

    const updatedSlot = await User.findOneAndUpdate(
      { _id },
      { $set: { password } },
      { new: true }
    );

    await db.disconnect();

    if (!updatedSlot) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({ message: "password changed successfully", updatedSlot });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
}
}