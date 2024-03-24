
import db from "@/utils/db";
import Slot from "@/pages/models/timeslots";

export default async function handler(req, res) {
  if (req.method === "PUT") {  

  const { _id , patientname } = req.body;


  try {
    await db.connect();

    const updatedSlot = await Slot.findOneAndUpdate(
      { _id },
      { $set: { patientname } },
      { new: true }
    );

    await db.disconnect();

    if (!updatedSlot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    return res.status(200).json({ message: "Slot booked successfully", updatedSlot });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
}
}