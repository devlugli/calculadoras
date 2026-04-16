const TAXAS_MERCADO_LIVRE = {
  classico: { nome: "Clássico", percentual: 11 },
  premium: { nome: "Premium", percentual: 16 }
};

const AJUSTES_CATEGORIA = {
  geral: { nome: "Geral", ajuste: 0 },
  moda: { nome: "Moda e acessórios", ajuste: 1 },
  beleza: { nome: "Beleza e cuidados pessoais", ajuste: 0.5 },
  casa: { nome: "Casa, móveis e decoração", ajuste: 0.5 },
  eletronicos: { nome: "Eletrônicos e informática", ajuste: -1 }
};

function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function aplicarExemplo(preco, tipo, categoria) {
  document.getElementById("precoProduto").value = preco;
  document.getElementById("tipoAnuncio").value = tipo;
  document.getElementById("categoria").value = categoria;
  calcular();
}

function calcular() {
  const precoProduto = parseFloat(document.getElementById("precoProduto").value) || 0;
  const tipoAnuncio = document.getElementById("tipoAnuncio").value;
  const categoria = document.getElementById("categoria").value;

  const taxaAnuncio = TAXAS_MERCADO_LIVRE[tipoAnuncio] || TAXAS_MERCADO_LIVRE.premium;
  const ajusteCategoria = AJUSTES_CATEGORIA[categoria] || AJUSTES_CATEGORIA.geral;
  const percentualFinal = taxaAnuncio.percentual + ajusteCategoria.ajuste;

  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");
  const comissaoMl = document.getElementById("comissaoMl");
  const comissaoMlTexto = document.getElementById("comissaoMlTexto");
  const percentualAplicado = document.getElementById("percentualAplicado");
  const percentualAplicadoTexto = document.getElementById("percentualAplicadoTexto");
  const leituraRapida = document.getElementById("leituraRapida");
  const leituraRapidaTexto = document.getElementById("leituraRapidaTexto");

  if (precoProduto <= 0) {
    resumoTopoValor.innerText = "R$ 0,00";
    resumoTopoTexto.innerText = "Informe um preço válido para ver a comissão estimada.";
    comissaoMl.innerText = "R$ 0,00";
    comissaoMlTexto.innerText = "Valor aproximado cobrado pela plataforma.";
    percentualAplicado.innerText = "0,00%";
    percentualAplicadoTexto.innerText = "Soma do tipo de anúncio com o ajuste médio da categoria.";
    leituraRapida.innerText = "-";
    leituraRapidaTexto.innerText = "Resumo simples para comparar anúncios e categorias.";
    return;
  }

  const valorComissao = precoProduto * (percentualFinal / 100);
  const valorLiquido = precoProduto - valorComissao;

  resumoTopoValor.innerText = "R$ " + formatarNumero(valorLiquido);
  resumoTopoTexto.innerText =
    `Com ${taxaAnuncio.nome.toLowerCase()} e categoria ${ajusteCategoria.nome.toLowerCase()}, a comissão estimada fica em R$ ${formatarNumero(valorComissao)}.`;

  comissaoMl.innerText = "R$ " + formatarNumero(valorComissao);
  comissaoMlTexto.innerText = `Estimativa sobre um preço de R$ ${formatarNumero(precoProduto)}.`;

  percentualAplicado.innerText = formatarNumero(percentualFinal) + "%";
  percentualAplicadoTexto.innerText = `${taxaAnuncio.percentual}% do anúncio + ${ajusteCategoria.ajuste >= 0 ? "+" : ""}${formatarNumero(ajusteCategoria.ajuste)} ponto percentual da categoria.`;

  leituraRapida.innerText = "Recebe " + formatarNumero((valorLiquido / precoProduto) * 100) + "%";
  leituraRapidaTexto.innerText = `Sobram R$ ${formatarNumero(valorLiquido)} líquidos em cada venda de R$ ${formatarNumero(precoProduto)}.`;
}

window.onload = function () {
  document.getElementById("precoProduto").addEventListener("input", calcular);
  document.getElementById("tipoAnuncio").addEventListener("change", calcular);
  document.getElementById("categoria").addEventListener("change", calcular);
  calcular();
};
