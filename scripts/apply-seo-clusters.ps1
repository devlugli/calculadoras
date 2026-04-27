$ErrorActionPreference = "Stop"

Set-StrictMode -Version Latest

function Set-TitleTag {
  param(
    [string]$Html,
    [string]$Title
  )

  return [regex]::Replace($Html, '<title>.*?</title>', "<title>$Title</title>", "Singleline")
}

function Upsert-MetaTag {
  param(
    [string]$Html,
    [string]$MatchPattern,
    [string]$Replacement,
    [string]$InsertionPoint = "</head>"
  )

  if ([regex]::IsMatch($Html, $MatchPattern, "IgnoreCase")) {
    return [regex]::Replace($Html, $MatchPattern, $Replacement, "IgnoreCase")
  }

  return $Html.Replace($InsertionPoint, "$Replacement`r`n$InsertionPoint")
}

function Replace-MarkedBlock {
  param(
    [string]$Html,
    [string]$StartMarker,
    [string]$EndMarker,
    [string]$Block,
    [string]$Anchor
  )

  $escapedStart = [regex]::Escape($StartMarker)
  $escapedEnd = [regex]::Escape($EndMarker)
  $pattern = "$escapedStart.*?$escapedEnd\s*"
  $cleanHtml = [regex]::Replace($Html, $pattern, "", "Singleline")

  if (-not $cleanHtml.Contains($Anchor)) {
    throw "Anchor '$Anchor' not found."
  }

  return $cleanHtml.Replace($Anchor, "$Block`r`n$Anchor")
}

function Build-WebApplicationJson {
  param(
    [hashtable]$Page
  )

  $payload = [ordered]@{
    "@context" = "https://schema.org"
    "@type" = "WebApplication"
    name = $Page.AppName
    url = $Page.Canonical
    description = $Page.AppDescription
    applicationCategory = $Page.ApplicationCategory
    operatingSystem = "Any"
    inLanguage = "pt-BR"
  }

  return ($payload | ConvertTo-Json -Depth 6 -Compress)
}

function Build-FaqJson {
  param(
    [hashtable]$Page
  )

  $mainEntity = @()
  foreach ($faq in $Page.Faqs) {
    $mainEntity += [ordered]@{
      "@type" = "Question"
      name = $faq.Question
      acceptedAnswer = [ordered]@{
        "@type" = "Answer"
        text = $faq.Answer
      }
    }
  }

  $payload = [ordered]@{
    "@context" = "https://schema.org"
    "@type" = "FAQPage"
    mainEntity = $mainEntity
  }

  return ($payload | ConvertTo-Json -Depth 8 -Compress)
}

