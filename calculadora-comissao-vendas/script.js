function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function calcular() {

const valorVenda = parseFloat(document.getElementById("valorVenda").value) || 0;
const percentualComissao = parseFloat(document.getElementById("percentualComissao").value) || 0;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (valorVenda <= 0 || percentualComissao <= 0) {

resumoTopoTitulo.innerText = "Comissão da venda";
resumoTopoValor.innerText = "R$ 0,00";
resumoTopoTexto.innerText = "Informe valores válidos para calcular.";

return;

}

const valorComissao = valorVenda * (percentualComissao / 100);

resumoTopoTitulo.innerText = "Comissão da venda";
resumoTopoValor.innerText = "R$ " + formatarNumero(valorComissao);
resumoTopoTexto.innerText =
`Você receberá aproximadamente R$ ${formatarNumero(valorComissao)} de comissão.`;

}

window.onload = function () {

document.getElementById("valorVenda").addEventListener("input", calcular);
document.getElementById("percentualComissao").addEventListener("input", calcular);

calcular();

};