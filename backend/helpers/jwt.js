const expressJwt = require("express-jwt");

function authJwt() {
  const secret = process.env.SECRET_KEY;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, method: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, method: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/users\/register/, method: ["POST", "OPTIONS"] },
      { url: /\/api\/v1\/users\/changePassword/, method: ["POST", "OPTIONS", "PUT"] },
      { url: /\/api\/v1\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST']},
      { url: /\/api\/v1\/FavoriteProducts(.*)/,methods: ['GET', 'OPTIONS', 'POST', 'DELETE']},
      `${api}/users/login`,
    ],
  });
}

module.exports = authJwt;
