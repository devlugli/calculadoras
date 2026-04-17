function formatarLeituraRapida(anosInteiros, mesesRestantes) {
  if (anosInteiros > 0 && mesesRestantes > 0) {
    return `${anosInteiros} ano${anosInteiros === 1 ? "" : "s"} e ${mesesRestantes} mes${mesesRestantes === 1 ? "" : "es"}`;
  }

  if (anosInteiros > 0) {
    return `${anosInteiros} ano${anosInteiros === 1 ? "" : "s"}`;
  }

  return `${mesesRestantes} mes${mesesRestantes === 1 ? "" : "es"}`;
}

function atualizarResumoMeses(meses) {
  const anos = meses / 12;
  const anosInteiros = Math.floor(meses / 12);
  const mesesRestantes = Math.round(meses % 12);
  const leitura = formatarLeituraRapida(anosInteiros, mesesRestantes);

  document.getElementById("resumoTopoValor").innerText = Number.isFinite(anos)
    ? anos.toLocaleString("pt-BR", { maximumFractionDigits: 4 })
    : "-";
  document.getElementById("resumoTopoTexto").innerText = Number.isFinite(anos)
    ? `${meses} mes${meses === 1 ? "" : "es"} equivalem a ${leitura}.`
    : "Informe uma quantidade de meses válida.";

  document.getElementById("anosInteirosValor").innerText = Number.isFinite(anos) ? anosInteiros : "-";
  document.getElementById("mesesRestantesValor").innerText = Number.isFinite(anos) ? mesesRestantes : "-";
  document.getElementById("mesesLeituraRapida").innerText = Number.isFinite(anos) ? leitura : "-";
}

function converterMeses() {
  const meses = Number(document.getElementById("mesesEntrada").value);

  if (!Number.isFinite(meses) || meses < 0) {
    document.getElementById("resumoTopoValor").innerText = "-";
    document.getElementById("resumoTopoTexto").innerText = "Informe uma quantidade de meses válida.";
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
    () => mostrarFeedbackCopia("copyFeedback", "Não foi possível copiar automaticamente.")
  );
}

window.onload = function () {
  document.getElementById("mesesEntrada").addEventListener("input", converterMeses);
  document.getElementById("mesesEntrada").addEventListener("change", converterMeses);
  converterMeses();
};