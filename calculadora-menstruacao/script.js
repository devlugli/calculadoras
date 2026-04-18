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
    document.getElementById("resumoTopoTitulo").innerText = "Pr\u00f3xima menstrua\u00e7\u00e3o estimada";
    document.getElementById("resumoTopoValor").innerText = "-";
    document.getElementById("resumoTopoTexto").innerText = "Informe a data e o ciclo para calcular.";
    document.getElementById("proximo1").innerText = "-";
    document.getElementById("proximo2").innerText = "-";
    document.getElementById("proximo3").innerText = "-";
    return;
  }

  const proximo1 = adicionarDias(dum, ciclo);
  const proximo2 = adicionarDias(dum, ciclo * 2);
  const proximo3 = adicionarDias(dum, ciclo * 3);

  document.getElementById("resumoTopoTitulo").innerText = "Pr\u00f3xima menstrua\u00e7\u00e3o estimada";
  document.getElementById("resumoTopoValor").innerText = formatarData(proximo1);
  document.getElementById("resumoTopoTexto").innerText =
    "Previs\u00f5es informativas para ciclos regulares com base no intervalo informado.";

  document.getElementById("proximo1").innerText = formatarData(proximo1);
  document.getElementById("proximo2").innerText = formatarData(proximo2);
  document.getElementById("proximo3").innerText = formatarData(proximo3);
}

window.onload = function () {
  document.getElementById("dum").value = new Date().toISOString().slice(0, 10);
  document.querySelectorAll("input").forEach((campo) => {
    campo.addEventListener("input", calcular);
    campo.addEventListener("change", calcular);
  });
  calcular();
};
