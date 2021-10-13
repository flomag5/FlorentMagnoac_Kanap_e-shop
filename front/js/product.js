// Récupération de la chaine de requête dans l'URL
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//Méthode extraction de l'Id
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const idItems = urlSearchParams.get("id");
console.log(idItems);

//Positionnement de l'objet dans le DOM
const positionElement = document.querySelector(".item");
console.log(positionElement);


// Récupération d'un article de l'API avec son Id

fetch("http://localhost:3000/api/products/" + idItems)
    .then(function (res) {
        return res.json();
    })
    .catch((error) => {
        console.log("Fetch failed");
    })

    // Fonction de récupération des informations de l'article
    .then(function (itemData) {
        article = itemData;
        
    // Affichage de l'image de l'article choisi
     let productImg = document.createElement("img");
     document.querySelector(".item__img").appendChild(productImg);
     productImg.src = article.imageUrl;
     productImg.alt = article.altTxt;

     // Nom de l'article choisi
     let productName = document.getElementById('title');
     productName.innerHTML = article.name;

     // Affiche le prix de l'article choisi
     let productPrice = document.getElementById('price');
     productPrice.innerHTML = article.price; 

     // Affiche la description de l'article choisi
     let productDescription = document.getElementById('description');
     productDescription.innerHTML = article.description;

     // Sélection du choix de la couleur de l'article
for (let colors of article.colors){
    console.log(colors);
     let productColors = document.createElement("option");
     document.querySelector("#colors").appendChild(productColors);
     productColors.value = colors;
     productColors.innerHTML = colors;
};
    })
    

//----------- Gestion du panier ------------------

// Sélection Id des options disponibles pour chaque article
const colorChoice = document.querySelector("#colors");
const quantityChoice = document.querySelector("#quantity");

// Choix de la couleur dans une variable
let userColorChoice = colorChoice.value;

// Choix de la quantité de l'article
let userQuantityChoice = quantityChoice.value;

// Sélection du bouton Ajouter au panier
const addToCart = document.querySelector("#addToCart");
console.log(addToCart);

// Ecouter le bouton et envoie dans le panier
addToCart.addEventListener("click", (event)=> {
    event.preventDefault();


// Récupération des valeurs sélectionnées
let itemOptions = {
    itemID: idItems,
    productColors: colorChoice.value,
    nombreItem: Number(quantityChoice.value),
    productName: article.name,
    productPrice: article.price,
    productDescription: article.description,
    productImg: article.imageUrl,
    productAltImg: article.altTxt

}

console.log(itemOptions);
});