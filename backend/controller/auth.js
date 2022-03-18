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

  const user = await User.findOne({ where: { email } });

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

  // validate email and password
  if (!email || !password || !role) {
    res.status(400).send('Bad Request');
    return;
  }
  if (
    !emailValidator.validate(email)
    || !validatePassword(password)
    || !(role === 'customer' || role === 'owner')
  ) {
    res.status(400).json({
      error: 'invalid email or password',
      requirement:
        'Email should be valid email. Password should have 8-100 length and should contain atleast one uppercase, lowercase and a digit. Role should be either customer/owner.',
    });
    return;
  }

  const findUser = await User.findOne({ where: { email } });
  if (findUser) {
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
  const email= req.body.email;
  console.log(JSON.stringify("authenticatedUser function: "+email))
  const getUser=User.findOne({ where: { email } });
  if(getUser)
  {
    res.end(JSON.stringify(getUser))
  }
  else
      res.end({error : "Incorrect username or password"})
}

// const selectedUser = async (req, res) => {
//   const { id } = req.params;
//   if (!id || id === 0) {
//     res.status(400).json(errors.badRequest);
//     return;
//   }

//   if (id != req.headers.user) {
//     res.status(401).json(errors.unauthorized);
//     return;
//   }

//   const customer = await Customer.findOne({ where: { id } });
//   if (!customer) {
//     res.status(404).send(errors.notFound);
//     return;
//   }

//   res.status(200).json(customer);
// };

module.exports = {
  getToken,
  signUp,
  authenticatedUser
  // selectedUser
};
