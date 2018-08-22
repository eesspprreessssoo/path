const Path = require('../models/PathModel.js');

const PathController = {
  getPaths: (req, res) => {
    Path.findOne({ userId: req.query.id }, (err, tasks) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },
  getAllPaths: (req, res) => {
    Path.find({}, (err, tasks) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  },
  addPath: (req, res) => {
    Path.create({
      userId: req.body.userId,
      name: req.body.name
    }).then(result => res.json(result))
      .catch(err => console.error(err));
  },
  deletePath: (req, res) => {
    Path.deleteOne({ _id: req.body._id }, (err, task) => {
      if (err) return console.error(err);
    }).then(result => res.json(result));
  }
};

module.exports = PathController;
