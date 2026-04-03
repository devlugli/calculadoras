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
    categoria: "Saúde"
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