function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function getNumero(id) {
  return parseFloat(document.getElementById(id)?.value) || 0;
}

function getInteiro(id) {
  return parseInt(document.getElementById(id)?.value, 10) || 0;
}

function getValor(id) {
  return document.getElementById(id)?.value || "";
}

function calcularParcela(principal, taxaPercentual, parcelas) {
  if (principal <= 0 || parcelas <= 0) return 0;
  const i = taxaPercentual / 100;

  if (i === 0) {
    return principal / parcelas;
  }

  return principal * (i * Math.pow(1 + i, parcelas)) / (Math.pow(1 + i, parcelas) - 1);
}

function definirResumo(titulo, valor, texto) {
  document.getElementById("resumoTopoTitulo").innerText = titulo;
  document.getElementById("resumoTopoValor").innerText = valor;
  document.getElementById("resumoTopoTexto").innerText = texto;
}

function definirCard(indice, titulo, valor, texto) {
  document.getElementById(`detalhe${indice}Titulo`).innerText = titulo;
  document.getElementById(`detalhe${indice}Valor`).innerText = valor;
  document.getElementById(`detalhe${indice}Texto`).innerText = texto;
}

function definirEstadoPadrao(mensagem) {
  definirResumo("Resultado", "Preencha os dados", mensagem);
  definirCard(1, "Leitura", "-", "Informe valores validos para gerar uma comparacao.");
  definirCard(2, "Comparacao", "-", "Os custos e ganhos aparecem aqui em formato simples.");
  definirCard(3, "Decisao", "-", "A ferramenta sugere um caminho com base nos numeros informados.");
}

const EXEMPLOS_DECISAO = {
  "financiar-carro": [
    { valorCarro: 60000, entrada: 15000, taxaJuros: 1.49, parcelas: 48, rendaMensal: 7000 },
    { valorCarro: 85000, entrada: 10000, taxaJuros: 1.89, parcelas: 60, rendaMensal: 5500 }
  ],
  "alugar-ou-comprar": [
    { valorImovel: 350000, entrada: 80000, taxaJuros: 0.89, parcelas: 360, aluguelMensal: 2200 },
    { valorImovel: 520000, entrada: 40000, taxaJuros: 1.05, parcelas: 420, aluguelMensal: 2600 }
  ],
  "consorcio-ou-financiamento": [
    { cartaCredito: 70000, lance: 10000, taxaAdm: 18, prazoConsorcio: 80, taxaFinanciamento: 1.49, parcelasFinanciamento: 48, urgencia: "sim" },
    { cartaCredito: 70000, lance: 15000, taxaAdm: 16, prazoConsorcio: 72, taxaFinanciamento: 1.79, parcelasFinanciamento: 48, urgencia: "nao" }
  ],
  "comprar-a-vista-ou-investir": [
    { valorCompra: 12000, descontoVista: 10, parcelas: 12, jurosParcelamento: 0, rendimentoInvestimento: 1.0 },
    { valorCompra: 12000, descontoVista: 3, parcelas: 12, jurosParcelamento: 1.6, rendimentoInvestimento: 1.1 }
  ],
  "trocar-carro": [
    { manutencaoAtual: 650, seguroAtual: 220, combustivelAtual: 700, parcelaNovo: 1100, seguroNovo: 300, combustivelNovo: 500, reparoUnico: 6000 },
    { manutencaoAtual: 250, seguroAtual: 180, combustivelAtual: 600, parcelaNovo: 1600, seguroNovo: 350, combustivelNovo: 550, reparoUnico: 1200 }
  ],
  "antecipar-parcelas": [
    { saldoParcelas: 12000, descontoAntecipacao: 11, rendimentoMensal: 0.9, mesesRestantes: 18 },
    { saldoParcelas: 8000, descontoAntecipacao: 4, rendimentoMensal: 1.2, mesesRestantes: 10 }
  ],
  "quitar-divida-ou-investir": [
    { aporteDisponivel: 15000, jurosDivida: 5.5, rendimentoMensal: 1.0, mesesComparacao: 12 },
    { aporteDisponivel: 15000, jurosDivida: 1.2, rendimentoMensal: 1.1, mesesComparacao: 12 }
  ],
  "trocar-emprego": [
    { salarioAtual: 4200, salarioNovo: 5200, custoAtual: 450, custoNovo: 220, beneficiosDiferenca: 250, risco: "medio" },
    { salarioAtual: 6000, salarioNovo: 6500, custoAtual: 300, custoNovo: 650, beneficiosDiferenca: -200, risco: "alto" }
  ],
  "morar-perto-trabalho": [
    { aluguelAtual: 1600, novoAluguel: 2200, transporteAtual: 650, transporteNovo: 120, horasDeslocamentoDia: 2.5, valorHoraLivre: 18 },
    { aluguelAtual: 2200, novoAluguel: 2900, transporteAtual: 500, transporteNovo: 180, horasDeslocamentoDia: 1.2, valorHoraLivre: 20 }
  ],
  "ter-carro-ou-app": [
    { parcelaCarro: 1200, custosFixosCarro: 650, custosUsoCarro: 700, gastoApp: 600, gastoTransportePublico: 250 },
    { parcelaCarro: 0, custosFixosCarro: 900, custosUsoCarro: 800, gastoApp: 1100, gastoTransportePublico: 300 }
  ]
};

