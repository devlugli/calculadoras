function converterDias() {
  const dias = Number(document.getElementById("diasEntrada").value);
  const horas = dias * 24;
  document.getElementById("resumoTopoValor").innerText = Number.isFinite(horas) ? horas.toLocaleString("pt-BR", { maximumFractionDigits: 4 }) : "-";
  document.getElementById("resumoTopoTexto").innerText = Number.isFinite(horas) ? "Cada dia corresponde a 24 horas." : "Informe uma quantidade de dias válida.";
}

function copiarResultado() {
  const valor = document.getElementById("resumoTopoValor").innerText;
  if (!valor || valor === "-") {
    mostrarFeedbackCopia("copyFeedback", "Converta um valor antes de copiar.");
    return;
  }
  copiarTextoComFallback(valor, () => mostrarFeedbackCopia("copyFeedback", "Copiado com sucesso."), () => mostrarFeedbackCopia("copyFeedback", "Não foi possível copiar automaticamente."));
}

window.onload = function () {
  document.getElementById("diasEntrada").addEventListener("input", converterDias);
  document.getElementById("diasEntrada").addEventListener("change", converterDias);
  converterDias();
};
