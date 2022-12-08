const selecao = document.querySelector(".moedas");
const url =
  "https://v6.exchangerate-api.com/v6/e0357f10f57e24b93db01382/latest/BRL";

const urlMoedaAndPais =
  "https://v6.exchangerate-api.com/v6/e0357f10f57e24b93db01382/codes";

interface ValorRecebido {
  base_code: String;
  conversion_rates: Object;
  documentation: String;
  result: String;
  terms_of_use: String;
  time_last_update_unix: Number;
  time_last_update_utc: String;
  time_next_update_unix: Number;
  time_next_update_utc: String;
}

async function moedas() {
  const response = await fetch(
    "https://v6.exchangerate-api.com/v6/e0357f10f57e24b93db01382/latest/BRL"
  );
  const dadosJson = await response.json();
  const tiposMoedas = await dadosJson.conversion_rates;

  //fetch dados da api que tras o comparativo da moeda brasileira com as demais

  const respostaPais = await fetch(urlMoedaAndPais);
  const respostaDadosPais = await respostaPais.json();
  const respostaDadosPaisValores = respostaDadosPais.supported_codes;
  //Essa api retorna um array de arrays, onde cada array contem o nome da moeda e seu pais

  //preenchendo a lista de países

  const areaPaises = document.querySelector(".accordion-body");

  if (areaPaises && respostaDadosPaisValores instanceof Array) {
    respostaDadosPaisValores.forEach((i) => {
      areaPaises.innerHTML += `
      
      <p>${i[1]} -- Moeda: ${i[0]}</p>
      
      
      `;
    });
  }
  console.log(respostaDadosPaisValores);

  // getDadosPais(respostaDadosPais);

  // console.log(respostaDadosPais);

  getDados(tiposMoedas);

  const selecionarConverter = document.querySelector(".converter");

  if (selecionarConverter instanceof HTMLButtonElement) {
    selecionarConverter.addEventListener("click", (e) => {
      e.preventDefault();
      const pegarValorInput = document.querySelector("input");
      const getSelect = document.querySelector("select");
      if (getSelect instanceof HTMLSelectElement) {
        const valorSelectComparacao = Object.keys(tiposMoedas);
        // Object.keys(tiposMoedas).forEach((item) => {
        //   console.log(item + " = " + tiposMoedas[item]);
        // });

        // if (valorSelectComparacao instanceof Array) {
        //   valorSelectComparacao.forEach((item) => {
        //     if (item === getSelect.value) {
        //     }
        //   });
        // }

        if (typeof tiposMoedas === "object") {
          for (const [key, value] of Object.entries(tiposMoedas)) {
            if (getSelect.value === key) {
              const conta = Number(pegarValorInput?.value) * Number(value);
              console.log(conta);
              const verificar = conta < 1 ? conta : conta.toFixed();

              const valorResposta = document.querySelector(".resposta");
              let paisCorrente = "";
              let moedaCorrente = "";
              if (valorResposta instanceof HTMLDivElement) {
                if (respostaDadosPaisValores instanceof Array) {
                  respostaDadosPaisValores.forEach((item) => {
                    if (item[0] === getSelect.value) {
                      paisCorrente = item[1];
                      moedaCorrente = item[0];
                      console.log(paisCorrente);
                    }
                  });
                }
                valorResposta.classList.add("animate__fadeInUp");
                valorResposta.innerText = `R$ ${pegarValorInput?.value} convertido equivale a ${verificar} de ${paisCorrente} (${moedaCorrente})`;
              }
            }
          }
        }
      }
      if (pegarValorInput instanceof HTMLInputElement) {
        console.log(tiposMoedas);
      }
    });
  }
}

function isVerificar(d: unknown): d is ValorRecebido {
  if (d && "base_code" in d && "result" in d) {
    return true;
  } else {
    return false;
  }
}

function getDados(dado: Object) {
  if (typeof dado === "object") {
    const moedasTipos = Object.keys(dado);
    console.log(moedasTipos);
    if (selecao instanceof HTMLSelectElement) {
      moedasTipos.forEach((item) => {
        selecao.innerHTML += `
                <option value="${item}">${item}</option>
        `;
      });
    }
  }
}

function getDadosPais(dado: Object) {
  if (typeof dado === "object") {
    console.log(dado);
  }
}

moedas();

//Acao de clique no botao de converter
