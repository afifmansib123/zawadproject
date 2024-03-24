import slotModel from "../models/timeslots";
import Slot from "../models/timeslots";
import db from "@/utils/db";

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return;
    }
    const {
        doctorname,
        slottime,
        patientname, } = req.body;

    await db.connect();

    const newSlot = new slotModel({
        doctorname,
        slottime,
        patientname,
    });
    const time = await newSlot.save();
    await db.disconnect();
    res.status(201).send({
        message: 'Created slot!',
        _id: time._id,
        doctorname: time.doctorname,
        slottime: time.slottime,
        patientname: time.patientname,

    });
}
export default handler

