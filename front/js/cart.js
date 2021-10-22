// Déclaration d'un item dans le storage
let cartItem = JSON.parse(localStorage.getItem("cart"));
console.log(cartItem);

// Sélection de la classe où injecter les éléments
const positionItems = document.querySelector("#cart__items");


// Si le panier est vide : afficher le panier vide
if (cartItem === null || cartItem == 0) {
  const emptyCart = document.querySelector("#cart__items");
  emptyCart.innerHTML = "Votre panier est actuellement vide.";
  console.log(emptyCart);

  // Si le panier n'est pas vide, affichage des produits
} else {
  for (i = 0; i < cartItem.length; i++) {
    let items = cartItem[i];
    fetch("http://localhost:3000/api/products/" + cartItem[i].productId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(items);
        positionItems.innerHTML += displayItem(data, items.color, items.quantity);
      })
  }
};

// Fonction affichage des informations de chaque produit dans le panier
function displayItem(data, color, quantity) {
  return `
         <article class="cart__item" data-id="${data._Id}">
                 <div class="cart__item__img">
                   <img src=${data.imageUrl} alt="${data.altTxt}">
                 </div>
                 <div class="cart__item__content">
                   <div class="cart__item__content__titlePrice">
                     <h2>${data.name}</h2>
                     <p>${color}</p>
                     <p>${data.price * quantity}.00 €</p>
                   </div>
                   <div class="cart__item__content__settings">
                     <div class="cart__item__content__settings__quantity">
                       <p>Qté : </p>
                       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${quantity}>
                     </div>
                     <div class="cart__item__content__settings__delete">
                       <p class="deleteItem">Supprimer</p>
                     </div>
                   </div>
                 </div>
               </article>`;

}

//------- Fin affichage produits panier -------------

// Modification d'une quantité de produit
function modifyQtt() {
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < qttModif.length; k++) {
    qttModif[k].addEventListener("change", (event) => {
      event.preventDefault();

      //Selection de l'element à modifier en fonction de son id ET sa couleur
      let quantityModif = cartItem[k].items.quantity;
      let qttModifValue = qttModif[k].valueAsNumber;

      const resultFind = cartItem.find((el) => el.qttModifValue !== quantityModif);

      resultFind.items.quantity = qttModifValue;
      cartItem[k].items.quantity = resultFind.items.quantity;

      localStorage.setItem("cart", JSON.stringify(cartItem));

      // refresh rapide
      location.reload();
    });
  };
}
modifyQtt();

/*
function getPrices() {
 
}
getPrices();
 
 
//------- Suppression d'un article du panier --------------
 
function deleteArticle() {
  // Sélection du bouton supprimer l'article
  const deleteItem = document.getElementsByClassName("deleteItem");
  console.log(deleteItem);
 
  // Fonction de suppression d'un article du panier
  for (let l = 0; l < deleteItem.length; l++) {
    deleteItem[l].addEventListener("click", (event) => {
      event.preventDefault();
      // Sélection de l'article à supprimer
      let selectId = cartItem[l].element.dataset._id;
      let selectColor = cartItem[l].element.dataset.color;
      console.log(selectColor);
      // Méthode filter pour sélectionner les éléments à garder et supprimer l'élément sélectionné
      cartItem = cartItem.filter(element => element._id !== selectId);
 
      localStorage.setItem("cart", JSON.stringify(cartItem));
 
      // Alerte de suppression du produit
      alert("Ce produit a été supprimé de votre panier");
      window.location.href = "cart.html";
    })
  }
}
deleteArticle();*/

//------------- Formulaire de commande

// Sélection bouton envoi du formulaire
const orderButton = document.querySelector("#order");
console.log(orderButton);

// Add event listener
orderButton.addEventListener("click", (e) => {
  e.preventDefault();

  const formValues = {
    prenom: document.querySelector("#firstName").value,
    nom: document.querySelector("#lastName").value,
    adresse: document.querySelector("#address").value,
    ville: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  }
  console.log("formValues", formValues);

  //-------------- Gestion de validation du formulaire
  const leprenom = formValues.prenom;
  console.log(leprenom);



  // Mettre l'objet dans le local storage
  localStorage.setItem("formValues", JSON.stringify(formValues));

  // Mettre les valeurs du formulaire et les produits du panier dans un objet à envoyer vers le serveur
  const toSend = {
    cartItem,
    formValues
  }
  console.log("Envoyer", toSend);
});

// Récupération des valeurs du formulaire depuis local storage
const dataUser = localStorage.getItem("formValues");
const dataUserObject = JSON.parse(dataUser);


// Mettre les valeurs du local storage dans le champ du formulaire
document.querySelector("#firstName").value = dataUserObject.prenom;
document.querySelector("#lastName").value = dataUserObject.nom;
document.querySelector("#address").value = dataUserObject.adresse;
document.querySelector("#city").value = dataUserObject.ville;
document.querySelector("#email").value = dataUserObject.email;

console.log("dataUserObject", dataUserObject);
