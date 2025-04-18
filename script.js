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
let prenom = document.getElementById('prenom').value;
let nom = document.getElementById('nom').value;
let mail = document.getElementById('mail').value;

formulaireInscription.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupération des balises
    prenom = document.getElementById('prenom').value.trim();
    nom = document.getElementById('nom').value.trim();
    mail = document.getElementById('mail').value.trim();
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
        erreur.innerText = "Ce champs est requis !";
        erreur.style.display = 'block';
    }
    if (!nom) {
        nomOk = false;
        let erreur = document.getElementById('nomError');
        erreur.innerText = "Ce champs est requis !";
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

    info.innerHTML += `
    <div>
        <p>Prénom: ${prenom}</p><br>
        <p>Nom: ${nom}</p><br>
        <p>Mail: ${mail}</p>
    </div>
    `;
    welcome.innerHTML += `
    <h1>Bienvenue ${prenom} ${nom}</h1>
    `;
    
    // Réinitialiser le formulaire
    formulaireInscription.reset();
});

//-----------------------------------------------------------------------
//Après Inscription
const main = document.querySelector('main');
const info = document.getElementById('userInfo');
const welcome = document.getElementById('userWelcome');
const productForm = document.getElementById('addForm');
productForm.style.display = "block";

//-----------------------------------------------------------------------
//Formulaire Produit
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const quantity = document.getElementById('quantity').value.trim();
    const libelle = document.getElementById('libelle').value.trim();

    // Name Error
    if(!name) {
        let errorName = document.getElementById('nameError');
        errorName.innerText = "Ce champs est requis !";
        errorName.style.display = 'block';
    }
    // Quantity Error
    if(!quantity) {
        let errorQuantity = document.getElementById('quantityError');
        errorQuantity.innerText = "Ce champs est requis !";
        errorQuantity.style.display = 'block';
    } else if (isNaN(quantity) || quantity <= 0) {
        let errorQuantity = document.getElementById('quantityError');
        errorQuantity.innerText = "La quantité doit être un nombre positif !";
        errorQuantity.style.display = 'block';
    }
    
    console.log(`Produit créé: ${name}, Quantité: ${quantity}, Description: ${libelle}`); 

    // Réinitialiser le formulaire
    formulaireInscription.reset();      
});