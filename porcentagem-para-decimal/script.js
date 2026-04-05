function converterPercentual() {
  const percentual = Number(document.getElementById("percentualEntrada").value);
  const decimal = percentual / 100;
  document.getElementById("resumoTopoValor").innerText = Number.isFinite(decimal) ? decimal.toLocaleString("pt-BR", { maximumFractionDigits: 8 }) : "-";
  document.getElementById("resumoTopoTexto").innerText = Number.isFinite(decimal) ? "A porcentagem foi dividida por 100 para obter o valor decimal." : "Informe uma porcentagem válida.";
}

function copiarResultado() {
  const valor = document.getElementById("resumoTopoValor").innerText;
  if (!valor || valor === "-") {
    mostrarFeedbackCopia("copyFeedback", "Converta um valor antes de copiar.");
    return;
  }
  copiarTextoComFallback(
    valor,
    () => mostrarFeedbackCopia("copyFeedback", "Copiado com sucesso."),
    () => mostrarFeedbackCopia("copyFeedback", "Não foi possível copiar automaticamente.")
  );
}

window.onload = function () {
  document.getElementById("percentualEntrada").addEventListener("input", converterPercentual);
  document.getElementById("percentualEntrada").addEventListener("change", converterPercentual);
  converterPercentual();
};
