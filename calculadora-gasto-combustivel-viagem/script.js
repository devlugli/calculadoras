function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function calcular() {

const distancia = parseFloat(document.getElementById("distancia").value) || 0;
const consumo = parseFloat(document.getElementById("consumo").value) || 0;
const precoCombustivel = parseFloat(document.getElementById("precoCombustivel").value) || 0;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (distancia <= 0 || consumo <= 0 || precoCombustivel <= 0) {
resumoTopoTitulo.innerText = "Gasto estimado";
resumoTopoValor.innerText = "R$ 0,00";
resumoTopoTexto.innerText = "Informe valores válidos para calcular.";
return;
}

const litrosNecessarios = distancia / consumo;
const custoTotal = litrosNecessarios * precoCombustivel;

resumoTopoTitulo.innerText = "Gasto estimado";
resumoTopoValor.innerText = "R$ " + formatarNumero(custoTotal);
resumoTopoTexto.innerText =
`Você vai precisar de aproximadamente ${formatarNumero(litrosNecessarios)} litros de combustível para percorrer ${formatarNumero(distancia)} km.`;

}

window.onload = function () {
document.getElementById("distancia").addEventListener("input", calcular);
document.getElementById("consumo").addEventListener("input", calcular);
document.getElementById("precoCombustivel").addEventListener("input", calcular);
calcular();
};