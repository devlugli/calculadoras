const CALCULADORAS_POPULARES = [
  {
    url: "/calculadora-porcentagem/",
    titulo: "Calculadora de Porcentagem",
    descricao: "Calcule porcentagens rapidamente.",
    categoria: "Matemática"
  },
  {
    url: "/calculadora-juros-compostos/",
    titulo: "Juros Compostos",
    descricao: "Simule investimentos e crescimento do capital.",
    categoria: "Finanças"
  },
  {
    url: "/calculadora-dias-entre-datas/",
    titulo: "Dias Entre Datas",
    descricao: "Descubra quantos dias existem entre duas datas.",
    categoria: "Datas"
  },
  {
    url: "/calculadora-regra-de-tres/",
    titulo: "Regra de Três",
    descricao: "Resolva proporções automaticamente.",
    categoria: "Matemática"
  },
  {
    url: "/calculadora-imc/",
    titulo: "Calculadora de IMC",
    descricao: "Calcule seu índice de massa corporal.",
    categoria: "Saúde"
  },
  {
    url: "/calculadora-idade/",
    titulo: "Calculadora de Idade",
    descricao: "Descubra sua idade em anos, meses e dias.",
    categoria: "Datas"
  }
];

function criarCardPopular(calc) {
  return `
    <a class="card-resultado card-link" href="${calc.url}">
      <span class="titulo-resultado">${calc.categoria}</span>
      <strong>${calc.titulo}</strong>
      <span>${calc.descricao}</span>
    </a>
  `;
}

function renderizarCalculadorasPopulares() {
  const container = document.getElementById("calculadorasPopulares");
  if (!container) return;

  container.innerHTML = `
    <h2>Calculadoras populares</h2>
    <div class="resultado-grid">
      ${CALCULADORAS_POPULARES.map(criarCardPopular).join("")}
    </div>
  `;
}