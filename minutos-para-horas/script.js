function converterMinutos() {
  const minutos = Number(document.getElementById("minutosEntrada").value);
  const horas = minutos / 60;
  const horasInteiras = Math.floor(minutos / 60);
  const minutosRestantes = Math.round(minutos % 60);

  document.getElementById("resumoTopoValor").innerText = Number.isFinite(horas) ? horas.toLocaleString("pt-BR", { maximumFractionDigits: 4 }) : "-";
  document.getElementById("resumoTopoTexto").innerText = Number.isFinite(horas)
    ? `Equivale a ${horasInteiras} hora(s) e ${minutosRestantes} minuto(s).`
    : "Informe uma quantidade de minutos válida.";
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
  document.getElementById("minutosEntrada").addEventListener("input", converterMinutos);
  document.getElementById("minutosEntrada").addEventListener("change", converterMinutos);
  converterMinutos();
};
