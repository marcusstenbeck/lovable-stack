const morgan = require("morgan");

/**
 * We're using morgan for nice HTTP logs
 */
module.exports = function setupHTTPLogger(app) {
  const morganFormat =
    process.env.NODE_ENV === "production" ? "combined" : "dev";

  app.use(
    morgan(morganFormat, {
      skip(req, res) {
        return res.statusCode < 400;
      },
      stream: process.stderr
    })
  );

  app.use(
    morgan(morganFormat, {
      skip(req, res) {
        return res.statusCode >= 400;
      },
      stream: process.stdout
    })
  );
};
