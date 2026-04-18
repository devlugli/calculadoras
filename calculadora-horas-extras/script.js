function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function calcular() {
  const valorHora = parseFloat(document.getElementById("valorHora").value) || 0;
  const horasExtras = parseFloat(document.getElementById("horasExtras").value) || 0;
  const adicional = parseFloat(document.getElementById("adicional").value) || 0;

  const valorHoraExtra = valorHora * (1 + adicional / 100);
  const total = valorHoraExtra * horasExtras;

  document.getElementById("resumoTopoTitulo").innerText = "Total de horas extras";
  document.getElementById("resumoTopoValor").innerText = formatarMoeda(total);
  document.getElementById("resumoTopoTexto").innerText =
    `Cada hora extra foi estimada em ${formatarMoeda(valorHoraExtra)} com adicional de ${adicional.toFixed(0)}%.`;
}

window.onload = function () {
  document.querySelectorAll("input, select").forEach((campo) => {
    campo.addEventListener("input", calcular);
    campo.addEventListener("change", calcular);
  });
  calcular();
};
