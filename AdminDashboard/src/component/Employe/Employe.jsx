import React from 'react';

import Table from '../Tables/Table';
import './employe.css'
import Topbar from '../TopBar/Topbar';
const Employe = () => {
    const MenuToogle = () => {
        let navigation = document.querySelector(".navigation");
        let main = document.querySelector(".main");
        navigation.classList.toggle("activemove");
        main.classList.toggle("activemove");
      };
    return (
      <div>
        <Topbar title="Salariés" menutoggle={MenuToogle}/>
        <div className='containerEmploye'>
            {/* <h1 className='title'>Salariés</h1> */}
            <Table />
        </div>
      </div>
       
    );
}

export default Employe;
