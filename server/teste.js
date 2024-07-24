// Obtenir la date d'aujourd'hui
const aujourd_hui = new Date();

// Extraire le jour, le mois et l'année
const jour = String(aujourd_hui.getDate()).padStart(2, '0');
const mois = String(aujourd_hui.getMonth() + 1).padStart(2, '0'); // Les mois commencent à partir de 0, donc on ajoute 1
const annee = aujourd_hui.getFullYear();

// Formatage de la date
const dateFormatee = `${jour}/${mois}/${annee}`;

console.log(dateFormatee); // Affiche la date au format jj/mm/aaaa




import React from 'react';

function formatDate(date) {
  // Obtenir les composants de la date
  const jour = String(date.getDate()).padStart(2, '0');
  const mois = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à partir de 0
  const annee = date.getFullYear();

  // Formater la date
  return `${jour}/${mois}/${annee}`;
}

function App() {
  // Obtenir la date d'aujourd'hui
  const aujourd_hui = new Date();

  // Formater la date d'aujourd'hui
  const dateFormatee = formatDate(aujourd_hui);

  return (
    <div>
      <h1>Date d'aujourd'hui :</h1>
      <p>{dateFormatee}</p>
    </div>
  );
}

export default App;
