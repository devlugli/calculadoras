function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function calcular() {

const valorInicial = parseFloat(document.getElementById("valorInicial").value) || 0;
const valorFinal = parseFloat(document.getElementById("valorFinal").value) || 0;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (valorInicial <= 0 || valorFinal <= 0) {

resumoTopoTitulo.innerText = "Resultado";
resumoTopoValor.innerText = "0%";
resumoTopoTexto.innerText =
"Informe valores válidos para calcular.";

return;

}

const aumento = valorFinal - valorInicial;
const percentual = (aumento / valorInicial) * 100;

resumoTopoTitulo.innerText = "Aumento percentual";
resumoTopoValor.innerText = formatarNumero(percentual) + "%";

resumoTopoTexto.innerText =
`O valor aumentou ${formatarNumero(aumento)} em relação ao valor inicial.`;

}

window.onload = function () {

document.getElementById("valorInicial").addEventListener("input", calcular);
document.getElementById("valorFinal").addEventListener("input", calcular);

calcular();

};