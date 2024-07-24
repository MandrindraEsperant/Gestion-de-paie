import React, { useEffect, useState } from "react";
import "./Table.css";
// import imagProfile from "../../images/image1.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiFillDelete,
  AiOutlineEdit,
  AiOutlineClose,
  AiFillEdit,
  AiFillPlusCircle,
  AiFillCloseCircle,
  AiTwotoneAlert,
  AiFillWarning,
} from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { FaInfo, FaWindowClose } from "react-icons/fa";
import { FaEye, FaUserGroup } from "react-icons/fa6";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

const Table = () => {
  const [imgEmploye, setImgEmploye] = useState("/images/employes/default.png");
  const [imgSelected, setImgSelected] = useState(null);

  const ref = React.createRef();

  const choixImage = (e) => {
    if (e) {
      const reader = new FileReader();
      reader.onloadend = () => setImgEmploye(reader.result);
      reader.readAsDataURL(e);
    }
  };

  const EnregistrerImg = async (matricule) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("file", imgSelected);
    formData.append("matricule", matricule);

    axios.post("http://localhost:3001/uploads/", formData)
            .then(res => {               
                toast.success("L'image a été bien modifier");
            })
            .catch(err => {
                console.log(err);
                toast.error("Il n'y a rien à modifier");
                
            }
            )


    // try {
    //   const response = await axios.post(
    //     "http://localhost:3001/uploads/",
    //     formData
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Error uploading file: ", error);
    // }
  };

  // const generatePdf = useReactToPrint({
  //   content: () => ref.current,
  //   documentTitle: "Buletin de paie",
  //   onAfterPrint: () => toast.success("Pdf a été creé avec succès"),
  // });

  const [showformAdd, setshowformAdd] = useState(false);
  const [showdetail, setshowdetail] = useState(false);
  const [modalsup, setshowmodalsup] = useState(false);
  const [id, setId] = useState(0);

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

  /**********************/
  const [values, setValues] = useState({
    matricule: "",
    CIN: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    sexe: "",
    adresse: "",
    email: "",
    tel: "",
    debutContrat: "",
    poste: "",
    salaireBase: "",
    img: "",
  });
  const [showEdit, setShowEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [data, setData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const records = data.slice(firstIndex, lastIndex);

  useEffect(() => {
    getAllEmploye();
  }, []);

  const getAllEmploye = () => {
    axios
      .get("http://localhost:3001/employe/")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  // const btnShow = btn ?   (<button>Suivant</button>):(<button>Suivant</button>);
  const deleteEmploye = (id) => {
    axios
      .delete("http://localhost:3001/employe/" + id)
      .then((res) => {
        toast.warning("Employé supprimmé");
        getAllEmploye();
      })
      .catch((err) => console.log(err));
  };

  const AjoutEmploye = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/employe/", values)
      .then((res) => {
        setshowformAdd(false);
        getAllEmploye();
        toast.success("L'employé a été bien enregistrer");
      })
      .catch((err) => console.log(err));
  };
  // prendre toute le ligne avec l'ID
  const Modification = (id) => {
    setShowEdit(true);
    setIdEdit(id);
    axios.get("http://localhost:3001/employe/" + id).then((res) => {
      setValues({
        ...values,
        matricule: res.data[0].matricule,
        CIN: res.data[0].CIN,
        nom: res.data[0].nom,
        prenom: res.data[0].prenom,
        dateNaissance: res.data[0].dateNaissance,
        sexe: res.data[0].sexe,
        adresse: res.data[0].adresse,
        email: res.data[0].email,
        tel: res.data[0].tel,
        debutContrat: res.data[0].debutContrat,
        poste: res.data[0].poste,
        salaireBase: res.data[0].salaireBase,
      });
    });
  };


  // prendre toute le ligne avec l'ID



  const Detail = (id) => {
    const Element = data.find((salarier) => salarier.id === id);
    if (Element.img === 'null' || values.img === '')
      setImgEmploye("/images/employes/default.png");
    else
      setImgEmploye(`/images/employes/${values.img}`);

      setValues({
        ...values,
        matricule: Element.matricule,
        CIN: Element.CIN,
        nom: Element.nom,
        prenom: Element.prenom,
        dateNaissance: Element.dateNaissance,
        sexe: Element.sexe,
        adresse: Element.adresse,
        email: Element.email,
        tel: Element.tel,
        debutContrat: Element.debutContrat,
        poste: Element.poste,
        salaireBase: Element.salaireBase,
        img: Element.img,
      });

      if (values.img !== 'null' && (values.img !== "" && values.img !== null)) 
            setImgEmploye(`/images/employes/${values.img}`);
          else 
            setImgEmploye("/images/employes/default.png");




    // axios.get("http://localhost:3001/employe/" + id).then((res) => {
    //   setValues({
    //     ...values,
    //     matricule: res.data[0].matricule,
    //     CIN: res.data[0].CIN,
    //     nom: res.data[0].nom,
    //     prenom: res.data[0].prenom,
    //     dateNaissance: res.data[0].dateNaissance,
    //     sexe: res.data[0].sexe,
    //     adresse: res.data[0].adresse,
    //     email: res.data[0].email,
    //     tel: res.data[0].tel,
    //     debutContrat: res.data[0].debutContrat,
    //     poste: res.data[0].poste,
    //     salaireBase: res.data[0].salaireBase,
    //     img: res.data[0].img,
    //   });

    //   if (values.img !== 'null' || values.img !== '') {
    //     setImgEmploye(`/images/employes/${values.img}`);
    //     console.log('Tonga, hitany,manana');
    //   }
    //   else {
    //     setImgEmploye("/images/employes/default.png");
    //     console.log('tsy manana');

    //   }

    // });



  };

  const EditEmploye = (e) => {
    e.preventDefault();
    const id = idEdit;
    setShowEdit(false);
    axios
      .put("http://localhost:3001/employe/" + id, values)
      .then((res) => {
        setValues({
          matricule: "",
          CIN: "",
          nom: "",
          prenom: "",
          dateNaissance: "",
          sexe: "",
          adresse: "",
          email: "",
          tel: "",
          debutContrat: "",
          poste: "",
          salaireBase: "",
        });
        getAllEmploye();
        setshowformAdd(false);
        toast.info("L'employé a été bien modifier");
      })
      .catch((err) => console.log(err));
  };
  const SercherEmployer = (e) => {
    const mot = e.trim();

    if (mot !== "") {
      axios
        .get("http://localhost:3001/employe/chercher/" + mot)
        .then((res) => setData(res.data))
        .catch((err) => {
          console.log(err);
        });
    } else getAllEmploye();
  };

  // Function of pagination formulaire

  let formStepsNum = 0;

  const nextFormStep = () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  };

  const prevFormStep = () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  };

  function updateFormSteps() {
    const formSteps = document.querySelectorAll(".form-step");
    formSteps.forEach((formStep) => {
      formStep.classList.contains("form-step-active") &&
        formStep.classList.remove("form-step-active");
    });

    formSteps[formStepsNum].classList.add("form-step-active");
  }

  function updateProgressbar() {
    const progress = document.getElementById("progress");
    const progressSteps = document.querySelectorAll(".progress-step");

    progressSteps.forEach((progressStep, idx) => {
      if (idx < formStepsNum + 1) {
        progressStep.classList.add("progress-step-active");
      } else {
        progressStep.classList.remove("progress-step-active");
      }
    });
    const progressActive = document.querySelectorAll(".progress-step-active");
    progress.style.width =
      ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
  }

  /**********************/

  return (
    <div className="containerTable">
      <main className="table">
        {/* <ToastContainer/> */}
        <section className="table__header">
          <h1>
            <FaUserGroup className=".icon" /> <span>Listes des salariés</span>
          </h1>
          <div className="search">
            <label htmlFor="">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => SercherEmployer(e.target.value)}
              />
              <AiOutlineSearch className="search-outline" />
            </label>
          </div>
          <div>
            <button
              onClick={() => {
                setshowformAdd(true);
                setValues({
                  matricule: "",
                  CIN: "",
                  nom: "",
                  prenom: "",
                  dateNaissance: "",
                  sexe: "",
                  adresse: "",
                  email: "",
                  tel: "",
                  debutContrat: "",
                  poste: "",
                  salaireBase: "",
                });
              }}
            >
              <AiFillPlusCircle className="icon" /> Ajouter
            </button>
          </div>
        </section>
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th>Matricule</th>

                <th>Nom</th>
                <th>Prenom</th>
                <th>Poste</th>

                <th>Salaire de base</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((d, i) => (
                <tr key={i}>
                  <td>{d.matricule}</td>
                  <td>{d.nom}</td>
                  <td>{d.prenom}</td>
                  <td>{d.poste}</td>
                  <td>{d.salaireBase}</td>
                  <td>
                    <FaEye
                      className="icone eye"
                      onClick={() => {
                        setshowdetail(true);
                        Detail(d.id);
                      }}
                    />
                    <AiFillDelete
                      className="icone gap"
                      onClick={() => {
                        setshowmodalsup(true);
                        setId(d.id);
                      }}
                    />
                    <AiFillEdit
                      onClick={() => {
                        Modification(d.id);
                      }}
                      className="icone edit"
                    />
                  </td>
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
                <span className="page-link" onClick={nexPage}>
                  Suivant
                </span>
              </li>
            </ul>
          </nav>
        </section>
      </main>

      {showEdit && (
        <div className="wrapperModale">
          <div className="containerForm">
            <form action="" onSubmit={EditEmploye}>
              <div className="headForm">
                <h2> Modification d'un salarié</h2>
                <AiFillCloseCircle
                  onClick={() => setShowEdit(false)}
                  className="icon"
                />
              </div>

              <div className="content">
                <div className="row">
                  <label htmlFor="nom">
                    Matricule <span>*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    required
                    value={values.matricule}
                    onChange={(e) =>
                      setValues({ ...values, matricule: e.target.value })
                    }
                  />
                  <FaInfo className="icone" />
                </div>
                <div className="row">
                  <label htmlFor="nom">
                    CIN <span>*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    maxLength={12}
                    required
                    value={values.CIN}
                    onChange={(e) =>
                      setValues({ ...values, CIN: e.target.value })
                    }
                  />
                  <AiFillWarning className="icone" />
                </div>
                <div className="row">
                  <label htmlFor="nom">Prénom(s)</label>
                  <br />
                  <input
                    type="text"
                    value={values.prenom}
                    onChange={(e) =>
                      setValues({ ...values, prenom: e.target.value })
                    }
                  />
                  <AiTwotoneAlert className="icone" />
                </div>
                <div className="row">
                  <label htmlFor="nom">
                    Nom <span>*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    required
                    value={values.nom}
                    onChange={(e) =>
                      setValues({ ...values, nom: e.target.value })
                    }
                  />
                </div>
                {/* <div className="row">
                  <label htmlFor="nom">
                    Date de naissance <span>*</span>
                  </label>
                  <br />
                  <input  type="date"
                    // value={  (new  Date(values.dateNaissance)).toISOString().split('T')[0] }
                    onChange={(e) =>
                      setValues({ ...values, dateNaissance: e.target.value })
                    } />
                </div> */}
                <div className="row">
                  <label htmlFor="nom">
                    Sexe <span>*</span>
                  </label>
                  <br />
                  <select
                    value={values.sexe}
                    onChange={(e) =>
                      setValues({ ...values, sexe: e.target.value })
                    }
                  >
                    <option value="F">Féminin</option>
                    <option value="M">Mascilin</option>
                  </select>
                </div>
                <div className="row">
                  <label htmlFor="nom">
                    Adresse <span>*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    value={values.adresse}
                    onChange={(e) =>
                      setValues({ ...values, adresse: e.target.value })
                    }
                  />
                </div>
                <div className="row">
                  <label htmlFor="nom">
                    Email <span>*</span>
                  </label>
                  <br />
                  <input
                    type="email"
                    placeholder="ex : yourmail@yahoo.fr"
                    required
                    value={values.email}
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                  />
                </div>
                <div className="row">
                  <label htmlFor="nom">
                    Télephone <span>*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    value={values.tel}
                    required
                    onChange={(e) =>
                      setValues({ ...values, tel: e.target.value })
                    }
                  />
                </div>
                {/* <div className="row">
                  <label htmlFor="nom">
                    Debut du contrat <span>*</span>
                  </label>
                  <br />
                  <input
                    required
                    // value={(new  Date(values.debutContrat)).toISOString().split('T')[0]}
                    onChange={(e) =>
                      setValues({ ...values, debutContrat: e.target.value })
                    }
                  />
                </div> */}
                <div className="row">
                  <label htmlFor="nom">
                    Poste <span>*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    require
                    value={values.poste}
                    onChange={(e) =>
                      setValues({ ...values, poste: e.target.value })
                    }
                  />
                </div>
                <div className="row">
                  <label htmlFor="nom">
                    Salaire de base <span>*</span>
                  </label>
                  <br />
                  <input
                    type="number"
                    required
                    placeholder="10000000 ar"
                    value={values.salaireBase}
                    onChange={(e) =>
                      setValues({ ...values, salaireBase: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="footterForm">
                <span>
                  <span style={{ color: "red" }}>*</span> : Champ oblogatoire
                </span>
                <div>
                  <button type="submit">Enregistrer</button>
                  <button onClick={() => setShowEdit(false)}>Annuller</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Formulaire d'ajout et de modification VAOVAO  avec pagination*/}

      {showformAdd && (
        <div className="wrapperModale " id="pagination">
          <div className="paginformBody">
            <form className="form" onSubmit={AjoutEmploye}>
              <div className="headForm">
                <h2> Création d'un salarié</h2>
                <AiFillCloseCircle
                  onClick={() => {
                    setshowformAdd(false);
                  }}
                  className="icon"
                />
              </div>
              <div
                className="progressbar"
              // style={{ display: "none" }}
              >
                <div className="progress" id="progress"></div>
                <div
                  className="progress-step progress-step-active"
                  data-title="Intro"
                ></div>
                <div className="progress-step" data-title="Contact"></div>
                <div className="progress-step" data-title="Poste"></div>
                {/* <div className="progress-step" data-title="Password"></div> */}
              </div>

              {/* 1 */}
              <div className="form-step form-step-active">
                <div className="input-group">
                  <label htmlFor="username">Matricule *</label>
                  <input
                    type="text"
                    autoCapitalize="words"
                    required
                    autoFocus
                    onChange={(e) =>
                      setValues({ ...values, matricule: e.target.value })
                    }
                    name="username"
                    id="username"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="cin">CIN *</label>
                  <input
                    type="text"
                    required
                    name="cin"
                    id="cin"
                    maxLength={12}
                    minLength={12}
                    onChange={(e) =>
                      setValues({ ...values, CIN: e.target.value })
                    }
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="prenom">Prénoms </label>
                  <input
                    type="text"
                    name="prenom"
                    id="prenom"
                    value={values.prenom}
                    onChange={(e) =>
                      setValues({ ...values, prenom: e.target.value })
                    }
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="Nom">Nom *</label>
                  <input
                    type="text"
                    required
                    name="Nom"
                    id="Nom"
                    onChange={(e) =>
                      setValues({ ...values, nom: e.target.value })
                    }
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => nextFormStep()}
                    className="btn btn-next width-50 ml-auto"
                  >
                    Suivant
                  </button>
                </div>
              </div>

              {/* 2 */}

              <div className="form-step ">
                <div className="input-group">
                  <label htmlFor="adress">Adresse</label>
                  <input
                    name="adress"
                    id="adress"
                    onChange={(e) =>
                      setValues({ ...values, adresse: e.target.value })
                    }
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Date de naissance</label>
                  <input
                    name="naissance"
                    id="naissance"
                    type="date"
                    onChange={(e) =>
                      setValues({ ...values, dateNaissance: e.target.value })
                    }
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="Sexe">Sexe</label>
                  <select
                    id="Sexe"
                    onChange={(e) =>
                      setValues({ ...values, sexe: e.target.value })
                    }
                  >
                    <option value="F">Féminin</option>
                    <option value="M">Mascilin</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="ex : yourmail@yahoo.fr"
                    required
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                  />
                </div>
                <div className="btns-group">
                  <button
                    type="button"
                    onClick={() => prevFormStep()}
                    className=" btn btn-prev "
                  >
                    Précedent
                  </button>
                  <button
                    type="button"
                    onClick={() => nextFormStep()}
                    className=" btn btn-next "
                  >
                    Suivant
                  </button>
                </div>
              </div>
              {/* 3 */}
              {/* <div className="form-step">
               

                <div className="btns-group">
                  <button
                    type="button"
                    className=" btn btn-prev "
                    onClick={() => prevFormStep()}
                  >
                    Précedent
                  </button>
                  <button
                    type="button"
                    onClick={() => nextFormStep()}
                    className=" btn btn-next "
                  >
                    Suivant
                  </button>
                </div>
              </div> */}
              {/* 4 */}
              <div className="form-step">
                <div className="input-group">
                  <label htmlFor="dob">Télephone</label>
                  <input
                    type="text"
                    name="dob"
                    id="dob"
                    // required
                    onChange={(e) =>
                      setValues({ ...values, tel: e.target.value })
                    }
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="debut">Date debut du contrat</label>
                  <input
                    name="debut"
                    id="debut"
                    type="date"
                    // required
                    onChange={(e) =>
                      setValues({ ...values, debutContrat: e.target.value })
                    }
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="Poste">Poste</label>
                  <input
                    type="text"
                    name="Poste"
                    id="Poste"
                    // required
                    // value={values.poste}
                    onChange={(e) =>
                      setValues({ ...values, poste: e.target.value })
                    }
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="id">Salaire de base</label>
                  <input
                    type="number"
                    name="Salaire"
                    id="Salaire"
                    // required
                    placeholder="10000000 ar"
                    // value={values.salaireBase}
                    onChange={(e) =>
                      setValues({ ...values, salaireBase: e.target.value })
                    }
                  />
                </div>
                <div className="btns-group">
                  <button
                    type="button"
                    className=" btn btn-prev "
                    onClick={() => prevFormStep()}
                  >
                    Précedent
                  </button>
                  <input type="submit" id="enregistrer" className="btn " value={"Enregistrer"} />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail ou profile */}
      {/* {showdetail && (
        <div className="wrapperModale" onClick={() => setshowdetail(false)}>
          <div className="detailEmploye">
            <div className="head">
              <h1>Mr VELONJARA </h1>
            </div>
            <div className="body">
              <div className="info">
                <div className="col">
                  <div className="photo">
                    <FaUser />
                  </div>
                  <div className="infoOne"></div>
                  <div className="infoOne"></div>
                </div>
                <div className="col">
                  <div className=""></div>
                  <div className="infoOne"></div>
                  <div className="infoOne"></div>
                </div>
                <div className="col">
                  <div className=""></div>
                  <div className="infoOne"></div>
                  <div className="infoOne"></div>
                </div>
              </div>
            </div>
            <div className="footer"></div>
          </div>
        </div>
      )} */}

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
              <p>Voulez-vous vraiment le supprimé ?</p>
              <button
                onClick={() => {
                  deleteEmploye(id);
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

      {showdetail && (
        <div className="wrapperModale">
          <div className="detailEmploye" >
            <div className="head">
              <h1>Détail d'un salarié</h1>
              <AiOutlineClose
                className="icone"
                onClick={() => setshowdetail(false)}
              />
            </div>
            <div className="body"  ref={ref}>
              <div className="info">
                <div className="image">
                  {/* <img src={(values.img === null) ? `${imgEmploye}`: `/images/employes/${values.img}`  } alt="" className="icone" />                   */}

                  <img src={`${imgEmploye}`} alt="" className="icone" />
                  <label
                    htmlFor="file"
                    title="Choisir un image"
                    className="edit"
                  >
                    <AiOutlineEdit htmlFor="file" />
                  </label>
                  <span
                    className="validation"
                    title="Enregistrer"
                    onClick={() => EnregistrerImg(values.matricule)}
                  >
                    OK
                  </span>
                  <input
                    type="file"
                    hidden
                    name="Image"
                    id="file"
                    onChange={(e) => {
                      choixImage(e.target.files[0]);
                      setImgSelected(e.target.files[0]);
                    }}
                  ></input>

                  <h1>
                    <p>{values.nom}</p>
                    <p> {values.prenom} </p>
                  </h1>
                </div>

                <div className="col">
                  <div className="colDetail">
                    <div className="para para1">
                      <p>                       
                        Matricule : <strong>{values.matricule}</strong>{" "}
                      </p>
                      <p>                      
                        Poste : <strong>{values.poste}</strong>{" "}
                      </p>
                      <p>
                        Télephone : <strong>{values.tel}</strong>{" "}
                      </p>
                      <p>                      
                        Email : <strong>{values.email}</strong>{" "}
                      </p>
                    </div>
                  </div>
                  <div className="colDetail">
                    <div className="para">
                      <p>
                        Début du contrat :{" "}
                        <strong>{values.debutContrat}</strong>{" "}
                      </p>

                      Date de naissance :{" "}
                      <strong>{values.dateNaissance}</strong> <p></p>
                      <p>
                        Salaire de base :{" "}
                        <strong>{values.salaireBase} Ariary</strong>{" "}
                      </p>
                      <p>
                        Adresse : <strong>{values.adresse}</strong>{" "}
                      </p>

                    </div>
                  </div>
                </div>
                {/* <div className="footer">
                  <button
                    onClick={() => {
                      setValues({
                        matricule: "",
                        CIN: "",
                        nom: "",
                        prenom: "",
                        dateNaissance: "",
                        sexe: "",
                        adresse: "",
                        email: "",
                        tel: "",
                        debutContrat: "",
                        poste: "",
                        salaireBase: "",
                      });
                      generatePdf();
                    }}
                  > 
                    Télécharger
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
