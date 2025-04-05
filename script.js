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

//-----------------------------------------------------------------------

// Validation formulaire
formulaireInscription.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupération des balises
    let prenom = document.getElementById('prenom').value.trim();
    let nom = document.getElementById('nom').value.trim();
    let mail = document.getElementById('mail').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm').value;
    let prenomOk = true;
    let nomOk = true; 
    let mailOk = true; 
    let passwordOk = true; 
    confirmOk = true;


    // Cacher les erreurs au chargement de la page
    let errors = document.querySelectorAll('.error');
    for(let i = 0; i < errors.length; i++) {
        errors[i].style.display = 'none';
    }

    // Prénom et Nom
    if (!prenom) {
        prenomOk = false;
        let erreur = document.getElementById('prenomError');
        erreur.innerText = "Ce champ ne doit pas etre vide !";
        erreur.style.display = 'block';
    }
    if (!nom) {
        nomOk = false;
        let erreur = document.getElementById('nomError');
        erreur.innerText = "Ce champ ne doit pas etre vide !";
        erreur.style.display = 'block';
    }

    // Email
    const regExMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regExMail.test(mail)) {
        mailOk = false;
        let erreur = document.getElementById('mailError');
        erreur.innerText = "Le format mail est invalide !";
        erreur.style.display = 'block';
    }

    // Password
    const regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if(!regExPass.test(password)) {
        passwordOk = false;
        let erreur = document.getElementById('passwordError');
        erreur.innerText = "Le mot de passe doit avoir minimum 8 caractères contenir au moins 1 majuscule, 1 miniscule, 1 chiffre et 1 caractère spécial!";
        erreur.style.display = 'block';
    }

    // Confirmation password
    if (confirmPassword !== password) {
        confirmOk = false;
        let erreur = document.getElementById('confirmError');
        erreur.innerText = "Le mot de passe n'est pas conforme !";
        erreur.style.display = 'block';
    }

    // Formulaire correct
    if(prenomOk && nomOk && mailOk && passwordOk && confirmOk) {
        alert("Formulaire Valide !");
    }

    // Réinitialiser le formulaire
    formulaireInscription.reset();
});

//-----------------------------------------------------------------------
