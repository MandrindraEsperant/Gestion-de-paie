import express from "express";
const con = require('../../config/db');
const route = express.Router();

const login = (req,res)=>{
    con.query("SELECT * FROM utilisateur", function (err, result, fields) {
      if (err) return res.json(err);
          return res.json(result); 
    });
}

route.get('/login',login);

module.exports= route;

