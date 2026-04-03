function formatar(valor){
return valor.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});
}

function calcular(){

let bruto = parseFloat(document.getElementById("salarioBruto").value) || 0;
let desconto = parseFloat(document.getElementById("descontos").value) || 0;

let liquido = bruto - (bruto * desconto/100);

document.getElementById("titulo").innerText = "Salário líquido";
document.getElementById("valor").innerText = "R$ " + formatar(liquido);
document.getElementById("texto").innerText = "Após descontos aproximados de " + desconto + "%.";

}

window.onload = function(){

document.getElementById("salarioBruto").addEventListener("input",calcular);
document.getElementById("descontos").addEventListener("input",calcular);

calcular();

}