function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function classificarIMCInfantil(imc) {
if (imc < 14) return "Abaixo da referência geral";
if (imc < 18) return "Faixa intermediária";
if (imc < 22) return "Acima da referência geral";
return "Bem acima da referência geral";
}

function calcular() {
const idade = parseFloat(document.getElementById("idade").value) || 0;
const sexo = document.getElementById("sexo").value;
const peso = parseFloat(document.getElementById("peso").value) || 0;
const altura = parseFloat(document.getElementById("altura").value) || 0;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (idade <= 0 || peso <= 0 || altura <= 0) {
    resumoTopoTitulo.innerText = "Resultado do IMC infantil";
    resumoTopoValor.innerText = "0,00";
    resumoTopoTexto.innerText = "Informe idade, peso e altura maiores que zero para calcular.";
    limparMarcacaoTabela();
    return;
}

const imc = peso / (altura * altura);
const classificacao = classificarIMCInfantil(imc);

marcarLinhaIMC(imc);

resumoTopoTitulo.innerText = "Resultado do IMC infantil";
resumoTopoValor.innerText = formatarNumero(imc);
resumoTopoTexto.innerText =
`Para ${sexo === "menino" ? "menino" : "menina"} de ${idade} ano(s), o IMC calculado é ${formatarNumero(imc)}, com leitura inicial de ${classificacao}.`;
}

window.onload = function () {
document.getElementById("idade").addEventListener("input", calcular);
document.getElementById("sexo").addEventListener("change", calcular);
document.getElementById("peso").addEventListener("input", calcular);
document.getElementById("altura").addEventListener("input", calcular);
calcular();
};

function marcarLinhaIMC(imc){

const linhas = document.querySelectorAll("#tabelaIMC tr");

linhas.forEach(linha=>{

const min = linha.getAttribute("data-min");
const max = linha.getAttribute("data-max");

linha.classList.remove("ativo");

if(min && max){

if(imc >= min && imc < max){

linha.classList.add("ativo");

}

}

});

}

function limparMarcacaoTabela() {
const linhas = document.querySelectorAll("#tabelaIMC tr");
linhas.forEach(linha => linha.classList.remove("ativo"));
}