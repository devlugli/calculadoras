function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function calcular() {
  const valorDia = parseFloat(document.getElementById("valorDia").value) || 0;
  const dias = Math.max(0, parseInt(document.getElementById("dias").value, 10) || 0);
  const total = valorDia * dias;

  document.getElementById("resumoTopoTitulo").innerText = "Vale-refei\u00e7\u00e3o mensal estimado";
  document.getElementById("resumoTopoValor").innerText = formatarMoeda(total);
  document.getElementById("resumoTopoTexto").innerText =
    `Estimativa com ${dias} dia(s) no m\u00eas e ${formatarMoeda(valorDia)} por dia.`;
}

window.onload = function () {
  document.querySelectorAll("input").forEach((campo) => {
    campo.addEventListener("input", calcular);
  });
  calcular();
};
