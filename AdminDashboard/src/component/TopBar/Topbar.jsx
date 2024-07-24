import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import stylo from '../../images/stylo.png'
import { AiOutlineClose } from "react-icons/ai";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import './topbar.css'
import axios from 'axios';
const Topbar = (props) => {

    const email = localStorage.getItem('email');
    const nom = localStorage.getItem('nom');
    const userName = localStorage.getItem('nom');
    const userImage = localStorage.getItem('image');
    const userId = localStorage.getItem('logged');

    const [photo, setPhoto] = useState("/images/caissier/account.png");
    const [edit, setEdit] = useState(false);
    const [showProfil, setShowProfil] = useState(false);

    const [showPassword, setShowPassword] = useState(false)
    const [np, setNp] = useState(false)
    const [cp, setCp] = useState(false)

    const [ancien, setAncien] = useState("");
    const [nouveau, setNouveau] = useState("")
    const [confirmation, setConfirmation] = useState("")
    const [mdp, setMdp] = useState(null);
    const [erreur, setErreur] = useState('');
    useEffect(() => {
        axios.get("http://localhost:3001/auth/" + userId)
            .then((res) => setMdp(res.data[0].motDePasse))
            .catch(err => console.log(err))
    }, [])


    const Verification = () => {
        if (ancien !== mdp) { setErreur("Mot de passe incorrect"); AfficherErreur() }
        else if (nouveau !== confirmation) { setErreur("Confirmation de mot de passe incorrect"); AfficherErreur() }
        else {
            axios.put("http://localhost:3001/auth/" + userId, { value: nouveau })
                .then(res => {
                    console.log(res.data);
                    toast.success("Le mot de passe a été bien modifier");
                    setShowProfil(false)
                    setEdit(false)
                })
                .catch(err => console.log(err))
        }
    }
    const AfficherErreur = () => {
        const paragrapheError = document.querySelector(".formulaire .erreur");
        paragrapheError.classList.remove("cacher");
        setTimeout(() => {
            paragrapheError.classList.add("cacher");
        }, 3000);
        return () => clearTimeout();
    }

    const [valid, setValid] = useState(false);
    const controleButton = () => {
        if (ancien.length >= 4 && (nouveau.length >= 4 && confirmation.length >= 4)) {
            setValid(true);
        } else setValid(false);
    }

    const handelShow = () => {
        setShowPassword(!showPassword)
    }

    const handelDown = (e) => {
        e.preventDefault();
    }
    const handelDownNp = (e) => {
        e.preventDefault();
    }
    const handelDownCp = (e) => {
        e.preventDefault();
    }

    const ChoixPhoto = (e) => {
        if (e) {
            const reader = new FileReader();
            reader.onloadend = () => setPhoto(reader.result);
            reader.readAsDataURL(e);
        }
    }

    const clickHide = () => {
        setShowProfil(false);
        window.location.reload()
    }
    useEffect(() => {
        if (userImage !== 'null' && userImage !== '')
            setPhoto(`/images/caissier/${userImage}`);
    }, [])


    const [imgSelected, setImgSelected] = useState(null);

    const EnregImg = async (id) => {
        const formData = new FormData();
        formData.append("file", imgSelected);
        formData.append("matricule", id);

        axios.post("http://localhost:3001/uploadsCAISSIER/", formData)
            .then(res => {
                const image = res.data.imageName;
                localStorage.setItem('image', image);
                toast.success("L'image a été bien modifier");
            })
            .catch(err => {
                console.log(err);
                toast.error("Il n'y a rien à modifier");
                
            }
            )


        // try {
        //     const response = await axios.post(
        //         "http://localhost:3001/uploadsCAISSIER/",
        //         formData
        //     );
        //     console.log("retour " + response);

        //     toast.success("L'image a été bien modifier");
        // } catch (error) {
        //     console.error("Error uploading file: ", error);
        //     toast.error("L'employé a été bien modifier");
        // }
    }
    // console.log(props)
    // ======== Menu Toggle Function=====


    return (
        <div className='topbar'>
            <div onClick={props.menutoggle} className="toggle">
                <AiOutlineMenu className='menu-outline' />
            </div>
            <div>
                <h1 style={{ fontSize: "2rem", color: "#2a2185" }}>{props.title} </h1>
            </div>
            <div className="profil" onClick={() => setShowProfil(true)}>
                <div className="user">
                    <img src={photo} alt="" />
                </div>
                <div className="nom" >
                    <p>{userName}</p>
                    <span>Admin</span>
                </div>
                {
                    showProfil && (
                        <div className="viewProfil">
                            <div className="Account">
                                <div className="head">
                                    <p></p>
                                    <AiOutlineClose className="icon" onClick={() => clickHide()}
                                    />
                                </div>
                                <div className="title">
                                    <h1>{nom} </h1>
                                    <p><span>{email}</span></p>
                                    <div className="edit">
                                        <label htmlFor="choisir" title="Choisir une photo">
                                            <img src={stylo} alt="" />
                                        </label>
                                        <input type="file" name="" hidden id="choisir"
                                            onChange={(e) => {
                                                ChoixPhoto(e.target.files[0]);
                                                setImgSelected(e.target.files[0]);
                                            }} />
                                    </div>
                                </div>
                                <div className="photo">
                                    <img src={photo} alt="" />
                                </div>
                                <button type='button' className='boutn' onClick={() => EnregImg(userId)}>OK</button>
                                <div className="action">
                                    <button type="button" onClick={() => { setEdit(true); setShowProfil(false) }}>Modifier Mot de passe</button>
                                </div>

                            </div>
                        </div>
                    )
                }
            </div>
            {edit && (
                <div className="wrapperModale changepassword" >
                    <div className="formulaire">
                        <div className="head">
                            <h3 style={{ color: 'white', fontSize: '1rem' }}>Modification de mot de passe</h3>
                            <AiOutlineClose className="icon" onClick={() => { setEdit(false) }}
                            />
                        </div>
                        <hr />
                        <div className="erreur cacher">
                            <p>{erreur}</p>
                        </div>
                        <form action="">
                            <TextField
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => { setAncien(e.target.value); controleButton() }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='togglepassword visibility'
                                                onClick={handelShow}
                                                onMouseDown={handelDown}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                size="small"
                                margin="normal"
                                label="Ancien mot de passe"
                                name="Name"
                            />
                            <TextField
                                fullWidth
                                size="small"
                                margin="normal"
                                onChange={(e) => { setNouveau(e.target.value); controleButton() }}
                                label="Nouveau mot de passe"
                                name="Name"
                                type={np ? 'text' : 'password'}
                                helperText="Le mot de passe doit plus de 5 caracters"
                                // variant='outLine'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='togglepassword visibility'
                                                onClick={() => setNp(!np)}
                                                onMouseDown={handelDownNp}
                                                edge="end"
                                            >
                                                {np ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                helperText="Le mot de passe doit plus de 5 caracters"
                                margin="normal"
                                onChange={(e) => { setConfirmation(e.target.value); controleButton() }}
                                label="Confirmer le mot de passe"
                                name="Name"
                                type={cp ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='togglepassword visibility'
                                                onClick={() => setCp(!cp)}
                                                onMouseDown={handelDownCp}
                                                edge="end"
                                            >
                                                {cp ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <div className="btnMp">
                                <button type="button" disabled={valid ? false : true} onClick={() => Verification()}>Enregistrer</button>
                                <button type="reset">Reinitialiser</button>
                            </div>

                        </form>
                    </div></div>
            )

            }


        </div>
    );
}

export default Topbar;
