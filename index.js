const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const jwt = require('jsonwebtoken');
const config ={
  secretKey: 'superSecretKeysuperSecretKeysuperSecretKeysuperSecretKeysuperSecretKeysuperSecretKey',

}

app.use(express.json());

const generateMessage = require("./messageGen");


const authorizationMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
      return res.status(401).send({
          status: "ok",
      });
  } else {
      const jwtToken = authorization.replace("Bearer ", "");
      jwt.verify(jwtToken, config.secretKey, (err, decoded) => {
          if (err) {
              res.status(401).send({
                  status: "not ok",
              });
          } else {
              next();
          }
      });
  }
};

app.post("/graphql", authorizationMiddleware, (req, res) => {
  res.send({
      status: "ok",
  });
});

app.post("/graphql/public", (req, res) => {
  const { user, pass } = req.body;
  // console.log(req.body);
  if (user === "user" && pass === "pass") {
      jwt.sign({}, config.secretKey, (err, token) => {
          res.send({
              token,
          });
      });
  } else {
      res.status(401).send({
          status: "NOT ok",
      });
  }
});

app.get('/route', /* aici s-ar pune middleware-uri*/ function(req, res) {
    generateMessage()
    .then((body) => {
      console.log(body);
        const {text, createdAt} = body;
        res.send('Factul este ' + text + '\n\nCreat la ' + createdAt);
    })
});

app.listen(port,function() {
  console.log('Server running on port ' + port);
});