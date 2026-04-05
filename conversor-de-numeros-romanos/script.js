function converterRomano() {
  const modo = document.getElementById("modoRomano").value;
  const valor = document.getElementById("valorRomano").value.trim();
  let resultado = "";
  let texto = "";

  if (modo === "decimal-romano") {
    resultado = decimalParaRomano(Number(valor));
    texto = resultado ? "Número convertido de decimal para romano." : "Informe um número inteiro entre 1 e 3999.";
  } else {
    const decimal = romanoParaDecimal(valor);
    resultado = decimal !== null ? String(decimal) : "";
    texto = resultado ? "Número convertido de romano para decimal." : "Informe um número romano válido.";
  }

  document.getElementById("resumoTopoValor").innerText = resultado || "-";
  document.getElementById("resumoTopoTexto").innerText = texto;
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
  document.getElementById("modoRomano").addEventListener("change", () => {
    document.getElementById("valorRomano").value = document.getElementById("modoRomano").value === "decimal-romano" ? "2026" : "MMXXVI";
    converterRomano();
  });
  document.getElementById("valorRomano").addEventListener("input", converterRomano);
  document.getElementById("valorRomano").addEventListener("change", converterRomano);
  converterRomano();
};
