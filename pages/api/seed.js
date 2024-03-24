import User from '../models/User';
import data from '../../utils/data';
import db from '../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  await User.insertMany(data.user);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;