const con = require("../../config/db");

const getAllPaiments = (req,res)=>{
    const sql = "SELECT * FROM paiment ORDER BY datePaiement DESC";
    con.query(sql, function (err, result, fields) {
      if (err) return res.json(err);
          return res.json(result);
    });
  }

module.exports= {getAllPaiments}