const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/weather-app'));
app.listen(8080);
app.get('/*', function(req,res) {
  // Replace the '/dist/<to_your_project_name>/index.html'
  console.log("hiii")
  res.sendFile(__dirname +'/src/index.html');
});

