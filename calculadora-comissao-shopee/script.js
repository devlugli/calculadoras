const TAXA_SHOPEE_BASE = 18;
const AJUSTE_FRETE_GRATIS = 4;

function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function aplicarExemplo(preco, freteGratis) {
  document.getElementById("precoProduto").value = preco;
  document.getElementById("participaFreteGratis").value = freteGratis;
  calcular();
}

function calcular() {
  const precoProduto = parseFloat(document.getElementById("precoProduto").value) || 0;
  const participaFreteGratis = document.getElementById("participaFreteGratis").value;
  const percentualTotalTaxas = TAXA_SHOPEE_BASE + (participaFreteGratis === "sim" ? AJUSTE_FRETE_GRATIS : 0);

  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");
  const totalTaxas = document.getElementById("totalTaxas");
  const totalTaxasTexto = document.getElementById("totalTaxasTexto");
  const percentualTotal = document.getElementById("percentualTotal");
  const percentualTotalTexto = document.getElementById("percentualTotalTexto");
  const leituraRapida = document.getElementById("leituraRapida");
  const leituraRapidaTexto = document.getElementById("leituraRapidaTexto");

  if (precoProduto <= 0) {
    resumoTopoValor.innerText = "R$ 0,00";
    resumoTopoTexto.innerText = "Informe um preço válido para ver as taxas estimadas.";
    totalTaxas.innerText = "R$ 0,00";
    totalTaxasTexto.innerText = "Soma aproximada de comissão, serviço e pagamento.";
    percentualTotal.innerText = "0,00%";
    percentualTotalTexto.innerText = "Base de 18% mais ajuste estimado de frete grátis quando aplicável.";
    leituraRapida.innerText = "-";
    leituraRapidaTexto.innerText = "Resumo simples para comparar o efeito do frete grátis.";
    return;
  }

  const valorTaxas = precoProduto * (percentualTotalTaxas / 100);
  const valorLiquido = precoProduto - valorTaxas;

  resumoTopoValor.innerText = "R$ " + formatarNumero(valorLiquido);
  resumoTopoTexto.innerText =
    participaFreteGratis === "sim"
      ? `Com frete grátis, a taxa total estimada sobe para ${formatarNumero(percentualTotalTaxas)}% e deixa R$ ${formatarNumero(valorLiquido)} líquidos.`
      : `Sem frete grátis, a taxa total estimada fica em ${formatarNumero(percentualTotalTaxas)}% e deixa R$ ${formatarNumero(valorLiquido)} líquidos.`;

  totalTaxas.innerText = "R$ " + formatarNumero(valorTaxas);
  totalTaxasTexto.innerText = `Estimativa aplicada sobre um preço de R$ ${formatarNumero(precoProduto)}.`;

  percentualTotal.innerText = formatarNumero(percentualTotalTaxas) + "%";
  percentualTotalTexto.innerText =
    participaFreteGratis === "sim"
      ? `18% de base + ${formatarNumero(AJUSTE_FRETE_GRATIS)} pontos percentuais estimados do programa de frete grátis.`
      : "18% de base considerando comissão, serviço e pagamento.";

  leituraRapida.innerText = "Recebe " + formatarNumero((valorLiquido / precoProduto) * 100) + "%";
  leituraRapidaTexto.innerText = `Sobram R$ ${formatarNumero(valorLiquido)} líquidos em cada venda de R$ ${formatarNumero(precoProduto)}.`;
}

window.onload = function () {
  document.getElementById("precoProduto").addEventListener("input", calcular);
  document.getElementById("participaFreteGratis").addEventListener("change", calcular);
  calcular();
};
