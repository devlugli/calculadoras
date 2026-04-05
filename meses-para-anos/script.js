function converterMeses() {
  const meses = Number(document.getElementById("mesesEntrada").value);
  const anos = meses / 12;
  const anosInteiros = Math.floor(meses / 12);
  const mesesRestantes = Math.round(meses % 12);

  document.getElementById("resumoTopoValor").innerText = Number.isFinite(anos) ? anos.toLocaleString("pt-BR", { maximumFractionDigits: 4 }) : "-";
  document.getElementById("resumoTopoTexto").innerText = Number.isFinite(anos)
    ? `Equivale a ${anosInteiros} ano(s) e ${mesesRestantes} mês(es).`
    : "Informe uma quantidade de meses válida.";
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
  document.getElementById("mesesEntrada").addEventListener("input", converterMeses);
  document.getElementById("mesesEntrada").addEventListener("change", converterMeses);
  converterMeses();
};
