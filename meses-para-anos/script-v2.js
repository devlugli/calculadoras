function formatarLeituraRapida(anosInteiros, mesesRestantes) {
  if (anosInteiros > 0 && mesesRestantes > 0) {
    return `${anosInteiros} ano${anosInteiros === 1 ? "" : "s"} e ${mesesRestantes} m${mesesRestantes === 1 ? "\u00eas" : "eses"}`;
  }

  if (anosInteiros > 0) {
    return `${anosInteiros} ano${anosInteiros === 1 ? "" : "s"}`;
  }

  return `${mesesRestantes} m${mesesRestantes === 1 ? "\u00eas" : "eses"}`;
}

function atualizarResumoMeses(meses) {
  const anos = meses / 12;
  const anosInteiros = Math.floor(meses / 12);
  const mesesRestantes = Math.round(meses % 12);
  const leitura = formatarLeituraRapida(anosInteiros, mesesRestantes);
  const anosFormatados = anos.toLocaleString("pt-BR", { maximumFractionDigits: 4 });

  document.getElementById("resumoTopoValor").innerText = Number.isFinite(anos)
    ? `${anosFormatados} ano(s)`
    : "-";
  document.getElementById("resumoTopoTexto").innerText = Number.isFinite(anos)
    ? "Veja o resultado em formato decimal e tamb\u00e9m em leitura pr\u00e1tica para comparar prazos do dia a dia."
    : "Informe uma quantidade de meses v\u00e1lida.";

  document.getElementById("anosInteirosValor").innerText = Number.isFinite(anos) ? anosInteiros : "-";
  document.getElementById("mesesRestantesValor").innerText = Number.isFinite(anos) ? mesesRestantes : "-";
  document.getElementById("mesesLeituraRapida").innerText = Number.isFinite(anos) ? leitura : "-";
}
function converterMeses() {
  const campo = document.getElementById("mesesEntrada");
  const meses = Math.floor(Number(campo.value));

  if (!Number.isFinite(meses) || meses < 0) {
    document.getElementById("resumoTopoValor").innerText = "-";
    document.getElementById("resumoTopoTexto").innerText = "Informe uma quantidade de meses válida.";
    document.getElementById("anosInteirosValor").innerText = "-";
    document.getElementById("mesesRestantesValor").innerText = "-";
    document.getElementById("mesesLeituraRapida").innerText = "-";
    return;
  }

  campo.value = meses;
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
    () => mostrarFeedbackCopia("copyFeedback", "N\u00e3o foi poss\u00edvel copiar automaticamente.")
  );
}

window.onload = function () {
  const campoMeses = document.getElementById("mesesEntrada");
  if (!campoMeses) {
    return;
  }

  campoMeses.addEventListener("input", converterMeses);
  campoMeses.addEventListener("change", converterMeses);
  converterMeses();
};
