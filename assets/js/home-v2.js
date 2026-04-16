const homeTools = [
  { name: "Calculadora de Porcentagem", url: "./calculadora-porcentagem/", category: "Matem\u00e1tica", aliases: ["porcentagem", "percentual", "desconto percentual"] },
  { name: "Qual a Porcentagem?", url: "./calculadora-qual-a-porcentagem/", category: "Matem\u00e1tica", aliases: ["qual a porcentagem", "quantos por cento", "valor representa quantos por cento"] },
  { name: "Calculadora de Regra de Tr\u00eas", url: "./calculadora-regra-de-tres/", category: "Matem\u00e1tica", aliases: ["regra de tres", "proporcao", "proporcao"] },
  { name: "Calculadora de IMC", url: "./calculadora-imc/", category: "Sa\u00fade", aliases: ["imc", "indice de massa corporal"] },
  { name: "Dias Entre Datas", url: "./calculadora-dias-entre-datas/", category: "Datas", aliases: ["dias entre datas", "intervalo entre datas"] },
  { name: "Calculadora de Financiamento", url: "./calculadora-financiamento/", category: "Finan\u00e7as", aliases: ["financiamento", "parcelas", "simular financiamento"] },
  { name: "Simulador de Empréstimo Pessoal", url: "./simulador-emprestimo-pessoal/", category: "Finan\u00e7as", aliases: ["emprestimo pessoal", "empréstimo pessoal", "simulador de emprestimo", "parcelas do emprestimo"] },
  { name: "\u00c1lcool ou Gasolina", url: "./calculadora-alcool-ou-gasolina/", category: "Combust\u00edvel", aliases: ["alcool ou gasolina", "combustivel compensa"] },
  { name: "Calculadora de Desconto", url: "./calculadora-desconto/", category: "Finan\u00e7as", aliases: ["desconto", "preco com desconto", "preco com desconto"] },
  { name: "Sal\u00e1rio L\u00edquido", url: "./calculadora-salario-liquido/", category: "Finan\u00e7as", aliases: ["salario liquido", "salario liquido", "descontos do salario"] },
  { name: "Juros Compostos", url: "./calculadora-juros-compostos/", category: "Finan\u00e7as", aliases: ["juros compostos", "investimento", "rendimento"] },
  { name: "Calculadora de Idade", url: "./calculadora-idade/", category: "Datas", aliases: ["idade", "quantos anos eu tenho"] },
  { name: "Calculadora de Dias \u00dateis", url: "./calculadora-dias-uteis/", category: "Datas", aliases: ["dias uteis", "dias uteis", "dias de trabalho"] },
  { name: "Calculadora de Data Futura", url: "./calculadora-data-futura/", category: "Datas", aliases: ["data futura", "daqui a quantos dias", "somar dias a uma data"] },
  { name: "Semanas Entre Datas", url: "./calculadora-semanas-entre-datas/", category: "Datas", aliases: ["semanas entre datas", "quantas semanas entre datas"] },
  { name: "Calculadora de IMC Infantil", url: "./calculadora-imc-infantil/", category: "Sa\u00fade", aliases: ["imc infantil", "peso infantil"] },
  { name: "Calculadora de Peso Ideal", url: "./calculadora-peso-ideal/", category: "Sa\u00fade", aliases: ["peso ideal", "peso saudavel", "peso saudavel"] },
  { name: "KM por Litro", url: "./calculadora-km-por-litro/", category: "Combust\u00edvel", aliases: ["km por litro", "consumo do carro"] },
  { name: "Autonomia do Carro", url: "./calculadora-autonomia-do-carro/", category: "Combust\u00edvel", aliases: ["autonomia do carro", "quantos km faz com um tanque", "autonomia tanque"] },
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
  { name: "Meses para Anos", url: "./meses-para-anos/", category: "Conversores", aliases: ["meses para anos"] },
  { name: "Calculadora de Churrasco", url: "./calculadora-de-churrasco/", category: "Cotidiano", aliases: ["churrasco", "carne por pessoa", "quanto comprar para churrasco"] },
  { name: "Quantidade de Bebida para Festa", url: "./quantidade-de-bebida-para-festa/", category: "Cotidiano", aliases: ["bebida para festa", "quantidade de bebida", "cerveja e refrigerante"] },
  { name: "Calculadora de Festa Infantil", url: "./calculadora-de-festa-infantil/", category: "Cotidiano", aliases: ["festa infantil", "bolo e salgados", "quanto comprar para festa infantil"] },
  { name: "Calculadora de Cerveja para Festa", url: "./calculadora-de-cerveja-para-festa/", category: "Cotidiano", aliases: ["cerveja para festa", "quantidade de cerveja", "latas para festa"] },
  { name: "Quantidade de Salgados por Pessoa", url: "./quantidade-de-salgados-por-pessoa/", category: "Cotidiano", aliases: ["salgados por pessoa", "quantos salgados", "salgados para festa"] },
  { name: "Quantidade de Bolo por Pessoa", url: "./quantidade-de-bolo-por-pessoa/", category: "Cotidiano", aliases: ["bolo por pessoa", "quantos quilos de bolo", "bolo para festa"] },
  { name: "Calculadora de Tinta", url: "./calculadora-de-tinta/", category: "Constru\u00e7\u00e3o", aliases: ["tinta", "quantos litros de tinta", "tinta por m2"] },
  { name: "Calculadora de Piso", url: "./calculadora-de-piso/", category: "Constru\u00e7\u00e3o", aliases: ["piso", "quantas caixas de piso", "metragem de piso"] },
  { name: "Calculadora de Concreto", url: "./calculadora-de-concreto/", category: "Constru\u00e7\u00e3o", aliases: ["concreto", "quantos metros cubicos de concreto", "volume de concreto"] },
  { name: "Calculadora de Argamassa", url: "./calculadora-de-argamassa/", category: "Constru\u00e7\u00e3o", aliases: ["argamassa", "quantos sacos de argamassa", "argamassa por m2"] },
  { name: "Calculadora de Rejunte", url: "./calculadora-de-rejunte/", category: "Constru\u00e7\u00e3o", aliases: ["rejunte", "quantos kg de rejunte", "rejunte por m2"] },
  { name: "Calculadora de Blocos para Parede", url: "./calculadora-de-blocos-para-parede/", category: "Constru\u00e7\u00e3o", aliases: ["blocos para parede", "quantos blocos por metro quadrado", "alvenaria"] },
  { name: "Calculadora de Comissao do Mercado Livre", url: "./calculadora-comissao-mercado-livre/", category: "Marketplace", aliases: ["mercado livre", "comissao mercado livre", "taxa mercado livre", "comissao ml"] },
  { name: "Calculadora de Comissao Shopee", url: "./calculadora-comissao-shopee/", category: "Marketplace", aliases: ["shopee", "comissao shopee", "taxa shopee", "taxas shopee"] },
  { name: "Calculadora de Lucro Real Mercado Livre e Shopee", url: "./calculadora-lucro-real-mercado-livre-shopee/", category: "Marketplace", aliases: ["lucro real", "lucro marketplace", "simulador de lucro", "lucro mercado livre", "lucro shopee"] },
  { name: "Calculadoras de Decisao", url: "./calculadoras-decisao/", category: "Decisao", aliases: ["calculadoras de decisao", "comparadores", "decidir melhor"] },
  { name: "Vale a Pena Financiar um Carro", url: "./vale-a-pena-financiar-um-carro/", category: "Decisao", aliases: ["vale a pena financiar carro", "financiar um carro", "compensa financiar carro"] },
  { name: "Alugar ou Comprar Imovel", url: "./alugar-ou-comprar-imovel/", category: "Decisao", aliases: ["alugar ou comprar", "alugar ou comprar imovel", "vale comprar imovel"] },
  { name: "Consorcio ou Financiamento", url: "./consorcio-ou-financiamento/", category: "Decisao", aliases: ["consorcio ou financiamento", "vale consorcio", "vale financiamento"] },
  { name: "Comprar a Vista ou Investir", url: "./comprar-a-vista-ou-investir/", category: "Decisao", aliases: ["comprar a vista ou investir", "a vista ou investir", "parcelar ou investir"] },
  { name: "Trocar de Carro ou Manter o Atual", url: "./trocar-de-carro-ou-manter-o-atual/", category: "Decisao", aliases: ["trocar de carro", "manter o carro atual", "vale trocar de carro"] },
  { name: "Vale a Pena Antecipar Parcelas", url: "./vale-a-pena-antecipar-parcelas/", category: "Decisao", aliases: ["antecipar parcelas", "vale antecipar parcelas", "quitar parcelas antes"] },
  { name: "Quitar Divida ou Investir", url: "./quitar-divida-ou-investir/", category: "Decisao", aliases: ["quitar divida ou investir", "pagar divida ou investir", "investir ou quitar divida"] },
  { name: "Vale a Pena Trocar de Emprego", url: "./vale-a-pena-trocar-de-emprego/", category: "Decisao", aliases: ["trocar de emprego", "vale trocar de emprego", "novo emprego compensa"] },
  { name: "Morar Perto do Trabalho ou Pagar Menos Aluguel", url: "./morar-perto-do-trabalho-ou-pagar-menos-aluguel/", category: "Decisao", aliases: ["morar perto do trabalho", "pagar menos aluguel", "morar perto ou pagar menos"] },
  { name: "Ter Carro ou Usar App e Transporte", url: "./ter-carro-ou-usar-app-transporte/", category: "Decisao", aliases: ["ter carro ou usar app", "usar app e transporte", "vale ter carro"] }
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
