// Récupération des produits depuis l'API

fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})

.catch(function(err) {
    console.log("Fetch Failed")
    let items = document.querySelector("#items");
    items.innertHTML = "Affichage momentanément impossible. Veuillez revenir plus tard.";
})

.then(function(allItems) {
    const items = allItems;
    console.log(items);
    for (let article in items) {

        let productLink = document.createElement("a");
        document.querySelector(".items").appendChild(productLink);
        productLink.href = `product.html?id=${allItems[article]._id}`;

        let itemArticle = document.createElement("article");
        productLink.appendChild(itemArticle);

        let productImg = document.createElement("img");
        itemArticle.appendChild(productImg);
        productImg.src = allItems[article].imageUrl;
        productImg.alt = allItems[article].altTxt;

        let productName = document.createElement("h3");
        itemArticle.appendChild(productName);
        productName.classList.add("productName");
        productName.innerHTML = allItems[article].name;

        let productDescription = document.createElement("p");
        itemArticle.appendChild(productDescription);
        productDescription.classList.add("productDescription");
        productDescription.innerHTML = allItems[article].description;
    }
});



let itemsData = document.getElementById("items");






