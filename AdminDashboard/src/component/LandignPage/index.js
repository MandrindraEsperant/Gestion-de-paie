import React, {  useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";

const Landingpage = (props) => {
  let erreur = "Mot de passe ou/et le nom de l'utilisateur est incorrect";
  const navige = useNavigate();
  const [nom, setNom] = useState("");
  const [mot, setMot] = useState("");
  const [valid, setValid] = useState(false);
  const [affiche, setAffiche] = useState(false);

  const verificationForm = () => {
    if (nom.length >= 4 && mot.length >= 4) {
      setValid(true);
    } else setValid(false);
  };

  const affichreErreur = () => {
    const paragrapheError = document.querySelector(
      ".AboutOne .formContainer form .message p"
    );
    paragrapheError.classList.remove("cacher");
    setTimeout(() => {
      paragrapheError.classList.add("cacher");
    }, 3000);
    return () => clearTimeout();
  };
  function valideAdmin() {
    axios.get("http://localhost:3001/auth").then((res) => {
      let data = res.data;
      const admin = data.find((ad) => ad.nom === nom && ad.motDePasse === mot);
      if (admin !== undefined) {
        props.name();
        localStorage.setItem('logged', admin.id)
        localStorage.setItem('image', admin.image)
        localStorage.setItem('nom', admin.nom)
        localStorage.setItem('email', admin.email)
        navige("/dashboard");
      } else {
        affichreErreur();
      }
    });
  }

  return (
    <div className="landingPage">
      {/* <div><p>Cpompteur :{count}</p></div> */}
      <div className="AboutOne">
        <div className="formContainer">
          <div className="imageContainer">
            <h2>Gestion de paie</h2>
            <p>
              Gerer facilement des paiements des salariés dans cette application
              , vos finance sera controlé en temps reel.
            </p>
            <p>
              Découvrez comment maitriser vos finance grace à cette application
            </p>
          </div>
          <form action="" autoComplete="false">
            <div className="formtitle">
              <h1>Connexion</h1>
            </div>
            <div className="message">
              <p className="cacher">{erreur}</p>
            </div>

            <TextField
              fullWidth
              //   size="small"
              onChange={(e) => {
                setNom(e.target.value);
                verificationForm();
              }}
              margin="normal"
              label="Nom utilusateur"
              name="Name"
            />
            <TextField
              fullWidth
              //   size="small"
              margin="normal"
              label="Mot de passe"
              type={affiche ? "text" : "password"}
              name="Name"
              onChange={(e) => {
                setMot(e.target.value);
                verificationForm();
              }}
            />
            <div className="input-goup">
              <input
                type="checkbox"
                onChange={(e) => {
                  setAffiche(!affiche);
                }}
                id="affiche"
                name="username"
              />
              <label htmlFor="affiche">Afficher le mot de passe</label>
            </div>
            <div>
              <button
                disabled={valid ? false : true}
                type="button"
                onClick={() => {
                  valideAdmin();
                  // if (!trouver) {
                  //   affichreErreur();
                  //   alert(erreur);
                  // } else alert("no error");
                }}
              >
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
