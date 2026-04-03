function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function calcular() {
const sexo = document.getElementById("sexo").value;
const altura = parseFloat(document.getElementById("altura").value) || 0;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (altura <= 0) {
    resumoTopoTitulo.innerText = "Resultado do peso ideal";
    resumoTopoValor.innerText = "0,00";
    resumoTopoTexto.innerText = "Informe uma altura maior que zero para calcular.";
    return;
}

const imcReferencia = sexo === "homem" ? 22 : 21;

const pesoIdeal = imcReferencia * (altura * altura);
const pesoMinimo = 18.5 * (altura * altura);
const pesoMaximo = 24.9 * (altura * altura);

resumoTopoTitulo.innerText = "Resultado do peso ideal";
resumoTopoValor.innerText = formatarNumero(pesoIdeal) + " kg";
resumoTopoTexto.innerText =
`Para ${sexo === "homem" ? "homem" : "mulher"} com altura de ${formatarNumero(altura)} m, o peso ideal estimado é ${formatarNumero(pesoIdeal)} kg. A faixa de referência considerada normal vai de ${formatarNumero(pesoMinimo)} kg até ${formatarNumero(pesoMaximo)} kg.`;
}

window.onload = function () {
document.getElementById("sexo").addEventListener("change", calcular);
document.getElementById("altura").addEventListener("input", calcular);
calcular();
};