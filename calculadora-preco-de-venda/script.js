function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function calcular() {

const custoProduto = parseFloat(document.getElementById("custoProduto").value) || 0;
const margemLucro = parseFloat(document.getElementById("margemLucro").value) || 0;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (custoProduto <= 0) {

resumoTopoTitulo.innerText = "Preço de venda";
resumoTopoValor.innerText = "R$ 0,00";
resumoTopoTexto.innerText = "Informe um custo válido.";

return;

}

const precoVenda = custoProduto * (1 + margemLucro / 100);
const lucro = precoVenda - custoProduto;

resumoTopoTitulo.innerText = "Preço sugerido";
resumoTopoValor.innerText = "R$ " + formatarNumero(precoVenda);
resumoTopoTexto.innerText =
`Lucro estimado de R$ ${formatarNumero(lucro)} por unidade.`;

}

window.onload = function () {

document.getElementById("custoProduto").addEventListener("input", calcular);
document.getElementById("margemLucro").addEventListener("input", calcular);

calcular();

};