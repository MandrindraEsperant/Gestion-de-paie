import React, { useEffect, useState } from "react";
import { FaMoneyBill} from "react-icons/fa6";
import image1 from "../../images/image_1676318541886_ico3.png"
// import MoneyOffIcon from "@mui/material/MoneyOff";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
// import image2 from "../../images/notPaye.png"
import "./sardbox.css";
import axios from "axios";
import { FaCalendarDay } from "react-icons/fa";

const Cardbox = () => {
  const [nbSalarie, setNbSalarie] = useState(0);
  const [np, setNp] = useState(0);
  const [m, setM] = useState(null);
  const [y, setY] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/employ/nbSal/")
      .then((res) => setNbSalarie(res.data[0].nb))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3001/nbSalP/")
      .then((res) => {
        setNp(res.data[0].nbP);
      })
      .catch((err) => console.log(err));

    fetchDate();
  }, []);

  const fetchDate = async () => {
    try {
      const reponse = await axios.get("http://localhost:3001/date/");
      setM(reponse.data.month);
      setY(reponse.data.year);
    } catch (error) {
      console.error("Erreur lors de la recuperation de données :", error);
    }
  };

  return (
    <div className="carBox">
      <div className="card">
        <div>
          <div className="numbers">{nbSalarie}</div>
          <div className="cardName">Nombre des salariés</div>
        </div>

        <div className="conBx">
          {/* <AiFillEye /> */}
          <img src={image1} alt="" />
        </div>
      </div>

      <div className="card">
        <div>
          <div className="numbers">
            {m} {y}
          </div>

          <div className="cardName">Date actuelle</div>
        </div>

        <div className="conBx">
          <FaCalendarDay />
        </div>
      </div>

      <div className="card">
        <div>
          <div className="numbers"> {((np / nbSalarie) * 100).toFixed(2)}%</div>
          <div className="cardName">Employé(s) payé(s)</div>
        </div>

        <div className="conBx">
        <MoneyOffIcon style={{fontSize:'50px'}}/>
        </div>
      </div>

      <div className="card">
        <div>
          <div className="numbers">
            {(100 - (np / nbSalarie) * 100).toFixed(2)}%
          </div>
          <div className="cardName">Employé(s) non payé(s)</div>
        </div>

        <div className="conBx">
          <FaMoneyBill />
        </div>
      </div>
    </div>
  );
};

export default Cardbox;
