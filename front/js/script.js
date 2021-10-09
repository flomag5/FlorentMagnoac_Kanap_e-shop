// Récupération des produits depuis l'API

fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(items) {
    myLog(items)
})
.catch(function(err) {
    console.log("Fetch Failed")
   alert("Affichage momentanément impossible. Désolé pour le dérangement")
});


function myLog(myItems){
    console.log(myItems)
}


let data = document.getElementById("items");
data.innertHTML = ""