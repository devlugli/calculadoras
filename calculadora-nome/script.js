function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}

function calcular(){

// SUBSTITUIR PELOS CAMPOS DA CALCULADORA

const valor1 = parseFloat(document.getElementById("valor1").value) || 0;
const valor2 = parseFloat(document.getElementById("valor2").value) || 0;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

const resultado = valor1 + valor2; // ALTERAR FÓRMULA

resumoTopoTitulo.innerText = "Resultado do cálculo";

resumoTopoValor.innerText = formatarNumero(resultado);

resumoTopoTexto.innerText =
`Resultado calculado automaticamente com base nos valores informados.`;

}

window.onload = function(){

document.querySelectorAll("input").forEach(input=>{
input.addEventListener("input", calcular);
});

calcular();

};
