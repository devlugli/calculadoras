const homeTools = [
  { name: "Calculadora de Porcentagem", url: "./calculadora-porcentagem/" },
  { name: "Calculadora de Regra de Três", url: "./calculadora-regra-de-tres/" },
  { name: "Calculadora de IMC", url: "./calculadora-imc/" },
  { name: "Dias Entre Datas", url: "./calculadora-dias-entre-datas/" },
  { name: "Calculadora de Financiamento", url: "./calculadora-financiamento/" },
  { name: "Álcool ou Gasolina", url: "./calculadora-alcool-ou-gasolina/" },
  { name: "Calculadora de Desconto", url: "./calculadora-desconto/" },
  { name: "Salário Líquido", url: "./calculadora-salario-liquido/" },
  { name: "Juros Compostos", url: "./calculadora-juros-compostos/" },
  { name: "Calculadora de Idade", url: "./calculadora-idade/" },
  { name: "Calculadora de Dias Úteis", url: "./calculadora-dias-uteis/" },
  { name: "Calculadora de IMC Infantil", url: "./calculadora-imc-infantil/" },
  { name: "Calculadora de Peso Ideal", url: "./calculadora-peso-ideal/" },
  { name: "KM por Litro", url: "./calculadora-km-por-litro/" },
  { name: "Contador de Caracteres", url: "./contador-de-caracteres/" },
  { name: "Conversor de Texto", url: "./converter-de-texto/" },
  { name: "Removedor de Espaços", url: "./removedor-de-espacos/" },
  { name: "Texto para HTML", url: "./texto-para-html/" },
  { name: "HTML para Texto", url: "./html-para-texto/" },
  { name: "Escapar HTML", url: "./escapar-html/" },
  { name: "Removedor de Quebras de Linha", url: "./removedor-de-quebras-de-linha/" },
  { name: "Removedor de Linhas Duplicadas", url: "./removedor-de-linhas-duplicadas/" },
  { name: "Ordenar Linhas", url: "./ordenar-linhas/" },
  { name: "Localizar e Substituir", url: "./localizar-e-substituir/" },
  { name: "Gerador de CPF", url: "./gerador-de-cpf/" },
  { name: "Gerador de CNPJ", url: "./gerador-de-cnpj/" },
  { name: "Gerador de UUID", url: "./gerador-de-uuid/" },
  { name: "Gerador de Senha", url: "./gerador-de-senha/" },
  { name: "Gerador de Pessoa", url: "./gerador-de-pessoa/" },
  { name: "Gerador de Cartão de Crédito", url: "./gerador-de-cartao-de-credito/" },
  { name: "Gerador de Conta Bancária", url: "./gerador-de-conta-bancaria/" },
  { name: "Gerador de RG", url: "./gerador-de-rg/" },
  { name: "Gerador de CNH", url: "./gerador-de-cnh/" },
  { name: "Gerador de CEP", url: "./gerador-de-cep/" },
  { name: "Gerador de E-mail", url: "./gerador-de-email/" },
  { name: "Gerador de Telefone", url: "./gerador-de-telefone/" },
  { name: "Gerador de Nome", url: "./gerador-de-nome/" },
  { name: "Gerador de Empresa", url: "./gerador-de-empresa/" },
  { name: "Gerador de Lorem Ipsum", url: "./gerador-de-lorem-ipsum/" }
];

const normalizeText = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const searchForm = document.querySelector("#home-search");
const searchInput = document.querySelector("#home-search-input");

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = normalizeText(searchInput.value);

    if (!query) {
      searchInput.focus();
      return;
    }

    const exactMatch = homeTools.find((tool) => normalizeText(tool.name) === query);
    const partialMatch = homeTools.find((tool) => normalizeText(tool.name).includes(query));
    const fallbackMatch = homeTools.find((tool) => query.split(" ").every((term) => normalizeText(tool.name).includes(term)));
    const result = exactMatch || partialMatch || fallbackMatch;

    if (result) {
      window.location.href = result.url;
      return;
    }

    searchInput.setCustomValidity("Nenhuma ferramenta parecida foi encontrada.");
    searchInput.reportValidity();
    setTimeout(() => searchInput.setCustomValidity(""), 1500);
  });

  searchInput.addEventListener("input", () => {
    searchInput.setCustomValidity("");
  });
}
