import bcrypt from 'bcryptjs';

const data = {
  user: [
    {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('helloworld'),
      role : "admin",
      gender : "male",
      photo : "f",
      isAdmin : true,
    },
  ]
}

export default data;