function aplicarExemplo(indice) {
  const pagina = document.body.dataset.decisionPage;
  const exemplos = EXEMPLOS_DECISAO[pagina] || [];
  const exemplo = exemplos[indice];

  if (!exemplo) return;

  Object.entries(exemplo).forEach(([id, valor]) => {
    const campo = document.getElementById(id);
    if (campo) {
      campo.value = valor;
    }
  });

  calcularDecisao();
}

function calcularFinanciarCarro() {
  const valorCarro = getNumero("valorCarro");
  const entrada = getNumero("entrada");
  const taxaJuros = getNumero("taxaJuros");
  const parcelas = getInteiro("parcelas");
  const rendaMensal = getNumero("rendaMensal");

  if (valorCarro <= 0 || parcelas <= 0 || rendaMensal <= 0 || entrada >= valorCarro) {
    definirEstadoPadrao("Informe valor do carro, entrada, juros, parcelas e renda mensal.");
    return;
  }

  const financiado = valorCarro - entrada;
  const parcela = calcularParcela(financiado, taxaJuros, parcelas);
  const totalPago = entrada + parcela * parcelas;
  const pesoOrcamento = (parcela / rendaMensal) * 100;
  const percentualEntrada = (entrada / valorCarro) * 100;

  let decisao = "Atenção";
  let texto = "O financiamento cabe, mas merece cuidado com juros, prazo e peso da parcela.";

  if (pesoOrcamento <= 15 && percentualEntrada >= 20) {
    decisao = "Faz sentido";
    texto = "A parcela ocupa uma faixa mais saudavel do orcamento e a entrada ajuda a reduzir o peso do financiamento.";
  } else if (pesoOrcamento > 25) {
    decisao = "Pode pesar";
    texto = "A parcela consome uma fatia alta da renda e aumenta o risco de aperto no caixa.";
  }

  definirResumo("Leitura da decisao", decisao, texto);
  definirCard(1, "Parcela estimada", `R$ ${formatarNumero(parcela)}`, `Financiando R$ ${formatarNumero(financiado)} em ${parcelas} meses.`);
  definirCard(2, "Total pago", `R$ ${formatarNumero(totalPago)}`, "Entrada somada ao total de parcelas do financiamento.");
  definirCard(3, "Peso no orcamento", `${formatarNumero(pesoOrcamento)}%`, "Percentual aproximado da parcela sobre a renda mensal informada.");
}

