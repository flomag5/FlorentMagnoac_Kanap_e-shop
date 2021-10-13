// Requête de récupération des produits depuis l'API

fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
})

    .catch(function(err) {
        console.log("Fetch Failed")
        let items = document.querySelector("#items");
        items.innertHTML = "Affichage momentanément indisponible. Veuillez revenir plus tard.";
})


/* Récupération de la réponse émise
---Fonction qui va afficher les objets dans le DOM automatiquement --- */

    .then(function(allItems) {
        const items = allItems;
        console.log(items);

//Boucle pour afficher chaque article de tous les produits
    for (let article in items) {

/* Insertion de chaque produit
--- Créer les éléments html et mettre les données à l'intérieur --- */

        /* Paramétrage de l'attribut 'href' de la balise 'a' 
        --- avec ID pour récupération de l'article depuis la page produit --- */
        let productLink = document.createElement("a");
        document.querySelector(".items").appendChild(productLink);
        productLink.href = `product.html?id=${allItems[article]._id}`;

        let itemArticle = document.createElement("article");
        productLink.appendChild(itemArticle);

        // Affiche image et texte alternatif
        let productImg = document.createElement("img");
        itemArticle.appendChild(productImg);
        productImg.src = allItems[article].imageUrl;
        productImg.alt = allItems[article].altTxt;

        // Affichage du nom du produit
        let productName = document.createElement("h3");
        itemArticle.appendChild(productName);
        productName.classList.add("productName");
        productName.innerHTML = allItems[article].name;

        // Affichage de la description du produit
        let productDescription = document.createElement("p");
        itemArticle.appendChild(productDescription);
        productDescription.classList.add("productDescription");
        productDescription.innerHTML = allItems[article].description;
    }
});







