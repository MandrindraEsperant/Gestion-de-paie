import React, { useEffect, useState } from "react";
import { FaBookJournalWhills } from "react-icons/fa6";
import {useReactToPrint} from "react-to-print"
import {  
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";
import img from "../../images/mavitrika.jpg";
import "./journalPaie.css";
import axios from "axios";
import Topbar from "../TopBar/Topbar";

const JournalPaie = () => {

  const ref = React.createRef();

  const generatePdf= useReactToPrint({
    content: ()=>ref.current,
    documentTitle: 'Buletin de paie',
    onAfterPrint:()=>alert('Pdf a été creé avec succès')
  })

  const [modalsup, setshowmodalsup] = useState(false);
  const [data, setData] = useState([]);
  const [showBuletin, setshowBuletin] = useState(false);
  const [btndisabled, setbtndisabled] = useState(true);
  const [idbuletin, setidbuletin] = useState(null);
 
  function prevPage() {
    if (currentPage !== 1) {
      setcurrentPage(currentPage - 1);
    }
  }
  function changePage(id) {
    setcurrentPage(id);
  }
  function nexPage() {
    if (currentPage !== npage) {
      setcurrentPage(currentPage + 1);
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/journalpaie/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // id de bullettin de paie
  const slr =  data.find(
    (paie) => paie.id === idbuletin
  );

 
  /*************************/
  const [currentPage, setcurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const MenuToogle = () => {
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");
    navigation.classList.toggle("activemove");
    main.classList.toggle("activemove");
  };
  return (
    <div>
      <Topbar title ="Jounal de paie" menutoggle={MenuToogle}/>
      <div className="journalPaie">
      
      <header>
        <h1 className="journal title">
          <FaBookJournalWhills className="icone" />
          <span>Liste des paiments</span>
        </h1>

        <button onClick={() => setshowBuletin(true)} disabled={btndisabled}>
          Buletin de paie
        </button>
      </header>
      <div className="body__journal">
        <div className="headTableJournal">
          <div className="JournalHeadColumn">
            <div>
              <label htmlFor="annee">Mois</label>
              <select name="" id="">
                <option value="">Touts les mois</option>
                <option value="1">Janvier</option>
                <option value="2">Février</option>
                <option value="3">Mars</option>
                <option value="4">Avril</option>
                <option value="5">Mai</option>
                <option value="6">Juin</option>
                <option value="7">Juillet</option>
                <option value="8">Août</option>
                <option value="9">Septebre</option>
                <option value="10">Octobre</option>
                <option value="11">Novembre</option>
                <option value="12">Décembre</option>
              </select>
            </div>
          </div>

          <div className="JournalHeadColumn">
            <div className="search">
              <label htmlFor="">
                <input type="text" placeholder="Search" />
                <AiOutlineSearch className="search-outline" />
              </label>
            </div>
          </div>
          <div className="JournalHeadColumn">
            <div>
              <label htmlFor="annee">Paiement</label>
              <select name="" id="">
                <option value="">déja payé</option>
                <option value="">Pas encore payé</option>
              </select>
            </div>
          </div>
        </div>
        <table className="tabJournal">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Mois</th>
              <th>Année</th>

              <th>Salaire de base</th>
              <th>Avantage accordé</th>
              <th>Avantage suplementaire</th>
              <th>Total montant</th>
              <th>Date de paiement</th>          
            </tr>
          </thead>
          <tbody>
            {records.map((val, index) => (
              <tr
                className={`action ${val.id === idbuletin ? "selected" : null}`}
 
                onClick={(e) => {                
                  setbtndisabled(false);
                  setidbuletin(val.id);
                }}
                key={index}
              >
                <td>{val.matricule}</td>
                <td>{val.nom}</td>
                <td>{val.mois}</td>
                <td>{val.annee}</td>

                <td>{val.salaireBase}</td>
                <td>{val.avantageAccorder}</td>
                <td>{val.avantageHeureSup}</td>
                <td> {val.montant} </td>
                <td> {
                 (new  Date(val.datePaiement)).toISOString().split('T')[0]

              } </td>
                {/* <td>
                  <FaEye className="icone eye" />
                  <AiFillDelete
                    onClick={() => {
                      setshowmodalsup(true);
                      setId(val.id);
                    }}
                    className="icone gap"
                  />
                  <Link to="/paiment">
                    <AiFillEdit className="icone edit" />
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>

        <nav>
          <ul className="pagination">
            <li className="page-item btnpn">
              <span href="#" className="page-link" onClick={prevPage}>
                Précedent
              </span>
            </li>
            {numbers.map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                onClick={() => changePage(n)}
              >
                {n}
              </li>
            ))}
            <li className="page-item btnpn">
              <span href="#" className="page-link" onClick={nexPage}>
                Suivant
              </span>
            </li>
          </ul>
        </nav>
      </div>

      {modalsup && (
        <div className="wrapperModale">
          <div className="bodyModal">
            <div className="modalInfo">
              <div className="header">
                <FaWindowClose
                  className="close"
                  onClick={() => setshowmodalsup(false)}
                />
              </div>
              <p>Voulez-vous effectuer la suppression ?</p>
              <button
                onClick={() => {
                  setshowmodalsup(false);
                }}
                className="btn btnsupp"
              >
                Oui
              </button>
              <button
                className="btn btnnom"
                onClick={() => setshowmodalsup(false)}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}

      {showBuletin && (
        <div
          className="wrapperModale buletin"
         >
          <div className="detailEmploye">
            <div className="head">
              <h1>Buletin de paie d'un salarié</h1>
              <AiOutlineClose
                className="icone"
                onClick={() => setshowBuletin(false)}
              />
            </div>
                  
                  
                  {/* BULLETIN DE PAIE */}
            <div className="containerBuletin" ref ={ref}>
              <div className="headForm">
                <h3>buletin de paie</h3>
              </div>
              <head>
                <div className="leftbuletin">
                  <div className="img">
                    <img src={img} alt="" />{" "}
                    <div>
                      <h1>Asociation mavitrika</h1>
                      <p>Adresse: mellle Maxwel tanambao</p>
                      {/* <p>Date : 26/032024</p> */}
                    </div>
                  </div>

                  <p><i> "Izay mavitrika ihany no mahavokatra" </i></p>
                </div>

                                    
                                {/* EMPLOYEE */}

               {  
                  slr && ( <div className="rightbuletin">
                  <p>
                    Matricule : <strong>  {slr.matricule}</strong>
                  </p>
                  <p>
                    Nom : <strong>{slr.nom}</strong>
                  </p>
                  <p>
                    Prénoms : <strong>{slr.prenom}</strong>
                  </p>
                  <p>
                    Poste : <strong>{slr.poste}</strong>
                  </p>
                  <p>
                    Mois : <strong>{slr.mois}</strong>
                  </p>
                  <p>
                    Année : <strong>{slr.annee}</strong>
                  </p>
                </div>)
                }
               
              </head>
            
            {/* PAYEMENT */}
             { slr && ( <div className="tabbuletin">
                <h4>Tableau de Payment</h4>
                <table>
                  <thead>
                    <tr>
                      <td>N°</td>
                      <td>Referance</td>
                      <td>Montant</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Avantage Accorder</td>
                      <td>  {slr.avantageAccorder} Ar</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Heure suplementaire</td>
                      <td>{slr.avantageHeureSup} Ar</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Salaire de base</td>
                      <td>{slr.salaireBase} Ar</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Total</td>
                      <td>{slr.avantageAccorder + slr.salaireBase + slr.avantageHeureSup} Ar</td>
                    </tr>
                  </tbody>
                </table>
              </div>)}
             

              
            </div>
            <footer>
                <button onClick={generatePdf}>Imprimmer</button>
            </footer>
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default JournalPaie;