function calcularAlugarOuComprar() {
  const valorImovel = getNumero("valorImovel");
  const entrada = getNumero("entrada");
  const taxaJuros = getNumero("taxaJuros");
  const parcelas = getInteiro("parcelas");
  const aluguelMensal = getNumero("aluguelMensal");

  if (valorImovel <= 0 || parcelas <= 0 || aluguelMensal <= 0 || entrada >= valorImovel) {
    definirEstadoPadrao("Informe valor do imovel, entrada, juros, prazo e aluguel atual.");
    return;
  }

  const financiado = valorImovel - entrada;
  const parcela = calcularParcela(financiado, taxaJuros, parcelas);
  const diferencaMensal = parcela - aluguelMensal;
  const percentualEntrada = (entrada / valorImovel) * 100;

  let decisao = "Alugar parece mais leve";
  let texto = "A compra esta exigindo uma parcela bem acima do aluguel atual.";

  if (parcela <= aluguelMensal * 1.15 && percentualEntrada >= 20) {
    decisao = "Comprar faz mais sentido";
    texto = "A parcela ficou perto do aluguel e a entrada ajuda a deixar a compra menos pressionada.";
  } else if (parcela <= aluguelMensal * 1.5) {
    decisao = "Depende do momento";
    texto = "A compra pode fazer sentido se voce valoriza estabilidade e tem reserva para manter a entrada.";
  }

  definirResumo("Leitura da decisao", decisao, texto);
  definirCard(1, "Parcela da compra", `R$ ${formatarNumero(parcela)}`, `Estimativa do financiamento de R$ ${formatarNumero(financiado)}.`);
  definirCard(2, "Diferenca mensal", `R$ ${formatarNumero(Math.abs(diferencaMensal))}`, diferencaMensal >= 0 ? "Quanto a compra custa a mais por mes em relacao ao aluguel." : "Quanto a compra ficou abaixo do aluguel atual.");
  definirCard(3, "Entrada", `${formatarNumero(percentualEntrada)}%`, "Percentual da entrada sobre o valor total do imovel.");
}

function calcularConsorcioOuFinanciamento() {
  const cartaCredito = getNumero("cartaCredito");
  const lance = getNumero("lance");
  const taxaAdm = getNumero("taxaAdm");
  const prazoConsorcio = getInteiro("prazoConsorcio");
  const taxaFinanciamento = getNumero("taxaFinanciamento");
  const parcelasFinanciamento = getInteiro("parcelasFinanciamento");
  const urgencia = getValor("urgencia");

  if (cartaCredito <= 0 || prazoConsorcio <= 0 || parcelasFinanciamento <= 0 || lance >= cartaCredito) {
    definirEstadoPadrao("Informe carta de credito, lance, taxas e prazos validos.");
    return;
  }

  const consorcioTotal = cartaCredito * (1 + taxaAdm / 100);
  const consorcioParcela = consorcioTotal / prazoConsorcio;
  const financiado = cartaCredito - lance;
  const financiamentoParcela = calcularParcela(financiado, taxaFinanciamento, parcelasFinanciamento);
  const financiamentoTotal = financiamentoParcela * parcelasFinanciamento + lance;

  let decisao = "Consorcio custa menos";
  let texto = "No total, o consorcio tende a sair mais leve se voce nao precisa do bem imediatamente.";

  if (urgencia === "sim") {
    decisao = "Financiamento entrega velocidade";
    texto = "Se a necessidade e imediata, o financiamento costuma resolver mais rapido, mesmo custando mais.";
  } else if (financiamentoTotal <= consorcioTotal) {
    decisao = "Financiamento esta competitivo";
    texto = "Nesta simulacao, o financiamento ficou proximo ou abaixo do consorcio no custo total.";
  }

  definirResumo("Leitura da decisao", decisao, texto);
  definirCard(1, "Parcela do consorcio", `R$ ${formatarNumero(consorcioParcela)}`, `Total estimado do consorcio: R$ ${formatarNumero(consorcioTotal)}.`);
  definirCard(2, "Parcela do financiamento", `R$ ${formatarNumero(financiamentoParcela)}`, `Total estimado do financiamento: R$ ${formatarNumero(financiamentoTotal)}.`);
  definirCard(3, "Diferenca total", `R$ ${formatarNumero(Math.abs(financiamentoTotal - consorcioTotal))}`, financiamentoTotal >= consorcioTotal ? "Quanto o financiamento ficou acima do consorcio." : "Quanto o financiamento ficou abaixo do consorcio.");
}

