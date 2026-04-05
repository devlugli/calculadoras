function converterDecimal() {
  const decimal = Number(document.getElementById("decimalEntrada").value);
  const percentual = decimal * 100;
  document.getElementById("resumoTopoValor").innerText = Number.isFinite(percentual) ? `${percentual.toLocaleString("pt-BR", { maximumFractionDigits: 8 })}%` : "-";
  document.getElementById("resumoTopoTexto").innerText = Number.isFinite(percentual) ? "O valor decimal foi multiplicado por 100 para obter a porcentagem." : "Informe um valor decimal válido.";
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
  document.getElementById("decimalEntrada").addEventListener("input", converterDecimal);
  document.getElementById("decimalEntrada").addEventListener("change", converterDecimal);
  converterDecimal();
};
