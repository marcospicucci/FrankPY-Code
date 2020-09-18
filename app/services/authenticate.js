'use strict';

const authenticate = (req, res, next) => {
  const authToken = req.get(process.env.AUTH_TOKEN_HEADER);

  if (authToken !== process.env.AUTH_TOKEN) {
    res.sendStatus(401);
    return;
  }

  next();
};

module.exports = authenticate;
