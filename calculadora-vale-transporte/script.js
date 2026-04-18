function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function calcular() {
  const salario = parseFloat(document.getElementById("salario").value) || 0;
  const custoMensal = parseFloat(document.getElementById("custoMensal").value) || 0;
  const limiteDesconto = salario * 0.06;
  const parteEmpregado = Math.min(custoMensal, limiteDesconto);
  const parteEmpresa = Math.max(0, custoMensal - parteEmpregado);

  document.getElementById("resumoTopoTitulo").innerText = "Desconto estimado do empregado";
  document.getElementById("resumoTopoValor").innerText = formatarMoeda(parteEmpregado);
  document.getElementById("resumoTopoTexto").innerText =
    "Estimativa simples do desconto de vale-transporte com base no limite de 6% do sal\u00e1rio bruto.";

  document.getElementById("limiteDesconto").innerText = formatarMoeda(limiteDesconto);
  document.getElementById("parteEmpregado").innerText = formatarMoeda(parteEmpregado);
  document.getElementById("parteEmpresa").innerText = formatarMoeda(parteEmpresa);
}

window.onload = function () {
  document.querySelectorAll("input").forEach((campo) => {
    campo.addEventListener("input", calcular);
  });
  calcular();
};
