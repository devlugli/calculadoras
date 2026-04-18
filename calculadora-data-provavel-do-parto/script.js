function adicionarDias(dataTexto, dias) {
  const data = new Date(dataTexto + "T12:00:00");
  data.setDate(data.getDate() + dias);
  return data;
}

function formatarData(data) {
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

function calcular() {
  const dum = document.getElementById("dum").value;

  if (!dum) {
    document.getElementById("resumoTopoTitulo").innerText = "Data prov\u00e1vel do parto";
    document.getElementById("resumoTopoValor").innerText = "-";
    document.getElementById("resumoTopoTexto").innerText = "Informe a DUM para calcular a previs\u00e3o.";
    return;
  }

  const dataParto = adicionarDias(dum, 280);

  document.getElementById("resumoTopoTitulo").innerText = "Data prov\u00e1vel do parto";
  document.getElementById("resumoTopoValor").innerText = formatarData(dataParto);
  document.getElementById("resumoTopoTexto").innerText =
    "Estimativa informativa baseada em 280 dias a partir da DUM. O acompanhamento profissional pode usar outra data\u00e7\u00e3o.";
}

window.onload = function () {
  document.getElementById("dum").value = new Date(Date.now() - (10 * 7 * 86400000)).toISOString().slice(0, 10);
  document.getElementById("dum").addEventListener("change", calcular);
  calcular();
};
