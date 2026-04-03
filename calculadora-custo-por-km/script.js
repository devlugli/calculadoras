function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function calcular() {

const precoCombustivel = parseFloat(document.getElementById("precoCombustivel").value) || 0;
const consumo = parseFloat(document.getElementById("consumo").value) || 0;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (precoCombustivel <= 0 || consumo <= 0) {
resumoTopoTitulo.innerText = "Custo por quilômetro";
resumoTopoValor.innerText = "R$ 0,00";
resumoTopoTexto.innerText = "Informe valores válidos para calcular.";
return;
}

const custoPorKm = precoCombustivel / consumo;

resumoTopoTitulo.innerText = "Custo por quilômetro";
resumoTopoValor.innerText = "R$ " + formatarNumero(custoPorKm);
resumoTopoTexto.innerText =
`Seu carro gasta aproximadamente R$ ${formatarNumero(custoPorKm)} em combustível para rodar 1 km.`;

}

window.onload = function () {
document.getElementById("precoCombustivel").addEventListener("input", calcular);
document.getElementById("consumo").addEventListener("input", calcular);
calcular();
};