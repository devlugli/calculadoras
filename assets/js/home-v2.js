const homeTools = [
  { name: "Calculadora de Porcentagem", url: "./calculadora-porcentagem/", category: "Matem\u00e1tica", aliases: ["porcentagem", "percentual", "desconto percentual"] },
  { name: "Calculadora de Regra de Tr\u00eas", url: "./calculadora-regra-de-tres/", category: "Matem\u00e1tica", aliases: ["regra de tres", "proporcao", "proporcao"] },
  { name: "Calculadora de IMC", url: "./calculadora-imc/", category: "Sa\u00fade", aliases: ["imc", "indice de massa corporal"] },
  { name: "Dias Entre Datas", url: "./calculadora-dias-entre-datas/", category: "Datas", aliases: ["dias entre datas", "intervalo entre datas"] },
  { name: "Calculadora de Financiamento", url: "./calculadora-financiamento/", category: "Finan\u00e7as", aliases: ["financiamento", "parcelas", "simular financiamento"] },
  { name: "\u00c1lcool ou Gasolina", url: "./calculadora-alcool-ou-gasolina/", category: "Combust\u00edvel", aliases: ["alcool ou gasolina", "combustivel compensa"] },
  { name: "Calculadora de Desconto", url: "./calculadora-desconto/", category: "Finan\u00e7as", aliases: ["desconto", "preco com desconto", "preco com desconto"] },
  { name: "Sal\u00e1rio L\u00edquido", url: "./calculadora-salario-liquido/", category: "Finan\u00e7as", aliases: ["salario liquido", "salario liquido", "descontos do salario"] },
  { name: "Juros Compostos", url: "./calculadora-juros-compostos/", category: "Finan\u00e7as", aliases: ["juros compostos", "investimento", "rendimento"] },
  { name: "Calculadora de Idade", url: "./calculadora-idade/", category: "Datas", aliases: ["idade", "quantos anos eu tenho"] },
  { name: "Calculadora de Dias \u00dateis", url: "./calculadora-dias-uteis/", category: "Datas", aliases: ["dias uteis", "dias uteis", "dias de trabalho"] },
  { name: "Calculadora de IMC Infantil", url: "./calculadora-imc-infantil/", category: "Sa\u00fade", aliases: ["imc infantil", "peso infantil"] },
  { name: "Calculadora de Peso Ideal", url: "./calculadora-peso-ideal/", category: "Sa\u00fade", aliases: ["peso ideal", "peso saudavel", "peso saudavel"] },
  { name: "KM por Litro", url: "./calculadora-km-por-litro/", category: "Combust\u00edvel", aliases: ["km por litro", "consumo do carro"] },
  { name: "Contador de Caracteres", url: "./contador-de-caracteres/", category: "Texto", aliases: ["contador de caracteres", "contar caracteres", "seo texto"] },
  { name: "Conversor de Texto", url: "./converter-de-texto/", category: "Texto", aliases: ["conversor de texto", "maiusculas e minusculas", "maiusculas e minusculas"] },
  { name: "Removedor de Espa\u00e7os", url: "./removedor-de-espacos/", category: "Texto", aliases: ["remover espacos", "remover espacos", "limpar texto"] },
  { name: "Texto para HTML", url: "./texto-para-html/", category: "Texto", aliases: ["texto para html", "converter texto em html"] },
  { name: "HTML para Texto", url: "./html-para-texto/", category: "Texto", aliases: ["html para texto", "remover html"] },
  { name: "Escapar HTML", url: "./escapar-html/", category: "Texto", aliases: ["escapar html", "entities html"] },
  { name: "Removedor de Quebras de Linha", url: "./removedor-de-quebras-de-linha/", category: "Texto", aliases: ["quebras de linha", "remover linhas"] },
  { name: "Removedor de Linhas Duplicadas", url: "./removedor-de-linhas-duplicadas/", category: "Texto", aliases: ["linhas duplicadas", "duplicadas"] },
  { name: "Ordenar Linhas", url: "./ordenar-linhas/", category: "Texto", aliases: ["ordenar linhas", "sortear linhas", "sort lines"] },
  { name: "Localizar e Substituir", url: "./localizar-e-substituir/", category: "Texto", aliases: ["localizar e substituir", "trocar texto"] },
  { name: "Gerador de CPF", url: "./gerador-de-cpf/", category: "Geradores", aliases: ["gerador de cpf", "cpf falso", "cpf para teste"] },
  { name: "Gerador de CNPJ", url: "./gerador-de-cnpj/", category: "Geradores", aliases: ["gerador de cnpj", "cnpj falso", "cnpj para teste"] },
  { name: "Gerador de UUID", url: "./gerador-de-uuid/", category: "Geradores", aliases: ["uuid", "guid", "identificador"] },
  { name: "Gerador de Senha", url: "./gerador-de-senha/", category: "Geradores", aliases: ["senha", "password"] },
  { name: "Gerador de Pessoa", url: "./gerador-de-pessoa/", category: "Geradores", aliases: ["dados de pessoa", "perfil falso", "pessoa ficticia"] },
  { name: "Gerador de Cart\u00e3o de Cr\u00e9dito", url: "./gerador-de-cartao-de-credito/", category: "Geradores", aliases: ["cartao de credito", "cartao de credito", "cartao para teste"] },
  { name: "Gerador de Conta Banc\u00e1ria", url: "./gerador-de-conta-bancaria/", category: "Geradores", aliases: ["conta bancaria", "conta bancaria", "dados bancarios"] },
  { name: "Gerador de RG", url: "./gerador-de-rg/", category: "Geradores", aliases: ["rg", "documento rg"] },
  { name: "Gerador de CNH", url: "./gerador-de-cnh/", category: "Geradores", aliases: ["cnh", "carteira de motorista"] },
  { name: "Gerador de CEP", url: "./gerador-de-cep/", category: "Geradores", aliases: ["cep", "codigo postal"] },
  { name: "Gerador de E-mail", url: "./gerador-de-email/", category: "Geradores", aliases: ["email", "e-mail"] },
  { name: "Gerador de Telefone", url: "./gerador-de-telefone/", category: "Geradores", aliases: ["telefone", "numero de telefone"] },
  { name: "Gerador de Nome", url: "./gerador-de-nome/", category: "Geradores", aliases: ["nome", "nome falso"] },
  { name: "Gerador de Empresa", url: "./gerador-de-empresa/", category: "Geradores", aliases: ["empresa", "empresa ficticia", "empresa ficticia"] },
  { name: "Gerador de Lorem Ipsum", url: "./gerador-de-lorem-ipsum/", category: "Geradores", aliases: ["lorem ipsum", "texto falso"] },
  { name: "N\u00famero por Extenso", url: "./numero-por-extenso/", category: "Conversores", aliases: ["numero por extenso", "numero por extenso"] },
  { name: "Valor por Extenso", url: "./valor-por-extenso/", category: "Conversores", aliases: ["valor por extenso", "escrever valor por extenso"] },
  { name: "Conversor de N\u00fameros Romanos", url: "./conversor-de-numeros-romanos/", category: "Conversores", aliases: ["numeros romanos", "numeros romanos", "romanos"] },
  { name: "Porcentagem para Decimal", url: "./porcentagem-para-decimal/", category: "Conversores", aliases: ["porcentagem para decimal"] },
  { name: "Decimal para Porcentagem", url: "./decimal-para-porcentagem/", category: "Conversores", aliases: ["decimal para porcentagem"] },
  { name: "Horas para Minutos", url: "./horas-para-minutos/", category: "Conversores", aliases: ["horas para minutos"] },
  { name: "Minutos para Horas", url: "./minutos-para-horas/", category: "Conversores", aliases: ["minutos para horas"] },
  { name: "Dias para Horas", url: "./dias-para-horas/", category: "Conversores", aliases: ["dias para horas"] },
  { name: "Anos para Meses", url: "./anos-para-meses/", category: "Conversores", aliases: ["anos para meses"] },
  { name: "Meses para Anos", url: "./meses-para-anos/", category: "Conversores", aliases: ["meses para anos"] }
];

