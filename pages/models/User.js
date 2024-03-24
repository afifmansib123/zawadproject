import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {type : String, required : true},
  gender: String,
  photo: String,
  medicalcertificate : String || null,
  hospital : String || null,
  description : String || null,
  expertise : String || null,
  isAdmin : {type : Boolean, default : false},
});

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;
