// Récupération de la chaine de requête dans l'URL
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//Méthode extraction de l'Id
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const idItems = urlSearchParams.get("id");
console.log(idItems);

//Positionnement de l'objet
const positionElement = document.querySelector(".item");
console.log(positionElement);


// Récupération d'un produit depuis son Id

fetch("http://localhost:3000/api/products/" + idItems)
    .then(function (res) {
        return res.json();
    })
    .catch((error) => {
        console.log("Fetch failed");
    })

    .then(function (itemData) {
        article = itemData;
        
     let productImg = document.createElement("img");
     document.querySelector(".item__img").appendChild(productImg);
     productImg.src = article.imageUrl;
     productImg.alt = article.altTxt;

     
     let productName = document.getElementById('title');
     productName.innerHTML = article.name;

     
     let productPrice = document.getElementById('price');
     productPrice.innerHTML = article.price /100;

     
     let productDescription = document.getElementById('description');
     productDescription.innerHTML = article.description;

for (let colors of article.colors){
    console.log(colors);
     let productColors = document.createElement("option");
     document.querySelector("#colors").appendChild(productColors);
     productColors.value = colors;
     productColors.innerHTML = colors;
};
    })
    