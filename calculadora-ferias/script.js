function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function calcular() {
  const salario = parseFloat(document.getElementById("salario").value) || 0;
  const diasGozo = Math.min(30, Math.max(1, parseInt(document.getElementById("diasGozo").value, 10) || 30));
  const diasAbono = Math.min(10, Math.max(0, parseInt(document.getElementById("diasAbono").value, 10) || 0));

  const valorDia = salario / 30;
  const feriasBase = valorDia * diasGozo;
  const tercoConstitucional = feriasBase / 3;
  const abonoBase = valorDia * diasAbono;
  const abonoPecuniario = abonoBase + (abonoBase / 3);
  const total = feriasBase + tercoConstitucional + abonoPecuniario;

  document.getElementById("resumoTopoTitulo").innerText = "Valor estimado de f\u00e9rias";
  document.getElementById("resumoTopoValor").innerText = formatarMoeda(total);
  document.getElementById("resumoTopoTexto").innerText =
    "Estimativa com base nos dias informados. Descontos e adicionais reais podem alterar o valor pago.";

  document.getElementById("feriasBase").innerText = formatarMoeda(feriasBase);
  document.getElementById("tercoConstitucional").innerText = formatarMoeda(tercoConstitucional);
  document.getElementById("abonoPecuniario").innerText = formatarMoeda(abonoPecuniario);
}

window.onload = function () {
  document.querySelectorAll("input").forEach((campo) => {
    campo.addEventListener("input", calcular);
  });
  calcular();
};
