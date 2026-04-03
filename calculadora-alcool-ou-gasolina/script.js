function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function calcular() {

const alcool = parseFloat(document.getElementById("alcool").value) || 0;
const gasolina = parseFloat(document.getElementById("gasolina").value) || 0;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (alcool <= 0 || gasolina <= 0) {

resumoTopoTitulo.innerText = "Comparação de combustíveis";
resumoTopoValor.innerText = "0,00";
resumoTopoTexto.innerText =
"Informe preços válidos de álcool e gasolina para calcular.";

return;

}

const relacao = alcool / gasolina;

resumoTopoTitulo.innerText = "Relação Álcool / Gasolina";
resumoTopoValor.innerText = formatarNumero(relacao);

if (relacao < 0.7) {

resumoTopoTexto.innerText =
"O álcool compensa mais. Ele custa menos que 70% do preço da gasolina.";

} else {

resumoTopoTexto.innerText =
"A gasolina compensa mais, pois o preço do álcool está acima de 70%.";

}

}

window.onload = function () {

document.getElementById("alcool").addEventListener("input", calcular);
document.getElementById("gasolina").addEventListener("input", calcular);

calcular();

};