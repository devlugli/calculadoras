function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function calcular() {
  const salario = parseFloat(document.getElementById("salario").value) || 0;
  const encargos = parseFloat(document.getElementById("encargos").value) || 0;
  const beneficios = parseFloat(document.getElementById("beneficios").value) || 0;
  const encargosMensais = salario * (encargos / 100);
  const custoMensal = salario + encargosMensais + beneficios;
  const custoAnual = custoMensal * 12;

  document.getElementById("resumoTopoTitulo").innerText = "Custo mensal estimado";
  document.getElementById("resumoTopoValor").innerText = formatarMoeda(custoMensal);
  document.getElementById("resumoTopoTexto").innerText =
    "Estimativa simplificada para planejamento. Encargos efetivos podem variar por regime, conven\u00e7\u00e3o e eventos de folha.";

  document.getElementById("encargosMensais").innerText = formatarMoeda(encargosMensais);
  document.getElementById("beneficiosMensais").innerText = formatarMoeda(beneficios);
  document.getElementById("custoAnual").innerText = formatarMoeda(custoAnual);
}

window.onload = function () {
  document.querySelectorAll("input").forEach((campo) => {
    campo.addEventListener("input", calcular);
  });
  calcular();
};
