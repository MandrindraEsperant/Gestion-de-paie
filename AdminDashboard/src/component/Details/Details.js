import React, { useEffect, useState } from "react";
import "./details.css";
import Topbar from "../TopBar/Topbar";
import Cardbox from "../cardBox/Cardbox";
import axios from "axios";
import { Link } from "react-router-dom";
import imageEmploye from "../../images/default.png"

const Details = () => {
  const [employe, setEmploye] = useState([]);
  // const [imageEmploye, setImageEmploye] = useState("/images/employes/default.png");
  const [ employeNP , setEmployeNP] = useState([]);
  const MenuToogle = () => {
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");
    navigation.classList.toggle("activemove");
    main.classList.toggle("activemove");
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/journalpaieDix/")
      .then((res) => {
        setEmploye(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3001/journalNonPay/")
      .then((res) => {
        console.log(res.data);
        setEmployeNP(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Topbar title="Tableau de bord" menutoggle={MenuToogle} />
      <Cardbox />
      <div className="details">
        <div className="recentOrders">
          <div className="cardHeader">
            <h2>Les employés ne sont pas encore payés</h2>
            {/* <Link href="#" className="btn">
              View All
            </Link> */}
          </div>
          <table>
            <thead>
              <tr>
                <td>Matricule</td>
                <td>Nom</td>
                <td> Prenom</td>
                <td> Salaire de Base</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {employeNP.map((val, index) => (
                <tr key={index} >
                  <td>{val.matricule}</td>
                  <td>{val.nom}</td>
                  <td> {val.prenom}</td>
                  <td> {val.salaireBase} Ar</td>
                  <td>
                    {" "}
                    <Link to={`/paiment/${val.id}`} className="status delivered">Payer</Link>{" "}
                  </td>

                </tr>
              ))}





            </tbody>
          </table>
        </div>

        {/* =========== New customers=========== */}

        <div className="recentCustomers">
          <div className="cardHeader">
            <h2>Paiement récent</h2>
            <Link to="/journalpaiment" className="btn">
              Voir tout
            </Link>
          </div>
          <table>
            {employe.map((val, index) => (
              <tr key={index} >
                <td width={60}>
                  <div className="imgBx">
                    <img src={val.img ? `/images/employes/${val.img}` : imageEmploye } alt="" />
                    {/* <img src={imageEmploye} alt="" /> */}
                  </div>
                </td>
                <td>
                  <h4>
                    {val.nom}<br />
                    <span>{val.mois} {val.annee}</span>
                  </h4>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default Details;
