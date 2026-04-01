const calculadoras = [
  {
    url: "/calculadora-juros-compostos/",
    nome: "Calculadora de Juros Compostos",
    descricao: "Simule investimentos com aporte mensal e veja a evolução do patrimônio."
  },
  {
    url: "/calculadora-porcentagem/",
    nome: "Calculadora de Porcentagem",
    descricao: "Descubra percentuais, aumentos, descontos e relações entre valores."
  },
    {
    url: "/calculadora-regra-de-tres/",
    nome: "Calculadora de Regra de Três",
    descricao: "Calcule regra de três simples online e descubra o valor proporcional automaticamente."
  }
];

function renderizarCalculadorasRelacionadas(urlAtual, quantidade = 3) {

  const container = document.getElementById("calculadorasRelacionadas");
  if (!container) return;

  const relacionadas = calculadoras
    .filter(c => c.url !== urlAtual)
    .slice(0, quantidade);

  container.innerHTML = `
    <h2>Outras calculadoras úteis</h2>

    <div class="resultado-grid">
      ${relacionadas.map(c => `
        <a class="card-resultado card-link" href="${c.url}">
          <span class="titulo-resultado">Calculadora</span>
          <strong>${c.nome}</strong>
          <span>${c.descricao}</span>
        </a>
      `).join("")}
    </div>
  `;
}