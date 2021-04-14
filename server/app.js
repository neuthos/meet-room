const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const router = require("./routes/index");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log("app listen on port", PORT);
});
