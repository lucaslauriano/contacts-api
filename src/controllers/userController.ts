const asyncHandler = require('express-async-handler');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req: any, res: any) => {
  const { username, email, password } = req?.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('all fields are mandatory');
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error('user already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  console.log('hashed password: ', hashedPassword);

  const user = User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('user data is not valid');
  }

  res.json({
    message: 'user registered succesfully',
  });
});

const loginUser = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('all fields are mandatory');
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30m' }
    );
    res.status(200).json({
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error(" email or password didn't matched");
  }
});

const currentUser = asyncHandler(async (req: any, res: any) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
export {};
