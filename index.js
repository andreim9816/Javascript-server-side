const express = require('express');
const app = express();
const port = 3000;

const generateMessage = require("./messageGen");

app.get('/route', function(req, res) {
    generateMessage()
    .then((body) => {
        const { text } = body;
        res.send(text);
    })
});

app.listen(port,function() {
  console.log('Server running on port ' + port);
});