const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PathModel = new Schema({
  title: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});


module.exports = mongoose.model('Path', PathModel);