function converterAnos() {
  const anos = Number(document.getElementById("anosEntrada").value);
  const meses = anos * 12;
  document.getElementById("resumoTopoValor").innerText = Number.isFinite(meses) ? meses.toLocaleString("pt-BR", { maximumFractionDigits: 4 }) : "-";
  document.getElementById("resumoTopoTexto").innerText = Number.isFinite(meses) ? "Cada ano corresponde a 12 meses." : "Informe uma quantidade de anos válida.";
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
  document.getElementById("anosEntrada").addEventListener("input", converterAnos);
  document.getElementById("anosEntrada").addEventListener("change", converterAnos);
  converterAnos();
};
