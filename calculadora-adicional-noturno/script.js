function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function calcular() {
  const valorHora = parseFloat(document.getElementById("valorHora").value) || 0;
  const horasNoturnas = parseFloat(document.getElementById("horasNoturnas").value) || 0;
  const percentual = parseFloat(document.getElementById("percentual").value) || 0;

  const adicionalPorHora = valorHora * (percentual / 100);
  const adicionalTotal = adicionalPorHora * horasNoturnas;
  const totalComHora = (valorHora * horasNoturnas) + adicionalTotal;

  document.getElementById("resumoTopoTitulo").innerText = "Adicional noturno estimado";
  document.getElementById("resumoTopoValor").innerText = formatarMoeda(adicionalTotal);
  document.getElementById("resumoTopoTexto").innerText =
    `Com ${horasNoturnas.toLocaleString("pt-BR")} horas noturnas, a remunera\u00e7\u00e3o total estimada para esse bloco \u00e9 ${formatarMoeda(totalComHora)}.`;
}

window.onload = function () {
  document.querySelectorAll("input").forEach((campo) => {
    campo.addEventListener("input", calcular);
  });
  calcular();
};
