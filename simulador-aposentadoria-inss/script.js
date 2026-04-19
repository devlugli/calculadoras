function calcular() {
  const sexo = document.getElementById("sexo").value;
  const idade = parseInt(document.getElementById("idadeAtual").value, 10) || 0;
  const contribuicao = parseInt(document.getElementById("anosContribuicao").value, 10) || 0;
  const idadeMinima = sexo === "mulher" ? 62 : 65;
  const faltamIdade = Math.max(0, idadeMinima - idade);
  const faltamContribuicao = Math.max(0, 15 - contribuicao);
  const faltam = Math.max(faltamIdade, faltamContribuicao);
  document.getElementById("resumoTopoValor").innerText = faltam === 0 ? "Elegibilidade possivel" : `${faltam} ano(s)`;
  document.getElementById("resumoTopoTexto").innerText = faltam === 0 ? "Pelos dados simplificados, voce pode estar proximo de cumprir os requisitos basicos." : `Estimativa simples de ${faltam} ano(s) para cumprir idade e carencia minima.`;
  document.getElementById("idadeMinima").innerText = `${idadeMinima} anos`;
  document.getElementById("situacao").innerText = faltam === 0 ? "Verificar no Meu INSS" : "Ainda falta tempo";
}

window.onload = function () {
  document.querySelectorAll("input, select").forEach(function (campo) {
    campo.addEventListener("input", calcular);
    campo.addEventListener("change", calcular);
  });
  calcular();
};
