const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = new User({
    name: 'Admin',
    email: 'admin@example.com',
    password: hashedPassword,
    isAdmin: true
  });

  await admin.save();
  console.log('✅ Admin créé avec succès');
  process.exit();
};

createAdmin();
