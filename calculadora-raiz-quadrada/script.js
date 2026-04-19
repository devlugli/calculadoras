function fmt(valor) {
  return Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 6 });
}

function calcular() {
  const numero = parseFloat(document.getElementById("numero").value);
  if (!Number.isFinite(numero) || numero < 0) {
    document.getElementById("resumoTopoValor").innerText = "-";
    document.getElementById("resumoTopoTexto").innerText = "Informe um numero valido maior ou igual a zero.";
    document.getElementById("conferencia").innerText = "-";
    document.getElementById("quadradoPerfeito").innerText = "-";
    document.getElementById("inteiroProximo").innerText = "-";
    return;
  }
  const raiz = Math.sqrt(numero);
  const inteiro = Math.round(raiz);
  document.getElementById("resumoTopoValor").innerText = fmt(raiz);
  document.getElementById("resumoTopoTexto").innerText = `A raiz quadrada de ${fmt(numero)} é aproximadamente ${fmt(raiz)}.`;
  document.getElementById("conferencia").innerText = fmt(raiz * raiz);
  document.getElementById("quadradoPerfeito").innerText = Number.isInteger(raiz) ? "Sim" : "Nao";
  document.getElementById("inteiroProximo").innerText = String(inteiro);
}

window.onload = function () {
  document.getElementById("numero").addEventListener("input", calcular);
  calcular();
};