$pages = @(
  @{
    Path = "calculadora-salario-liquido/index.html"
    Canonical = "https://calcbrazil.com/calculadora-salario-liquido/"
    Title = "Calculadora de Salario Liquido (Atualizado 2026) - Simule Agora"
    MetaDescription = "Calcule o salario liquido online, simule descontos de INSS e IRRF e descubra quanto realmente entra no bolso em segundos."
    OgTitle = "Calculadora de Salario Liquido (Atualizado 2026) - Simule Agora"
    OgDescription = "Simule salario liquido, descontos e valor final para planejar melhor sua renda mensal."
    AppName = "Calculadora de Salario Liquido"
    AppDescription = "Simule o salario liquido com base no salario bruto e nos descontos aplicados."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como calcular salario liquido?"; Answer = "Comece pelo salario bruto e desconte INSS, IRRF, vale-transporte e outros descontos para chegar ao valor liquido." },
      @{ Question = "O que entra no desconto do salario?"; Answer = "Os descontos mais comuns sao INSS, imposto de renda, beneficios compartilhados e descontos previstos em folha." },
      @{ Question = "Essa simulacao substitui o holerite?"; Answer = "Nao. Ela serve como estimativa inicial e o valor final pode mudar conforme a folha real da empresa." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como calcular salario liquido</h2>
  <p>O salario liquido e o valor que sobra depois de aplicar os descontos sobre o salario bruto. Em geral, o caminho passa por INSS, IRRF, beneficios e eventuais descontos adicionais da folha.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Se o salario bruto for R$ 3.000 e os descontos totais somarem 10%, a conta simplificada fica em R$ 3.000 menos R$ 300. O resultado estimado e um salario liquido de R$ 2.700.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular salario liquido?</h3>
  <p>Subtraia do salario bruto os descontos de folha para chegar ao valor final recebido.</p>
  <h3>Qual a diferenca entre bruto e liquido?</h3>
  <p>O bruto e o valor contratual antes da folha; o liquido e o valor que realmente cai na conta.</p>
  <h3>Onde encontro outras contas de folha?</h3>
  <p>Veja o hub <a href="/calculadoras-trabalho-rh/">Calculadoras de Trabalho e RH</a> para continuar a simulacao com INSS, IRRF, FGTS, ferias e rescisao.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-decimo-terceiro/index.html"
    Canonical = "https://calcbrazil.com/calculadora-decimo-terceiro/"
    Title = "Calculadora de 13o Salario (Atualizado 2026) - Simule Agora"
    MetaDescription = "Calcule o 13o salario online, descubra o valor proporcional pelos meses trabalhados e simule o pagamento de forma imediata."
    OgTitle = "Calculadora de 13o Salario (Atualizado 2026) - Simule Agora"
    OgDescription = "Descubra quanto voce pode receber de decimo terceiro com base no salario e nos meses trabalhados."
    AppName = "Calculadora de 13o Salario"
    AppDescription = "Calcule o valor proporcional do decimo terceiro salario com base no salario mensal e nos meses trabalhados."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como calcular o 13o salario?"; Answer = "Divida o salario por 12 e multiplique pelos meses trabalhados no ano para estimar o valor proporcional." },
      @{ Question = "Quem recebe 13o proporcional?"; Answer = "Trabalhadores que nao completaram o ano inteiro ainda podem receber o valor proporcional aos meses trabalhados." },
      @{ Question = "O 13o tem descontos?"; Answer = "Pode haver descontos como INSS e IRRF dependendo do valor pago e das regras aplicaveis." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como funciona o calculo do 13o salario</h2>
  <p>O decimo terceiro e proporcional aos meses trabalhados no ano. Cada mes conta como um doze avos do salario, o que ajuda a estimar rapidamente quanto deve entrar na primeira ou na segunda parcela.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Com salario de R$ 3.000 e 8 meses trabalhados, a conta simplificada fica em R$ 3.000 dividido por 12 e multiplicado por 8. O resultado estimado e R$ 2.000.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular o 13o salario?</h3>
  <p>Use o salario mensal e a quantidade de meses trabalhados para encontrar o valor proporcional.</p>
  <h3>Quem recebe 13o proporcional?</h3>
  <p>Quem trabalhou apenas parte do ano costuma receber a parcela proporcional ao periodo trabalhado.</p>
  <h3>Onde continuar a simulacao?</h3>
  <p>Abra o hub <a href="/calculadoras-trabalho-rh/">Calculadoras de Trabalho e RH</a> para comparar salario liquido, ferias, rescisao e descontos de folha.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-ferias/index.html"
    Canonical = "https://calcbrazil.com/calculadora-ferias/"
    Title = "Calculadora de Ferias (Atualizado 2026) - Resultado Imediato"
    MetaDescription = "Calcule ferias online com 1/3 constitucional, venda de dias e valor estimado para descobrir quanto voce pode receber."
    OgTitle = "Calculadora de Ferias (Atualizado 2026) - Resultado Imediato"
    OgDescription = "Simule o valor de ferias com terco constitucional e abono pecuniario em poucos segundos."
    AppName = "Calculadora de Ferias"
    AppDescription = "Calcule o valor estimado de ferias com base no salario, nos dias de descanso e na venda de dias."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como calcular ferias?"; Answer = "Calcule o valor proporcional aos dias de descanso, some um terco constitucional e acrescente o abono se houver venda de dias." },
      @{ Question = "O que e 1/3 constitucional?"; Answer = "E um adicional pago junto com as ferias, equivalente a um terco do valor do periodo de descanso." },
      @{ Question = "Posso vender dias de ferias?"; Answer = "Em geral, a legislacao permite converter parte das ferias em abono pecuniario, respeitando as regras aplicaveis." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como calcular ferias com 1/3</h2>
  <p>A base da conta considera o salario proporcional aos dias de ferias e adiciona o um terco constitucional. Se houver venda de dias, o abono pecuniario entra como valor extra na simulacao.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Com salario de R$ 3.200 e 30 dias de ferias, a base simplificada e R$ 3.200. Somando o um terco, a estimativa sobe para aproximadamente R$ 4.266,67 antes de descontos.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular ferias?</h3>
  <p>Use o salario mensal, os dias de descanso e o eventual abono para chegar ao valor estimado.</p>
  <h3>O que e 1/3 constitucional?</h3>
  <p>E o adicional obrigatorio pago junto com as ferias.</p>
  <h3>Quais outras contas combinam com esta?</h3>
  <p>Veja <a href="/calculadoras-trabalho-rh/">Calculadoras de Trabalho e RH</a> para simular salario liquido, rescisao, FGTS e INSS.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-rescisao/index.html"
    Canonical = "https://calcbrazil.com/calculadora-rescisao/"
    Title = "Calculadora de Rescisao (Atualizado 2026) - Simule Agora"
    MetaDescription = "Calcule rescisao online, estime aviso previo, ferias, 13o e multa do FGTS para descobrir o valor final de forma rapida."
    OgTitle = "Calculadora de Rescisao (Atualizado 2026) - Simule Agora"
    OgDescription = "Simule a rescisao trabalhista com componentes comuns como aviso, ferias, 13o e multa de FGTS."
    AppName = "Calculadora de Rescisao"
    AppDescription = "Estime valores de rescisao trabalhista, incluindo ferias, decimo terceiro, aviso previo e multa de FGTS."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como calcular rescisao?"; Answer = "A rescisao pode reunir saldo de salario, aviso previo, ferias vencidas ou proporcionais, decimo terceiro proporcional e multa do FGTS." },
      @{ Question = "A multa do FGTS entra na rescisao?"; Answer = "Em cenarios aplicaveis, a multa rescisoria sobre o FGTS faz parte da estimativa total." },
      @{ Question = "O resultado e exato?"; Answer = "Nao. A conta e informativa e pode mudar conforme tipo de desligamento, convencao e verbas especificas." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como calcular rescisao trabalhista</h2>
  <p>A rescisao combina varias verbas em uma unica conta. Dependendo do caso, podem entrar saldo de salario, aviso previo, ferias, decimo terceiro proporcional e multa sobre o FGTS.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Imagine um desligamento com saldo de salario de R$ 1.000, ferias proporcionais de R$ 800, 13o proporcional de R$ 700 e multa de FGTS de R$ 1.200. A soma simplificada chegaria a R$ 3.700 antes de outros ajustes.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular rescisao?</h3>
  <p>Some as verbas devidas no desligamento conforme o tipo de rescisao e a situacao do contrato.</p>
  <h3>A multa do FGTS entra na conta?</h3>
  <p>Sim, em cenarios aplicaveis ela costuma fazer parte da simulacao.</p>
  <h3>Que outras paginas ajudam nesta analise?</h3>
  <p>Continue no hub <a href="/calculadoras-trabalho-rh/">Calculadoras de Trabalho e RH</a> para abrir FGTS, ferias, INSS e IRRF.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-horas-extras/index.html"
    Canonical = "https://calcbrazil.com/calculadora-horas-extras/"
    Title = "Calculadora de Horas Extras (Atualizado 2026) - Calcule Agora"
    MetaDescription = "Calcule horas extras online com adicional de 50% ou 100%, descubra o valor por hora e simule o total a receber."
    OgTitle = "Calculadora de Horas Extras (Atualizado 2026) - Calcule Agora"
    OgDescription = "Descubra rapidamente o valor das horas extras e o impacto no pagamento mensal."
    AppName = "Calculadora de Horas Extras"
    AppDescription = "Calcule o valor total das horas extras com base no salario e no adicional aplicado."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como calcular horas extras?"; Answer = "Encontre o valor da hora normal, aplique o adicional de 50% ou 100% e multiplique pela quantidade de horas extras." },
      @{ Question = "Qual e o valor da hora extra 50%?"; Answer = "Ela corresponde ao valor da hora normal acrescido de cinquenta por cento." },
      @{ Question = "Hora extra altera o salario liquido?"; Answer = "Pode alterar, porque aumenta a remuneracao e pode impactar descontos de folha." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como calcular horas extras</h2>
  <p>Primeiro voce descobre o valor da hora normal e depois aplica o adicional correspondente. Em muitos casos, as horas extras de dias comuns usam 50%, enquanto domingos e feriados podem usar 100%.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Se a hora normal for R$ 20 e voce fizer 10 horas extras com adicional de 50%, cada hora passa a valer R$ 30. O total estimado fica em R$ 300.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular horas extras?</h3>
  <p>Use o valor da hora base, aplique o adicional e multiplique pelo total de horas trabalhadas a mais.</p>
  <h3>Qual adicional devo usar?</h3>
  <p>Isso depende da regra aplicavel ao contrato, ao dia e ao horario trabalhado.</p>
  <h3>Onde vejo outras contas de folha?</h3>
  <p>No hub <a href="/calculadoras-trabalho-rh/">Calculadoras de Trabalho e RH</a> voce encontra salario liquido, INSS, IRRF e banco de horas.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-fgts/index.html"
    Canonical = "https://calcbrazil.com/calculadora-fgts/"
    Title = "Calculadora de FGTS (Atualizado 2026) - Simule Agora"
    MetaDescription = "Calcule FGTS online, descubra deposito mensal, saldo estimado e multa rescisoria para entender o valor de forma imediata."
    OgTitle = "Calculadora de FGTS (Atualizado 2026) - Simule Agora"
    OgDescription = "Simule o deposito do FGTS, acompanhe o saldo estimado e veja a multa rescisoria."
    AppName = "Calculadora de FGTS"
    AppDescription = "Calcule depositos mensais de FGTS, saldo estimado e multa rescisoria com base no salario."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como calcular FGTS?"; Answer = "Em uma conta simplificada, o deposito mensal do FGTS corresponde a um percentual do salario bruto." },
      @{ Question = "A multa do FGTS entra na rescisao?"; Answer = "Em cenarios aplicaveis, a multa rescisoria sobre o saldo do FGTS entra na conta final." },
      @{ Question = "FGTS e desconto no salario?"; Answer = "Nao. O FGTS e um deposito feito pelo empregador e nao um desconto direto sobre o salario." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como calcular FGTS</h2>
  <p>O FGTS e normalmente estimado a partir do salario bruto mensal. A ferramenta ajuda a visualizar deposito, saldo acumulado e o impacto da multa rescisoria em desligamentos aplicaveis.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Se o salario for R$ 3.000 e o deposito mensal estimado for R$ 240, em 12 meses o acumulado simplificado chega a R$ 2.880, sem considerar correcao monetaria.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular FGTS?</h3>
  <p>Use o salario mensal como base para estimar o deposito recorrente e o saldo acumulado.</p>
  <h3>FGTS e descontado do salario?</h3>
  <p>Nao, ele e recolhido pelo empregador.</p>
  <h3>Onde encontro mais simulacoes de desligamento?</h3>
  <p>Abra <a href="/calculadoras-trabalho-rh/">Calculadoras de Trabalho e RH</a> para combinar FGTS com rescisao, ferias e 13o.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-inss/index.html"
    Canonical = "https://calcbrazil.com/calculadora-inss/"
    Title = "Calculadora de INSS (Atualizado 2026) - Descubra o Desconto"
    MetaDescription = "Calcule INSS online com tabela progressiva, descubra o desconto previdenciario e simule o impacto no salario agora."
    OgTitle = "Calculadora de INSS (Atualizado 2026) - Descubra o Desconto"
    OgDescription = "Simule o desconto de INSS pela tabela progressiva e veja a aliquota efetiva no salario."
    AppName = "Calculadora de INSS"
    AppDescription = "Calcule o desconto previdenciario mensal com base na tabela progressiva do INSS."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como calcular INSS?"; Answer = "O desconto do INSS usa uma tabela progressiva aplicada por faixas de salario." },
      @{ Question = "O INSS muda conforme o salario?"; Answer = "Sim. O valor pode subir conforme a faixa salarial, respeitando as regras e o teto previdenciario." },
      @{ Question = "INSS influencia o salario liquido?"; Answer = "Sim. O desconto do INSS reduz a base que chega ao salario liquido e ainda impacta o IRRF." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como calcular o desconto de INSS</h2>
  <p>O INSS segue uma logica progressiva por faixas. Isso significa que cada parte do salario pode receber uma aliquota diferente, resultando em um desconto efetivo menor que a aliquota da faixa mais alta.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Se um salario de R$ 4.500 gerar um desconto estimado de R$ 414, o trabalhador passa a enxergar melhor o impacto do INSS antes de calcular salario liquido e IRRF.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular INSS?</h3>
  <p>A calculadora aplica a tabela progressiva sobre as faixas de salario.</p>
  <h3>INSS reduz a base do IRRF?</h3>
  <p>Sim, em geral o desconto previdenciario entra antes do calculo do imposto de renda retido.</p>
  <h3>Quais paginas combinam com esta?</h3>
  <p>Continue em <a href="/calculadoras-trabalho-rh/">Calculadoras de Trabalho e RH</a> para abrir salario liquido, IRRF, FGTS e rescisao.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-irrf-salario/index.html"
    Canonical = "https://calcbrazil.com/calculadora-irrf-salario/"
    Title = "Calculadora de IRRF (Atualizado 2026) - Simule o Desconto"
    MetaDescription = "Calcule IRRF sobre salario online, descubra o desconto estimado e simule o impacto no valor liquido com rapidez."
    OgTitle = "Calculadora de IRRF (Atualizado 2026) - Simule o Desconto"
    OgDescription = "Veja a retencao estimada de IRRF sobre salario e entenda melhor o valor liquido."
    AppName = "Calculadora de IRRF sobre Salario"
    AppDescription = "Calcule o imposto de renda retido na fonte sobre salario com base em descontos e faixa tributaria."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como calcular IRRF sobre salario?"; Answer = "Depois de descontar INSS e deducoes aplicaveis, a base e enquadrada na tabela de IRRF para encontrar a retencao estimada." },
      @{ Question = "INSS reduz o IRRF?"; Answer = "Sim. O desconto de INSS costuma reduzir a base usada no calculo do imposto." },
      @{ Question = "O valor e identico ao holerite?"; Answer = "Nao necessariamente. Dependentes, beneficios e regras especificas podem alterar o valor final." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como calcular IRRF sobre salario</h2>
  <p>O IRRF parte de uma base de calculo ja ajustada por descontos como INSS e por deducoes permitidas. Depois disso, a tabela do imposto define a faixa e a retencao estimada.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Imagine uma base tributavel de R$ 4.000 apos descontos. A calculadora usa a faixa correspondente e mostra a retencao estimada para ajudar na previsao do salario liquido.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular IRRF sobre salario?</h3>
  <p>Primeiro ajuste a base com os descontos cabiveis e depois aplique a tabela do imposto.</p>
  <h3>O INSS altera o IRRF?</h3>
  <p>Sim, porque costuma reduzir a base tributavel.</p>
  <h3>Onde continuar a simulacao?</h3>
  <p>Use o hub <a href="/calculadoras-trabalho-rh/">Calculadoras de Trabalho e RH</a> para combinar IRRF com INSS, salario liquido e FGTS.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-financiamento/index.html"
    Canonical = "https://calcbrazil.com/calculadora-financiamento/"
    Title = "Calculadora de Financiamento (Atualizado 2026) - Simule Agora"
    MetaDescription = "Calcule financiamento online, simule parcelas, juros e total pago para carro, moto ou imovel com resultado imediato."
    OgTitle = "Calculadora de Financiamento (Atualizado 2026) - Simule Agora"
    OgDescription = "Simule financiamento com parcela, juros e custo total antes de fechar com banco ou financeira."
    AppName = "Calculadora de Financiamento"
    AppDescription = "Simule parcela, juros e total pago em um financiamento com taxa mensal e prazo."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como calcular financiamento?"; Answer = "Informe valor financiado, taxa de juros e prazo para estimar a parcela e o custo total do contrato." },
      @{ Question = "Mais parcelas sempre ajudam?"; Answer = "Elas podem reduzir a parcela mensal, mas tendem a aumentar o total pago em juros." },
      @{ Question = "Posso usar para carro e imovel?"; Answer = "Sim. A simulacao funciona como ponto de partida para diferentes tipos de financiamento com parcelas fixas." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Exemplo pratico resolvido</h2>
  <p>Se voce financiar R$ 30.000 em 48 meses com taxa de 1,99% ao mes, a calculadora mostra a parcela estimada, o total pago ao final e quanto disso foi juros. Essa leitura ajuda a comparar prazo curto e longo com clareza.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular financiamento?</h3>
  <p>Use o valor financiado, a taxa mensal e a quantidade de parcelas para estimar a operacao.</p>
  <h3>Mais parcelas compensam?</h3>
  <p>Nem sempre, porque o custo total costuma subir quando o prazo fica longo demais.</p>
  <h3>Quais outras contas financeiras combinam com esta?</h3>
  <p>Continue em <a href="/calculadoras-financeiras/">Calculadoras Financeiras</a> para abrir emprestimo, juros simples, juros compostos, CDI e poupanca.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "simulador-emprestimo-pessoal/index.html"
    Canonical = "https://calcbrazil.com/simulador-emprestimo-pessoal/"
    Title = "Simulador de Emprestimo Pessoal (Atualizado 2026) - Simule Agora"
    MetaDescription = "Simule emprestimo pessoal online, calcule parcela, juros e total pago para comparar cenarios antes de contratar."
    OgTitle = "Simulador de Emprestimo Pessoal (Atualizado 2026) - Simule Agora"
    OgDescription = "Veja parcelas, total pago e juros estimados em um emprestimo pessoal."
    AppName = "Simulador de Emprestimo Pessoal"
    AppDescription = "Simule parcelas e custo total de um emprestimo pessoal com base no valor, na taxa e no prazo."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como simular emprestimo pessoal?"; Answer = "Informe valor, taxa e prazo para estimar a parcela e o total pago ao final do contrato." },
      @{ Question = "Emprestimo e financiamento sao iguais?"; Answer = "Nao. Ambos usam juros e prazo, mas costumam ter estruturas, garantias e finalidades diferentes." },
      @{ Question = "Vale alongar o prazo?"; Answer = "Pode aliviar a parcela, mas normalmente aumenta o custo total dos juros." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como analisar um emprestimo pessoal</h2>
  <p>A simulacao fica mais util quando voce compara parcela e custo total ao mesmo tempo. O prazo pode deixar a prestacao mais leve, mas tambem pode aumentar bastante o valor final do contrato.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Em um emprestimo de R$ 10.000 com taxa de 3% ao mes e 24 parcelas, a calculadora mostra rapidamente quanto voce pagaria por mes e quanto os juros adicionam ao total.</p>
  <h2>FAQ rapido</h2>
  <h3>Como simular emprestimo pessoal?</h3>
  <p>Informe valor, taxa e prazo para visualizar os principais numeros da operacao.</p>
  <h3>Vale aumentar o prazo?</h3>
  <p>So se a parcela precisar caber melhor no mes e o custo total ainda fizer sentido.</p>
  <h3>Onde encontro outras comparacoes?</h3>
  <p>Veja o hub <a href="/calculadoras-financeiras/">Calculadoras Financeiras</a> para combinar emprestimo com juros, CDI, poupanca e financiamento.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-juros-compostos/index.html"
    Canonical = "https://calcbrazil.com/calculadora-juros-compostos/"
    Title = "Calculadora de Juros Compostos (Atualizado 2026) - Simule Agora"
    MetaDescription = "Calcule juros compostos online, simule rendimento de investimentos e descubra o crescimento do capital com resultado imediato."
    OgTitle = "Calculadora de Juros Compostos (Atualizado 2026) - Simule Agora"
    OgDescription = "Simule investimento com aportes, taxa e prazo para ver o efeito dos juros compostos."
    AppName = "Calculadora de Juros Compostos"
    AppDescription = "Simule o crescimento de um capital ao longo do tempo com juros compostos."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como calcular juros compostos?"; Answer = "A rentabilidade de cada periodo passa a render novamente nos periodos seguintes, acelerando o crescimento do capital." },
      @{ Question = "Juros compostos servem para investimento?"; Answer = "Sim. Eles sao usados para estimar o crescimento de aplicacoes ao longo do tempo." },
      @{ Question = "Aporte mensal muda muito o resultado?"; Answer = "Sim. Pequenos aportes recorrentes podem aumentar bastante o valor final em prazos longos." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como funciona o efeito dos juros compostos</h2>
  <p>Nos juros compostos, cada periodo rende sobre o valor inicial e tambem sobre os rendimentos acumulados. Por isso, o crescimento costuma ganhar velocidade com o passar do tempo.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Um capital de R$ 5.000 rendendo 1% ao mes por 24 meses nao cresce apenas de forma linear. A cada mes, os rendimentos anteriores tambem entram na base da conta e elevam o valor final.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular juros compostos?</h3>
  <p>Use capital inicial, taxa e prazo para projetar a evolucao do montante.</p>
  <h3>Aporte mensal ajuda?</h3>
  <p>Sim, porque reforca a base que vai render nos meses seguintes.</p>
  <h3>Qual hub complementa essa analise?</h3>
  <p>Abra <a href="/calculadoras-financeiras/">Calculadoras Financeiras</a> para comparar juros compostos com CDI, poupanca e juros simples.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-juros-simples/index.html"
    Canonical = "https://calcbrazil.com/calculadora-juros-simples/"
    Title = "Calculadora de Juros Simples (Atualizado 2026) - Calcule Agora"
    MetaDescription = "Calcule juros simples online, descubra juros e montante final e compare o resultado com outras simulacoes financeiras."
    OgTitle = "Calculadora de Juros Simples (Atualizado 2026) - Calcule Agora"
    OgDescription = "Descubra rapidamente o valor dos juros simples e o montante final da operacao."
    AppName = "Calculadora de Juros Simples"
    AppDescription = "Calcule juros simples e o montante final com base em capital, taxa e prazo."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como calcular juros simples?"; Answer = "Multiplique capital, taxa e tempo para encontrar os juros e some ao valor inicial para obter o montante." },
      @{ Question = "Juros simples e compostos sao iguais?"; Answer = "Nao. Nos juros simples a taxa incide sempre sobre o valor inicial; nos compostos, o saldo cresce sobre os rendimentos acumulados." },
      @{ Question = "Quando usar juros simples?"; Answer = "Ele e util para estimativas basicas, comparacoes didaticas e alguns contratos especificos." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como funciona o calculo de juros simples</h2>
  <p>Nos juros simples, a taxa e aplicada sempre sobre o capital inicial. Isso deixa a progressao mais linear e facilita a comparacao com cenarios mais complexos, como juros compostos.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Se voce aplicar R$ 1.000 a 2% ao mes por 6 meses em juros simples, os juros estimados seriam R$ 120. O montante final ficaria em R$ 1.120.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular juros simples?</h3>
  <p>Multiplique capital, taxa e prazo e depois some os juros ao valor inicial.</p>
  <h3>Quando ele difere dos compostos?</h3>
  <p>A diferenca aparece porque os compostos passam a render sobre rendimentos anteriores.</p>
  <h3>Onde continuar a comparacao?</h3>
  <p>Veja o hub <a href="/calculadoras-financeiras/">Calculadoras Financeiras</a> para abrir juros compostos, financiamento e rendimento de investimentos.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-rendimento-cdi/index.html"
    Canonical = "https://calcbrazil.com/calculadora-rendimento-cdi/"
    Title = "Calculadora de CDI (Atualizado 2026) - Simule o Rendimento"
    MetaDescription = "Calcule rendimento do CDI online, simule investimento por percentual do CDI e descubra o valor final com rapidez."
    OgTitle = "Calculadora de CDI (Atualizado 2026) - Simule o Rendimento"
    OgDescription = "Projete o rendimento de um investimento com percentual do CDI e prazo definido."
    AppName = "Calculadora de Rendimento CDI"
    AppDescription = "Simule o rendimento de um investimento com base no percentual do CDI e no prazo da aplicacao."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como calcular rendimento do CDI?"; Answer = "Use o valor aplicado, o percentual do CDI, o prazo e a taxa de referencia para projetar o valor final." },
      @{ Question = "100% do CDI e sempre igual?"; Answer = "Nao. O rendimento varia conforme a taxa de referencia e o periodo analisado." },
      @{ Question = "CDI e igual a poupanca?"; Answer = "Nao. Sao referencias diferentes e costumam produzir resultados distintos." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como interpretar uma simulacao de CDI</h2>
  <p>Ao simular CDI, o mais importante e observar o percentual da aplicacao, o prazo e o efeito dos juros ao longo do tempo. Isso ajuda a comparar produtos conservadores de renda fixa com mais clareza.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Se um investimento de R$ 10.000 render a 100% do CDI por 12 meses, a ferramenta projeta o valor final usando a taxa de referencia configurada para o calculo.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular rendimento do CDI?</h3>
  <p>Use valor inicial, percentual do CDI e prazo para projetar o crescimento.</p>
  <h3>CDI e igual a poupanca?</h3>
  <p>Nao. Cada referencia tem sua propria regra de rendimento.</p>
  <h3>Qual hub continua esta jornada?</h3>
  <p>Continue em <a href="/calculadoras-financeiras/">Calculadoras Financeiras</a> para comparar CDI com poupanca, juros compostos e financiamento.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-rendimento-poupanca/index.html"
    Canonical = "https://calcbrazil.com/calculadora-rendimento-poupanca/"
    Title = "Calculadora de Poupanca (Atualizado 2026) - Simule o Rendimento"
    MetaDescription = "Calcule rendimento da poupanca online, descubra o valor final e simule diferentes prazos para comparar sua reserva."
    OgTitle = "Calculadora de Poupanca (Atualizado 2026) - Simule o Rendimento"
    OgDescription = "Simule o rendimento da poupanca e veja quanto o dinheiro pode crescer ao longo do tempo."
    AppName = "Calculadora de Rendimento da Poupanca"
    AppDescription = "Simule quanto um valor pode render na poupanca em diferentes prazos."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como calcular rendimento da poupanca?"; Answer = "Considere valor aplicado, prazo e regra de rendimento da poupanca para chegar a uma estimativa." },
      @{ Question = "Poupanca rende igual todo mes?"; Answer = "O rendimento depende da regra aplicavel e do tempo em que o dinheiro permanece investido." },
      @{ Question = "Vale comparar com CDI?"; Answer = "Sim. Comparar ajuda a entender se a opcao escolhida faz sentido para o objetivo e o prazo." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como analisar o rendimento da poupanca</h2>
  <p>A poupanca costuma ser usada em reservas simples e objetivos de curto ou medio prazo. A simulacao ajuda a ver se o crescimento esperado esta alinhado com sua meta antes de comparar com outras alternativas.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Se voce aplicar R$ 5.000 e mantiver o valor por 12 meses, a calculadora projeta quanto a poupanca pode render e mostra o saldo estimado ao final do periodo.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular rendimento da poupanca?</h3>
  <p>Use o valor aplicado e o prazo para estimar a evolucao do saldo pela regra da poupanca.</p>
  <h3>Vale comparar com CDI?</h3>
  <p>Sim, porque o comportamento dos rendimentos pode ser diferente.</p>
  <h3>Onde encontro outras simulacoes?</h3>
  <p>Veja <a href="/calculadoras-financeiras/">Calculadoras Financeiras</a> para seguir para CDI, juros compostos e markup.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-preco-de-venda/index.html"
    Canonical = "https://calcbrazil.com/calculadora-preco-de-venda/"
    Title = "Calculadora de Preco de Venda (Atualizado 2026) - Calcule Agora"
    MetaDescription = "Calcule preco de venda online, descubra quanto cobrar e simule margem para precificar produtos com mais seguranca."
    OgTitle = "Calculadora de Preco de Venda (Atualizado 2026) - Calcule Agora"
    OgDescription = "Descubra o preco de venda ideal com base em custo, margem e estrutura da operacao."
    AppName = "Calculadora de Preco de Venda"
    AppDescription = "Calcule o preco de venda de um produto considerando custos e margem desejada."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como calcular preco de venda?"; Answer = "Considere custo do produto, despesas, margem desejada e taxas da operacao para definir quanto cobrar." },
      @{ Question = "Preco de venda e igual a markup?"; Answer = "Nao exatamente. O markup pode ser uma forma de chegar ao preco, mas a precificacao completa costuma envolver mais variaveis." },
      @{ Question = "Taxas de venda alteram o preco ideal?"; Answer = "Sim. Taxas de maquininha, marketplace e frete podem reduzir a margem real." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como calcular preco de venda com mais clareza</h2>
  <p>Uma boa precificacao nao olha apenas para o custo direto. Ela precisa considerar margem, despesas, comissoes e taxas para evitar vender bem e lucrar pouco.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Se um produto custa R$ 50 e voce quer margem suficiente para cobrir taxas e ainda manter lucro, a calculadora mostra quanto cobrar para nao ficar abaixo do resultado esperado.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular preco de venda?</h3>
  <p>Some custos e use a margem desejada como referencia para chegar ao valor final.</p>
  <h3>Marketplace muda o preco ideal?</h3>
  <p>Sim, porque as taxas podem consumir parte relevante da margem.</p>
  <h3>Onde encontro outras ferramentas de precificacao?</h3>
  <p>Abra <a href="/calculadoras-financeiras/">Calculadoras Financeiras</a> para seguir para markup, margem de lucro, desconto e taxas.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-markup/index.html"
    Canonical = "https://calcbrazil.com/calculadora-markup/"
    Title = "Calculadora de Markup (Atualizado 2026) - Descubra o Preco"
    MetaDescription = "Calcule markup online, descubra o preco de venda ideal e simule margem para nao errar na precificacao."
    OgTitle = "Calculadora de Markup (Atualizado 2026) - Descubra o Preco"
    OgDescription = "Use o markup para encontrar um preco de venda mais coerente com custos e margem desejada."
    AppName = "Calculadora de Markup"
    AppDescription = "Calcule o markup e descubra um preco de venda sugerido com base em custos e margem."
    ApplicationCategory = "FinanceApplication"
    Faqs = @(
      @{ Question = "Como calcular markup?"; Answer = "O markup usa um fator aplicado sobre o custo para chegar a um preco de venda que preserve margem e cubra despesas." },
      @{ Question = "Markup e margem sao a mesma coisa?"; Answer = "Nao. Eles sao conceitos relacionados, mas nao identicos na formula e na interpretacao." },
      @{ Question = "Markup sozinho resolve a precificacao?"; Answer = "Nem sempre. Taxas, frete, impostos e posicionamento comercial tambem influenciam o preco." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como usar markup na precificacao</h2>
  <p>O markup ajuda a transformar custo em preco de venda de forma rapida. Mesmo assim, ele funciona melhor quando voce tambem considera taxas, operacao, frete e objetivo de margem.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Se um item custa R$ 40 e o fator de markup sugerido for 2,5, o preco de venda estimado seria R$ 100. A partir dai, vale conferir se as taxas da operacao ainda preservam a margem desejada.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular markup?</h3>
  <p>Defina um fator com base em custos e margem e aplique sobre o custo do produto.</p>
  <h3>Markup e margem sao iguais?</h3>
  <p>Nao, embora ambos sejam usados na mesma decisao de precificacao.</p>
  <h3>Qual hub segue esta trilha?</h3>
  <p>Continue em <a href="/calculadoras-financeiras/">Calculadoras Financeiras</a> para abrir preco de venda, margem de lucro e taxas de marketplace.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-alcool-ou-gasolina/index.html"
    Canonical = "https://calcbrazil.com/calculadora-alcool-ou-gasolina/"
    Title = "Calculadora de Alcool ou Gasolina (Atualizado 2026) - Compare Agora"
    MetaDescription = "Calcule alcool ou gasolina online, descubra qual combustivel compensa mais e simule a melhor escolha de forma imediata."
    OgTitle = "Calculadora de Alcool ou Gasolina (Atualizado 2026) - Compare Agora"
    OgDescription = "Compare etanol e gasolina em segundos para descobrir qual combustivel vale mais a pena."
    AppName = "Calculadora de Alcool ou Gasolina"
    AppDescription = "Compare os precos de alcool e gasolina para descobrir qual combustivel compensa mais."
    ApplicationCategory = "UtilitiesApplication"
    Faqs = @(
      @{ Question = "Como calcular alcool ou gasolina?"; Answer = "Divida o preco do alcool pelo preco da gasolina para comparar o custo relativo entre os dois combustiveis." },
      @{ Question = "A regra dos 70% ainda ajuda?"; Answer = "Ela segue como referencia pratica inicial para muitos motoristas, embora o desempenho do carro tambem importe." },
      @{ Question = "Vale olhar so o preco no posto?"; Answer = "Nao. Consumo medio e autonomia do veiculo tambem influenciam a escolha." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como comparar alcool e gasolina</h2>
  <p>A conta mais comum compara o preco do etanol com o da gasolina para ver qual entrega melhor relacao entre custo e rendimento. A simulacao acelera essa decisao no posto.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Se o alcool custa R$ 4,19 e a gasolina R$ 5,99, a divisao mostra a relacao entre os dois valores. A partir desse numero, voce consegue avaliar qual combustivel compensa mais.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular alcool ou gasolina?</h3>
  <p>Compare os precos relativos dos dois combustiveis para identificar a opcao mais eficiente.</p>
  <h3>O consumo do carro importa?</h3>
  <p>Sim, porque a eficiencia do veiculo pode mudar a melhor escolha.</p>
  <h3>Quais outras paginas ajudam?</h3>
  <p>Veja o hub <a href="/calculadoras-combustivel/">Calculadoras de Combustivel</a> para abrir km por litro, custo por km e gasto de viagem.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-km-por-litro/index.html"
    Canonical = "https://calcbrazil.com/calculadora-km-por-litro/"
    Title = "Calculadora de KM por Litro (Atualizado 2026) - Calcule Agora"
    MetaDescription = "Calcule km por litro online, descubra o consumo medio do carro e simule a eficiencia do combustivel em segundos."
    OgTitle = "Calculadora de KM por Litro (Atualizado 2026) - Calcule Agora"
    OgDescription = "Descubra o consumo medio do carro e veja quantos km por litro ele faz."
    AppName = "Calculadora de KM por Litro"
    AppDescription = "Calcule o consumo medio do carro em quilometros por litro."
    ApplicationCategory = "UtilitiesApplication"
    Faqs = @(
      @{ Question = "Como calcular km por litro?"; Answer = "Divida a distancia percorrida pela quantidade de litros abastecidos para descobrir o consumo medio." },
      @{ Question = "Quanto mais alto o km por litro, melhor?"; Answer = "Sim. Em geral, um numero maior indica melhor eficiencia de consumo." },
      @{ Question = "Esse valor ajuda no custo por km?"; Answer = "Sim. O consumo medio e uma das bases para calcular quanto custa rodar com o carro." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como calcular consumo em km por litro</h2>
  <p>Essa e uma das contas mais usadas por quem acompanha gastos do carro. Basta relacionar a quilometragem rodada com os litros abastecidos para descobrir a media de consumo.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Se o carro rodou 480 km com 40 litros, o consumo medio estimado fica em 12 km por litro. A partir dai, ja da para comparar postos, trajetos e estilo de conducao.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular km por litro?</h3>
  <p>Divida os quilometros rodados pela quantidade de litros consumidos.</p>
  <h3>Esse numero ajuda no custo por km?</h3>
  <p>Sim, porque ele entra direto na conta de custo do veiculo.</p>
  <h3>Onde continuar a analise?</h3>
  <p>Continue em <a href="/calculadoras-combustivel/">Calculadoras de Combustivel</a> para abrir custo por km, alcool ou gasolina e gasto de viagem.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-custo-por-km/index.html"
    Canonical = "https://calcbrazil.com/calculadora-custo-por-km/"
    Title = "Calculadora de Custo por KM (Atualizado 2026) - Descubra Agora"
    MetaDescription = "Calcule custo por km online, descubra quanto custa rodar com o carro e simule combustivel por distancia de forma imediata."
    OgTitle = "Calculadora de Custo por KM (Atualizado 2026) - Descubra Agora"
    OgDescription = "Veja quanto custa rodar 1 km com base em combustivel e consumo medio do veiculo."
    AppName = "Calculadora de Custo por KM"
    AppDescription = "Calcule quanto custa rodar 1 km com base em preco do combustivel e consumo do carro."
    ApplicationCategory = "UtilitiesApplication"
    Faqs = @(
      @{ Question = "Como calcular custo por km?"; Answer = "Divida o preco do litro pelo consumo em km por litro para estimar o custo de cada quilometro rodado." },
      @{ Question = "Custo por km serve para viagem?"; Answer = "Sim. Ele ajuda a projetar o gasto total em trajetos mais longos." },
      @{ Question = "Essa conta inclui manutencao?"; Answer = "Nao necessariamente. Muitas simulacoes focam no combustivel, mas manutencao e desgaste podem ser adicionados na analise." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como calcular custo por km</h2>
  <p>Depois de descobrir o consumo medio do carro, voce consegue transformar o preco do combustivel em custo por distancia. Isso ajuda a comparar rotas, app de mobilidade e ate a precificacao de entregas.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Se a gasolina custa R$ 6,00 e o carro faz 12 km por litro, o custo estimado por km fica em R$ 0,50 considerando apenas combustivel.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular custo por km?</h3>
  <p>Relacione o preco do combustivel com a eficiencia do veiculo em km por litro.</p>
  <h3>Isso ajuda em viagens?</h3>
  <p>Sim, porque a conta pode ser multiplicada pela distancia total.</p>
  <h3>Quais outras paginas completam a analise?</h3>
  <p>Abra <a href="/calculadoras-combustivel/">Calculadoras de Combustivel</a> para comparar gasto de viagem, km por litro e autonomia.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  },
  @{
    Path = "calculadora-gasto-combustivel-viagem/index.html"
    Canonical = "https://calcbrazil.com/calculadora-gasto-combustivel-viagem/"
    Title = "Calculadora de Gasto de Viagem (Atualizado 2026) - Simule Agora"
    MetaDescription = "Calcule gasto de combustivel em viagem online, descubra o custo estimado do trajeto e simule a despesa antes de sair."
    OgTitle = "Calculadora de Gasto de Viagem (Atualizado 2026) - Simule Agora"
    OgDescription = "Estime o gasto de combustivel em uma viagem usando distancia, consumo e preco por litro."
    AppName = "Calculadora de Gasto de Combustivel em Viagem"
    AppDescription = "Calcule quanto voce pode gastar de combustivel em uma viagem com base na distancia e no consumo medio."
    ApplicationCategory = "UtilitiesApplication"
    Faqs = @(
      @{ Question = "Como calcular gasto de combustivel em viagem?"; Answer = "Divida a distancia pelo consumo medio do carro e multiplique o resultado pelo preco do litro." },
      @{ Question = "Pedagio entra nessa conta?"; Answer = "Nao necessariamente. A simulacao costuma focar no combustivel, mas voce pode complementar o planejamento com outros custos." },
      @{ Question = "Posso usar ida e volta?"; Answer = "Sim. Basta considerar a distancia total desejada para a simulacao." }
    )
    SectionHtml = @"
<!-- CALCBRAZIL-SEO-CONTENT-START -->
<section class="seo">
  <h2>Como estimar o gasto de combustivel em viagem</h2>
  <p>Essa conta combina distancia, consumo medio do carro e preco do litro para antecipar a despesa antes de sair. Ela e util para turismo, trabalho, entregas e comparacao de rotas.</p>
  <h2>Exemplo pratico resolvido</h2>
  <p>Em uma viagem de 360 km com carro que faz 12 km por litro e combustivel a R$ 6,00, a necessidade estimada e de 30 litros. O gasto projetado fica em R$ 180.</p>
  <h2>FAQ rapido</h2>
  <h3>Como calcular gasto de combustivel em viagem?</h3>
  <p>Use distancia, consumo medio e preco por litro para encontrar a estimativa do trajeto.</p>
  <h3>Posso simular ida e volta?</h3>
  <p>Sim, desde que informe a distancia total.</p>
  <h3>Quais outras paginas ajudam a planejar?</h3>
  <p>Veja <a href="/calculadoras-combustivel/">Calculadoras de Combustivel</a> para combinar viagem com custo por km e comparacao entre alcool e gasolina.</p>
</section>
<!-- CALCBRAZIL-SEO-CONTENT-END -->
"@
  }
)

foreach ($page in $pages) {
  $fullPath = Join-Path $PSScriptRoot "..\$($page.Path)"
  $fullPath = [System.IO.Path]::GetFullPath($fullPath)
  $html = Get-Content -LiteralPath $fullPath -Raw -Encoding UTF8

  $html = [regex]::Replace(
    $html,
    '<script type="application/ld\+json">\s*\{.*?"@type"\s*:\s*"WebApplication".*?\}\s*</script>\s*',
    '',
    [System.Text.RegularExpressions.RegexOptions]::Singleline
  )
  $html = [regex]::Replace(
    $html,
    '<script type="application/ld\+json">\s*\{.*?"@type"\s*:\s*"FAQPage".*?\}\s*</script>\s*',
    '',
    [System.Text.RegularExpressions.RegexOptions]::Singleline
  )

  $html = Set-TitleTag -Html $html -Title $page.Title
  $html = Upsert-MetaTag -Html $html -MatchPattern '<meta\s+name="description"\s+content="[^"]*"\s*/?>' -Replacement "<meta name=`"description`" content=`"$($page.MetaDescription)`">"
  $html = Upsert-MetaTag -Html $html -MatchPattern '<meta\s+property="og:title"\s+content="[^"]*"\s*/?>' -Replacement "<meta property=`"og:title`" content=`"$($page.OgTitle)`">"
  $html = Upsert-MetaTag -Html $html -MatchPattern '<meta\s+property="og:description"\s+content="[^"]*"\s*/?>' -Replacement "<meta property=`"og:description`" content=`"$($page.OgDescription)`">"
  $html = Upsert-MetaTag -Html $html -MatchPattern '<meta\s+property="og:image"\s+content="[^"]*"\s*/?>' -Replacement '<meta property="og:image" content="https://calcbrazil.com/preview.png">'
  $html = Upsert-MetaTag -Html $html -MatchPattern '<meta\s+property="og:url"\s+content="[^"]*"\s*/?>' -Replacement "<meta property=`"og:url`" content=`"$($page.Canonical)`">"
  $html = Upsert-MetaTag -Html $html -MatchPattern '<meta\s+property="og:type"\s+content="[^"]*"\s*/?>' -Replacement '<meta property="og:type" content="website">'

  $appBlock = @"
<!-- CALCBRAZIL-SEO-APP-START -->
<script type="application/ld+json">
$(Build-WebApplicationJson -Page $page)
</script>
<!-- CALCBRAZIL-SEO-APP-END -->
"@

  $faqBlock = @"
<!-- CALCBRAZIL-SEO-FAQ-START -->
<script type="application/ld+json">
$(Build-FaqJson -Page $page)
</script>
<!-- CALCBRAZIL-SEO-FAQ-END -->
"@

  $html = Replace-MarkedBlock -Html $html -StartMarker "<!-- CALCBRAZIL-SEO-APP-START -->" -EndMarker "<!-- CALCBRAZIL-SEO-APP-END -->" -Block $appBlock -Anchor "</head>"
  $html = Replace-MarkedBlock -Html $html -StartMarker "<!-- CALCBRAZIL-SEO-FAQ-START -->" -EndMarker "<!-- CALCBRAZIL-SEO-FAQ-END -->" -Block $faqBlock -Anchor "</head>"
  $html = Replace-MarkedBlock -Html $html -StartMarker "<!-- CALCBRAZIL-SEO-CONTENT-START -->" -EndMarker "<!-- CALCBRAZIL-SEO-CONTENT-END -->" -Block $page.SectionHtml -Anchor '<section id="calculadorasPopulares" class="seo"></section>'

  [System.IO.File]::WriteAllText($fullPath, $html, [System.Text.UTF8Encoding]::new($false))
  Write-Host "Atualizado: $($page.Path)"
}
