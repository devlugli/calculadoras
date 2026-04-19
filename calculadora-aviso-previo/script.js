function moeda(valor) {
  return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function calcular() {
  const salario = parseFloat(document.getElementById("salario").value) || 0;
  const anos = Math.max(0, parseInt(document.getElementById("anosCompletos").value, 10) || 0);
  const dias = Math.min(90, 30 + (anos * 3));
  const valorDia = salario / 30;
  const valor = valorDia * dias;
  document.getElementById("resumoTopoValor").innerText = moeda(valor);
  document.getElementById("resumoTopoTexto").innerText = `Estimativa para aviso-prévio proporcional de ${dias} dia(s).`;
  document.getElementById("diasAviso").innerText = String(dias);
  document.getElementById("valorDia").innerText = moeda(valorDia);
  document.getElementById("leitura").innerText = `${dias} dia(s)`;
}

window.onload = function () {
  document.querySelectorAll("input").forEach(function (campo) { campo.addEventListener("input", calcular); });
  calcular();
};
