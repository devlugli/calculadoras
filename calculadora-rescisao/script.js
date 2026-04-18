function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function calcular() {
  const salario = parseFloat(document.getElementById("salario").value) || 0;
  const meses13 = Math.min(12, Math.max(0, parseInt(document.getElementById("meses13").value, 10) || 0));
  const mesesFerias = Math.min(12, Math.max(0, parseInt(document.getElementById("mesesFerias").value, 10) || 0));
  const fgtsSaldo = parseFloat(document.getElementById("fgtsSaldo").value) || 0;
  const avisoPrevio = parseInt(document.getElementById("avisoPrevio").value, 10) || 0;

  const valorAviso = salario * avisoPrevio;
  const valorDecimo = (salario / 12) * meses13;
  const valorFeriasBase = (salario / 12) * mesesFerias;
  const valorFerias = valorFeriasBase + (valorFeriasBase / 3);
  const valorMulta = fgtsSaldo * 0.4;
  const total = valorAviso + valorDecimo + valorFerias + valorMulta;

  document.getElementById("resumoTopoTitulo").innerText = "Estimativa de rescis\u00e3o";
  document.getElementById("resumoTopoValor").innerText = formatarMoeda(total);
  document.getElementById("resumoTopoTexto").innerText =
    "Valor informativo com base nos itens simulados. Outros eventos podem aumentar ou reduzir a rescis\u00e3o real.";

  document.getElementById("valorAviso").innerText = formatarMoeda(valorAviso);
  document.getElementById("valorDecimo").innerText = formatarMoeda(valorDecimo);
  document.getElementById("valorFerias").innerText = formatarMoeda(valorFerias);
  document.getElementById("valorMulta").innerText = formatarMoeda(valorMulta);
}

window.onload = function () {
  document.querySelectorAll("input, select").forEach((campo) => {
    campo.addEventListener("input", calcular);
    campo.addEventListener("change", calcular);
  });
  calcular();
};