function calcularAVistaOuInvestir() {
  const valorCompra = getNumero("valorCompra");
  const descontoVista = getNumero("descontoVista");
  const parcelas = getInteiro("parcelas");
  const jurosParcelamento = getNumero("jurosParcelamento");
  const rendimentoInvestimento = getNumero("rendimentoInvestimento");

  if (valorCompra <= 0 || parcelas <= 0) {
    definirEstadoPadrao("Informe valor da compra, desconto, prazo, juros do parcelamento e rendimento.");
    return;
  }

  const valorVista = valorCompra * (1 - descontoVista / 100);
  const totalParcelado = jurosParcelamento === 0 ? valorCompra : calcularParcela(valorCompra, jurosParcelamento, parcelas) * parcelas;
  const montanteInvestido = valorVista * Math.pow(1 + rendimentoInvestimento / 100, parcelas);
  const ganhoInvestimento = montanteInvestido - valorVista;
  const economiaVista = totalParcelado - valorVista;

  let decisao = "Pagar a vista";
  let texto = "O desconto e a economia total ficaram mais fortes do que o ganho estimado do investimento.";

  if (ganhoInvestimento > economiaVista && jurosParcelamento <= rendimentoInvestimento) {
    decisao = "Parcelar e investir pode fazer sentido";
    texto = "Nesta simulacao, o dinheiro investido cresceu mais do que a vantagem do pagamento a vista.";
  } else if (jurosParcelamento === 0 && ganhoInvestimento > economiaVista) {
    decisao = "Sem juros, investir ganha forca";
    texto = "Como o parcelamento esta sem juros, manter o caixa investido tende a ser mais interessante.";
  }

  definirResumo("Leitura da decisao", decisao, texto);
  definirCard(1, "Pagamento a vista", `R$ ${formatarNumero(valorVista)}`, "Valor final considerando o desconto informado.");
  definirCard(2, "Total parcelado", `R$ ${formatarNumero(totalParcelado)}`, "Estimativa do valor total no parcelamento.");
  definirCard(3, "Ganho investindo", `R$ ${formatarNumero(ganhoInvestimento)}`, "Crescimento estimado do valor a vista no periodo informado.");
}

function calcularTrocarCarro() {
  const manutencaoAtual = getNumero("manutencaoAtual");
  const seguroAtual = getNumero("seguroAtual");
  const combustivelAtual = getNumero("combustivelAtual");
  const parcelaNovo = getNumero("parcelaNovo");
  const seguroNovo = getNumero("seguroNovo");
  const combustivelNovo = getNumero("combustivelNovo");
  const reparoUnico = getNumero("reparoUnico");

  const custoAtual = manutencaoAtual + seguroAtual + combustivelAtual + reparoUnico / 12;
  const custoNovo = parcelaNovo + seguroNovo + combustivelNovo;

  if (custoAtual <= 0 || custoNovo <= 0) {
    definirEstadoPadrao("Informe os custos mensais do carro atual e do carro novo.");
    return;
  }

  const diferenca = custoNovo - custoAtual;

  let decisao = "Manter o atual";
  let texto = "O custo mensal do carro novo ficou mais pesado do que seguir com o carro atual.";

  if (custoAtual >= custoNovo * 0.85 && reparoUnico >= 3000) {
    decisao = "Trocar começa a fazer sentido";
    texto = "O carro atual esta consumindo muito caixa e ainda exige um reparo importante.";
  } else if (Math.abs(diferenca) <= custoAtual * 0.1) {
    decisao = "Empate tecnico";
    texto = "Os custos ficaram proximos. Aqui pesam mais conforto, confiabilidade e previsibilidade.";
  }

  definirResumo("Leitura da decisao", decisao, texto);
  definirCard(1, "Carro atual por mes", `R$ ${formatarNumero(custoAtual)}`, "Inclui manutencao, seguro, combustivel e rateio do reparo unico.");
  definirCard(2, "Carro novo por mes", `R$ ${formatarNumero(custoNovo)}`, "Inclui parcela, seguro e combustivel do carro novo.");
  definirCard(3, "Diferenca mensal", `R$ ${formatarNumero(Math.abs(diferenca))}`, diferenca >= 0 ? "Quanto o carro novo ficou acima do atual." : "Quanto o carro novo ficou abaixo do atual.");
}

