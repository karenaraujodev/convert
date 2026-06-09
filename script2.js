async function teste() { // função assíncrona para buscar a cotação do dólar
    const response = await fetch("https://v6.exchangerate-api.com/v6/4aaf41d6b6ff958554ca5fdc/latest/USD"); // faz a requisição para a API de cotação do dólar
    const data = await response.json(); // converte a resposta para JSON
    console.log(data); // exibe os dados da cotação no console
    console.log(data.conversion_rates.BRL); // usa uma propriedade do objeto data para exibir a cotação do dólar em reais
}
teste()