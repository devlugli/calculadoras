function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function classificarIMC(imc) {
if (imc < 18.5) return "Baixo peso";
if (imc < 25) return "Peso normal";
if (imc < 30) return "Sobrepeso";
if (imc < 35) return "Obesidade grau 1";
if (imc < 40) return "Obesidade grau 2";
return "Obesidade grau 3";
}

function calcular() {
const peso = parseFloat(document.getElementById("peso").value) || 0;
const altura = parseFloat(document.getElementById("altura").value) || 0;


const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (peso <= 0 || altura <= 0) {
    resumoTopoTitulo.innerText = "Resultado do IMC";
    resumoTopoValor.innerText = "0,00";
    resumoTopoTexto.innerText = "Informe peso e altura maiores que zero para calcular.";
    return;
}

const imc = peso / (altura * altura);
const classificacao = classificarIMC(imc);
marcarLinhaIMC(imc);

resumoTopoTitulo.innerText = "Resultado do IMC";
resumoTopoValor.innerText = formatarNumero(imc);
resumoTopoTexto.innerText =
`Seu IMC é ${formatarNumero(imc)}, classificado como ${classificacao}.`;



}

window.onload = function () {
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