function calcularAnteciparParcelas() {
  const saldoParcelas = getNumero("saldoParcelas");
  const descontoAntecipacao = getNumero("descontoAntecipacao");
  const rendimentoMensal = getNumero("rendimentoMensal");
  const mesesRestantes = getInteiro("mesesRestantes");

  if (saldoParcelas <= 0 || mesesRestantes <= 0) {
    definirEstadoPadrao("Informe saldo a antecipar, desconto, rendimento mensal e meses restantes.");
    return;
  }

  const valorQuitacao = saldoParcelas * (1 - descontoAntecipacao / 100);
  const economia = saldoParcelas - valorQuitacao;
  const ganhoInvestimento = valorQuitacao * Math.pow(1 + rendimentoMensal / 100, mesesRestantes) - valorQuitacao;

  const decisao = economia > ganhoInvestimento ? "Antecipar parece melhor" : "Investir pode fazer mais sentido";
  const texto = economia > ganhoInvestimento
    ? "O desconto na antecipacao ficou maior do que o ganho estimado mantendo o dinheiro investido."
    : "O dinheiro investido tende a render mais do que a economia oferecida na antecipacao.";

  definirResumo("Leitura da decisao", decisao, texto);
  definirCard(1, "Valor de quitacao", `R$ ${formatarNumero(valorQuitacao)}`, "Valor estimado para antecipar o saldo das parcelas.");
  definirCard(2, "Economia imediata", `R$ ${formatarNumero(economia)}`, "Desconto obtido ao pagar antes do prazo normal.");
  definirCard(3, "Ganho investindo", `R$ ${formatarNumero(ganhoInvestimento)}`, "Rendimento estimado caso o mesmo valor fique investido no periodo.");
}

function calcularQuitarDividaOuInvestir() {
  const aporteDisponivel = getNumero("aporteDisponivel");
  const jurosDivida = getNumero("jurosDivida");
  const rendimentoMensal = getNumero("rendimentoMensal");
  const mesesComparacao = getInteiro("mesesComparacao");

  if (aporteDisponivel <= 0 || mesesComparacao <= 0) {
    definirEstadoPadrao("Informe aporte disponivel, juros da divida, rendimento e periodo.");
    return;
  }

  const custoJurosDivida = aporteDisponivel * Math.pow(1 + jurosDivida / 100, mesesComparacao) - aporteDisponivel;
  const ganhoInvestimento = aporteDisponivel * Math.pow(1 + rendimentoMensal / 100, mesesComparacao) - aporteDisponivel;
  const diferenca = custoJurosDivida - ganhoInvestimento;

  const decisao = jurosDivida > rendimentoMensal ? "Quitar a divida primeiro" : "Investir pode competir";
  const texto = jurosDivida > rendimentoMensal
    ? "Os juros da divida estao corroendo mais caixa do que o investimento tende a render no mesmo periodo."
    : "Como o rendimento ficou proximo ou acima do juro da divida, vale olhar reserva de emergencia e risco.";

  definirResumo("Leitura da decisao", decisao, texto);
  definirCard(1, "Peso dos juros", `R$ ${formatarNumero(custoJurosDivida)}`, "Custo estimado dos juros sobre o valor analisado.");
  definirCard(2, "Ganho investindo", `R$ ${formatarNumero(ganhoInvestimento)}`, "Rendimento estimado no mesmo prazo.");
  definirCard(3, "Diferenca", `R$ ${formatarNumero(Math.abs(diferenca))}`, diferenca >= 0 ? "Quanto os juros da divida superam o investimento." : "Quanto o investimento superou o custo dos juros.");
}

