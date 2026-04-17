function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

function obterDistribuicao(objetivo) {
  if (objetivo === "emagrecimento") {
    return { proteina: 0.35, carbo: 0.35, gordura: 0.30 };
  }
  if (objetivo === "ganho") {
    return { proteina: 0.25, carbo: 0.50, gordura: 0.25 };
  }
  return { proteina: 0.30, carbo: 0.40, gordura: 0.30 };
}

function calcular() {
  const calorias = parseFloat(document.getElementById("calorias").value) || 0;
  const objetivo = document.getElementById("objetivo").value;
  const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");

  resumoTopoTitulo.innerText = "Distribuição diária de macros";

  if (calorias <= 0) {
    resumoTopoValor.innerText = "0 kcal";
    resumoTopoTexto.innerText = "Informe um valor de calorias maior que zero para calcular.";
    document.getElementById("proteinas").innerText = "0 g";
    document.getElementById("carboidratos").innerText = "0 g";
    document.getElementById("gorduras").innerText = "0 g";
    return;
  }

  const distribuicao = obterDistribuicao(objetivo);
  const proteinas = (calorias * distribuicao.proteina) / 4;
  const carboidratos = (calorias * distribuicao.carbo) / 4;
  const gorduras = (calorias * distribuicao.gordura) / 9;

  resumoTopoValor.innerText = formatarNumero(calorias) + " kcal";
  resumoTopoTexto.innerText = `Para ${formatarNumero(calorias)} kcal por dia, a divisão estimada para ${objetivo} fica em proteínas, carboidratos e gorduras distribuídos em gramas por dia.`;
  document.getElementById("proteinas").innerText = formatarNumero(proteinas) + " g";
  document.getElementById("carboidratos").innerText = formatarNumero(carboidratos) + " g";
  document.getElementById("gorduras").innerText = formatarNumero(gorduras) + " g";
}

window.onload = function () {
  document.getElementById("calorias").addEventListener("input", calcular);
  document.getElementById("objetivo").addEventListener("change", calcular);
  calcular();
};
