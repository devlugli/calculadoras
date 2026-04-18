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
  const ciclo = Math.max(21, parseInt(document.getElementById("ciclo").value, 10) || 28);

  if (!dum) {
    document.getElementById("resumoTopoTitulo").innerText = "Per\u00edodo f\u00e9rtil estimado";
    document.getElementById("resumoTopoValor").innerText = "-";
    document.getElementById("resumoTopoTexto").innerText = "Informe a data e o ciclo para calcular.";
    return;
  }

  const diaOvulacao = adicionarDias(dum, ciclo - 14);
  const inicio = adicionarDias(dum, (ciclo - 14) - 5);
  const fim = adicionarDias(dum, (ciclo - 14) + 1);

  document.getElementById("resumoTopoTitulo").innerText = "Per\u00edodo f\u00e9rtil estimado";
  document.getElementById("resumoTopoValor").innerText = `${formatarData(inicio)} at\u00e9 ${formatarData(fim)}`;
  document.getElementById("resumoTopoTexto").innerText =
    `A ovula\u00e7\u00e3o estimada neste ciclo cai em ${formatarData(diaOvulacao)}. Use esta janela apenas como refer\u00eancia informativa.`;
}

window.onload = function () {
  document.getElementById("dum").value = new Date().toISOString().slice(0, 10);
  document.querySelectorAll("input").forEach((campo) => {
    campo.addEventListener("input", calcular);
    campo.addEventListener("change", calcular);
  });
  calcular();
};
