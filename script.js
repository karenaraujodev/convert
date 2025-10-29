const USD = 5.36
const EUR = 6.24
const GBP = 7.11

const amount = document.querySelector("#amount");
const form = document.querySelector("form");
const currency = document.querySelector("#currency");
const footer = document.querySelector("main footer")
const description = document.querySelector("#description")
const result = document.querySelector("#result")

//manipula o input para receber somente números
amount.addEventListener("input", function(){
    const hascharacters = /\D+/g;
    amount.value = amount.value.replace(hascharacters, "");
})

//captando o evento submit(enviar) do formulário
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

// função para converter a moeda
function convertCurrency(amount, price, symbol){
    try{
        // exibe a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${price}`
        //faz o calculo do total
        let total = amount * price
        //verifica se o resultado não é um numero
        if(isNaN(total)){
            return alert("Por favor, digite novamente o valor para converter")
        }
        //formatar o valor
        total = formatCurrencyBRL(total).replace("R$", "")
        //exibe o resultado total
        result.textContent = `${total} Reais`
        //Aplica a classe que exibe o footer para mostrar o resultado
        
        footer.classList.add("show-result")
    }catch(error){
        console.log(error)
        footer.classList.remove("show-result")
        alert("Não foi possivel converter. Tente novamente")
    }
}

//formata a moeda em Real 
function formatCurrencyBRL(value){
    //converte para numero para utilizar o toLocaleString e formata no padrão BRL
    return Number(value).toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
});
}