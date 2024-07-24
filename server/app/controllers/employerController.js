const con = require("../../config/db");

const getAllEmployes = (req, res) => {
  const sql = "SELECT * FROM Employe";
  con.query(sql, function (err, result, fields) {
    if (err) return res.json({ message: "Erreur dans la server" });
    return res.json(result);
  });
};
const nbSal = (req,res)=>{
  con.query("SELECT count(id) as nb FROM employe", function (err, result, fields) {
    if (err) return res.json(err);
        return res.json(result);
  });
}
const getOneEmploye = (req, res) => {
  const sql = "SELECT * FROM Employe where id = ?";
  const id = req.params.id;
  con.query(sql, id, function (err, result, fields) {
    if (err) return res.json({ message: "Erreur dans la server" });
    return res.json(result);
  });
};

const findOneEmploye = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM Employe WHERE matricule LIKE '%${id}%' or nom LIKE '%${id}%' or prenom LIKE '%${id}%' or salaireBase LIKE '%${id}%' or poste LIKE '%${id}%' `;
  con.query(sql, function (err, result, fields) {
    if (err) return res.json({ message: "Erreur dans la server" });
    return res.json(result);
  });
};

const deleteOneEmploye = (req, res) => {
  const sql = "DELETE FROM Employe WHERE id=?";
  const id = req.params.id;
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ message: "Erreur dans la server" });
    return res.json(result);
  });
};

const putOneEmploye = (req, res) => {
  var sql =
    "UPDATE Employe SET matricule=? , CIN=?,nom=? ,prenom =?  , poste=?, tel=? , email=?, adresse=?,sexe=?,salaireBase=? WHERE id=?";
  const id = req.params.id;
  con.query(
    sql,
    [
      req.body.matricule,
      req.body.CIN,
      req.body.nom,
      req.body.prenom,
      req.body.poste,
      req.body.tel,
      req.body.email,
      req.body.adresse,
      req.body.sexe,
      req.body.salaireBase,
      id,
    ],
    function (err, result) {
      if (err) return res.json({ message: "Erreur dans la server" });
      return res.json(result);
    }
  );
};

const createOneEmploye = (req, res) => {
  var sql =
    "INSERT INTO Employe (matricule, CIN, nom, prenom, dateNaissance, sexe, adresse, email, tel, debutContrat, poste, salaireBase) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

  const parametre = [
    req.body.matricule,
    req.body.CIN,
    req.body.nom,
    req.body.prenom,
    req.body.dateNaissance,
    req.body.sexe,
    req.body.adresse,
    req.body.email,
    req.body.tel,
    req.body.debutContrat,
    req.body.poste,
    req.body.salaireBase,
  ];

  con.query(sql, parametre, function (err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
};

module.exports = {
  getAllEmployes,
  getOneEmploye,
  findOneEmploye,
  deleteOneEmploye,
  putOneEmploye,
  createOneEmploye,
  nbSal,
};
