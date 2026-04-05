function converterNumero() {
  const valor = Number(document.getElementById("numeroEntrada").value);
  const texto = numeroPorExtenso(valor);
  document.getElementById("resumoTopoValor").innerText = Number.isFinite(valor) ? Math.trunc(valor).toLocaleString("pt-BR") : "-";
  document.getElementById("resumoTopoTexto").innerText = texto ? "Número convertido para texto por extenso." : "Informe um número válido para converter.";
  document.getElementById("resultadoExtenso").value = texto || "";
}

function copiarResultado() {
  const valor = document.getElementById("resultadoExtenso").value;
  if (!valor) {
    mostrarFeedbackCopia("copyFeedback", "Converta um número antes de copiar.");
    return;
  }
  copiarTextoComFallback(
    valor,
    () => mostrarFeedbackCopia("copyFeedback", "Copiado com sucesso."),
    () => mostrarFeedbackCopia("copyFeedback", "Não foi possível copiar automaticamente.")
  );
}

window.onload = function () {
  document.getElementById("numeroEntrada").addEventListener("input", converterNumero);
  document.getElementById("numeroEntrada").addEventListener("change", converterNumero);
  converterNumero();
};
