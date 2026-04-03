function formatarNumero(valor) {

return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits:2,
maximumFractionDigits:2
});

}

function calcular(){

const custo = parseFloat(document.getElementById("custo").value) || 0;
const markup = parseFloat(document.getElementById("markup").value) || 0;

const precoVenda = custo * (1 + markup/100);
const lucro = precoVenda - custo;

document.getElementById("precoVenda").innerText =
"R$ " + formatarNumero(precoVenda);

document.getElementById("lucro").innerText =
"R$ " + formatarNumero(lucro);

}

window.onload = function(){

document.getElementById("custo").addEventListener("input", calcular);
document.getElementById("markup").addEventListener("input", calcular);

calcular();

}