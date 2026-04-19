const homeTools = [
  { name: "Calculadora de Porcentagem", url: "./calculadora-porcentagem/", category: "Matemática", aliases: ["porcentagem", "percentual", "desconto percentual"] },
  { name: "Qual a Porcentagem?", url: "./calculadora-qual-a-porcentagem/", category: "Matemática", aliases: ["qual a porcentagem", "quantos por cento", "valor representa quantos por cento"] },
  { name: "Calculadora de Regra de Três", url: "./calculadora-regra-de-tres/", category: "Matemática", aliases: ["regra de tres", "proporcao"] },
  { name: "Calculadora de Fração", url: "./calculadora-fracao/", category: "Matemática", aliases: ["fracao", "frações", "somar fração", "simplificar fração"] },
  { name: "Calculadora de Área", url: "./calculadora-area/", category: "Matemática", aliases: ["area", "calcular area", "área de figuras"] },
  { name: "Calculadora de Área do Círculo", url: "./calculadora-area-do-circulo/", category: "Matemática", aliases: ["area do circulo", "área do círculo", "circulo area"] },
  { name: "Calculadora de Equação do Segundo Grau", url: "./calculadora-equacao-do-segundo-grau/", category: "Matemática", aliases: ["equacao do segundo grau", "bhaskara", "equação do segundo grau", "delta"] },
  { name: "Calculadora de Média", url: "./calculadora-media/", category: "Matemática", aliases: ["media", "media simples", "calcular media"] },
  { name: "Calculadora de Média Escolar", url: "./calculadora-media-escolar/", category: "Matemática", aliases: ["media escolar", "média escolar", "nota final", "média final"] },
  { name: "Calculadora de Média Ponderada", url: "./calculadora-media-ponderada/", category: "Matemática", aliases: ["media ponderada", "nota com peso", "media com pesos"] },
  { name: "Calculadora de MDC", url: "./calculadora-mdc/", category: "Matemática", aliases: ["mdc", "maior divisor comum", "divisor comum"] },
  { name: "Calculadora de MMC", url: "./calculadora-mmc/", category: "Matemática", aliases: ["mmc", "menor multiplo comum", "multiplo comum"] },
  { name: "Calculadora de IMC", url: "./calculadora-imc/", category: "Saúde", aliases: ["imc", "indice de massa corporal"] },
  { name: "Dias Entre Datas", url: "./calculadora-dias-entre-datas/", category: "Datas", aliases: ["dias entre datas", "intervalo entre datas"] },
  { name: "Calculadora de Financiamento", url: "./calculadora-financiamento/", category: "Finanças", aliases: ["financiamento", "parcelas", "simular financiamento"] },
  { name: "Simulador de Empréstimo Pessoal", url: "./simulador-emprestimo-pessoal/", category: "Finanças", aliases: ["emprestimo pessoal", "empréstimo pessoal", "simulador de emprestimo", "parcelas do emprestimo"] },
  { name: "Calculadora de Rendimento CDI", url: "./calculadora-rendimento-cdi/", category: "Finanças", aliases: ["cdi", "rendimento cdi", "investimento cdi", "quanto rende cdi"] },
  { name: "Álcool ou Gasolina", url: "./calculadora-alcool-ou-gasolina/", category: "Combustível", aliases: ["alcool ou gasolina", "combustivel compensa"] },
  { name: "Calculadora de Desconto", url: "./calculadora-desconto/", category: "Finanças", aliases: ["desconto", "preco com desconto"] },
  { name: "Salário Líquido", url: "./calculadora-salario-liquido/", category: "Finanças", aliases: ["salario liquido", "descontos do salario"] },
  { name: "Juros Compostos", url: "./calculadora-juros-compostos/", category: "Finanças", aliases: ["juros compostos", "investimento", "rendimento"] },
  { name: "Calculadora de Idade", url: "./calculadora-idade/", category: "Datas", aliases: ["idade", "quantos anos eu tenho"] },
  { name: "Calculadora de Dias Úteis", url: "./calculadora-dias-uteis/", category: "Datas", aliases: ["dias uteis", "dias de trabalho"] },
  { name: "Calculadora de Data Futura", url: "./calculadora-data-futura/", category: "Datas", aliases: ["data futura", "daqui a quantos dias", "somar dias a uma data"] },
  { name: "Semanas Entre Datas", url: "./calculadora-semanas-entre-datas/", category: "Datas", aliases: ["semanas entre datas", "quantas semanas entre datas"] },
  { name: "Calculadora de IMC Infantil", url: "./calculadora-imc-infantil/", category: "Saúde", aliases: ["imc infantil", "peso infantil"] },
  { name: "Calculadora de Peso Ideal", url: "./calculadora-peso-ideal/", category: "Saúde", aliases: ["peso ideal", "peso saudavel"] },
  { name: "Calculadora de Calorias por Dia", url: "./calculadora-de-calorias-por-dia/", category: "Saúde", aliases: ["calorias por dia", "quantas calorias devo consumir", "calorias diarias"] },
  { name: "Calculadora de Taxa Metabólica Basal", url: "./calculadora-de-taxa-metabolica-basal/", category: "Saúde", aliases: ["tmb", "taxa metabolica basal", "metabolismo basal"] },
  { name: "Calculadora de Macros", url: "./calculadora-de-macros/", category: "Saúde", aliases: ["macros", "macronutrientes", "proteinas carboidratos gorduras"] },
  { name: "Calculadoras de Pets", url: "./calculadoras-pets/", category: "Pets", aliases: ["pets", "calculadoras de pets", "ferramentas para pets"] },
  { name: "Calculadora de Idade de Cachorro", url: "./calculadora-idade-de-cachorro/", category: "Pets", aliases: ["idade de cachorro", "cachorro em anos humanos"] },
  { name: "Calculadora de Idade de Gato", url: "./calculadora-de-idade-de-gato/", category: "Pets", aliases: ["idade de gato", "gato em anos humanos"] },
  { name: "Calculadora de Ração para Cachorro", url: "./calculadora-de-racao-para-cachorro/", category: "Pets", aliases: ["racao para cachorro", "quanto de racao dar para cachorro"] },
  { name: "Calculadora de Ração para Gato", url: "./calculadora-de-racao-para-gato/", category: "Pets", aliases: ["racao para gato", "quanto de racao dar para gato"] },
  { name: "Calculadora de Peso Ideal para Gato", url: "./calculadora-de-peso-ideal-para-gato/", category: "Pets", aliases: ["peso ideal para gato", "peso do gato"] },
  { name: "Calculadora de Gestação de Cadela", url: "./calculadora-de-gestacao-de-cadela/", category: "Pets", aliases: ["gestacao de cadela", "data de parto cadela"] },
  { name: "KM por Litro", url: "./calculadora-km-por-litro/", category: "Combustível", aliases: ["km por litro", "consumo do carro"] },
  { name: "Autonomia do Carro", url: "./calculadora-autonomia-do-carro/", category: "Combustível", aliases: ["autonomia do carro", "quantos km faz com um tanque", "autonomia tanque"] },
  { name: "Contador de Caracteres", url: "./contador-de-caracteres/", category: "Texto", aliases: ["contador de caracteres", "contar caracteres", "seo texto"] },
  { name: "Conversor de Texto", url: "./converter-de-texto/", category: "Texto", aliases: ["conversor de texto", "maiusculas e minusculas"] },
  { name: "Removedor de Espaços", url: "./removedor-de-espacos/", category: "Texto", aliases: ["remover espacos", "limpar texto"] },
  { name: "Texto para HTML", url: "./texto-para-html/", category: "Texto", aliases: ["texto para html", "converter texto em html"] },
  { name: "HTML para Texto", url: "./html-para-texto/", category: "Texto", aliases: ["html para texto", "remover html"] },
  { name: "Escapar HTML", url: "./escapar-html/", category: "Texto", aliases: ["escapar html", "entities html"] },
  { name: "Removedor de Quebras de Linha", url: "./removedor-de-quebras-de-linha/", category: "Texto", aliases: ["quebras de linha", "remover linhas"] },
  { name: "Removedor de Linhas Duplicadas", url: "./removedor-de-linhas-duplicadas/", category: "Texto", aliases: ["linhas duplicadas", "duplicadas"] },
  { name: "Ordenar Linhas", url: "./ordenar-linhas/", category: "Texto", aliases: ["ordenar linhas", "sort lines"] },
  { name: "Localizar e Substituir", url: "./localizar-e-substituir/", category: "Texto", aliases: ["localizar e substituir", "trocar texto"] },
  { name: "Ferramentas Dev", url: "./ferramentas-dev/", category: "Dev", aliases: ["ferramentas dev", "dev tools", "utilitarios dev"] },
  { name: "Formatador de JSON", url: "./formatador-json/", category: "Dev", aliases: ["json formatter", "formatar json", "validar json", "minificar json"] },
  { name: "Base64 Encode / Decode", url: "./base64-encode-decode/", category: "Dev", aliases: ["base64", "encode base64", "decode base64", "converter base64"] },
  { name: "JWT Decoder", url: "./jwt-decoder/", category: "Dev", aliases: ["jwt", "jwt decoder", "decode jwt", "token jwt"] },
  { name: "Regex Tester", url: "./regex-tester/", category: "Dev", aliases: ["regex", "expressao regular", "testar regex", "regexp"] },
  { name: "URL Encode / Decode", url: "./url-encode-decode/", category: "Dev", aliases: ["url encode", "url decode", "encode url", "decode url"] },
  { name: "Gerador de Hash", url: "./gerador-de-hash/", category: "Dev", aliases: ["hash", "sha256", "sha-256", "gerar hash"] },
  { name: "Gerador de CPF", url: "./gerador-de-cpf/", category: "Geradores", aliases: ["gerador de cpf", "cpf falso", "cpf para teste"] },
  { name: "Gerador de CNPJ", url: "./gerador-de-cnpj/", category: "Geradores", aliases: ["gerador de cnpj", "cnpj falso", "cnpj para teste"] },
  { name: "Gerador de UUID", url: "./gerador-de-uuid/", category: "Geradores", aliases: ["uuid", "guid", "identificador"] },
  { name: "Gerador de Senha", url: "./gerador-de-senha/", category: "Geradores", aliases: ["senha", "password"] },
  { name: "Gerador de Pessoa", url: "./gerador-de-pessoa/", category: "Geradores", aliases: ["dados de pessoa", "perfil falso", "pessoa ficticia"] },
  { name: "Gerador de Cartão de Crédito", url: "./gerador-de-cartao-de-credito/", category: "Geradores", aliases: ["cartao de credito", "cartao para teste"] },
  { name: "Gerador de Conta Bancária", url: "./gerador-de-conta-bancaria/", category: "Geradores", aliases: ["conta bancaria", "dados bancarios"] },
  { name: "Gerador de RG", url: "./gerador-de-rg/", category: "Geradores", aliases: ["rg", "documento rg"] },
  { name: "Gerador de CNH", url: "./gerador-de-cnh/", category: "Geradores", aliases: ["cnh", "carteira de motorista"] },
  { name: "Gerador de CEP", url: "./gerador-de-cep/", category: "Geradores", aliases: ["cep", "codigo postal"] },
  { name: "Gerador de E-mail", url: "./gerador-de-email/", category: "Geradores", aliases: ["email", "e-mail"] },
  { name: "Gerador de Telefone", url: "./gerador-de-telefone/", category: "Geradores", aliases: ["telefone", "numero de telefone"] },
  { name: "Gerador de QR Code", url: "./gerador-de-qrcode/", category: "QR", aliases: ["qrcode", "qr code", "gerar qr", "codigo qr"] },
  { name: "Gerador de Link para WhatsApp", url: "./gerador-de-link-whatsapp/", category: "QR", aliases: ["link whatsapp", "whatsapp link", "gerador whatsapp", "link para whatsapp"] },
  { name: "Ferramentas QR", url: "./ferramentas-qr/", category: "QR", aliases: ["ferramentas qr", "area qr", "colecao qr"] },
  { name: "Gerador de Nome", url: "./gerador-de-nome/", category: "Geradores", aliases: ["nome", "nome falso"] },
  { name: "Gerador de Empresa", url: "./gerador-de-empresa/", category: "Geradores", aliases: ["empresa", "empresa ficticia"] },
  { name: "Gerador de Lorem Ipsum", url: "./gerador-de-lorem-ipsum/", category: "Geradores", aliases: ["lorem ipsum", "texto falso"] },
  { name: "Número por Extenso", url: "./numero-por-extenso/", category: "Conversores", aliases: ["numero por extenso"] },
  { name: "Valor por Extenso", url: "./valor-por-extenso/", category: "Conversores", aliases: ["valor por extenso", "escrever valor por extenso"] },
  { name: "Conversor de Números Romanos", url: "./conversor-de-numeros-romanos/", category: "Conversores", aliases: ["numeros romanos", "romanos"] },
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
  { name: "Calculadora de Tinta", url: "./calculadora-de-tinta/", category: "Construção", aliases: ["tinta", "quantos litros de tinta", "tinta por m2"] },
  { name: "Calculadora de Metros Quadrados", url: "./calculadora-metros-quadrados/", category: "Construção", aliases: ["metros quadrados", "metragem", "m2", "metro quadrado"] },
  { name: "Calculadora de Piso", url: "./calculadora-de-piso/", category: "Construção", aliases: ["piso", "quantas caixas de piso", "metragem de piso"] },
  { name: "Calculadora de Concreto", url: "./calculadora-de-concreto/", category: "Construção", aliases: ["concreto", "quantos metros cubicos de concreto", "volume de concreto"] },
  { name: "Calculadora de Argamassa", url: "./calculadora-de-argamassa/", category: "Construção", aliases: ["argamassa", "quantos sacos de argamassa", "argamassa por m2"] },
  { name: "Calculadora de Rejunte", url: "./calculadora-de-rejunte/", category: "Construção", aliases: ["rejunte", "quantos kg de rejunte", "rejunte por m2"] },
  { name: "Calculadora de Blocos para Parede", url: "./calculadora-de-blocos-para-parede/", category: "Construção", aliases: ["blocos para parede", "quantos blocos por metro quadrado", "alvenaria"] },
  { name: "Calculadora de Comissão do Mercado Livre", url: "./calculadora-comissao-mercado-livre/", category: "Marketplace", aliases: ["mercado livre", "comissao mercado livre", "taxa mercado livre", "comissao ml"] },
  { name: "Calculadora de Comissão Shopee", url: "./calculadora-comissao-shopee/", category: "Marketplace", aliases: ["shopee", "comissao shopee", "taxa shopee", "taxas shopee"] },
  { name: "Calculadora de Lucro Real Mercado Livre e Shopee", url: "./calculadora-lucro-real-mercado-livre-shopee/", category: "Marketplace", aliases: ["lucro real", "lucro marketplace", "simulador de lucro", "lucro mercado livre", "lucro shopee"] },
  { name: "Calculadoras de Decisão", url: "./calculadoras-decisao/", category: "Decisão", aliases: ["calculadoras de decisao", "comparadores", "decidir melhor"] },
  { name: "Vale a Pena Financiar um Carro", url: "./vale-a-pena-financiar-um-carro/", category: "Decisão", aliases: ["vale a pena financiar carro", "financiar um carro", "compensa financiar carro"] },
  { name: "Alugar ou Comprar Imóvel", url: "./alugar-ou-comprar-imovel/", category: "Decisão", aliases: ["alugar ou comprar", "alugar ou comprar imovel", "vale comprar imovel"] },
  { name: "Consórcio ou Financiamento", url: "./consorcio-ou-financiamento/", category: "Decisão", aliases: ["consorcio ou financiamento", "vale consorcio", "vale financiamento"] },
  { name: "Comprar à Vista ou Investir", url: "./comprar-a-vista-ou-investir/", category: "Decisão", aliases: ["comprar a vista ou investir", "a vista ou investir", "parcelar ou investir"] },
  { name: "Trocar de Carro ou Manter o Atual", url: "./trocar-de-carro-ou-manter-o-atual/", category: "Decisão", aliases: ["trocar de carro", "manter o carro atual", "vale trocar de carro"] },
  { name: "Vale a Pena Antecipar Parcelas", url: "./vale-a-pena-antecipar-parcelas/", category: "Decisão", aliases: ["antecipar parcelas", "vale antecipar parcelas", "quitar parcelas antes"] },
  { name: "Quitar Dívida ou Investir", url: "./quitar-divida-ou-investir/", category: "Decisão", aliases: ["quitar divida ou investir", "pagar divida ou investir", "investir ou quitar divida"] },
  { name: "Vale a Pena Trocar de Emprego", url: "./vale-a-pena-trocar-de-emprego/", category: "Decisão", aliases: ["trocar de emprego", "vale trocar de emprego", "novo emprego compensa"] },
  { name: "Morar Perto do Trabalho ou Pagar Menos Aluguel", url: "./morar-perto-do-trabalho-ou-pagar-menos-aluguel/", category: "Decisão", aliases: ["morar perto do trabalho", "pagar menos aluguel", "morar perto ou pagar menos"] },
  { name: "Ter Carro ou Usar App e Transporte", url: "./ter-carro-ou-usar-app-transporte/", category: "Decisão", aliases: ["ter carro ou usar app", "usar app e transporte", "vale ter carro"] },
  { name: "Calculadoras de Trabalho e RH", url: "./calculadoras-trabalho-rh/", category: "Trabalho e RH", aliases: ["trabalho e rh", "calculadoras de trabalho", "calculadoras de rh", "folha e beneficios"] },
  { name: "Calculadora de Seguro-Desemprego", url: "./calculadora-seguro-desemprego/", category: "Trabalho e RH", aliases: ["seguro desemprego", "seguro-desemprego", "parcela seguro desemprego", "calcular seguro desemprego"] },
  { name: "Calculadora de Saque-Aniversário FGTS", url: "./calculadora-saque-aniversario-fgts/", category: "Trabalho e RH", aliases: ["saque aniversario fgts", "saque-aniversario fgts", "fgts aniversario", "quanto posso sacar fgts"] },
  { name: "Calculadora de FGTS", url: "./calculadora-fgts/", category: "Trabalho e RH", aliases: ["fgts", "saldo fgts", "deposito fgts", "depósito fgts"] },
  { name: "Calculadora de Rescisão", url: "./calculadora-rescisao/", category: "Trabalho e RH", aliases: ["rescisao", "calcular rescisao", "verbas rescisorias"] },
  { name: "Calculadora de Férias", url: "./calculadora-ferias/", category: "Trabalho e RH", aliases: ["ferias", "calcular ferias", "um terco de ferias"] },
  { name: "Calculadora de Horas Extras", url: "./calculadora-horas-extras/", category: "Trabalho e RH", aliases: ["horas extras", "hora extra", "calcular hora extra"] },
  { name: "Calculadora de Adicional Noturno", url: "./calculadora-adicional-noturno/", category: "Trabalho e RH", aliases: ["adicional noturno", "hora noturna", "calcular adicional noturno"] },
  { name: "Calculadora de Banco de Horas", url: "./calculadora-banco-de-horas/", category: "Trabalho e RH", aliases: ["banco de horas", "saldo banco de horas"] },
  { name: "Calculadora de INSS", url: "./calculadora-inss/", category: "Trabalho e RH", aliases: ["inss", "desconto inss", "previdencia salario"] },
  { name: "Calculadora de IRRF sobre Salário", url: "./calculadora-irrf-salario/", category: "Trabalho e RH", aliases: ["irrf salario", "imposto de renda salario", "retencao irrf"] },
  { name: "Calculadora de Vale-Transporte", url: "./calculadora-vale-transporte/", category: "Trabalho e RH", aliases: ["vale transporte", "desconto vale transporte", "vt"] },
  { name: "Calculadora de Vale-Refeição por Mês", url: "./calculadora-vale-refeicao-por-mes/", category: "Trabalho e RH", aliases: ["vale refeicao", "vr por mes", "beneficio refeicao"] },
  { name: "Calculadora de Custo de Funcionário CLT", url: "./calculadora-custo-de-funcionario-clt/", category: "Trabalho e RH", aliases: ["custo funcionario clt", "custo colaborador", "custo de funcionario"] },
  { name: "Calculadora de Comissão por Meta", url: "./calculadora-comissao-por-meta/", category: "Trabalho e RH", aliases: ["comissao por meta", "meta de vendas", "bonus por meta"] },
  { name: "Calculadoras de Gestação e Bebê", url: "./calculadoras-gestacao-bebe/", category: "Gestação e Bebê", aliases: ["gestacao e bebe", "calculadoras de gestacao", "ciclo e fertilidade"] },
  { name: "Calculadora de Idade Gestacional", url: "./calculadora-idade-gestacional/", category: "Gestação e Bebê", aliases: ["idade gestacional", "semanas de gestacao", "dum gestacao"] },
  { name: "Calculadora de Data Provável do Parto", url: "./calculadora-data-provavel-do-parto/", category: "Gestação e Bebê", aliases: ["data provavel do parto", "dpp", "parto previsto"] },
  { name: "Calculadora de Período Fértil", url: "./calculadora-periodo-fertil/", category: "Gestação e Bebê", aliases: ["periodo fertil", "janela fertil", "dias ferteis"] },
  { name: "Calculadora de Ovulação", url: "./calculadora-ovulacao/", category: "Gestação e Bebê", aliases: ["ovulacao", "dia da ovulacao"] },
  { name: "Calculadora de Menstruação", url: "./calculadora-menstruacao/", category: "Gestação e Bebê", aliases: ["menstruacao", "proxima menstruacao", "ciclo menstrual"] },
  { name: "Calculadora de Intervalo Entre Contrações", url: "./calculadora-intervalo-entre-contracoes/", category: "Gestação e Bebê", aliases: ["intervalo entre contracoes", "contracoes", "media entre contracoes"] }
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
const searchChips = Array.from(document.querySelectorAll(".home-search-chip"));
const suggestionLimit = 4;
let activeSuggestionIndex = -1;

const getSuggestionButtons = () =>
  suggestionsContainer ? Array.from(suggestionsContainer.querySelectorAll("[data-url]")) : [];

const setActiveSuggestion = (index) => {
  const buttons = getSuggestionButtons();

  buttons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === index;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  activeSuggestionIndex = index;
};

const renderSuggestions = (results, query) => {
  if (!suggestionsContainer) {
    return;
  }

  if (!query || results.length === 0) {
    activeSuggestionIndex = -1;
    suggestionsContainer.hidden = true;
    suggestionsContainer.innerHTML = "";
    return;
  }

  activeSuggestionIndex = -1;
  suggestionsContainer.hidden = false;
  suggestionsContainer.innerHTML = results
    .map(
      (tool, index) => `
        <button class="home-search-suggestion" type="button" data-url="${tool.url}" data-index="${index}" aria-selected="false">
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
    .slice(0, suggestionLimit);
};

const openMatch = (url) => {
  window.location.href = url;
};

const updatePortalStats = () => {
  const calculatorCategories = new Set([
    "Matemática",
    "Saúde",
    "Datas",
    "Finanças",
    "Combustível",
    "Pets",
    "Cotidiano",
    "Construção",
    "Marketplace",
    "Decisão",
    "Trabalho e RH",
    "Gestação e Bebê"
  ]);

  const calculators = homeTools.filter((tool) => calculatorCategories.has(tool.category)).length;
  const collections = document.querySelectorAll(".home-hub-card, .categoria-card, .home-context-card").length;
  const stats = {
    calculators,
    tools: homeTools.length,
    collections
  };

  document.querySelectorAll("[data-stat]").forEach((element) => {
    const statKey = element.getAttribute("data-stat");
    const value = stats[statKey];

    if (typeof value === "number") {
      element.textContent = String(value);
    }
  });
};

if (searchForm && searchInput) {
  searchInput.addEventListener("input", () => {
    searchInput.setCustomValidity("");
    renderSuggestions(findMatches(searchInput.value), searchInput.value);
  });

  searchInput.addEventListener("keydown", (event) => {
    const buttons = getSuggestionButtons();

    if (!buttons.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = activeSuggestionIndex >= buttons.length - 1 ? 0 : activeSuggestionIndex + 1;
      setActiveSuggestion(nextIndex);
      buttons[nextIndex].focus();
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const previousIndex = activeSuggestionIndex <= 0 ? buttons.length - 1 : activeSuggestionIndex - 1;
      setActiveSuggestion(previousIndex);
      buttons[previousIndex].focus();
    }

    if (event.key === "Escape") {
      renderSuggestions([], "");
    }
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
      openMatch(result.url);
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

      openMatch(button.dataset.url);
    });

    suggestionsContainer.addEventListener("keydown", (event) => {
      const buttons = getSuggestionButtons();

      if (!buttons.length) {
        return;
      }

      const currentIndex = buttons.findIndex((button) => button === event.target);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const nextIndex = currentIndex >= buttons.length - 1 ? 0 : currentIndex + 1;
        setActiveSuggestion(nextIndex);
        buttons[nextIndex].focus();
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const previousIndex = currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1;
        setActiveSuggestion(previousIndex);
        buttons[previousIndex].focus();
      }

      if (event.key === "Escape") {
        event.preventDefault();
        renderSuggestions([], "");
        searchInput.focus();
      }
    });
  }

  searchChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      searchInput.value = chip.dataset.query || "";
      searchInput.focus();
      renderSuggestions(findMatches(searchInput.value), searchInput.value);
    });
  });
}

updatePortalStats();
