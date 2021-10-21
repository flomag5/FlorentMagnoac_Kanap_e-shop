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
                     <p>${data.price}.00 €</p>
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
function getPrices() {
  let itemQuantity = document.getElementsByClassName("itemQuantity");
  totalQuantity = 0;

  for (let i = 0; i < itemQuantity.length; i++) {
    totalQuantity += itemQuantity[i].value;
  }
  let itemsTotalQuantity = document.getElementById("totalQuantity");
  itemsTotalQuantity.innerHTML = totalQuantity;
  console.log(totalQuantity);
  totalPrice = 0;

  for (let i = 0; i < itemQuantity.length; i++) {
    totalPrice += (itemQuantity[i].valueAsNumber * cartItem[i].price);
  }
  let productTotalPrice = document.getElementById('totalPrice');
  productTotalPrice.innerHTML = totalPrice;
  console.log(totalPrice);
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
      let selectDelete = cartItem[l].element.dataset.id;
      console.log(selectDelete);
      // Méthode filter pour sélectionner les éléments à garder et supprimer l'élément sélectionné
      cartItem = cartItem.filter(element => element.id !== selectDelete);

      localStorage.setItem("cart", JSON.stringify(cartItem));

      // Alerte de suppression du produit
      alert("Ce produit a été supprimé de votre panier");
      window.location.href = "cart.html";
    })
  }
}
deleteArticle();


//--------- Total du panier -----------
