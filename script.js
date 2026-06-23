const amount = document.querySelector("#amount");
const form = document.querySelector("form");
const currency = document.querySelector("#currency");
const footer = document.querySelector("main footer")
const description = document.querySelector("#description")
const result = document.querySelector("#result")
const API_KEY = "4aaf41d6b6ff958554ca5fdc"

async function getExchangeRates(currency){ //função assíncrona para buscar a cotação da moeda selecionada

    const response = await fetch (`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency}`);  // faz a requisição para a API de cotação da moeda selecionada
    const data = await response.json(); // converte a resposta para JSON
    return data.conversion_rates.BRL; // retorna a cotação da moeda selecionada em reais
}

amount.addEventListener("input", function(){ // adiciona um evento de input ao campo de valor
    const hascharacters = /\D+/g; // expressão regular para verificar se há caracteres não numéricos
    amount.value = amount.value.replace(hascharacters, ""); // substitui os caracteres não numéricos por vazio
})

form.onsubmit = async(event) => { // adiciona um evento de submit ao formulário

    event.preventDefault() // previne o comportamento padrão do formulário de recarregar a página

    
 try { // Tenta executar o código dentro do bloco try, caso ocorra algum erro, ele será capturado pelo bloco catch

    const price = await getExchangeRates(currency.value); // chama a função getExchangeRates passando o valor da moeda selecionada e aguarda a resposta da cotação em reais

    let symbol = ""; // variável para armazenar o símbolo da moeda selecionada

    switch (currency.value) { // verifica o valor da moeda selecionada e atribui o símbolo correspondente à variável symbol
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

    convertCurrency(amount.value, price, symbol); // chama a função convertCurrency passando o valor digitado, a cotação em reais e o símbolo da moeda selecionada

  } catch (error) { // caso ocorra algum erro, ele será capturado pelo bloco catch e exibido no console e em um alerta para o usuário
    console.log(error);
    alert("Não foi possível obter a cotação.");
  }
};


function convertCurrency(amount, price, symbol) {// função para converter o valor digitado para reais, usando a cotação da moeda selecionada e exibindo o resultado na tela
  try { // Tenta executar o código dentro do bloco try, caso ocorra algum erro, ele será capturado pelo bloco catch

    description.textContent = `${symbol} 1 = R$ ${price}`; //

    let total = amount * price; // calcula o valor total em reais multiplicando o valor digitado pelo preço da moeda selecionada

    if (isNaN(total)) { // verifica se o valor total é um número, caso não seja, exibe um alerta para o usuário
      return alert("Digite um valor válido.");
    }

    total = formatCurrencyBRL(total).replace("R$", ""); // formata o valor total para reais, removendo o símbolo "R$" do início da string

    result.textContent = `${total} Reais`; 

    footer.classList.add("show-result");

  } catch (error) { // caso ocorra algum erro, ele será capturado pelo bloco catch e exibido no console e em um alerta para o usuário

    console.log(error);

    footer.classList.remove("show-result");

    alert("Não foi possível converter.");
  }
}


function formatCurrencyBRL(value) { // função para formatar o valor em reais, usando a função toLocaleString para exibir o valor com duas casas decimais e o símbolo "R$" no início da string
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}