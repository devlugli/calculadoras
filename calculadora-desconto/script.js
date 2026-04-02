function formatarNumero(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function calcular() {

const valorOriginal = parseFloat(document.getElementById("valorOriginal").value) || 0;
const percentual = parseFloat(document.getElementById("percentualDesconto").value) || 0;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (valorOriginal <= 0) {
resumoTopoTitulo.innerText = "Resultado";
resumoTopoValor.innerText = "-";
resumoTopoTexto.innerText = "Informe um preço válido.";
return;
}

const valorDesconto = (valorOriginal * percentual) / 100;
const precoFinal = valorOriginal - valorDesconto;

resumoTopoTitulo.innerText = "Preço com desconto";
resumoTopoValor.innerText = "R$ " + formatarNumero(precoFinal);

resumoTopoTexto.innerText =
`Desconto de ${formatarNumero(percentual)}% equivale a R$ ${formatarNumero(valorDesconto)}.`;

}

window.onload = function () {

document.getElementById("valorOriginal").addEventListener("input", calcular);
document.getElementById("percentualDesconto").addEventListener("input", calcular);

calcular();

};