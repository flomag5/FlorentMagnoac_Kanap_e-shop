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


  // Si le panier n'est pas vide, affichage des items
} else {
  for (i = 0; i < cartItem.length; i++) {
    let items = cartItem[i];
    fetch("http://localhost:3000/api/products/" + cartItem[i].productId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(items);
        positionItems.appendChild(displayItem(data, items.color, items.quantity));
        displayTotalPrice(data.price * items.quantity);
        changeQuantity();
        deleteProduct();
      })
  }
};


//--------- EVENEMENTS -------------------------

// Calcul prix total du panier
function displayTotalPrice(price) {
  let divTotalPrice = document.querySelector("#totalPrice");
  console.log(parseFloat(divTotalPrice.textContent));
  divTotalPrice.textContent = parseFloat(divTotalPrice.textContent) + price;
};

// Calcul du nombre d'articles dans le panier
let arrayQuantities = [];
if (cartItem === null || cartItem == 0) {
  console.log("Panier vide");
} else {
  for (let items of cartItem) {
    let ItemQuantity = items.quantity;
    arrayQuantities.push(ItemQuantity);
  }
  console.log(arrayQuantities);

  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let totalQuantityCart = arrayQuantities.reduce(reducer);
  document.querySelector("#totalQuantity").innerHTML = totalQuantityCart;
}


//------- Suppression d'un article du panier --------------

function deleteProduct() {
  let deleteBtn = document.querySelectorAll(".deleteItem");

  for (let k = 0; k < deleteBtn.length; k++) {
    deleteBtn[k].addEventListener("click", (event) => {
      event.preventDefault();

      let selectProd = deleteBtn[k].closest("article");
      let selectIdItem = selectProd.dataset.id;
      console.log(selectIdItem);
      let selectColorItem = selectProd.dataset.color;;
      console.log(selectColorItem);

      cartItem = cartItem.filter(el => el.productId !== selectIdItem || el.color !== selectColorItem);
      console.log(cartItem);

      localStorage.setItem("cart", JSON.stringify(cartItem));

      alert("Le produit a bien été supprimé de votre panier");
      location.reload();
    })
  }
}

//-------------- Modification de la quantité d'un article

function changeQuantity() {
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let l = 0; l < qttModif.length; l++) {
    qttModif[l].addEventListener("change", (event) => {
      event.preventDefault();

      //Selection de l'element à modifier en fonction de son id ET sa couleur
      let quantityModif = cartItem[l].quantity;
      let qttModifValue = qttModif[l].valueAsNumber;

      const resultFind = cartItem.find((el) => el.qttModifValue !== quantityModif);

      resultFind.quantity = qttModifValue;
      cartItem[l].quantity = resultFind.quantity;

      localStorage.setItem("cart", JSON.stringify(cartItem));

      // refresh rapide
      location.reload();
    })
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
  // Appel de l'instance de classe formulaire pour créer l'objet contact
  const contact = new Formulaire();

  // Construction d'un array of strings depuis local storage
  let idProducts = [];
  for (let i = 0; i < cartItem.length; i++) {
    idProducts.push(cartItem[i].productId);
  }
  console.log(idProducts);

  //-------------- Gestion de validation du formulaire -----------------//

  // Fonction de contrôle des saisies selon regEx
  // Controle prenom/nom/ville
  const regExNameCity = (value) => {
    return /^[A-Za-z ,.'-]{3,20}$/.test(value)
  }
  // Controle de l'adresse
  const regExAddress = (value) => {
    return /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/.test(value)
  }
  // Controle de l'email
  const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
  }


  //-------- Fonctions de saisie des champs du formulaire 
  function firstNameCheck() {
    const lePrenom = contact.prenom;
    if (regExNameCity(lePrenom)) {
      firstNameErrorMsg.innerHTML = " ";
      return true;
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ";
      return false;
    };
  }

  function lastNameCheck() {
    const leNom = contact.nom;
    if (regExNameCity(leNom)) {
      lastNameErrorMsg.innerHTML = " ";
      return true;
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ";
      return false;
    };
  }

  function addressCheck() {
    const leAddress = contact.adresse;
    if (regExAddress(leAddress)) {
      addressErrorMsg.innerHTML = " ";
      return true;
    } else {
      addressErrorMsg.innerHTML = "Veuillez saisir une adresse valide";
      return false;
    };
  }

  function cityCheck() {
    const laVille = contact.ville;
    if (regExNameCity(laVille)) {
      cityErrorMsg.innerHTML = " ";
      return true;
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner une ville";
      return false;
    };
  }

  function eMailCheck() {
    const leMail = contact.email;
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
    localStorage.setItem("contact", JSON.stringify(contact));
    // Mettre les valeurs du formulaire et les produits du panier dans un objet à envoyer vers le serveur
    const order = {
      contact: {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
      },
      products: idProducts,
    }
    console.log("Envoyer", order);

    sendToServer(order);
  } else {
    //alert("Veuillez remplir les champs du formulaire");
    return false;
  };

});


function sendToServer(order) {
  // Fonction d'envoi des éléments de la commande panier + formulaire
  const promise = fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      'Accept': "application/json",
      "Content-type": "application/json",
    },
  })
  console.log("PROMISE", promise);

  // Pour visualiser résultat du serveur dans la console
  promise.then(async (response) => {
    // Si la promesse n'est pas résolu alors gestion des erreurs
    try {
      console.log("RESP", response);
      const content = await response.json();
      console.log("CONTENT", content);

      if (response.ok) {
        console.log(`Résultat de ${response.ok}`);
        console.log("ID RESP", content.orderId);

        // Récupération de l'Id de la commande pprovenant de response du serveur
        localStorage.setItem("responseID", content.orderId);

        // Redirection vers la page de confirmation
        window.location = "confirmation.html";

      } else {
        alert(`Erreur de serveur: ${response.status}`);
      };

    } catch (e) {
      console.log(e);
      alert(`Erreur de ${e}`);
    }
  });
}

// Récupération des valeurs du formulaire depuis local storage
const dataUser = localStorage.getItem("contact");
const dataUserObject = JSON.parse(dataUser);

function fillInputData(input) {
  if (dataUserObject == null) {
    console.log("Le local storage a pour valeur null");
  } else {
    document.querySelector(`#${input}`).value = dataUserObject[input];
  }
}

// Mettre les valeurs du local storage dans le champ du formulaire
if (dataUser == null) {
  console.log("Formulaire non renseigné");
} else {
  document.querySelector("#firstName").value = dataUserObject.prenom;
  document.querySelector("#lastName").value = dataUserObject.nom;
  document.querySelector("#address").value = dataUserObject.adresse;
  document.querySelector("#city").value = dataUserObject.ville;
  document.querySelector("#email").value = dataUserObject.email;
}




