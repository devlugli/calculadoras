function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

function calcularTmb(sexo, idade, peso, altura) {
  return sexo === "homem"
    ? (10 * peso) + (6.25 * altura) - (5 * idade) + 5
    : (10 * peso) + (6.25 * altura) - (5 * idade) - 161;
}

function calcular() {
  const sexo = document.getElementById("sexo").value;
  const idade = parseFloat(document.getElementById("idade").value) || 0;
  const peso = parseFloat(document.getElementById("peso").value) || 0;
  const altura = parseFloat(document.getElementById("altura").value) || 0;
  const atividade = parseFloat(document.getElementById("atividade").value) || 0;
  const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");

  resumoTopoTitulo.innerText = "Calorias para manutenção";

  if (idade <= 0 || peso <= 0 || altura <= 0 || atividade <= 0) {
    resumoTopoValor.innerText = "0 kcal";
    resumoTopoTexto.innerText = "Informe idade, peso, altura e atividade para calcular.";
    document.getElementById("caloriasManutencao").innerText = "0 kcal";
    document.getElementById("caloriasDeficit").innerText = "0 kcal";
    document.getElementById("caloriasSuperavit").innerText = "0 kcal";
    return;
  }

  const tmb = calcularTmb(sexo, idade, peso, altura);
  const manutencao = tmb * atividade;
  const deficit = manutencao - 400;
  const superavit = manutencao + 300;

  resumoTopoValor.innerText = formatarNumero(manutencao) + " kcal/dia";
  resumoTopoTexto.innerText = `Sua estimativa de calorias para manutenção é de ${formatarNumero(manutencao)} kcal por dia. A partir desse valor, você pode ajustar déficit ou superávit conforme o objetivo.`;
  document.getElementById("caloriasManutencao").innerText = formatarNumero(manutencao) + " kcal";
  document.getElementById("caloriasDeficit").innerText = formatarNumero(deficit) + " kcal";
  document.getElementById("caloriasSuperavit").innerText = formatarNumero(superavit) + " kcal";
}

window.onload = function () {
  ["sexo", "idade", "peso", "altura", "atividade"].forEach((id) => {
    document.getElementById(id).addEventListener("input", calcular);
    document.getElementById(id).addEventListener("change", calcular);
  });
  calcular();
};
