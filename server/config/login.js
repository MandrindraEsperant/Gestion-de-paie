import express from "express";
const con = require('./db');
const router = express.Router();

const login = (req,res)=>{
    con.query("SELECT * FROM utilisateur", function (err, result, fields) {
      if (err) return res.json(err);
          return res.json(result); 
    });
}

router.get('/login',login);

