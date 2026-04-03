function calcular(){

const hoje = new Date();

let ano = hoje.getFullYear();

let natal = new Date(ano,11,25);

if(hoje > natal){

natal = new Date(ano+1,11,25);

}

const diff = natal - hoje;

const dias = Math.ceil(diff / (1000*60*60*24));

document.getElementById("diasRestantes").innerText =
dias + " dias";

}

window.onload = calcular;