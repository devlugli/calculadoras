function formatarNumero(valor, casas = 0) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

function calcular() {
  const sexo = document.getElementById("sexo").value;
  const idade = parseFloat(document.getElementById("idade").value) || 0;
  const peso = parseFloat(document.getElementById("peso").value) || 0;
  const altura = parseFloat(document.getElementById("altura").value) || 0;
  const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");

  resumoTopoTitulo.innerText = "Resultado da TMB";

  if (idade <= 0 || peso <= 0 || altura <= 0) {
    resumoTopoValor.innerText = "0 kcal/dia";
    resumoTopoTexto.innerText = "Informe idade, peso e altura válidos para calcular.";
    return;
  }

  const tmb = sexo === "homem"
    ? (10 * peso) + (6.25 * altura) - (5 * idade) + 5
    : (10 * peso) + (6.25 * altura) - (5 * idade) - 161;

  resumoTopoValor.innerText = formatarNumero(tmb) + " kcal/dia";
  resumoTopoTexto.innerText = `Sua taxa metabólica basal estimada é de ${formatarNumero(tmb)} kcal por dia. Esse valor representa o gasto energético em repouso para manter funções vitais.`;
}

window.onload = function () {
  ["sexo", "idade", "peso", "altura"].forEach((id) => {
    document.getElementById(id).addEventListener("input", calcular);
    document.getElementById(id).addEventListener("change", calcular);
  });
  calcular();
};
