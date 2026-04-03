function formatar(valor){
return valor.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});
}

function calcular(){

let salario = parseFloat(document.getElementById("salario").value) || 0;
let meses = parseInt(document.getElementById("meses").value) || 0;

let decimo = (salario/12) * meses;

document.getElementById("titulo").innerText = "Valor estimado do 13º salário";
document.getElementById("valor").innerText = "R$ " + formatar(decimo);
document.getElementById("texto").innerText = "Considerando " + meses + " meses trabalhados.";

}

window.onload = function(){

document.getElementById("salario").addEventListener("input",calcular);
document.getElementById("meses").addEventListener("input",calcular);

calcular();

}