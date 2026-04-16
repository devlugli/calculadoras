const TAXAS_MARKETPLACE = {
  mercado_livre: {
    classico: 11,
    premium: 16
  },
  shopee: {
    base: 18,
    freteGratis: 4
  }
};

const AJUSTES_ML = {
  geral: 0,
  moda: 1,
  beleza: 0.5,
  casa: 0.5,
  eletronicos: -1
};

function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function atualizarCamposMarketplace() {
  const marketplace = document.getElementById("marketplace").value;
  const campoTipoAnuncio = document.getElementById("campoTipoAnuncio");
  const campoCategoriaMl = document.getElementById("campoCategoriaMl");
  const campoFreteGratisShopee = document.getElementById("campoFreteGratisShopee");
  const isMercadoLivre = marketplace === "mercado_livre";

  campoTipoAnuncio.hidden = !isMercadoLivre;
  campoCategoriaMl.hidden = !isMercadoLivre;
  campoFreteGratisShopee.hidden = isMercadoLivre;
}

function obterPercentualMarketplace() {
  const marketplace = document.getElementById("marketplace").value;

  if (marketplace === "mercado_livre") {
    const tipoAnuncioMl = document.getElementById("tipoAnuncioMl").value;
    const categoriaMl = document.getElementById("categoriaMl").value;
    return (TAXAS_MARKETPLACE.mercado_livre[tipoAnuncioMl] || 16) + (AJUSTES_ML[categoriaMl] || 0);
  }

  const freteGratisShopee = document.getElementById("freteGratisShopee").value;
  return TAXAS_MARKETPLACE.shopee.base + (freteGratisShopee === "sim" ? TAXAS_MARKETPLACE.shopee.freteGratis : 0);
}

function aplicarValores(config) {
  document.getElementById("marketplace").value = config.marketplace;
  document.getElementById("precoVenda").value = config.precoVenda;
  document.getElementById("custoProduto").value = config.custoProduto;
  document.getElementById("tipoAnuncioMl").value = config.tipoAnuncioMl || "premium";
  document.getElementById("categoriaMl").value = config.categoriaMl || "geral";
  document.getElementById("freteGratisShopee").value = config.freteGratisShopee || "nao";
  document.getElementById("freteVendedor").value = config.freteVendedor;
  document.getElementById("custoEmbalagem").value = config.custoEmbalagem;
  document.getElementById("imposto").value = config.imposto;
  atualizarCamposMarketplace();
  calcular();
}

function aplicarExemploMl() {
  aplicarValores({
    marketplace: "mercado_livre",
    precoVenda: 100,
    custoProduto: 40,
    tipoAnuncioMl: "premium",
    categoriaMl: "geral",
    freteVendedor: 12,
    custoEmbalagem: 2,
    imposto: 0
  });
}

function aplicarExemploShopee() {
  aplicarValores({
    marketplace: "shopee",
    precoVenda: 100,
    custoProduto: 40,
    freteGratisShopee: "sim",
    freteVendedor: 8,
    custoEmbalagem: 2,
    imposto: 0
  });
}

function aplicarExemploEnxuto() {
  aplicarValores({
    marketplace: "mercado_livre",
    precoVenda: 79.9,
    custoProduto: 42,
    tipoAnuncioMl: "premium",
    categoriaMl: "moda",
    freteVendedor: 10,
    custoEmbalagem: 2.5,
    imposto: 3
  });
}

