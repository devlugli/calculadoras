function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function calcular() {

const salarioMensal = parseFloat(document.getElementById("salarioMensal").value) || 0;
const horasMes = parseFloat(document.getElementById("horasMes").value) || 0;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (salarioMensal <= 0 || horasMes <= 0) {
resumoTopoTitulo.innerText = "Valor da hora";
resumoTopoValor.innerText = "R$ 0,00";
resumoTopoTexto.innerText = "Informe valores válidos para calcular.";
return;
}

const valorHora = salarioMensal / horasMes;

resumoTopoTitulo.innerText = "Valor da hora";
resumoTopoValor.innerText = "R$ " + formatarNumero(valorHora);
resumoTopoTexto.innerText =
`Com salário de R$ ${formatarNumero(salarioMensal)} e ${formatarNumero(horasMes)} horas por mês, sua hora vale aproximadamente esse valor.`;

}

window.onload = function () {
document.getElementById("salarioMensal").addEventListener("input", calcular);
document.getElementById("horasMes").addEventListener("input", calcular);
calcular();
};