const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const con = require("./config/db");
const employeRoutes = require("./app/routes/employeRoutes");
const paimentRoutes = require("./app/routes/paimentRoutes");
// const login = require('./app/routes/login')
// const login = require('./app/routes/login.js');

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

//route

app.use("/employe", employeRoutes);

/*************AUTHENTIFICATION************/
app.get("/auth", (req, res) => {
  con.query("SELECT * FROM utilisateur", function (err, result, fields) {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.get("/auth/:id", (req, res) => {
  sql = "SELECT motDePasse FROM utilisateur WHERE id =?";
  const id = req.params.id;
  con.query(sql, id, function (err, result, fields) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.put("/auth/:id", (req, res) => {
  sql = "UPDATE utilisateur SET motDePasse =? WHERE id =?";
  const id = req.params.id;
  const mdp = req.body.value;

  con.query(sql, [mdp,id], function (err, result, fields) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

/***********************Upload file SALARIERS*********************/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../AdminDashboard/public/images/employes/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("file");
app.post("/uploads/", upload, (req, res) => {
  const filename = req.file.filename;
  const matricule = req.body.matricule;
  const sql = "UPDATE employe SET img=? WHERE matricule=? "
  con.query(sql, [filename, matricule], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    console.log(filename);
    console.log(matricule);
    console.log("Image updated successfully");
    return res.status(200).json({ Message: "Image uploaded successfully" });
  });
});
/***********************Upload file CAISSIERS*********************/

const storageCAISSIER = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../AdminDashboard/public/images/caissier/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadCAISSIER = multer({ storage: storageCAISSIER }).single("file");

app.post("/uploadsCAISSIER/", uploadCAISSIER, (req, res) => {
  const filename = req.file.filename;
  const matricule = req.body.matricule;
  const sql = "UPDATE utilisateur SET image=? WHERE id=? "
  con.query(sql, [filename, matricule], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    console.log("Image updated successfully");
    return res.json({ imageName: filename });
  });
});

/*************Card box************/

app.get("/employ/nbSal", (req, res) => {
  con.query(
    "SELECT count(id) as nb FROM employe",
    function (err, result, fields) {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

// Obtenir la date d'aujourd'hui
const aujourd_hui = new Date();

// Extraire le jour, le mois et l'année
const jour = String(aujourd_hui.getDate()).padStart(2, "0");

const mois_String = String(aujourd_hui.getMonth() + 1).padStart(2, "0"); // Les mois commencent à partir de 0, donc on ajoute 1
const mois_Numero = parseInt(mois_String, 10);
let  mois = null;
switch (mois_Numero) {
  case 1:
    mois = "Janvier";
    break;
  case 2:
    mois = "Février";
    break;
  case 3:
    mois = "Mars";
    break;
  case 4:
    mois = "Avril";
    break;
  case 5:
    mois = "Mai";
    break;
  case 6:
    mois = "Juin";
    break;
  case 7:
    mois = "Juillet";
    break;
  case 8:
    mois = "Août";
    break;
  case 9:
    mois = "Septembre";
    break;
  case 10:
    mois = "Octobre";
    break;
  case 11:
    mois = "Novembre";
    break;
  case 12:
    mois = "Décembre";
    break;
}

const annee = aujourd_hui.getFullYear();

// Envoie de Mois et Année

app.get("/date", (req, res) => {
  const data = {
    month: mois,
    year: annee,
  };
  return res.json(data);
});



//Nombre des employés payés du mois

app.get("/nbSalP", (req, res) => {
  const sql = "SELECT count(id) as nbP FROM paiment where mois=? and annee=?";
  con.query(sql, [mois, annee], function (err, result, fields) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

/*************Employé Non payé *************/

app.get("/journalNonPay/", (req, res) => {
  console.log(annee);
  const sql =
    "SELECT * FROM employe WHERE employe.matricule not in (SELECT paiment.matricule FROM paiment WHERE annee=? AND mois =?)";
  con.query(sql, [  annee,mois], function (err, result, fields) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// une PAIE

app.get("/paie/:id", (req, res) => {
  const sql = "SELECT * FROM Paie where id=?";
  const id = req.params.id;
  con.query(sql, id, function (err, result, fields) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

//Journale de paie

app.get("/journalpaie/", (req, res) => {
  const sql =
    "SELECT paiment.id,paiment.matricule,mois,annee ,nom ,prenom,poste,avantageAccorder,avantageHeureSup,(datePaiement) ,salaireBase,(salaireBase + avantageAccorder + avantageHeureSup) as montant FROM Paiment, Employe where Paiment.matricule=Employe.matricule ORDER BY datePaiement DESC";

  con.query(sql, function (err, result, fields) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

//Journale de paie

app.get("/journalpaie/", (req, res) => {
  const sql =
    "SELECT paiment.id,paiment.matricule,mois,annee ,nom ,prenom,poste,avantageAccorder,avantageHeureSup,(datePaiement) ,salaireBase,(salaireBase + avantageAccorder + avantageHeureSup) as montant FROM Paiment, Employe where Paiment.matricule=Employe.matricule ORDER BY datePaiement DESC";

  con.query(sql, function (err, result, fields) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

//10 recent payées

app.get("/journalpaieDix/", (req, res) => {
  const sql =
    "SELECT paiment.id,paiment.matricule,mois,annee ,nom, img,prenom,poste,avantageAccorder,avantageHeureSup,(datePaiement) ,salaireBase,(salaireBase + avantageAccorder + avantageHeureSup) as montant FROM Paiment, Employe where Paiment.matricule=Employe.matricule ORDER BY datePaiement DESC LIMIT 7 ";

  con.query(sql, function (err, result, fields) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

//modification de paie

app.put("/paie/:id", (req, res) => {
  var sql =
    "UPDATE Paie SET matricule=?,annee=?, mois=?,effectue=?,avantageAccorder=?, avantageHeureSup=?, datePaiement=? WHERE id=?";
  const id = req.params.id;

  con.query(
    sql,
    [
      req.body.matricule,
      req.body.annee,
      req.body.mois,
      req.body.effectue,
      req.body.avantageAccorder,
      req.body.avantageHeureSup,
      req.body.datePaiement,
      id,
    ],
    function (err, result) {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

// verification

app.get("/verification", (req, res) => {
  const verifier =
    "SELECT * FROM Paiment WHERE matricule=? and mois= ? and annee=? ";
  con.query(
    verifier,
    [req.query.mat, req.query.mois, req.query.annee],
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

// ajout d'une paie

app.post("/paie/", (req, res) => {
  const sql =
    "INSERT INTO Paiment (matricule, annee, mois,  avantageAccorder, avantageHeureSup) VALUES (?,?,?,?,?)";

  con.query(
    sql,
    [
      req.body.matricule,
      req.body.annee,
      req.body.mois,
      req.body.avantageAccorder,
      req.body.avantageHeureSup,
    ],
    function (err, result) {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

/***********server en ecoute************/

app.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});