function calcular() {
  const marketplace = document.getElementById("marketplace").value;
  const precoVenda = parseFloat(document.getElementById("precoVenda").value) || 0;
  const custoProduto = parseFloat(document.getElementById("custoProduto").value) || 0;
  const freteVendedor = parseFloat(document.getElementById("freteVendedor").value) || 0;
  const custoEmbalagem = parseFloat(document.getElementById("custoEmbalagem").value) || 0;
  const imposto = parseFloat(document.getElementById("imposto").value) || 0;

  const percentualMarketplace = obterPercentualMarketplace();
  const custoMarketplace = precoVenda * (percentualMarketplace / 100);
  const valorLiquido = precoVenda - custoMarketplace;
  const lucroFinal = precoVenda - custoProduto - custoMarketplace - freteVendedor - custoEmbalagem - imposto;
  const margemFinal = precoVenda > 0 ? (lucroFinal / precoVenda) * 100 : 0;

  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");
  const margemFinalEl = document.getElementById("margemFinal");
  const margemFinalTexto = document.getElementById("margemFinalTexto");
  const valorLiquidoRecebido = document.getElementById("valorLiquidoRecebido");
  const valorLiquidoRecebidoTexto = document.getElementById("valorLiquidoRecebidoTexto");
  const taxasMarketplace = document.getElementById("taxasMarketplace");
  const taxasMarketplaceTexto = document.getElementById("taxasMarketplaceTexto");

  if (precoVenda <= 0 || custoProduto < 0) {
    resumoTopoValor.innerText = "R$ 0,00";
    resumoTopoTexto.innerText = "Informe um preço de venda válido para simular o lucro.";
    margemFinalEl.innerText = "0,00%";
    margemFinalTexto.innerText = "Lucro dividido pelo preço de venda.";
    valorLiquidoRecebido.innerText = "R$ 0,00";
    valorLiquidoRecebidoTexto.innerText = "Preço menos taxas do marketplace.";
    taxasMarketplace.innerText = "R$ 0,00";
    taxasMarketplaceTexto.innerText = "Custo aproximado cobrado pela plataforma escolhida.";
    return;
  }

  resumoTopoValor.innerText = "R$ " + formatarNumero(lucroFinal);
  resumoTopoTexto.innerText =
    lucroFinal >= 0
      ? `Na ${marketplace === "mercado_livre" ? "Mercado Livre" : "Shopee"}, sua venda deixa aproximadamente R$ ${formatarNumero(lucroFinal)} de lucro após todos os custos.`
      : `Na ${marketplace === "mercado_livre" ? "Mercado Livre" : "Shopee"}, este cenário gera prejuízo aproximado de R$ ${formatarNumero(Math.abs(lucroFinal))}.`;

  margemFinalEl.innerText = formatarNumero(margemFinal) + "%";
  margemFinalTexto.innerText =
    lucroFinal >= 0
      ? `A margem final da venda fica em ${formatarNumero(margemFinal)}% sobre o preço de venda.`
      : `A margem ficou negativa em ${formatarNumero(margemFinal)}%, o que indica venda no prejuízo.`;

  valorLiquidoRecebido.innerText = "R$ " + formatarNumero(valorLiquido);
  valorLiquidoRecebidoTexto.innerText = `Valor recebido depois de ${formatarNumero(percentualMarketplace)}% em taxas estimadas do marketplace.`;

  taxasMarketplace.innerText = "R$ " + formatarNumero(custoMarketplace);
  taxasMarketplaceTexto.innerText = `A plataforma consome cerca de R$ ${formatarNumero(custoMarketplace)} nesta venda de R$ ${formatarNumero(precoVenda)}.`;
}

window.onload = function () {
  const configuracoes = [
    { id: "marketplace", evento: "change", extra: atualizarCamposMarketplace },
    { id: "precoVenda", evento: "input" },
    { id: "custoProduto", evento: "input" },
    { id: "tipoAnuncioMl", evento: "change" },
    { id: "categoriaMl", evento: "change" },
    { id: "freteGratisShopee", evento: "change" },
    { id: "freteVendedor", evento: "input" },
    { id: "custoEmbalagem", evento: "input" },
    { id: "imposto", evento: "input" }
  ];

  configuracoes.forEach((config) => {
    const elemento = document.getElementById(config.id);
    elemento.addEventListener(config.evento, () => {
      if (config.extra) {
        config.extra();
      }
      calcular();
    });
  });

  atualizarCamposMarketplace();
  calcular();
};
