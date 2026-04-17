function formatarNumero(valor, casas = 0) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

function obterFatorCat(fase, atividade) {
  const fatores = {
    filhote: { baixa: 2.0, moderada: 2.3, alta: 2.5 },
    adulto: { baixa: 1.0, moderada: 1.2, alta: 1.4 },
    idoso: { baixa: 0.9, moderada: 1.0, alta: 1.2 }
  };
  return fatores[fase][atividade];
}

function obterRefeicoesCat(fase) {
  return fase === "filhote" ? 3 : 2;
}

function calcular() {
  const peso = parseFloat(document.getElementById("peso").value) || 0;
  const fase = document.getElementById("fase").value;
  const atividade = document.getElementById("atividade").value;
  const kcalPorKg = parseFloat(document.getElementById("kcal").value) || 0;
  const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");

  resumoTopoTitulo.innerText = "Quantidade diária estimada";

  if (peso <= 0 || kcalPorKg <= 0) {
    resumoTopoValor.innerText = "0 g";
    resumoTopoTexto.innerText = "Informe peso e calorias da ração para calcular.";
    document.getElementById("gramasPorRefeicao").innerText = "0 g";
    document.getElementById("kcalDia").innerText = "0 kcal";
    document.getElementById("refeicoesDia").innerText = "0";
    return;
  }

  const rer = 70 * Math.pow(peso, 0.75);
  const fator = obterFatorCat(fase, atividade);
  const kcalDia = rer * fator;
  const gramasDia = kcalDia / (kcalPorKg / 1000);
  const refeicoes = obterRefeicoesCat(fase);
  const porRefeicao = gramasDia / refeicoes;

  resumoTopoValor.innerText = formatarNumero(gramasDia) + " g/dia";
  resumoTopoTexto.innerText = `Para um gato de ${formatarNumero(peso, 1)} kg, a estimativa diária é de ${formatarNumero(gramasDia)} g de ração, considerando ${atividade} atividade e fase ${fase}.`;
  document.getElementById("gramasPorRefeicao").innerText = formatarNumero(porRefeicao) + " g";
  document.getElementById("kcalDia").innerText = formatarNumero(kcalDia) + " kcal";
  document.getElementById("refeicoesDia").innerText = String(refeicoes);
}

window.onload = function () {
  ["peso", "fase", "atividade", "kcal"].forEach((id) => {
    document.getElementById(id).addEventListener("input", calcular);
    document.getElementById(id).addEventListener("change", calcular);
  });
  calcular();
};
