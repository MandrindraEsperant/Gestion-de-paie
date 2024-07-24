import React, { useState } from "react";
import stylo from '../../images/stylo.png'
import { AiOutlineClose } from "react-icons/ai";
import { IconButton, TextField}  from "@mui/material";



const Account = () => {
  const [photo, setPhoto] = useState("/images/caissier/Compte.jpg");
  const [edit, setEdit] = useState(true);
  const [mdp,setMdp] = useState('');
  const [nmdp,setNmdp] = useState('');
  const [cmdp,setCmdp] = useState('');

  const [showPassword, setShowPassword] = useState(false)
  const visuel = ()=>{
    setShowPassword((prevState)=>!prevState)
  }
  const email = localStorage.getItem('email');
  const nom = localStorage.getItem('nom');
  const ChoixPhoto = (e) => {
    if (e) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(e);
    }
  }

  return (
    <div>
      <div className="Account">

        <div className="title">
          <h1>{nom} </h1>
          <p><span>{email}</span></p>
          <div className="edit">
            <label htmlFor="choisir" title="Choisir une photo">
              <img src={stylo} alt="" />
            </label>
            <input type="file" name="" hidden id="choisir" onChange={(e) => ChoixPhoto(e.target.files[0])} />
          </div>
        </div>
        <div className="photo">
          <img src={photo} alt="" />
        </div>
        <div className="action">
          <button type="button" onClick={() => setEdit(true)}>Modifier Mot de passe</button>
        </div>
      </div>
    
      {edit && (
           <div className="wrapperModale"> <div className="formulaire">
           <div className="head">
            
             <AiOutlineClose className="icon" onClick={() => { setEdit(false) }}
             />
           </div>
           <hr /> 
           
           <form action="">
             
             <TextField
               fullWidth
               type={showPassword ? 'text' : 'password'}
               trailingEndAdornment ={
                 <IconButton onClick={visuel} >
                   {/* {showPassword ? <VisibilityOff/> : <Visibility/>} */}
                   <AiOutlineClose  className="icon" onClick={() => { setEdit(false) }}
                   
             />
                 </IconButton>
               }
               // helperText="Saisir votre mot de passe"
               size="small"
               margin="normal"
               label="Ancien mot de passe"
               // type={affiche ? "text" : "password"}
               name="Name"
             />
             <TextField
               fullWidth
               size="small"
               margin="normal"
               label="Nouveau mot de passe"
               name="Name"
             />
             <TextField
               fullWidth
               size="small"
               margin="normal"
               label="Confirmer le mot de passe"
               name="Name"
             />
           <div className="input-goup">
                 <input
                   type="checkbox"               
                   id="affiche"
                   name="username"
                 />
                 <label htmlFor="affiche">Afficher le mot de passe</label>
               </div>        
               <div className="btnMp">
               <button type="submit">Enregistrer</button>
             <button type="reset">Reinitialiser</button>
               </div>
             
           </form>
         </div></div>
      )

      }
    </div>

  );
};

export default Account;
