const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PathModel = new Schema({
  title: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  companyName: { type: String, required: true },
  position: { type: String, required: true },
  status: [{ type: String} ],  
  followUp: { type: Date },
  statusLastChanged: { type: Date },
  notes: {type: String },
});


module.exports = mongoose.model('Path', PathModel);