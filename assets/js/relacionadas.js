const CALCULADORAS = [
  {
    url: "/calculadora-porcentagem/",
    titulo: "Calculadora de Porcentagem",
    descricao: "Calcule porcentagens de forma rápida e simples.",
    categoria: "Matemática"
  },
  {
    url: "/calculadora-regra-de-tres/",
    titulo: "Calculadora de Regra de Três",
    descricao: "Resolva proporções entre valores automaticamente.",
    categoria: "Matemática"
  },
  {
    url: "/calculadora-aumento-percentual/",
    titulo: "Calculadora de Aumento Percentual",
    descricao: "Descubra quanto um valor aumentou em porcentagem.",
    categoria: "Matemática"
  },
  {
    url: "/calculadora-reducao-percentual/",
    titulo: "Calculadora de Redução Percentual",
    descricao: "Descubra quanto um valor diminuiu em porcentagem.",
    categoria: "Matemática"
  },
  {
    url: "/calculadora-media/",
    titulo: "Calculadora de Média",
    descricao: "Calcule a média de vários valores rapidamente.",
    categoria: "Matemática"
  },
  {
    url: "/calculadora-porcentagem-reversa/",
    titulo: "Porcentagem Reversa",
    descricao: "Descubra qual era o valor original antes de um desconto ou aumento.",
    categoria: "Matemática"
  },
  {
    url: "/calculadora-qual-a-porcentagem/",
    titulo: "Qual a Porcentagem?",
    descricao: "Descubra quantos por cento um valor representa em relacao a outro.",
    categoria: "Matemática"
  },
  {
    url: "/calculadora-juros-compostos/",
    titulo: "Juros Compostos",
    descricao: "Simule investimentos e veja o crescimento do capital.",
    categoria: "Finanças"
  },
  {
    url: "/calculadora-juros-simples/",
    titulo: "Calculadora de Juros Simples",
    descricao: "Calcule juros e montante final rapidamente.",
    categoria: "Finanças"
  },
  {
    url: "/calculadora-desconto/",
    titulo: "Calculadora de Desconto",
    descricao: "Descubra rapidamente o valor do desconto.",
    categoria: "Finanças"
  },
  {
    url: "/calculadora-margem-de-lucro/",
    titulo: "Calculadora de Margem de Lucro",
    descricao: "Calcule o lucro e a margem de um produto.",
    categoria: "Finanças"
  },
  {
    url: "/calculadora-markup/",
    titulo: "Calculadora de Markup",
    descricao: "Descubra o preço de venda ideal para seu produto.",
    categoria: "Finanças"
  },
  {
    url: "/calculadora-preco-de-venda/",
    titulo: "Preço de Venda",
    descricao: "Descubra quanto cobrar por um produto.",
    categoria: "Finanças"
  },
  {
    url: "/calculadora-financiamento/",
    titulo: "Calculadora de Financiamento",
    descricao: "Simule parcelas, juros e total pago em um financiamento.",
    categoria: "Finanças"
  },
  {
    url: "/simulador-emprestimo-pessoal/",
    titulo: "Simulador de Empréstimo Pessoal",
    descricao: "Veja parcelas, total pago e juros antes de contratar.",
    categoria: "Finanças"
  },
  {
    url: "/calculadora-comissao-vendas/",
    titulo: "Calculadora de Comissão",
    descricao: "Descubra quanto você ganha de comissão em uma venda.",
    categoria: "Finanças"
  },
  {
    url: "/calculadora-salario-liquido/",
    titulo: "Salário Líquido",
    descricao: "Descubra quanto você recebe após descontos.",
    categoria: "Finanças"
  },
  {
    url: "/calculadora-decimo-terceiro/",
    titulo: "Calculadora de 13º Salário",
    descricao: "Descubra quanto você vai receber de décimo terceiro.",
    categoria: "Finanças"
  },
  {
    url: "/calculadora-valor-hora-trabalhada/",
    titulo: "Valor da Hora Trabalhada",
    descricao: "Descubra quanto vale sua hora de trabalho.",
    categoria: "Finanças"
  },
  {
    url: "/calculadora-idade/",
    titulo: "Calculadora de Idade",
    descricao: "Descubra quantos anos, meses e dias você tem.",
    categoria: "Datas"
  },
  {
    url: "/calculadora-dias-entre-datas/",
    titulo: "Dias Entre Datas",
    descricao: "Calcule o intervalo de dias entre duas datas.",
    categoria: "Datas"
  },
  {
    url: "/calculadora-dias-uteis/",
    titulo: "Calculadora de Dias Úteis",
    descricao: "Descubra quantos dias úteis existem entre duas datas.",
    categoria: "Datas"
  },
  {
    url: "/quantos-dias-faltam-para-o-natal/",
    titulo: "Dias até o Natal",
    descricao: "Veja quantos dias faltam para o próximo Natal.",
    categoria: "Datas"
  },
  {
    url: "/calculadora-horas-entre-horarios/",
    titulo: "Horas Entre Horários",
    descricao: "Descubra quantas horas e minutos existem entre dois horários.",
    categoria: "Datas"
  },
  {
    url: "/calculadora-data-futura/",
    titulo: "Calculadora de Data Futura",
    descricao: "Some ou subtraia dias, semanas, meses e anos a uma data base.",
    categoria: "Datas"
  },
  {
    url: "/calculadora-semanas-entre-datas/",
    titulo: "Semanas Entre Datas",
    descricao: "Descubra quantas semanas completas existem entre duas datas.",
    categoria: "Datas"
  },
  {
    url: "/calculadora-alcool-ou-gasolina/",
    titulo: "Álcool ou Gasolina",
    descricao: "Descubra qual combustível compensa mais.",
    categoria: "Combustível"
  },
  {
    url: "/calculadora-km-por-litro/",
    titulo: "KM por Litro",
    descricao: "Descubra o consumo de combustível do seu carro.",
    categoria: "Combustível"
  },
  {
    url: "/calculadora-custo-por-km/",
    titulo: "Calculadora de Custo por KM",
    descricao: "Descubra quanto custa rodar 1 km com seu carro.",
    categoria: "Combustível"
  },
  {
    url: "/calculadora-gasto-combustivel-viagem/",
    titulo: "Gasto de Combustível em Viagem",
    descricao: "Calcule quanto você vai gastar de combustível em uma viagem.",
    categoria: "Combustível"
  },
  {
    url: "/calculadora-tempo-de-viagem/",
    titulo: "Tempo de Viagem",
    descricao: "Descubra quanto tempo uma viagem pode levar.",
    categoria: "Combustível"
  },
  {
    url: "/calculadora-autonomia-do-carro/",
    titulo: "Autonomia do Carro",
    descricao: "Veja quantos km o carro pode rodar com um tanque cheio.",
    categoria: "Combustível"
  },
  {
    url: "/calculadora-imc/",
    titulo: "Calculadora de IMC",
    descricao: "Calcule seu índice de massa corporal.",
    categoria: "Saúde"
  },
  {
    url: "/calculadora-imc-infantil/",
    titulo: "Calculadora de IMC Infantil",
    descricao: "Calcule o índice de massa corporal de crianças.",
    categoria: "Saúde"
  },
  {
    url: "/calculadora-peso-ideal/",
    titulo: "Calculadora de Peso Ideal",
    descricao: "Descubra um peso ideal aproximado pela altura.",
    categoria: "Saúde"
  },
  {
    url: "/calculadora-idade-de-cachorro/",
    titulo: "Calculadora de Idade de Cachorro",
    descricao: "Descubra a idade humana equivalente do seu cachorro.",
    categoria: "Pets"
  },
  {
    url: "/calculadora-de-idade-de-gato/",
    titulo: "Calculadora de Idade de Gato",
    descricao: "Descubra a idade humana equivalente do seu gato.",
    categoria: "Pets"
  },
  {
    url: "/calculadora-de-racao-para-cachorro/",
    titulo: "Calculadora de Ração para Cachorro",
    descricao: "Estime a quantidade diária de ração para o seu cachorro.",
    categoria: "Pets"
  },
  {
    url: "/calculadora-de-racao-para-gato/",
    titulo: "Calculadora de Ração para Gato",
    descricao: "Estime a quantidade diária de ração para o seu gato.",
    categoria: "Pets"
  },
  {
    url: "/calculadora-de-peso-ideal-para-gato/",
    titulo: "Peso Ideal para Gato",
    descricao: "Veja uma estimativa de peso ideal com base na condição corporal.",
    categoria: "Pets"
  },
  {
    url: "/calculadora-de-gestacao-de-cadela/",
    titulo: "Gestação de Cadela",
    descricao: "Estime a data provável de parto e a janela da gestação.",
    categoria: "Pets"
  },
  {
    url: "/calculadoras-pets/",
    titulo: "Calculadoras de Pets",
    descricao: "Veja todas as ferramentas para cachorro e gato em um só lugar.",
    categoria: "Categoria"
  },

  {
    url: "/calculadora-de-churrasco/",
    titulo: "Calculadora de Churrasco",
    descricao: "Calcule carne, bebidas e apoio para o churrasco.",
    categoria: "Cotidiano"
  },
  {
    url: "/quantidade-de-bebida-para-festa/",
    titulo: "Quantidade de Bebida para Festa",
    descricao: "Estime cerveja, refrigerante, água e suco para o evento.",
    categoria: "Cotidiano"
  },
  {
    url: "/calculadora-de-festa-infantil/",
    titulo: "Calculadora de Festa Infantil",
    descricao: "Veja bolo, doces, salgados e bebidas para a festa.",
    categoria: "Cotidiano"
  },
  {
    url: "/calculadora-de-cerveja-para-festa/",
    titulo: "Calculadora de Cerveja para Festa",
    descricao: "Descubra quantos litros e latas comprar.",
    categoria: "Cotidiano"
  },
  {
    url: "/quantidade-de-salgados-por-pessoa/",
    titulo: "Quantidade de Salgados por Pessoa",
    descricao: "Planeje a quantidade de salgados por tipo de evento.",
    categoria: "Cotidiano"
  },
  {
    url: "/quantidade-de-bolo-por-pessoa/",
    titulo: "Quantidade de Bolo por Pessoa",
    descricao: "Estime quilos de bolo e fatias para a festa.",
    categoria: "Cotidiano"
  },
  {
    url: "/calculadora-de-tinta/",
    titulo: "Calculadora de Tinta",
    descricao: "Calcule litros, gal\u00f5es e latas para a pintura.",
    categoria: "Constru\u00e7\u00e3o"
  },
  {
    url: "/calculadora-de-piso/",
    titulo: "Calculadora de Piso",
    descricao: "Veja \u00e1rea, pe\u00e7as e caixas de piso para o ambiente.",
    categoria: "Constru\u00e7\u00e3o"
  },
  {
    url: "/calculadora-de-concreto/",
    titulo: "Calculadora de Concreto",
    descricao: "Estime o volume de concreto para laje ou contrapiso.",
    categoria: "Constru\u00e7\u00e3o"
  },
  {
    url: "/calculadora-de-argamassa/",
    titulo: "Calculadora de Argamassa",
    descricao: "Descubra quantos sacos de argamassa comprar.",
    categoria: "Constru\u00e7\u00e3o"
  },
  {
    url: "/calculadora-de-rejunte/",
    titulo: "Calculadora de Rejunte",
    descricao: "Estime o consumo de rejunte para o acabamento.",
    categoria: "Constru\u00e7\u00e3o"
  },
  {
    url: "/calculadora-de-blocos-para-parede/",
    titulo: "Calculadora de Blocos para Parede",
    descricao: "Calcule quantos blocos comprar para a parede.",
    categoria: "Constru\u00e7\u00e3o"
  },

  {
  url: "/calculadoras-financeiras/",
  titulo: "Calculadoras Financeiras",
  descricao: "Veja todas as calculadoras de finanças e negócios.",
  categoria: "Categoria" 
},
{
  url: "/calculadoras-matematica/",
  titulo: "Calculadoras de Matemática",
  descricao: "Veja todas as calculadoras de matemática em um só lugar.",
  categoria: "Categoria"
},
{
  url: "/calculadoras-financeiras/",
  titulo: "Calculadoras Financeiras",
  descricao: "Veja todas as calculadoras de finanças e negócios em um só lugar.",
  categoria: "Categoria"
},
{
  url: "/calculadoras-datas/",
  titulo: "Calculadoras de Datas",
  descricao: "Veja todas as calculadoras de datas em um só lugar.",
  categoria: "Categoria"
},
{
  url: "/calculadoras-saude/",
  titulo: "Calculadoras de Saúde",
  descricao: "Veja todas as calculadoras de saúde em um só lugar.",
  categoria: "Categoria"
},
{
  url: "/calculadoras-combustivel/",
  titulo: "Calculadoras de Combustível",
  descricao: "Veja todas as calculadoras de combustível em um só lugar.",
  categoria: "Categoria"
},
{
  url: "/calculadoras-cotidiano/",
  titulo: "Calculadoras do Cotidiano",
  descricao: "Veja ferramentas para churrasco, festa, bebida, bolo e salgados.",
  categoria: "Categoria"
},
{
  url: "/calculadoras-construcao/",
  titulo: "Calculadoras de Constru\u00e7\u00e3o",
  descricao: "Veja ferramentas para tinta, piso, concreto, argamassa e blocos.",
  categoria: "Categoria"
},
{
  url: "/calculadora-comissao-mercado-livre/",
  titulo: "Comissao do Mercado Livre",
  descricao: "Estime a comissao do ML e o valor liquido recebido na venda.",
  categoria: "Marketplace"
},
{
  url: "/calculadora-comissao-shopee/",
  titulo: "Comissao Shopee",
  descricao: "Simule taxas da Shopee e veja quanto sobra na venda.",
  categoria: "Marketplace"
},
{
  url: "/calculadora-lucro-real-mercado-livre-shopee/",
  titulo: "Lucro Real Mercado Livre e Shopee",
  descricao: "Descubra o lucro final da venda em marketplace com todos os custos.",
  categoria: "Marketplace"
},
{
  url: "/calculadoras-decisao/",
  titulo: "Calculadoras de Decisao",
  descricao: "Compare escolhas importantes de dinheiro, moradia, carreira e mobilidade.",
  categoria: "Categoria"
},
{
  url: "/vale-a-pena-financiar-um-carro/",
  titulo: "Vale a Pena Financiar um Carro?",
  descricao: "Veja se a parcela do carro cabe de forma saudavel no orcamento.",
  categoria: "Decisao"
},
{
  url: "/alugar-ou-comprar-imovel/",
  titulo: "Alugar ou Comprar Imovel?",
  descricao: "Compare aluguel e compra para ver qual escolha fica mais leve no momento.",
  categoria: "Decisao"
},
{
  url: "/consorcio-ou-financiamento/",
  titulo: "Consorcio ou Financiamento?",
  descricao: "Compare custo total, parcela e urgencia para decidir melhor.",
  categoria: "Decisao"
},
{
  url: "/comprar-a-vista-ou-investir/",
  titulo: "Comprar a Vista ou Investir?",
  descricao: "Veja quando o desconto a vista vence e quando investir ganha forca.",
  categoria: "Decisao"
},
{
  url: "/trocar-de-carro-ou-manter-o-atual/",
  titulo: "Trocar de Carro ou Manter o Atual?",
  descricao: "Entenda se os custos do carro atual ja se aproximaram demais de um carro novo.",
  categoria: "Decisao"
},
{
  url: "/vale-a-pena-antecipar-parcelas/",
  titulo: "Vale a Pena Antecipar Parcelas?",
  descricao: "Compare desconto na antecipacao com o ganho de manter o dinheiro investido.",
  categoria: "Decisao"
},
{
  url: "/quitar-divida-ou-investir/",
  titulo: "Quitar Divida ou Investir?",
  descricao: "Veja se os juros da divida superam o rendimento do investimento.",
  categoria: "Decisao"
},
{
  url: "/vale-a-pena-trocar-de-emprego/",
  titulo: "Vale a Pena Trocar de Emprego?",
  descricao: "Compare renda real, custos e risco antes de mudar de trabalho.",
  categoria: "Decisao"
},
{
  url: "/morar-perto-do-trabalho-ou-pagar-menos-aluguel/",
  titulo: "Morar Perto do Trabalho ou Pagar Menos Aluguel?",
  descricao: "Coloque transporte, aluguel e valor do tempo na mesma conta.",
  categoria: "Decisao"
},
{
  url: "/ter-carro-ou-usar-app-transporte/",
  titulo: "Ter Carro ou Usar App e Transporte?",
  descricao: "Compare o custo do carro com as alternativas sem carro.",
  categoria: "Decisao"
}
];

