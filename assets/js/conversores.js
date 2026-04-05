function copiarTextoComFallback(texto, onSuccess, onFailure) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(texto).then(onSuccess).catch(onFailure);
    return;
  }

  const areaTemporaria = document.createElement("textarea");
  areaTemporaria.value = texto;
  areaTemporaria.setAttribute("readonly", "");
  areaTemporaria.style.position = "absolute";
  areaTemporaria.style.left = "-9999px";
  document.body.appendChild(areaTemporaria);
  areaTemporaria.select();

  try {
    document.execCommand("copy");
    onSuccess();
  } catch (error) {
    onFailure(error);
  } finally {
    document.body.removeChild(areaTemporaria);
  }
}

function mostrarFeedbackCopia(id, mensagem) {
  const feedback = document.getElementById(id);
  if (!feedback) return;
  feedback.innerText = mensagem;
  if (mensagem === "Copiado com sucesso.") {
    setTimeout(() => { feedback.innerText = ""; }, 1500);
  }
}

function formatarNumeroBR(valor, casas = 2) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

function converterGrupoAte999(numero) {
  const unidades = ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const especiais = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  const dezenas = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const centenas = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

  if (numero === 0) return "";
  if (numero === 100) return "cem";

  const partes = [];
  const c = Math.floor(numero / 100);
  const resto = numero % 100;
  const d = Math.floor(resto / 10);
  const u = resto % 10;

  if (c > 0) partes.push(centenas[c]);

  if (resto >= 10 && resto <= 19) {
    partes.push(especiais[resto - 10]);
  } else {
    if (d > 0) partes.push(dezenas[d]);
    if (u > 0) partes.push(unidades[u]);
  }

  return partes.join(" e ");
}

function numeroPorExtenso(numero) {
  if (!Number.isFinite(numero)) return "";
  if (numero === 0) return "zero";

  const negativo = numero < 0;
  let inteiro = Math.abs(Math.trunc(numero));

  const grupos = [];
  while (inteiro > 0) {
    grupos.unshift(inteiro % 1000);
    inteiro = Math.floor(inteiro / 1000);
  }

  const escalas = [
    ["", ""],
    ["mil", "mil"],
    ["milhão", "milhões"],
    ["bilhão", "bilhões"]
  ];

  const partes = grupos.map((grupo, indice) => {
    if (grupo === 0) return "";
    const escalaIndex = grupos.length - 1 - indice;
    const textoGrupo = converterGrupoAte999(grupo);

    if (escalaIndex === 0) return textoGrupo;
    if (escalaIndex === 1) return grupo === 1 ? "mil" : `${textoGrupo} mil`;

    const escala = grupo === 1 ? escalas[escalaIndex][0] : escalas[escalaIndex][1];
    return `${textoGrupo} ${escala}`;
  }).filter(Boolean);

  if (partes.length === 1) {
    return negativo ? `menos ${partes[0]}` : partes[0];
  }

  const ultima = partes.pop();
  const texto = `${partes.join(", ")} e ${ultima}`;
  return negativo ? `menos ${texto}` : texto;
}

function valorPorExtenso(valor) {
  if (!Number.isFinite(valor)) return "";

  const absoluto = Math.abs(valor);
  const reais = Math.floor(absoluto);
  const centavos = Math.round((absoluto - reais) * 100);
  const partes = [];

  if (reais > 0) partes.push(`${numeroPorExtenso(reais)} ${reais === 1 ? "real" : "reais"}`);
  if (centavos > 0) partes.push(`${numeroPorExtenso(centavos)} ${centavos === 1 ? "centavo" : "centavos"}`);
  if (partes.length === 0) partes.push("zero real");

  const texto = partes.length === 2 ? `${partes[0]} e ${partes[1]}` : partes[0];
  return valor < 0 ? `menos ${texto}` : texto;
}

function decimalParaRomano(numero) {
  if (!Number.isInteger(numero) || numero <= 0 || numero > 3999) return "";

  const mapa = [
    { valor: 1000, simbolo: "M" }, { valor: 900, simbolo: "CM" },
    { valor: 500, simbolo: "D" }, { valor: 400, simbolo: "CD" },
    { valor: 100, simbolo: "C" }, { valor: 90, simbolo: "XC" },
    { valor: 50, simbolo: "L" }, { valor: 40, simbolo: "XL" },
    { valor: 10, simbolo: "X" }, { valor: 9, simbolo: "IX" },
    { valor: 5, simbolo: "V" }, { valor: 4, simbolo: "IV" },
    { valor: 1, simbolo: "I" }
  ];

  let restante = numero;
  let resultado = "";
  for (const item of mapa) {
    while (restante >= item.valor) {
      resultado += item.simbolo;
      restante -= item.valor;
    }
  }
  return resultado;
}

function romanoParaDecimal(romano) {
  if (!romano) return null;
  const texto = romano.toUpperCase().trim();
  if (!/^[IVXLCDM]+$/.test(texto)) return null;

  const valores = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;

  for (let i = 0; i < texto.length; i++) {
    const atual = valores[texto[i]];
    const proximo = valores[texto[i + 1]] || 0;
    total += atual < proximo ? -atual : atual;
  }

  if (decimalParaRomano(total) !== texto) return null;
  return total;
}
