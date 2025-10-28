const USD = 4.87
const EUR = 5.32
const GBP = 6.08

const amount = document.querySelector("#amount");
const form = document.querySelector("form");
const currency = document.querySelector("#currency");
const footer = document.querySelector("main footer")
const description = document.querySelector("#description")

amount.addEventListener("input", function(){
    const hascharacters = /\D+/g;
    amount.value = amount.value.replace(hascharacters, " ");
})

form.onsubmit = (event) => {
    event.preventDefault()
    switch(currency.value){
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR,"€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP,"£")
            break
    }
}
function convertCurrency(amount, price, symbol){
    try{
        description.textContent = `${symbol} 1 = ${price}`
        
        footer.classList.add("show-result")
    }catch(error){
        console.log(error)
        footer.classList.remove("show-result")
        alert("Não foi possivel converter. Tente novamente")
    }
}