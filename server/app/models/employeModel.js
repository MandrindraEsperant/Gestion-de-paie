const con = require("../config/db");

const getAllEmployes = async () => {
  const result = await con.query("SELECT * FROM users");
  return result.rows;
};

const createEmpoye = async (userData) => {
  const {
    matricule,
    CIN,
    nom,
    prenom,
    dateNaissance,
    sexe,
    adresse,
    email,
    tel,
    debutContrat,
    poste,
    salaireBase,
  } = userData;

  const result = await con.query(
    "INSERT INTO Employe (matricule, CIN, nom, prenom, dateNaissance, sexe, adresse, email, tel, debutContrat, poste, salaireBase) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING * ",
    [
      matricule,
      CIN,
      nom,
      prenom,
      dateNaissance,
      sexe,
      adresse,
      email,
      tel,
      debutContrat,
      poste,
      salaireBase,
    ]
  );
  return result.rows[0];
};
