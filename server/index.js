// *** this is a very simple jwt authentication based node.js app

const jwt = require("jsonwebtoken");
const auth = require("basic-auth");
const express = require("express");
const cors = require("cors");
const Mock = require("mockjs")
const app = express();
const Random = Mock.Random

app.use(cors());

// Middleware: it reads the token from the authorization header and set to
// req.token.
const ensureToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
        req.token = bearerHeader.split(" ")[1];
        next();
    } else {
        return res.status(403).json({ error: "No credentials sent!" });
    }
}

const createOrderList = (status) => {
    const len = 10
    const result = []

    for(let i = 0; i < len; i++){
        result.push({
            id: Random.id(),
            name: Random.csentence(2, 4),
            age: Random.integer(18, 80),
            date: Random.date()
        })
    }

    return result
}

app.get("/api", (req, res) => {
    res.json({ text: "my public api" });
});

app.use(function (req, res, next) {
    if (!req.headers.authorization) {
        setTimeout(() => {
            return res.status(403).json({ error: "No credentials sent!" });
        }, 2000);
    }
    next();
});

app.post("/api/login", (req, res) => {
    const user = auth(req);

  // hardcoded user {name: 'test', pass: 'react'}
  if (user.name === "test" && user.pass === "react") {
    // user is authenticated and now server sends a signed token back to client
    // client can store this token to the local storage and every time client asks
    // for protected api resources, it send token attached in authorization header
    // with 'bearer' authentication scheme.
    const access_token = jwt.sign({
      user
    }, "my_secret_key", {
      expiresIn: '10s' // setting the token expiry time to be 2h
    });
    const refresh_token = jwt.sign({
      user
    }, "my_secret_key", {
      expiresIn: '10s' // setting the token expiry time to be 2h
    });
    setTimeout(() => {
      res.json({access_token: access_token, refresh_token: refresh_token});
    }, 3000);
  } else {
    res.status(401).json({error: "Invalid Credentials"});
  }
});

app.get("/api/refresh_token", (req, res) => {
    setTimeout(() => {
        // 校验refreshToken
        if(true){
            const access_token = jwt.sign({
                name: 'text', pass: 'react'
            }, "my_secret_key", { expiresIn: '10s' });
            const refresh_token = jwt.sign({
                name: 'text', pass: 'react'
            }, "my_secret_key", { expiresIn: '10s' });

            res.json({access_token: access_token, refresh_token: refresh_token});
            // 返回新的access token
        }else{
            res.status(401).json({ error: "Invalid Credentials" });
        }
    }, 5000)
});

app.get("/api/protected", ensureToken, (req, res) => {
    // server verifies the token (verifies the client )
    jwt.verify(req.token, "my_secret_key", (err, data) => {
        if (err) {
            res.status(401).json({ error: err });
        } else {
            setTimeout(() => {
                res.json({ goals: ["Learn Authentication", "Learn Context-API"] });
            }, 3000);
        }
    });
});


app.get('/api/getOrderList', ensureToken, (req, res) => {
    jwt.verify(req.token, "my_secret_key", (err, data) => {
        if(err){
            res.status(401).json({ error: err})
        }else{
            console.log(req.query)
            res.json(createOrderList(req.query.status))
        }
    })
})


app.listen(8000, () => console.log("App listening on 8000...."));
