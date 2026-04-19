const CONVERSOES = {
  comprimento: { m: 1, km: 1000, cm: 0.01, mm: 0.001 },
  massa: { kg: 1, g: 0.001, mg: 0.000001, t: 1000 },
  volume: { l: 1, ml: 0.001, "m3": 1000 }
};

function popularSelect(select, opcoes) {
  select.innerHTML = Object.keys(opcoes).map(function (item) {
    return `<option value="${item}">${item}</option>`;
  }).join("");
}

function atualizarOpcoes() {
  const tipo = document.getElementById("tipo").value;
  const de = document.getElementById("de");
  const para = document.getElementById("para");
  if (tipo === "temperatura") {
    de.innerHTML = '<option value="c">Celsius</option><option value="f">Fahrenheit</option><option value="k">Kelvin</option>';
    para.innerHTML = de.innerHTML;
    para.value = "f";
  } else {
    popularSelect(de, CONVERSOES[tipo]);
    popularSelect(para, CONVERSOES[tipo]);
    para.selectedIndex = 1;
  }
  calcular();
}

function converterTemperatura(valor, de, para) {
  let c = valor;
  if (de === "f") c = (valor - 32) * 5 / 9;
  if (de === "k") c = valor - 273.15;
  if (para === "c") return c;
  if (para === "f") return (c * 9 / 5) + 32;
  return c + 273.15;
}

function calcular() {
  const tipo = document.getElementById("tipo").value;
  const valor = parseFloat(document.getElementById("valor").value) || 0;
  const de = document.getElementById("de").value;
  const para = document.getElementById("para").value;
  let resultado = 0;
  if (tipo === "temperatura") {
    resultado = converterTemperatura(valor, de, para);
  } else {
    resultado = (valor * CONVERSOES[tipo][de]) / CONVERSOES[tipo][para];
  }
  document.getElementById("resumoTopoValor").innerText = Number(resultado).toLocaleString("pt-BR", { maximumFractionDigits: 6 });
  document.getElementById("resumoTopoTexto").innerText = `${valor} ${de} equivalem a ${document.getElementById("resumoTopoValor").innerText} ${para}.`;
}

window.onload = function () {
  document.querySelectorAll("input, select").forEach(function (campo) {
    campo.addEventListener("input", calcular);
    campo.addEventListener("change", calcular);
  });
  atualizarOpcoes();
};
