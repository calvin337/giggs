const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connection = require('./db/connection');
const passport = require('passport');
const moment = require('moment');

const router = require('./config/routes');
const middleware = require('./config/middleware');
const userController = require('./user/userCtrl');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
require('./config/sockets')(io);

//set up port
app.set('PORT', process.env.PORT || 3000);
app.use(cors());

app.use(bodyParser.json());

app.use(require('express-session')({
	secret: 'giggsthebest',
	resave: true,
	saveUninitalized: true
}));

app.use(express.static('./client'));
app.use('/client', express.static('./node_modules'));

app.use(passport.initialize());
app.use(passport.session());


app.post('/auth/signup', middleware.checkUsername, middleware.checkEmail, userController.signup);
app.get('/auth/signin', userController.signin);
require('./config/fbRoutes')(app, passport);

app.use('/db', router);
app.get('/*', (request, response) => {
	response.sendFile(path.resolve('./', 'client', 'index.html'));
});

//connect to database
connection.sync().then(() => {
	console.log('tables synced');
});

http.listen(app.get('PORT'), () => {
	console.log(`[${moment().format('hh:mm:ss')}]Express Server listening on port`, app.get('PORT'));
});

module.exports = app;
