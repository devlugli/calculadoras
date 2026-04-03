function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function calcular(){

const capital = parseFloat(document.getElementById("capital").value) || 0;
const taxa = parseFloat(document.getElementById("taxa").value) || 0;
const tempo = parseFloat(document.getElementById("tempo").value) || 0;

const juros = capital * (taxa/100) * tempo;
const montante = capital + juros;

document.getElementById("valorJuros").innerText =
"R$ " + formatarNumero(juros);

document.getElementById("valorMontante").innerText =
"R$ " + formatarNumero(montante);

document.getElementById("resumoTopoTitulo").innerText =
"Resultado do cálculo";

}

window.onload = function(){

document.getElementById("capital").addEventListener("input", calcular);
document.getElementById("taxa").addEventListener("input", calcular);
document.getElementById("tempo").addEventListener("input", calcular);

calcular();

};