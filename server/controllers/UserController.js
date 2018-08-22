const User = require('../models/UserModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'findyourpath';

function generateToken(user) {
  const userInfo = { _id: user._id, username: user.username, password: user.password, };
  return jwt.sign(userInfo, JWT_SECRET, { expiresIn: 60 * 60 * 24 });
};

const UserController = {
  signup: (req, res) => {
    const { username, password } = req.body;
    User.findOne({ where: { username } })
      .then(user => {
        if (user) return res.status(400).send('Error, this user exists');
        else {
          const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR));
          User.create({ username, password: hash, })
            .then((newUser) => {
              const token = generateToken(newUser);
              res.cookie('usertoken', token, { maxAge: 900000, httpOnly: true });
              res.status(200).send('Successful User Creation');
            })
            .catch(err => {
              res.status(400).send(`User create failed: ${err}`);
            });
        }
      });
  },
  login: (req, res) => {
    const { username, password } = req.body;
    User.findOne({
      where: { username }
    })
      .then((user) => {
        const match = bcrypt.compareSync(password, user.password)
        if (!match) return res.status(400).send('Invalid Username or Password');
        else {
          const token = generateToken(user);
          res.cookie('usertoken', token, { maxAge: 900000, httpOnly: true });
          res.status(200).send('Successful Login');
        }
      })
      .catch(err => {
        res.status(400).send(`User create failed: ${err}`);
      });
  },
  logout: (req, res) => {
    res.clearCookie('usertoken', { maxAge: 900000, httpOnly: true });
    res.send('User Logged Out');
  },
  checkUserAuth: (req, res, next) => {
    const token = req.cookies.usertoken;
    if (!token) return res.status(403).send('No user token provided.');
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Please register Log in using a valid email to submit posts'
        });
      } else {
        req.user = user;
        res.locals.user = user;
        next();
      }
    });
  },
}

module.exports = UserController;