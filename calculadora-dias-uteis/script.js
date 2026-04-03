function calcular() {

const inicio = new Date(document.getElementById("dataInicio").value);
const fim = new Date(document.getElementById("dataFim").value);

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (!inicio || !fim || inicio > fim) {

resumoTopoTitulo.innerText = "Resultado";
resumoTopoValor.innerText = "-";
resumoTopoTexto.innerText = "Informe um intervalo de datas válido.";

return;

}

let diasUteis = 0;
let diasTotais = 0;

let dataAtual = new Date(inicio);

while (dataAtual <= fim) {

const diaSemana = dataAtual.getDay();

if (diaSemana !== 0 && diaSemana !== 6) {
diasUteis++;
}

diasTotais++;

dataAtual.setDate(dataAtual.getDate() + 1);

}

resumoTopoTitulo.innerText = "Dias úteis no período";
resumoTopoValor.innerText = diasUteis;

resumoTopoTexto.innerText =
`Entre as datas informadas existem ${diasUteis} dias úteis em um total de ${diasTotais} dias.`;

}

window.onload = function () {

document.getElementById("dataInicio").addEventListener("input", calcular);
document.getElementById("dataFim").addEventListener("input", calcular);

};