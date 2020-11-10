const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const models = require('./models');
const config ={
  secretKey: 'superSecretKeysuperSecretKeysuperSecretKeysuperSecretKeysuperSecretKeysuperSecretKey',
}

app.use(express.json());

const authorizationMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
      return res
      .status(401)
      .send({
          status: "No auth found! Bye"
        }
      );
  } else {
      const jwtToken = authorization.replace("Bearer ", ""); // scoate Bearer din string
      jwt.verify(jwtToken, config.secretKey, (err, decoded) => {
          if (err) {
              res
              .status(401)
              .send({
                  status: "Not ok"
                }
              );
          } else {
              next();
          }
      });
    }
};

app.post("/graphql", authorizationMiddleware, (req, res) => {
  console.log("Successfully authenticated");
  res.send(
    {
      status: "ok"
    }
    );
});

app.post("/graphql/public", (req, res) => {
  const { user, pass } = req.body;

  if (user === "user" && pass === "pass") {
      jwt.sign({}, config.secretKey, (err, token) => {
          res.send({
              token // echivalent cu token: token
          });
      });
  } else {
      res.status(401).send({
          status: "NOT ok"
      });
  }
});


app.get('/users/:userId', async(req, res) => {
  const userId = req.params.userId;
  const user = await models.User.findByPk(userId);

  console.log(user.firstName, user.lastName);
  
  res.send({
    status: 'OK'
  });
});

app.listen(port,function() {
  console.log('Server running on port ' + port);
});