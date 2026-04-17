function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });
}

function calcularIdadeHumana(idadeGato) {
  if (idadeGato <= 0) return 0;
  if (idadeGato <= 1) return idadeGato * 15;
  if (idadeGato <= 2) return 15 + ((idadeGato - 1) * 9);
  return 24 + ((idadeGato - 2) * 4);
}

function obterFaseDeVida(idadeGato) {
  if (idadeGato < 1) return "filhote";
  if (idadeGato < 7) return "adulto";
  if (idadeGato < 11) return "maduro";
  return "sênior";
}

function marcarLinhaTabela(valor) {
  const linhas = document.querySelectorAll("#tabelaIdadeGato tr");
  linhas.forEach((linha) => {
    const min = linha.getAttribute("data-min");
    const max = linha.getAttribute("data-max");
    linha.classList.remove("ativo");
    if (min && max && valor >= Number(min) && valor < Number(max)) {
      linha.classList.add("ativo");
    }
  });
}

function limparMarcacaoTabela() {
  const linhas = document.querySelectorAll("#tabelaIdadeGato tr");
  linhas.forEach((linha) => linha.classList.remove("ativo"));
}

function calcular() {
  const idade = parseFloat(document.getElementById("idade").value) || 0;
  const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");

  resumoTopoTitulo.innerText = "Resultado da idade humana";

  if (idade <= 0) {
    resumoTopoValor.innerText = "0,0";
    resumoTopoTexto.innerText = "Informe uma idade maior que zero para calcular.";
    limparMarcacaoTabela();
    return;
  }

  const idadeHumana = calcularIdadeHumana(idade);
  const fase = obterFaseDeVida(idade);

  marcarLinhaTabela(idade);
  resumoTopoValor.innerText = formatarNumero(idadeHumana) + " anos";
  resumoTopoTexto.innerText = `Para um gato com ${formatarNumero(idade)} ano(s), a equivalência aproximada é de ${formatarNumero(idadeHumana)} anos humanos. A fase de vida mais próxima é ${fase}.`;
}

window.onload = function () {
  document.getElementById("idade").addEventListener("input", calcular);
  calcular();
};
