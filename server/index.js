const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const UserController = require('./controllers/UserController');
const PathController = require('./controllers/PathController');

const app = express();
const publicPath = path.join(__dirname, '..', 'public', 'dist');
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://espresso:CodeSmith2018@ds125932.mlab.com:25932/espresso';
const MONGO_OPTIONS = { useNewUrlParser: true };

mongoose.connect(MONGO_URI, MONGO_OPTIONS);

mongoose.connection.on('error', (err) => {
  console.error(err);
  process.exit();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));
app.use(cookieParser());

// USER ROUTES
app.post('/signup', UserController.signup);
app.post('/login', UserController.login);
app.post('/logout', UserController.logout);

// PATH ROUTES
app.post('/paths', UserController.checkUserAuth, PathController.addPath);
app.get('/paths', UserController.checkUserAuth, PathController.getPaths);
app.get('/paths/:id', UserController.checkUserAuth, PathController.getPathById);
app.delete('/paths/:id', UserController.checkUserAuth, PathController.deletePath);

app.get('/', (req, res) => res.sendFile(path.join(publicPath, 'index.html')));

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
