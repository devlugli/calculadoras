function formatarNumero(valor) {
return Number(valor).toLocaleString("pt-BR", {
minimumFractionDigits: 1,
maximumFractionDigits: 1
});
}

function calcularIdadeHumana(idadeCachorro) {
if (idadeCachorro <= 0) return 0;
if (idadeCachorro <= 1) return idadeCachorro * 15;
if (idadeCachorro <= 2) return 15 + ((idadeCachorro - 1) * 9);
return 24 + ((idadeCachorro - 2) * 4);
}

function calcular() {
const idade = parseFloat(document.getElementById("idade").value) || 0;

const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
const resumoTopoValor = document.getElementById("resumoTopoValor");
const resumoTopoTexto = document.getElementById("resumoTopoTexto");

if (idade <= 0) {
    resumoTopoTitulo.innerText = "Resultado da idade humana";
    resumoTopoValor.innerText = "0,0";
    resumoTopoTexto.innerText = "Informe uma idade maior que zero para calcular.";
    limparMarcacaoTabela();
    return;
}

const idadeHumana = calcularIdadeHumana(idade);

marcarLinhaTabela(idade);

resumoTopoTitulo.innerText = "Resultado da idade humana";
resumoTopoValor.innerText = formatarNumero(idadeHumana) + " anos";
resumoTopoTexto.innerText =
`Para um cachorro com ${formatarNumero(idade)} ano(s), a equivalência aproximada é de ${formatarNumero(idadeHumana)} anos humanos.`;
}

window.onload = function () {
document.getElementById("idade").addEventListener("input", calcular);
calcular();
};

function marcarLinhaTabela(valor){

const linhas = document.querySelectorAll("#tabelaIdadeCachorro tr");

linhas.forEach(linha=>{

const min = linha.getAttribute("data-min");
const max = linha.getAttribute("data-max");

linha.classList.remove("ativo");

if(min && max){

if(valor >= min && valor < max){

linha.classList.add("ativo");

}

}

});

}

function limparMarcacaoTabela() {
const linhas = document.querySelectorAll("#tabelaIdadeCachorro tr");
linhas.forEach(linha => linha.classList.remove("ativo"));
}