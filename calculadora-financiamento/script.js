function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function calcular() {

const valorFinanciado = parseFloat(document.getElementById("valorFinanciado").value) || 0;
const taxaJuros = parseFloat(document.getElementById("taxaJuros").value) || 0;
const parcelas = parseInt(document.getElementById("parcelas").value) || 0;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

const valorTotalPago = document.getElementById("valorTotalPago");
const valorTotalJuros = document.getElementById("valorTotalJuros");

if (valorFinanciado <= 0 || taxaJuros < 0 || parcelas <= 0) {
resumoTopoTitulo.innerText = "Valor da parcela";
resumoTopoValor.innerText = "R$ 0,00";
resumoTopoTexto.innerText = "Informe valores válidos para calcular.";
valorTotalPago.innerText = "R$ 0,00";
valorTotalJuros.innerText = "R$ 0,00";
return;
}

const i = taxaJuros / 100;

let parcela = 0;

if (i === 0) {
parcela = valorFinanciado / parcelas;
} else {
parcela = valorFinanciado * (i * Math.pow(1 + i, parcelas)) / (Math.pow(1 + i, parcelas) - 1);
}

const totalPago = parcela * parcelas;
const totalJuros = totalPago - valorFinanciado;

resumoTopoTitulo.innerText = "Valor estimado da parcela";
resumoTopoValor.innerText = "R$ " + formatarNumero(parcela);
resumoTopoTexto.innerText =
`Em ${parcelas} parcelas, você pagará aproximadamente R$ ${formatarNumero(totalPago)} no total.`;

valorTotalPago.innerText = "R$ " + formatarNumero(totalPago);
valorTotalJuros.innerText = "R$ " + formatarNumero(totalJuros);

}

window.onload = function () {

document.getElementById("valorFinanciado").addEventListener("input", calcular);
document.getElementById("taxaJuros").addEventListener("input", calcular);
document.getElementById("parcelas").addEventListener("input", calcular);

calcular();

};