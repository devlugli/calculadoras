function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function calcular() {

const custo = parseFloat(document.getElementById("custo").value) || 0;
const preco = parseFloat(document.getElementById("preco").value) || 0;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (custo <= 0 || preco <= 0 || preco <= custo) {

resumoTopoTitulo.innerText = "Resultado";
resumoTopoValor.innerText = "0%";
resumoTopoTexto.innerText =
"Informe valores válidos de custo e preço de venda.";

return;

}

const lucro = preco - custo;
const margem = (lucro / preco) * 100;

resumoTopoTitulo.innerText = "Margem de lucro";
resumoTopoValor.innerText = formatarNumero(margem) + "%";

resumoTopoTexto.innerText =
`O lucro é de R$ ${formatarNumero(lucro)} por unidade vendida.`;

}

window.onload = function () {

document.getElementById("custo").addEventListener("input", calcular);
document.getElementById("preco").addEventListener("input", calcular);

calcular();

};