function calcularTrocarEmprego() {
  const salarioAtual = getNumero("salarioAtual");
  const salarioNovo = getNumero("salarioNovo");
  const custoAtual = getNumero("custoAtual");
  const custoNovo = getNumero("custoNovo");
  const beneficiosDiferenca = getNumero("beneficiosDiferenca");
  const risco = getValor("risco");

  if (salarioAtual <= 0 || salarioNovo <= 0) {
    definirEstadoPadrao("Informe salario atual, novo salario, custos e diferenca de beneficios.");
    return;
  }

  const liquidoAtual = salarioAtual - custoAtual;
  const liquidoNovo = salarioNovo - custoNovo + beneficiosDiferenca;
  const ganhoMensal = liquidoNovo - liquidoAtual;
  const variacao = liquidoAtual > 0 ? (ganhoMensal / liquidoAtual) * 100 : 0;

  const minimo = risco === "alto" ? 20 : risco === "medio" ? 12 : 7;
  let decisao = "Nao parece compensar";
  let texto = "O ganho real informado ainda nao paga bem a mudanca de risco e contexto.";

  if (variacao >= minimo) {
    decisao = "A troca ganha forca";
    texto = "A renda real melhorou o suficiente para sustentar melhor a mudanca, mesmo considerando custos e beneficios.";
  } else if (variacao > 0) {
    decisao = "Depende do contexto";
    texto = "A renda melhora, mas a vantagem ainda esta numa faixa que pede olhar para carreira, cultura e estabilidade.";
  }

  definirResumo("Leitura da decisao", decisao, texto);
  definirCard(1, "Liquido atual", `R$ ${formatarNumero(liquidoAtual)}`, "Salario atual menos custos recorrentes ligados ao trabalho.");
  definirCard(2, "Liquido novo", `R$ ${formatarNumero(liquidoNovo)}`, "Novo salario ajustado por custo de deslocamento e beneficios.");
  definirCard(3, "Ganho real", `${formatarNumero(variacao)}%`, `Impacto mensal estimado: R$ ${formatarNumero(ganhoMensal)}.`);
}

function calcularMorarPerto() {
  const aluguelAtual = getNumero("aluguelAtual");
  const novoAluguel = getNumero("novoAluguel");
  const transporteAtual = getNumero("transporteAtual");
  const transporteNovo = getNumero("transporteNovo");
  const horasDeslocamentoDia = getNumero("horasDeslocamentoDia");
  const valorHoraLivre = getNumero("valorHoraLivre");

  if (aluguelAtual <= 0 || novoAluguel <= 0 || horasDeslocamentoDia <= 0 || valorHoraLivre <= 0) {
    definirEstadoPadrao("Informe aluguel atual, novo aluguel, custos de transporte e valor da sua hora.");
    return;
  }

  const extraAluguel = novoAluguel - aluguelAtual;
  const economiaTransporte = transporteAtual - transporteNovo;
  const valorTempo = horasDeslocamentoDia * 22 * valorHoraLivre;
  const saldo = economiaTransporte + valorTempo - extraAluguel;

  let decisao = "Pagar menos aluguel ainda vence";
  let texto = "Mesmo com economia de deslocamento, o custo extra de moradia ainda ficou alto.";

  if (saldo > 0) {
    decisao = "Morar perto faz sentido";
    texto = "Quando a economia de transporte e o valor do tempo recuperado superam o aluguel extra, a mudanca ganha forca.";
  } else if (saldo > -200) {
    decisao = "Ficou perto do empate";
    texto = "Os numeros ficaram proximos, entao conforto, saude mental e rotina pesam bastante na decisao.";
  }

  definirResumo("Leitura da decisao", decisao, texto);
  definirCard(1, "Aluguel extra", `R$ ${formatarNumero(Math.abs(extraAluguel))}`, extraAluguel >= 0 ? "Quanto a nova moradia custa a mais por mes." : "Quanto a nova moradia ficou mais barata.");
  definirCard(2, "Economia de transporte", `R$ ${formatarNumero(Math.abs(economiaTransporte))}`, economiaTransporte >= 0 ? "Quanto voce economiza por mes ao morar mais perto." : "Quanto o transporte novo ficou mais caro.");
  definirCard(3, "Valor do tempo", `R$ ${formatarNumero(valorTempo)}`, "Estimativa mensal do valor das horas recuperadas no deslocamento.");
}

