const express = require('express')
const passport = require('./lib/passport');

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())


const userRoute = require('./routes/user')

// routes
app.use('/v1/user', userRoute);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server listening at ${port}`);