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
  let price = data.price * quantity;

  // Calcul prix total du panier
  let prices = [];
  prices.push(price);
  let totalPrice = prices.reduce((acc, el) => acc + el);
  document.querySelector("#totalPrice").innerHTML += totalPrice;

  return `
         <article class="cart__item" data-id="${data._Id}" data-color="${color}">
                 <div class="cart__item__img">
                   <img src=${data.imageUrl} alt="${data.altTxt}">
                 </div>
                 <div class="cart__item__content">
                   <div class="cart__item__content__titlePrice">
                     <h2>${data.name}</h2>
                     <p>${color}</p>
                     <p id="price">${price}.00 €</p>
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


// Déclaration de la variable de calcul du nombre d'articles dans le panier
/*let arrayPrices = [];
for (let items of cartItem) {
  let ItemPrice = items.price;
  console.log(items.price)
  arrayPrices.push(ItemPrice);
}
console.log(arrayPrices);

const reduces = (previousValue, currentValue) => previousValue + currentValue;
let totalPriceCart = arrayPrices.reduce(reduces);
document.querySelector("#totalPrice").innerHTML = totalPriceCart;*/


let arrayQuantities = [];
for (let items of cartItem) {
  let ItemQuantity = items.quantity;

  arrayQuantities.push(ItemQuantity);
}
console.log(arrayQuantities);

const reducer = (previousValue, currentValue) => previousValue + currentValue;
let totalQuantityCart = arrayQuantities.reduce(reducer);
document.querySelector("#totalQuantity").innerHTML = totalQuantityCart;


//------- Fin affichage produits panier -------------


// Modification d'une quantité de produit




//------- Suppression d'un article du panier --------------

function deleteItem() {
  // Sélection du bouton supprimer l'article
  const deleteItem = document.querySelectorAll(".deleteItem");
  console.log(deleteItem);

  // Fonction de suppression d'un article du panier
  for (let l = 0; l < deleteItem.length; l++) {
    deleteItem[l].addEventListener("click", (event) => {
      event.preventDefault();
      // Sélection de l'article à supprimer
      let selectId = this.dataset.id;
      let selectColor = this.dataset.color;
      console.log(selectColor);
      console.log(selectId);
      // Méthode filter pour sélectionner les éléments à garder et supprimer l'élément sélectionné
      cartItem = cartItem.filter(element => element.id !== selectId || element.dataset.color !== selectColor);

      localStorage.setItem("cart", JSON.stringify(cartItem));

      // Alerte de suppression du produit
      alert("Ce produit a été supprimé de votre panier");
      location.reload();
    });
  }
}


//------------- Formulaire de commande -------------------------------

// Sélection bouton envoi du formulaire
const orderButton = document.querySelector("#order");

// Add event listener
orderButton.addEventListener("click", (e) => {
  e.preventDefault();


  // Création d'une classe pour fabrique l'objet dans lequel iront les valeurs du formulaire
  class Formulaire {
    constructor() {
      this.prenom = document.querySelector("#firstName").value;
      this.nom = document.querySelector("#lastName").value;
      this.adresse = document.querySelector("#address").value;
      this.ville = document.querySelector("#city").value;
      this.email = document.querySelector("#email").value;
      //this.input = document.querySelector(`#${input}`).value;
    }
  }
  // Appel de l'instance de classe formulaire pour créer l'objet formValues
  const formValues = new Formulaire();


  //-------------- Gestion de validation du formulaire --------

  // Fonction de contrôle des saisies selon regEx
  const regExNameCity = (value) => {
    return /^[A-Za-z ,.'-]{3,20}$/.test(value)
  }

  const regExAddress = (value) => {
    return /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/.test(value)
  }

  const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
  }

  function firstNameCheck() {
    const lePrenom = formValues.prenom;
    if (regExNameCity(lePrenom)) {
      firstNameErrorMsg.innerHTML = " ";
      return true;
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ";
      return false;
    };
  }

  function lastNameCheck() {
    const leNom = formValues.nom;
    if (regExNameCity(leNom)) {
      lastNameErrorMsg.innerHTML = " ";
      return true;
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ";
      return false;
    };
  }

  function addressCheck() {
    const leAddress = formValues.adresse;
    if (regExAddress(leAddress)) {
      addressErrorMsg.innerHTML = " ";
      return true;
    } else {
      addressErrorMsg.innerHTML = "Veuillez saisir une adresse valide";
      return false;
    };
  }

  function cityCheck() {
    const laVille = formValues.ville;
    if (regExNameCity(laVille)) {
      cityErrorMsg.innerHTML = " ";
      return true;
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner une ville";
      return false;
    };
  }

  function eMailCheck() {
    const leMail = formValues.email;
    if (regExEmail(leMail)) {
      console.log("ok");
      emailErrorMsg.innerHTML = " ";
      return true;

    } else {
      console.log("ko");
      emailErrorMsg.innerHTML = "Adresse email n'est pas valide";
      return false;
    };
  }


  // Contrôle validité du formulaire avant envoi dans local storage
  if (firstNameCheck() && lastNameCheck() && addressCheck() && cityCheck() && eMailCheck()) {
    // Mettre l'objet dans le local storage
    localStorage.setItem("formValues", JSON.stringify(formValues));
  } else {
    console.log("Veuillez remplir les champs du formulaire");
  }

  // Mettre les valeurs du formulaire et les produits du panier dans un objet à envoyer vers le serveur
  const order = {
    cartItem,
    formValues
  }
  console.log("Envoyer", order);

  /**Expect request to contain:
   * contact: {
   * firstName:
   * lastName:
   * address:
   * city:
   * email:
   * }
   * products: [strings] -> products id
   */
  const promise = fetch("http://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      'Accept': "application/json",
      "Content-type": "application/json",
    },
  });
  console.log("PRM", promise);

  // Pour visualiser résultat du serveur dans la console
  promise.then(async (response) => {
    try {
      console.log("RESP", response);
      const contenu = await response.json();
      console.log("CONTENT", contenu);
    } catch (e) {
      console.log(e);
    }
  })

  // Pour voir ce qu'il y a réellement sur le serveur
  /*const newPromise = fetch("http://localhost:3000/api/products/order")
  newPromise.then(async (response) => {
    try {
      console.log("RESULT", newPromise);
      const dataBack = await response.json()
      console.log("DATA", dataBack);
    } catch (e) {
      console.log(e);
    }
  })*/
});


// Récupération des valeurs du formulaire depuis local storage
const dataUser = localStorage.getItem("formValues");
const dataUserObject = JSON.parse(dataUser);

function fillInputData(input) {
  if (dataUserObject == null) {
    console.log("local storage a pour valeur null");
  } else {
    document.querySelector(`#${input}`).value = dataUserObject[input];
  }
}
// Mettre les valeurs du local storage dans le champ du formulaire
document.querySelector("#firstName").value = dataUserObject.prenom;
document.querySelector("#lastName").value = dataUserObject.nom;
document.querySelector("#address").value = dataUserObject.adresse;
document.querySelector("#city").value = dataUserObject.ville;
document.querySelector("#email").value = dataUserObject.email;


