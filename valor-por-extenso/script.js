function converterValor() {
  const valor = Number(document.getElementById("valorEntrada").value);
  const texto = valorPorExtenso(valor);
  document.getElementById("resumoTopoValor").innerText = Number.isFinite(valor) ? `R$ ${formatarNumeroBR(valor, 2)}` : "-";
  document.getElementById("resumoTopoTexto").innerText = texto ? "Valor monetário convertido para texto por extenso." : "Informe um valor válido para converter.";
  document.getElementById("resultadoValorExtenso").value = texto || "";
}

function copiarResultado() {
  const valor = document.getElementById("resultadoValorExtenso").value;
  if (!valor) {
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
  document.getElementById("valorEntrada").addEventListener("input", converterValor);
  document.getElementById("valorEntrada").addEventListener("change", converterValor);
  converterValor();
};