function normalizarUrl(url) {
  if (!url) return "/";
  let normalizada = url.trim();

  if (!normalizada.startsWith("/")) {
    normalizada = "/" + normalizada;
  }

  if (!normalizada.endsWith("/")) {
    normalizada += "/";
  }

  return normalizada;
}

function embaralhar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function criarCard(calc) {
  return `
    <a class="card-resultado card-link" href="${calc.url}">
      <span class="titulo-resultado">${calc.categoria}</span>
      <strong>${calc.titulo}</strong>
      <span>${calc.descricao}</span>
    </a>
  `;
}

function renderizarCalculadorasRelacionadas(urlAtual, quantidade = 6) {
  const container = document.getElementById("calculadorasRelacionadas");
  if (!container) return;

  const atual = normalizarUrl(urlAtual);
  const calculadoraAtual = CALCULADORAS.find(c => normalizarUrl(c.url) === atual);

  const outrasCalculadoras = CALCULADORAS.filter(c => normalizarUrl(c.url) !== atual);

  let relacionadas = [];

  if (calculadoraAtual) {
    const mesmaCategoria = outrasCalculadoras.filter(
      c => c.categoria === calculadoraAtual.categoria
    );

    const outrasCategorias = outrasCalculadoras.filter(
      c => c.categoria !== calculadoraAtual.categoria
    );

    relacionadas = [
      ...embaralhar(mesmaCategoria),
      ...embaralhar(outrasCategorias)
    ].slice(0, quantidade);
  } else {
    relacionadas = embaralhar(outrasCalculadoras).slice(0, quantidade);
  }

  container.innerHTML = `
    <h2>Calculadoras relacionadas</h2>
    <div class="resultado-grid">
      ${relacionadas.map(criarCard).join("")}
    </div>
  `;
}
