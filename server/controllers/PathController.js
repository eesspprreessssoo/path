const Path = require('../models/PathModel.js');

const PathController = {
  addPath: (req, res) => {
    const newPath = { ...req.body };
    Path.create({
      ...newPath,
      user: res.locals.user,
    }).then(path => res.json(path))
      .catch(err => res.send(err));
  },
  getPaths: (req, res) => {
    Path.find({ user: res.locals.user })
      .then(paths => res.json(paths))
      .catch(err => res.send(err));
  },
  getPathById: (req, res) => {
    Path.findById(req.params.id)
      .then(path => res.json(path))
      .catch(err => res.send(err));
  },
  deletePath: (req, res) => {
    Path.findByIdAndRemove(req.params.id)
      .then(() => res.sendStatus(204))
      .catch(err => res.send(err));
  }
};

module.exports = PathController;
