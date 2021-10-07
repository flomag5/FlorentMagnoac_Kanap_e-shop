// Récup Items data from API

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
   //error
});


function myLog(myItems){
    console.log(myItems)
}
