const amount = document.querySelector("#amount");
const form = document.querySelector("form");
const currency = document.querySelector("#currency");
const footer = document.querySelector("main footer")
const description = document.querySelector("#description")
const result = document.querySelector("#result")
const API_KEY = "4aaf41d6b6ff958554ca5fdc"

//manipula o input para receber somente números
async function getExchangeRates(currency){

    const response = await fetch (`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency}`); 
    const data = await response.json();
    return data.conversion_rates.BRL;
}

amount.addEventListener("input", function(){
    const hascharacters = /\D+/g;
    amount.value = amount.value.replace(hascharacters, "");
})

//captando o evento submit(enviar) do formulário
form.onsubmit = async(event) => {

    event.preventDefault()

    
 try {

    // Busca a cotação da moeda selecionada
    const price = await getExchangeRates(currency.value);

    // Define o símbolo da moeda
    let symbol = "";

    switch (currency.value) {
      case "USD":
        symbol = "US$";
        break;

      case "EUR":
        symbol = "€";
        break;

      case "GBP":
        symbol = "£";
        break;
    }

    // Faz a conversão usando a função que você já tinha
    convertCurrency(amount.value, price, symbol);

  } catch (error) {
    console.log(error);
    alert("Não foi possível obter a cotação.");
  }
};


// Sua função original praticamente sem alterações
function convertCurrency(amount, price, symbol) {
  try {

    description.textContent = `${symbol} 1 = R$ ${price}`;

    let total = amount * price;

    if (isNaN(total)) {
      return alert("Digite um valor válido.");
    }

    total = formatCurrencyBRL(total).replace("R$", "");

    result.textContent = `${total} Reais`;

    footer.classList.add("show-result");

  } catch (error) {

    console.log(error);

    footer.classList.remove("show-result");

    alert("Não foi possível converter.");
  }
}


// Formata para Real
function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}