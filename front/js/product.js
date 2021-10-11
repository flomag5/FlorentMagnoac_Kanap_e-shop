// Récupération de la chaine de requête dans l'URL
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//Méthode extraction de l'Id
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const idItems = urlSearchParams.get("id");
console.log(idItems);


// Récupération d'un produit depuis son Id

fetch("http://localhost:3000/api/products/" + idItems)
    .then(function (res) {
        return res.json();
    })
    .catch((error) => {
        console.log("Fetch failed");
    })
