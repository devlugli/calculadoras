function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatarPercentual(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + "%";
}

function calcular() {
  const meta = parseFloat(document.getElementById("meta").value) || 0;
  const realizado = parseFloat(document.getElementById("realizado").value) || 0;
  const taxa = parseFloat(document.getElementById("taxa").value) || 0;
  const bonusMeta = parseFloat(document.getElementById("bonusMeta").value) || 0;
  const atingimento = meta > 0 ? (realizado / meta) * 100 : 0;
  const comissaoVariavel = realizado * (taxa / 100);
  const bonusFinal = atingimento >= 100 ? bonusMeta : 0;
  const total = comissaoVariavel + bonusFinal;

  document.getElementById("resumoTopoTitulo").innerText = "Comiss\u00e3o estimada";
  document.getElementById("resumoTopoValor").innerText = formatarMoeda(total);
  document.getElementById("resumoTopoTexto").innerText =
    atingimento >= 100
      ? "Meta atingida nesta simula\u00e7\u00e3o, com b\u00f4nus inclu\u00eddo."
      : "Meta ainda n\u00e3o atingida nesta simula\u00e7\u00e3o, sem b\u00f4nus adicional.";

  document.getElementById("atingimento").innerText = formatarPercentual(atingimento);
  document.getElementById("comissaoVariavel").innerText = formatarMoeda(comissaoVariavel);
  document.getElementById("bonusFinal").innerText = formatarMoeda(bonusFinal);
}

window.onload = function () {
  document.querySelectorAll("input").forEach((campo) => {
    campo.addEventListener("input", calcular);
  });
  calcular();
};
