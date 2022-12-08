"use strict";
const selecao = document.querySelector(".moedas");
const url = "https://v6.exchangerate-api.com/v6/e0357f10f57e24b93db01382/latest/BRL";
const urlMoedaAndPais = "https://v6.exchangerate-api.com/v6/e0357f10f57e24b93db01382/codes";
async function moedas() {
    const response = await fetch("https://v6.exchangerate-api.com/v6/e0357f10f57e24b93db01382/latest/BRL");
    const dadosJson = await response.json();
    const tiposMoedas = await dadosJson.conversion_rates;
    const respostaPais = await fetch(urlMoedaAndPais);
    const respostaDadosPais = await respostaPais.json();
    const respostaDadosPaisValores = respostaDadosPais.supported_codes;
    const areaPaises = document.querySelector(".accordion-body");
    if (areaPaises && respostaDadosPaisValores instanceof Array) {
        respostaDadosPaisValores.forEach((i) => {
            areaPaises.innerHTML += `
      
      <p>${i[1]} -- Moeda: ${i[0]}</p>
      
      
      `;
        });
    }
    console.log(respostaDadosPaisValores);
    getDados(tiposMoedas);
    const selecionarConverter = document.querySelector(".converter");
    if (selecionarConverter instanceof HTMLButtonElement) {
        selecionarConverter.addEventListener("click", (e) => {
            e.preventDefault();
            const pegarValorInput = document.querySelector("input");
            const getSelect = document.querySelector("select");
            if (getSelect instanceof HTMLSelectElement) {
                const valorSelectComparacao = Object.keys(tiposMoedas);
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
function isVerificar(d) {
    if (d && "base_code" in d && "result" in d) {
        return true;
    }
    else {
        return false;
    }
}
function getDados(dado) {
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
function getDadosPais(dado) {
    if (typeof dado === "object") {
        console.log(dado);
    }
}
moedas();
//# sourceMappingURL=script.js.map