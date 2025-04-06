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
let prenom = '';
let nom = '';
let mail = '';

formulaireInscription.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupération des balises
    prenom = document.getElementById('prenom').value.trim();
    nom = document.getElementById('nom').value.trim();
    mail = document.getElementById('mail').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm').value;
    let prenomOk = true;
    let nomOk = true; 
    let mailOk = true; 
    let passwordOk = true; 
    let confirmOk = true;


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

    //Photo
    const formData = new FormData(formulaireInscription);
    const photo = formData.get('photo');

    if (photo && photo.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(photo);
        const imgP = document.querySelector('#photo-profil');
        const imgW = document.querySelector('#photo-welcome');
        imgP.src = imageUrl;
        imgW.src = imageUrl;
        console.log(imageUrl);
        console.log(imgP);
        console.log(imgW);
    } else {
        alert("Veuillez Sélectionner une Photo !");
    }

    // Formulaire Validé
    // Barre de progression
    if(prenomOk && nomOk && mailOk && passwordOk && confirmOk) {
        const loadingDiv = document.querySelector('.loading');
        loadingDiv.style.display = 'block';
        let count = 0; 

        const interval = setInterval(() => {
            if(count < 100) {
                count += 1;
                loadCount.innerHTML = count;
                progress.style.width = count + '%';

                setTimeout(() => {
                    loadingDiv.style.opacity = 0;
                    formulaireInscription.style.display = 'none';
                    document.querySelector('header').style.display = 'none';
                    document.querySelector('main').style.display = 'block';
                }, 1000);
            } else {
                loadingDiv.style.display = 'block';
                clearInterval(interval);
            }
        }, 20);
    };

    // Réinitialiser le formulaire
    formulaireInscription.reset();
});

//-----------------------------------------------------------------------
//Après Inscription
const main = document.querySelector('main');
const info = document.getElementById('userInfo');
const welcome = document.getElementById('userWelcome');
console.log(welcome);

info.innerHTML += `
<div>
    <p>Prénom: ${prenom}</p><br>
    <p>Nom: ${nom}</p><br>
    <p>Mail: ${mail}</p>
</div>
`;
welcome.innerHTML += `
<h2>Bienvenue ${prenom} ${nom}</h2>
`;