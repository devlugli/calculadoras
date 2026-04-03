function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function calcular() {

const valorFinal = parseFloat(document.getElementById("valorFinal").value) || 0;
const percentual = parseFloat(document.getElementById("percentual").value) || 0;
const tipo = document.getElementById("tipo").value;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (valorFinal <= 0 || percentual < 0) {
resumoTopoTitulo.innerText = "Valor original";
resumoTopoValor.innerText = "R$ 0,00";
resumoTopoTexto.innerText = "Informe valores válidos para calcular.";
return;
}

let valorOriginal = 0;

if (tipo === "desconto") {
if (percentual >= 100) {
resumoTopoTitulo.innerText = "Valor original";
resumoTopoValor.innerText = "R$ 0,00";
resumoTopoTexto.innerText = "O desconto deve ser menor que 100%.";
return;
}
valorOriginal = valorFinal / (1 - percentual / 100);
} else {
valorOriginal = valorFinal / (1 + percentual / 100);
}

resumoTopoTitulo.innerText = "Valor original";
resumoTopoValor.innerText = "R$ " + formatarNumero(valorOriginal);

if (tipo === "desconto") {
resumoTopoTexto.innerText =
`Antes do desconto de ${formatarNumero(percentual)}%, o valor era aproximadamente R$ ${formatarNumero(valorOriginal)}.`;
} else {
resumoTopoTexto.innerText =
`Antes do aumento de ${formatarNumero(percentual)}%, o valor era aproximadamente R$ ${formatarNumero(valorOriginal)}.`;
}

}

window.onload = function () {
document.getElementById("valorFinal").addEventListener("input", calcular);
document.getElementById("percentual").addEventListener("input", calcular);
document.getElementById("tipo").addEventListener("change", calcular);
calcular();
};