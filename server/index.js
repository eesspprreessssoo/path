const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const UserController = require('./controllers/UserController');
const PathController = require('./controllers/PathController');

//Adding Passport for GitHub OAuth
const passport = require('passport');
const passportConfig = require('./passport.js');

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

//Adding Passport to Express
app.use(passport.initialize());
app.use(passport.session());

//Set up routes for OAuth portion of application:
app.get('/account', passportConfig.isAuthenticated, UserController.getAccount);
app.get('/account/unlink/:provider', passportConfig.isAuthenticated, UserController.getOauthUnlink);
app.get('/api/github', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getGithub);

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  //Not sure where to redirect this route to:
  res.redirect(req.session.returnTo || '/');
});

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
