import mongoose from 'mongoose';

const SlotSchema = new mongoose.Schema({
  doctorname: String,
  slottime: String,
  patientname: String,
});

const slotModel = mongoose.models.Slot || mongoose.model('Slot', SlotSchema);

export default slotModel;