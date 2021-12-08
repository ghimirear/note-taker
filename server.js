// DEPENDENCIES
// Bringing in ecpress

const express = require('express');
// Initializing express
const app = express();
// setting up an port // process.env.Port for deploying environment and 8080 for local use
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

 require('./routes/apiRoutes')(app);
 require('./routes/htmlRoutes')(app);
 // Static files.
 app.use(express.static('public'))
 app.use('/css', express.static(__dirname + 'public/assets/css'))
 app.use('/js', express.static(__dirname + 'public/assets/js'))

// LISTENER
// The below code effectively "starts" our server
// get current geolocation of the user

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
