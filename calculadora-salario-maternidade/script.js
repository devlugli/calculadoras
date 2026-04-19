function moeda(valor) {
  return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function calcular() {
  const tipo = document.getElementById("tipoSegurada").value;
  const renda = parseFloat(document.getElementById("rendaMensal").value) || 0;
  const meses = Math.max(1, parseInt(document.getElementById("mesesBeneficio").value, 10) || 4);
  let mensal = renda;

  if (tipo === "mei") {
    mensal = Math.max(renda, 1621);
  }

  document.getElementById("resumoTopoValor").innerText = moeda(mensal);
  document.getElementById("resumoTopoTexto").innerText = `Projeção informativa para ${meses} mes(es) de benefício.`;
  document.getElementById("totalBeneficio").innerText = moeda(mensal * meses);
  document.getElementById("tipoConsiderado").innerText = document.getElementById("tipoSegurada").selectedOptions[0].text;
}

window.onload = function () {
  document.querySelectorAll("input, select").forEach(function (campo) {
    campo.addEventListener("input", calcular);
    campo.addEventListener("change", calcular);
  });
  calcular();
};
