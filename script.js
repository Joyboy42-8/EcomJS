// Modal
const inscription = document.getElementById('log');
const formulaireInscription = document.querySelector('.form');
const closeForm = document.querySelector('.fa-xmark');

inscription.addEventListener('click', () => {
    formulaireInscription.style.display = 'block';
});
closeForm.addEventListener('click', () => {
    formulaireInscription.style.display = 'none';
});

// Validation formulaire
