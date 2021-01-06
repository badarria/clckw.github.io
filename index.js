const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./server/routes");
const path = require("path");
const config = require("./config");
const env = app.get("env");

const PORT = config[env].port;

app.use(cors());
app.use(express.json());
app.use("/", routes);

if (env === "production") {
  app.use(config[env].app);
}

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}..`);
});