const normalizeText = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const getSearchableText = (tool) => normalizeText([tool.name, tool.category, ...(tool.aliases || [])].join(" "));

const getToolScore = (tool, normalizedQuery) => {
  const normalizedName = normalizeText(tool.name);
  const searchableText = getSearchableText(tool);
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  if (!normalizedQuery) {
    return 0;
  }

  if (normalizedName === normalizedQuery) {
    return 120;
  }

  if ((tool.aliases || []).some((alias) => normalizeText(alias) === normalizedQuery)) {
    return 110;
  }

  if (normalizedName.startsWith(normalizedQuery)) {
    return 95;
  }

  if (searchableText.includes(normalizedQuery)) {
    return 80;
  }

  const matchedTerms = terms.filter((term) => searchableText.includes(term)).length;

  if (matchedTerms === terms.length && matchedTerms > 0) {
    return 50 + matchedTerms * 5;
  }

  return matchedTerms > 0 ? matchedTerms * 8 : 0;
};

const searchForm = document.querySelector("#home-search");
const searchInput = document.querySelector("#home-search-input");
const suggestionsContainer = document.querySelector("#home-search-suggestions");

const renderSuggestions = (results, query) => {
  if (!suggestionsContainer) {
    return;
  }

  if (!query || results.length === 0) {
    suggestionsContainer.hidden = true;
    suggestionsContainer.innerHTML = "";
    return;
  }

  suggestionsContainer.hidden = false;
  suggestionsContainer.innerHTML = results
    .map(
      (tool) => `
        <button class="home-search-suggestion" type="button" data-url="${tool.url}">
          <span>
            <strong>${tool.name}</strong>
            <span>${tool.category}</span>
          </span>
          <span class="home-search-suggestion-mark">Abrir</span>
        </button>
      `
    )
    .join("");
};

const findMatches = (query) => {
  const normalizedQuery = normalizeText(query);

  return homeTools
    .map((tool) => ({ ...tool, score: getToolScore(tool, normalizedQuery) }))
    .filter((tool) => tool.score > 0)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "pt-BR"))
    .slice(0, 4);
};

if (searchForm && searchInput) {
  searchInput.addEventListener("input", () => {
    searchInput.setCustomValidity("");
    renderSuggestions(findMatches(searchInput.value), searchInput.value);
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = normalizeText(searchInput.value);

    if (!query) {
      searchInput.focus();
      renderSuggestions([], "");
      return;
    }

    const [result] = findMatches(query);

    if (result) {
      window.location.href = result.url;
      return;
    }

    searchInput.setCustomValidity("Nenhuma ferramenta parecida foi encontrada.");
    searchInput.reportValidity();
    setTimeout(() => searchInput.setCustomValidity(""), 1500);
  });

  if (suggestionsContainer) {
    suggestionsContainer.addEventListener("click", (event) => {
      const button = event.target.closest("[data-url]");

      if (!button) {
        return;
      }

      window.location.href = button.dataset.url;
    });
  }
}
