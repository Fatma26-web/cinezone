const express = require("express");

const app = express();

const serverPort = 3000;

app.listen(serverPort, () => {
  console.info(`Listening on port ${serverPort}`);
});
const database = require("./database");
app.get("/movies", (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies ")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      /* ... */
    });
});
app.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id=?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      /* ... */
    });
});
