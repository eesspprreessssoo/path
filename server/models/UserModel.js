const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserModel = new Schema({
  username: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  lastUpdatedDate: { type: Date, default: Date.now },
  paths: [{ type: Schema.Types.ObjectId, ref: 'Path' }],
});

// UserModel.pre('save', (next) => {
//   let user = this;
//   if (!user.isModified('password')) return next();
//   bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//     if (err) return next(err);

//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });

UserModel.methods.comparePassword = (userPassword, next) => {
  bcrypt.compare(userPassword, this.password, (err, match) => {
    if (err) return next(err);
    next(null, match);
  });
};

module.exports = mongoose.model('User', UserModel);