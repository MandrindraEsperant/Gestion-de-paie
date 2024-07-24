import React, { useEffect, useState } from "react";
import "./paiement.css";
import img from "../../images/cash.png";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Topbar from "../TopBar/Topbar";

// import { AiFillDelete, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
// import { FaEye } from "react-icons/fa6";

const Paiement = () => {
  // const [Tableshwow, setTable] = useState(false);
  const [employe, setEmploye] = useState([]);
  const [matEmploye, setMatEmploye] = useState("");
  const [values, setValues] = useState({
    matricule: "",
    annee: "",
    mois: "",
    avantageAccorder: 0,
    avantageHeureSup: 0,
  });
  const navigate = useNavigate();
  // const [employeP, setEmployeP] = useState([]);
  const { id } = useParams();
  const payerUnE = () => {
    axios
      .get("http://localhost:3001/employe/" + id)
      .then((res) => {
        setValues({ ...values, matricule: res.data[0].matricule });
        // setMatEmploye(res.data[0].employe);
      })
      .catch((err) => console.log(err));
  };
  const dateP = () => {
    axios
      .get("http://localhost:3001/date")
      .then((res) => {
        setValues({ ...values, mois: res.data.month, annee: res.data.year });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    payerUnE();
    dateP();
    axios
      .get("http://localhost:3001/employe/")
      .then((res) => setEmploye(res.data))
      .catch((err) => console.log(err));
  }, []);

  //Trouver l'employe selectionnée
  const employeSelectionnee = employe.find(
    (personne) => personne.matricule === matEmploye
  );
  const handelSubmit = (e) => {
    e.preventDefault();
    // verification
    axios
      .get(
        `http://localhost:3001/verification?mat=${values.matricule}&mois=${values.mois}&annee=${values.annee}`
      )
      .then((res) => {
        if (res.data.length === 0) {
          //pas encore exister
          axios
            .post("http://localhost:3001/paie/", values)
            .then((res) => {
              console.log(res.data);
              toast.success("Employé bien payé");
              navigate("/journalpaiment");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          toast.error("Employé déja payé dans ce mois");
        }
      })
      .catch((err) => console.log(err));
  };
  const MenuToogle = () => {
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");
    navigation.classList.toggle("activemove");
    main.classList.toggle("activemove");
  };
  return (
    <div>
          <Topbar title= "Paiment" menutoggle={MenuToogle}/>
    <div className="Paiement">
     
      <div className="headPaie">
        
        <h1 className="title">
          <img src={img} alt="" />
          <span>Formulaire de paiement</span>
        </h1>
        <div>
          <Link className="link_liste" to={"/journalpaiment"}>Liste de paiement</Link>
          {/* <button onClick={() => setTable(!Tableshwow)}>
            {" "}
            {` ${!Tableshwow ? "Listes" : "Payer"} `}{" "}
          </button> */}
        </div>
      </div>

      <div className="containerPaiement">
        {/* {!Tableshwow && ( */}

          <div className="formPaiement">
            <div className="image__container">
              <p>
                L'etat du payement vous indique si un salarié selectionné est
                déjà payé ou non
              </p>
            </div>
            <form action="" onSubmit={handelSubmit}>
              <div className="head__form">
                <h1>Payer un salarié</h1>
              </div>
              <div className="bodyformPaie">
                <div className="rowPaie colomns">
                  <div>
                    <label htmlFor="annee">Mois </label>
                    <select
                      name=""
                      id=""
                      value={values.mois}
                      onChange={(e) => {
                        setValues({ ...values, mois: e.target.value });
                      }}
                    >
                      <option value="Janvier">Janvier</option>
                      <option value="Février">Février</option>
                      <option value="Mars">Mars</option>
                      <option value="Avril">Avril</option>
                      <option value="Mai">Mai</option>
                      <option value="Juin">Juin</option>
                      <option value="Juillet">Juillet</option>
                      <option value="Août">Août</option>
                      <option value="Septebre">Septebre</option>
                      <option value="Octobre">Octobre</option>
                      <option value="Novembre">Novembre</option>
                      <option value="Décembre">Décembre</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="annee">Année actuelle *</label>
                    <input
                      type="number"
                      required
                      value={values.annee}
                      onChange={(e) => {
                        setValues({ ...values, annee: e.target.value });
                      }}
                      maxLength={4}
                      placeholder="ex: 2024 (4 chiffre)"
                    />
                  </div>
                </div>
                <div className="rowPaie">
                  {" "}
                  <hr></hr>
                </div>
                <div className="rowPaie colomns">
                  <div>
                    <div>
                      <label htmlFor="annee">Matricule du Salarié * </label>
                      <select
                        name=""
                        id=""
                        required
                        value={values.matricule}
                        onChange={(e) => {
                          setValues({ ...values, matricule: e.target.value });
                          setMatEmploye(e.target.value);
                        }}
                      >
                        <option value="">selectionné un salarié</option>
                        {employe.map((val, i) => (
                          <option key={i} value={val.matricule}>
                            {val.matricule}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <br />
                    </div>
                  </div>

                  {employeSelectionnee && (
                    <div>
                      <div>
                        <label htmlFor="annee">Nom du salarié</label>
                        <input
                          type="text"
                          disabled
                          value={employeSelectionnee.nom}
                        />
                      </div>

                      <div>
                        <label htmlFor="annee">Prénoms du salarié</label>
                        <input
                          type="text"
                          disabled
                          value={employeSelectionnee.prenom}
                        />
                      </div>
                      <div className="rowPaie">
                        <label htmlFor="">Salaire de base</label>
                        <input
                          type="text"
                          disabled
                          value={employeSelectionnee.salaireBase + " Ariary"}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="rowPaie">
                  <label htmlFor="annee">Avantage Accordé</label>
                  <input
                    type="number"
                    value={values.avantageAccorder}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        avantageAccorder: e.target.value,
                      });
                    }}
                    placeholder="en Ariary"
                  />
                </div>
                <div className="rowPaie">
                  <label htmlFor="annee">
                    Avantage dans les Heure Supplementaire
                  </label>
                  <input
                    type="number"
                    value={values.avantageHeureSup}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        avantageHeureSup: e.target.value,
                      });
                    }}
                    placeholder="en Ariary"
                  />
                </div>
              </div>

              <div className="wrappBtnPaie">
                <button type="submit">Payer</button>
                <button type="reset">Reinitialiser</button>
              </div>
            </form>
          </div>
        {/* )} */}

        {/* {Tableshwow && (
          <>
            <div className="searchPaie">
              <div className="search ">
                <label htmlFor="">
                  <input type="text" placeholder="Search" />
                  <AiOutlineSearch className="search-outline" />
                </label>
              </div>
            </div>

            <table className="tabJournal">
              <thead>
                <tr>
                  <th>Matricule</th>
                  <th>Name</th>
                  <th>Prenom</th>
                  <th>Avantage accordé</th>
                  <th>Montant de salaire</th>
                  <th>Total montant</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="action">
                  <td>0011</td>
                  <td>Maxwel</td>
                  <td>Chandler</td>
                  <td> 20000 Ar </td>
                  <td> 20000 Ar </td>
                  <td> 20000 Ar </td>
                  <td>
                    <FaEye className="icone eye" />
                    <AiFillDelete className="icone gap" />
                    <AiFillEdit className="icone edit" />
                  </td>
                </tr>
                <tr className="action">
                  <td>0011</td>
                  <td>Maxwel</td>
                  <td>Chandler</td>
                  <td> 20000 Ar </td>
                  <td> 20000 Ar </td>
                  <td> 20000 Ar </td>
                  <td>
                    <FaEye className="icone eye" />
                    <AiFillDelete className="icone gap" />
                    <AiFillEdit className="icone edit" />
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )} */}
      </div>
    </div>
    </div>
   
  );
};

export default Paiement;
