function calcular() {

const horaInicial = document.getElementById("horaInicial").value;
const horaFinal = document.getElementById("horaFinal").value;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (!horaInicial || !horaFinal) {
resumoTopoTitulo.innerText = "Diferença de tempo";
resumoTopoValor.innerText = "0h 00min";
resumoTopoTexto.innerText = "Informe horários válidos para calcular.";
return;
}

const [h1, m1] = horaInicial.split(":").map(Number);
const [h2, m2] = horaFinal.split(":").map(Number);

let minutosInicial = h1 * 60 + m1;
let minutosFinal = h2 * 60 + m2;

if (minutosFinal < minutosInicial) {
minutosFinal += 24 * 60;
}

const diferenca = minutosFinal - minutosInicial;
const horas = Math.floor(diferenca / 60);
const minutos = diferenca % 60;

resumoTopoTitulo.innerText = "Diferença de tempo";
resumoTopoValor.innerText = horas + "h " + String(minutos).padStart(2, "0") + "min";
resumoTopoTexto.innerText =
`Entre ${horaInicial} e ${horaFinal} existem ${horas} horas e ${minutos} minutos.`;

}

window.onload = function () {
document.getElementById("horaInicial").addEventListener("input", calcular);
document.getElementById("horaFinal").addEventListener("input", calcular);
calcular();
};