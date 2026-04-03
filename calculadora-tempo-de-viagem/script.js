function calcular() {

const distancia = parseFloat(document.getElementById("distancia").value) || 0;
const velocidade = parseFloat(document.getElementById("velocidade").value) || 0;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (distancia <= 0 || velocidade <= 0) {
resumoTopoTitulo.innerText = "Tempo estimado";
resumoTopoValor.innerText = "0h 00min";
resumoTopoTexto.innerText = "Informe valores válidos para calcular.";
return;
}

const tempoHoras = distancia / velocidade;
const horas = Math.floor(tempoHoras);
const minutos = Math.round((tempoHoras - horas) * 60);

resumoTopoTitulo.innerText = "Tempo estimado";
resumoTopoValor.innerText = horas + "h " + String(minutos).padStart(2, "0") + "min";
resumoTopoTexto.innerText =
`Uma viagem de ${distancia.toLocaleString("pt-BR")} km a ${velocidade.toLocaleString("pt-BR")} km/h leva aproximadamente esse tempo.`;

}

window.onload = function () {
document.getElementById("distancia").addEventListener("input", calcular);
document.getElementById("velocidade").addEventListener("input", calcular);
calcular();
};