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
    document.getElementById("resumoTopoTitulo").innerText = "Data estimada da ovula\u00e7\u00e3o";
    document.getElementById("resumoTopoValor").innerText = "-";
    document.getElementById("resumoTopoTexto").innerText = "Informe a data e o ciclo para calcular.";
    return;
  }

  const dataOvulacao = adicionarDias(dum, ciclo - 14);

  document.getElementById("resumoTopoTitulo").innerText = "Data estimada da ovula\u00e7\u00e3o";
  document.getElementById("resumoTopoValor").innerText = formatarData(dataOvulacao);
  document.getElementById("resumoTopoTexto").innerText =
    "Estimativa informativa baseada em ciclo regular. Varia\u00e7\u00f5es hormonais e ciclos irregulares podem mudar a data real.";
}

window.onload = function () {
  document.getElementById("dum").value = new Date().toISOString().slice(0, 10);
  document.querySelectorAll("input").forEach((campo) => {
    campo.addEventListener("input", calcular);
    campo.addEventListener("change", calcular);
  });
  calcular();
};
