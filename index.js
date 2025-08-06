const express = require("express");
const app = express();
app.use(express.json());
const serverPort = 3000;

// lancer l'application sur le port 3000
app.listen(serverPort, () => {
  console.info(`Listening on port ${serverPort}`);
});
const database = require("./database");
// récuperer tous les movies (GET)
app.get("/movies", (req, res) => {
  database
    .query("SELECT * FROM movies ")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      /* serait bien de l'enregistrer dans un fichier de log */
      console.err(err);
      res.sendStatus(500);
    });
});
// récuperer un movie avec son id (GET with id)
app.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("SELECT * FROM movies where id=?", [id])
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
// ajouter un movie (POST)
app.post("/movies", (req, res) => {
  console.log(req.body);

  const { title, director, release_year, rating, category_id } = req.body;
  database
    .query(
      "INSERT INTO movies (title, director, release_year, rating, category_id) VALUES (?,?,?,?,?)",
      [title, director, release_year, rating, category_id]
    )
    .then(([result]) => {
      res.status(201).json({
        message: "Ajouté",
        id: result.insertId,
        data: req.body,
      });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
// modifié un movie (UPDATE)
app.put("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
   const { title} = req.body;
  database
    .query("UPDATE movies SET title = ? WHERE id = ?", [ title, id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.json({
          message: "Modifié",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
// supprimer un movie (DELETE)
app.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("DELETE FROM movies WHERE id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.json({ message: `movie #${id} supprimé` });
      }
    })
    .catch((err) => {
     console.error(err);
      res.sendStatus(500);
    });
});
// récuperer toutes les catégories (GET)
app.get("/categories", (req, res) => {
  database
    .query("SELECT * FROM categories ")
    .then(([categories]) => {
      res.json(categories);
    })
    .catch((err) => {
      /* serait bien de l'enregistrer dans un fichier de log */
      console.err(err);
      res.sendStatus(500);
    });
});


