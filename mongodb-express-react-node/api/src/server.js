const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const setupHTTPLogger = require("./setupHTTPLogger");

const port = parseInt(process.env.PORT, 10) || 3001;

/**
 * Connect to database, notice that because we're
 * using Docker Compose we can access the database
 * by the host name `db`, which is the name of
 * the service in the docker-compose.yml file.
 *
 * We connect on Mongo's default port (27017),
 * and we're going to save everything into a
 * database called `documents`. It's all in the
 * connection URL. See Mongoose for more info.
 */
mongoose.connect(
  "mongodb://db:27017/documents",
  { useNewUrlParser: true }
);

/**
 * Create a model that we use to talk to the database
 */
const Message = mongoose.model("Class", {
  createdAt: { type: String, required: true },
  text: { type: Number, required: true }
});

/**
 * Setup server
 */
const app = express();
setupHTTPLogger(app);

app.use(cors());
app.use(bodyParser.json());

/**
 * Setup API routes
 */
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find({});
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

app.post("/messages", async (req, res) => {
  const { text } = req.body;
  const message = new Message({ createdAt: Date.now(), text });
  try {
    await message.save();
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

/**
 * The catch-all handler returns a nice JSON 404 error
 */
app.all("*", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`api listening on ${port}`);
});