function calcularTerCarroOuApp() {
  const parcelaCarro = getNumero("parcelaCarro");
  const custosFixosCarro = getNumero("custosFixosCarro");
  const custosUsoCarro = getNumero("custosUsoCarro");
  const gastoApp = getNumero("gastoApp");
  const gastoTransportePublico = getNumero("gastoTransportePublico");

  const custoCarro = parcelaCarro + custosFixosCarro + custosUsoCarro;
  const custoAlternativas = gastoApp + gastoTransportePublico;

  if (custoCarro <= 0 || custoAlternativas <= 0) {
    definirEstadoPadrao("Informe os custos mensais do carro e das alternativas sem carro.");
    return;
  }

  const diferenca = custoCarro - custoAlternativas;

  let decisao = "App e transporte parecem melhores";
  let texto = "As alternativas sem carro ficaram bem mais leves no custo mensal informado.";

  if (custoAlternativas > custoCarro * 0.85) {
    decisao = "Carro comeca a competir";
    texto = "Os custos ficaram proximos, entao conveniencia, disponibilidade e rotina podem justificar o carro.";
  } else if (custoAlternativas > custoCarro) {
    decisao = "Carro faz mais sentido";
    texto = "Nesta simulacao, manter carro ficou mais barato do que depender de app e transporte.";
  }

  definirResumo("Leitura da decisao", decisao, texto);
  definirCard(1, "Custo do carro", `R$ ${formatarNumero(custoCarro)}`, "Parcela, custos fixos e uso mensal do carro.");
  definirCard(2, "Custo sem carro", `R$ ${formatarNumero(custoAlternativas)}`, "Soma estimada de app e transporte publico por mes.");
  definirCard(3, "Diferenca mensal", `R$ ${formatarNumero(Math.abs(diferenca))}`, diferenca >= 0 ? "Quanto manter carro custa a mais do que as alternativas." : "Quanto as alternativas custam a mais do que manter carro.");
}

const CALCULOS_DECISAO = {
  "financiar-carro": calcularFinanciarCarro,
  "alugar-ou-comprar": calcularAlugarOuComprar,
  "consorcio-ou-financiamento": calcularConsorcioOuFinanciamento,
  "comprar-a-vista-ou-investir": calcularAVistaOuInvestir,
  "trocar-carro": calcularTrocarCarro,
  "antecipar-parcelas": calcularAnteciparParcelas,
  "quitar-divida-ou-investir": calcularQuitarDividaOuInvestir,
  "trocar-emprego": calcularTrocarEmprego,
  "morar-perto": calcularMorarPerto,
  "ter-carro-ou-app": calcularTerCarroOuApp
};

function calcularDecisao() {
  const pagina = document.body.dataset.decisionPage;
  const calcular = CALCULOS_DECISAO[pagina];

  if (calcular) {
    calcular();
  }
}

window.onload = function () {
  const pagina = document.body.dataset.decisionPage;
  if (!pagina) return;

  document.querySelectorAll("input, select").forEach((campo) => {
    campo.addEventListener(campo.tagName === "SELECT" ? "change" : "input", calcularDecisao);
  });

  calcularDecisao();
};
