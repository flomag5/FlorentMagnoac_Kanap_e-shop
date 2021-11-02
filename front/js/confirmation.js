// Récupération de l'ID de la commande
const getResponseId = document.getElementById("orderId");
getResponseId.innerText = localStorage.getItem("responseID");
console.log(localStorage.getItem("responseID"));

