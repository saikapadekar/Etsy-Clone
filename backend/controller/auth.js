/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const { User } = require('../model');
const { getPasswordHash, validatePassword, validatePassHash } = require('../util/passwords');
const errors = require('../util/errors');
const JWT_SECRET = 'myetsysuperdupersecret';

const getToken = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send('Bad Request');
    return;
  }
  console.log(`Backend: Finding user with email: `,email)

  const user = await User.findOne({ email:  email  });

  if (!user) {
    res.status(401).send('Unauthorized');
    return;
  }

  if (!(await validatePassHash(password, user.password))) {
    res.status(401).send('Unauthorized');
    return;
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1d' },
  );
  // console.log("Inside gettoken value of user.email: "+JSON.stringify(req.body));
  res.cookie('token', { token: accessToken },{maxAge: 900000, httpOnly: false, path : '/'});
  res.json({ token: accessToken });
};

const signUp = async (req, res) => {
  const { email, password, role } = req.body;
  console.log(`Checking for email: `,email)

  // validate email and password
  if (!email || !password || !role) {
    res.status(400).send('Bad Request');
    return;
  }
  if (
    !emailValidator.validate(email)
    || !validatePassword(password)
    || !(role === 'customer')
  ) {
    res.status(400).json({
      error: 'invalid email or password',
      requirement:
        'Email should be valid email. Password should have 8-100 length and should contain atleast one uppercase, lowercase and a digit. Role should be either customer/owner.',
    });
    return;
  }

  var findUser = null;
  findUser = await User.findOne({ email: email });
  if (findUser) {
    console.log(`Found user:`,findUser)
    res.status(304).json({ message: 'User already exist. Please try login.' });
    return;
  }

  const passHash = await getPasswordHash(password);
  const user = await User.create({
    email,
    password: passHash,
    role,
  });

  if (!user) {
    res.status(500).send('Internal Server Error');
    return;
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1d' },
  );

  res.json({ token: accessToken });
};

const authenticatedUser  = async (req, res) => {
  console.log(`Backend: Inside authenticatedUser printing request body: `,(req.body))
  const {email}= req.body;
  console.log(("authenticatedUser function checking for email: "+email))
  const getUser=await User.findOne({ email:  email  });
  if(getUser)
  {
    // res.end(JSON.stringify(getUser))
    res.status(200).json(getUser)
  }
  else
      res.end({error : "Incorrect username or password"})
}



module.exports = {
  getToken,
  signUp,
  authenticatedUser
};
