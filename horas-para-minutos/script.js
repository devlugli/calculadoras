function converterHoras() {
  const horas = Number(document.getElementById("horasEntrada").value);
  const minutos = horas * 60;
  document.getElementById("resumoTopoValor").innerText = Number.isFinite(minutos) ? minutos.toLocaleString("pt-BR", { maximumFractionDigits: 4 }) : "-";
  document.getElementById("resumoTopoTexto").innerText = Number.isFinite(minutos) ? "Cada hora corresponde a 60 minutos." : "Informe uma quantidade de horas válida.";
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
  document.getElementById("horasEntrada").addEventListener("input", converterHoras);
  document.getElementById("horasEntrada").addEventListener("change", converterHoras);
  converterHoras();
};
