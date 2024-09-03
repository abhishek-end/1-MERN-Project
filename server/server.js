const express = require("express");
const app = express();
const cors = require("cors");

//* secure port numbers and any secret keys

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT;

//* use middleware

app.use(cors());
app.use(express.json());

//* monogoDB connections
const conn = require("./db/connection.js");

//* using Routes
app.use(require("./Routes/Route"));

//* app started
conn
  .then((db) => {
    if (!db) return process.exit(1);
    //listen to the http server only when we have valid database connections
    app.listen(port, () => {
      console.log(`Server is running on Port: http://localhost:${port} 🔏`);
    });
    app.on("Error", (err) =>
      console.log(`Failed To Connect with HTTP Server : ${err}`)
    );
  })
  .catch((error) => {
    console.log(
      `Connection To The MonogoDB has Failed Check IP address on Website 😀 ${error}`
    );
  });
