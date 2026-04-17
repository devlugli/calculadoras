function formatarNumero(valor, casas = 1) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

function obterMultiplicador(ecc) {
  const mapa = { 1: 0.7, 2: 0.85, 3: 1, 4: 1.15, 5: 1.3 };
  return mapa[ecc];
}

function calcular() {
  const pesoAtual = parseFloat(document.getElementById("pesoAtual").value) || 0;
  const ecc = Number(document.getElementById("ecc").value);
  const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");

  resumoTopoTitulo.innerText = "Peso ideal estimado";

  if (pesoAtual <= 0) {
    resumoTopoValor.innerText = "0,0 kg";
    resumoTopoTexto.innerText = "Informe um peso atual maior que zero para calcular.";
    return;
  }

  const pesoIdeal = pesoAtual / obterMultiplicador(ecc);
  const diferenca = pesoAtual - pesoIdeal;
  resumoTopoValor.innerText = formatarNumero(pesoIdeal) + " kg";

  if (ecc === 3) {
    resumoTopoTexto.innerText = `Com esse escore corporal, o gato já está próximo da faixa ideal com cerca de ${formatarNumero(pesoAtual)} kg.`;
  } else if (ecc < 3) {
    resumoTopoTexto.innerText = `A estimativa indica que o peso ideal pode ficar em torno de ${formatarNumero(pesoIdeal)} kg, cerca de ${formatarNumero(Math.abs(diferenca))} kg acima do peso atual.`;
  } else {
    resumoTopoTexto.innerText = `A estimativa indica que o peso ideal pode ficar em torno de ${formatarNumero(pesoIdeal)} kg, cerca de ${formatarNumero(Math.abs(diferenca))} kg abaixo do peso atual.`;
  }
}

window.onload = function () {
  document.getElementById("pesoAtual").addEventListener("input", calcular);
  document.getElementById("ecc").addEventListener("change", calcular);
  calcular();
};
