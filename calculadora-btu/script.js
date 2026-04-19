function calcular() {
  const area = parseFloat(document.getElementById("area").value) || 0;
  const pessoas = parseInt(document.getElementById("pessoas").value, 10) || 0;
  const sol = document.getElementById("sol").value;
  const base = area * (sol === "com" ? 800 : 600);
  const extraPessoas = Math.max(0, pessoas - 1) * 600;
  const resultado = base + extraPessoas;
  document.getElementById("resumoTopoValor").innerText = `${Math.round(resultado)} BTU`;
  document.getElementById("resumoTopoTexto").innerText = "Estimativa simples baseada em area, pessoas e incidência solar.";
}
window.onload = function () { document.querySelectorAll("input, select").forEach(function (c) { c.addEventListener("input", calcular); c.addEventListener("change", calcular); }); calcular(); };
