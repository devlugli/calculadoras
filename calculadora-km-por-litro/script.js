<!DOCTYPE html>

<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Calculadora de KM por Litro | CalcBrazil</title>

<meta name="description" content="Calcule o consumo de combustível do seu carro e descubra quantos quilômetros por litro ele faz.">

<link rel="canonical" href="https://calcbrazil.com/calculadora-km-por-litro/">
<link rel="icon" href="/favicon.ico">

<link rel="stylesheet" href="../assets/css/style.css">

</head>

<body>

<div class="container">

<p><a href="/">← Voltar para a página inicial</a></p>

<h1>Calculadora de KM por Litro</h1>

<p class="descricao">
Descubra o consumo de combustível do seu carro calculando quantos quilômetros ele percorre por litro.
</p>

<p class="selo">carro • combustível • consumo</p>



<div class="campo">
<label for="km">Quilômetros percorridos</label>
<input id="km" type="number" value="500">
</div>

<div class="campo">
<label for="litros">Litros abastecidos</label>
<input id="litros" type="number" value="40">
</div>



<button onclick="calcular()">Calcular</button>



<div class="resumo-topo">

<div class="resumo-topo-titulo">
Consumo de combustível
</div>

<div class="resumo-topo-valor" id="resultado">
...
</div>

<div class="resumo-topo-texto">
quilômetros por litro
</div>

</div>

</div>



<section class="seo">

<h2>Como calcular km por litro?</h2>

<p>
Para calcular o consumo de combustível basta dividir a distância percorrida
pela quantidade de litros abastecidos.
</p>

<h2>Fórmula do consumo de combustível</h2>

<p>
Consumo = quilômetros percorridos ÷ litros abastecidos
</p>

<h2>Por que calcular o consumo do carro?</h2>

<p>
Esse cálculo ajuda a comparar eficiência entre veículos, economizar combustível
e identificar possíveis problemas no motor.
</p>

</section>



<section id="calculadorasPopulares" class="seo"></section>

<section id="calculadorasRelacionadas" class="seo"></section>

<script src="../assets/js/populares.js"></script>
<script src="../assets/js/relacionadas.js"></script>
<script src="./script.js"></script>

<script>
    renderizarCalculadorasPopulares();
renderizarCalculadorasRelacionadas("/calculadora-km-por-litro/",3);
</script>

</body>
</html>