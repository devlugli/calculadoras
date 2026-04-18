function formatarHoras(valor) {
  const sinal = valor < 0 ? "-" : "";
  return `${sinal}${Math.abs(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })} h`;
}

function calcular() {
  const saldoAtual = parseFloat(document.getElementById("saldoAtual").value) || 0;
  const horasCreditadas = parseFloat(document.getElementById("horasCreditadas").value) || 0;
  const horasDebitada = parseFloat(document.getElementById("horasDebitada").value) || 0;
  const saldoFinal = saldoAtual + horasCreditadas - horasDebitada;

  document.getElementById("resumoTopoTitulo").innerText = "Novo saldo do banco";
  document.getElementById("resumoTopoValor").innerText = formatarHoras(saldoFinal);
  document.getElementById("resumoTopoTexto").innerText =
    saldoFinal >= 0
      ? "O saldo informado permanece positivo ap\u00f3s os ajustes."
      : "O saldo informado ficou negativo ap\u00f3s os ajustes.";
}

window.onload = function () {
  document.querySelectorAll("input").forEach((campo) => {
    campo.addEventListener("input", calcular);
  });
  calcular();
};
