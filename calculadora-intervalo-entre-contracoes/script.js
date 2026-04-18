function paraMinutos(valor) {
  const [hora, minuto] = valor.split(":").map(Number);
  return (hora * 60) + minuto;
}

function formatarIntervalo(minutos) {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  if (horas > 0) {
    return `${horas}h ${String(resto).padStart(2, "0")}min`;
  }
  return `${resto} min`;
}

function calcular() {
  const inicio1 = document.getElementById("inicio1").value;
  const inicio2 = document.getElementById("inicio2").value;
  const inicio3 = document.getElementById("inicio3").value;
  const duracao = Math.max(0, parseInt(document.getElementById("duracao").value, 10) || 0);

  if (!inicio1 || !inicio2 || !inicio3) {
    document.getElementById("resumoTopoTitulo").innerText = "Intervalo m\u00e9dio entre contra\u00e7\u00f5es";
    document.getElementById("resumoTopoValor").innerText = "-";
    document.getElementById("resumoTopoTexto").innerText = "Informe os hor\u00e1rios para calcular.";
    return;
  }

  const intervalos = [
    paraMinutos(inicio2) - paraMinutos(inicio1),
    paraMinutos(inicio3) - paraMinutos(inicio2)
  ].map((valor) => (valor < 0 ? valor + (24 * 60) : valor));

  const media = (intervalos[0] + intervalos[1]) / 2;

  document.getElementById("resumoTopoTitulo").innerText = "Intervalo m\u00e9dio entre contra\u00e7\u00f5es";
  document.getElementById("resumoTopoValor").innerText = formatarIntervalo(Math.round(media));
  document.getElementById("resumoTopoTexto").innerText =
    `A \u00faltima contra\u00e7\u00e3o foi informada com dura\u00e7\u00e3o de ${duracao} segundo(s). Use esta leitura apenas como apoio de anota\u00e7\u00e3o.`;
}

window.onload = function () {
  document.querySelectorAll("input").forEach((campo) => {
    campo.addEventListener("input", calcular);
    campo.addEventListener("change", calcular);
  });
  calcular();
};
