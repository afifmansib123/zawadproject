import bcryptjs from 'bcryptjs';
import UserModel from '../models/User';
import db from '../../utils/db';
async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { name, email, password, role, gender, photo , medicalcertificate , hospital, description , expertise , isAdmin} = req.body;
  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  await db.connect();

  const existingUser = await UserModel.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    await db.disconnect();
    return;
  }

  const newUser = new UserModel({
    name,
    email,
    password: bcryptjs.hashSync(password),
    role,
    gender,
    photo,
    medicalcertificate,
    hospital,
    description,
    expertise,
    isAdmin,
  });

  const user = await newUser.save();
  await db.disconnect();
  res.status(201).send({
    message: 'Created user!',
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    gender: user.gender,
    photo: user.photo,
    medicalcertificate: user.medicalcertificate,
    hospital: user.hospital,
    description: user.description,
    expertise: user.expertise,
    isAdmin: user.isAdmin,
  });
}

export default handler;
