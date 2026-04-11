function atualizarResumoMeses(meses) {
  const anos = meses / 12;
  const anosInteiros = Math.floor(meses / 12);
  const mesesRestantes = Math.round(meses % 12);
  const leitura = anosInteiros > 0
    ? `${anosInteiros} ano${anosInteiros === 1 ? "" : "s"} e ${mesesRestantes} mes${mesesRestantes === 1 ? "" : "es"}`
    : `${mesesRestantes} mes${mesesRestantes === 1 ? "" : "es"}`;

  document.getElementById("resumoTopoValor").innerText = Number.isFinite(anos)
    ? anos.toLocaleString("pt-BR", { maximumFractionDigits: 4 })
    : "-";
  document.getElementById("resumoTopoTexto").innerText = Number.isFinite(anos)
    ? `Equivale a ${anosInteiros} ano(s) e ${mesesRestantes} mes(es).`
    : "Informe uma quantidade de meses valida.";

  document.getElementById("anosInteirosValor").innerText = Number.isFinite(anos) ? anosInteiros : "-";
  document.getElementById("mesesRestantesValor").innerText = Number.isFinite(anos) ? mesesRestantes : "-";
  document.getElementById("mesesLeituraRapida").innerText = Number.isFinite(anos) ? leitura : "-";
}

function converterMeses() {
  const meses = Number(document.getElementById("mesesEntrada").value);

  if (!Number.isFinite(meses) || meses < 0) {
    document.getElementById("resumoTopoValor").innerText = "-";
    document.getElementById("resumoTopoTexto").innerText = "Informe uma quantidade de meses valida.";
    document.getElementById("anosInteirosValor").innerText = "-";
    document.getElementById("mesesRestantesValor").innerText = "-";
    document.getElementById("mesesLeituraRapida").innerText = "-";
    return;
  }

  atualizarResumoMeses(meses);
}

function aplicarExemploMeses(valor) {
  document.getElementById("mesesEntrada").value = valor;
  converterMeses();
}

function copiarResultado() {
  const valor = document.getElementById("mesesLeituraRapida").innerText;
  if (!valor || valor === "-") {
    mostrarFeedbackCopia("copyFeedback", "Converta um valor antes de copiar.");
    return;
  }
  copiarTextoComFallback(
    valor,
    () => mostrarFeedbackCopia("copyFeedback", "Copiado com sucesso."),
    () => mostrarFeedbackCopia("copyFeedback", "Nao foi possivel copiar automaticamente.")
  );
}

window.onload = function () {
  document.getElementById("mesesEntrada").addEventListener("input", converterMeses);
  document.getElementById("mesesEntrada").addEventListener("change", converterMeses);
  converterMeses();
};
