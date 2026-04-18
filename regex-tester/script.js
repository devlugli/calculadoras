let ultimoRegexResultado = "";

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

function testarRegex() {
  const pattern = document.getElementById("regexPattern").value;
  const flags = document.getElementById("regexFlags").value;
  const input = document.getElementById("regexInput").value;

  if (!pattern) {
    document.getElementById("regexStatusTitulo").innerText = "Informe uma regex";
    document.getElementById("regexStatusTexto").innerText = "Nenhum padrão foi informado ainda.";
    document.getElementById("regexOutput").value = "";
    ultimoRegexResultado = "";
    return;
  }

  try {
    const regex = new RegExp(pattern, flags);
    const matches = regex.global
      ? Array.from(input.matchAll(regex))
      : (() => {
          const singleMatch = regex.exec(input);
          return singleMatch ? [singleMatch] : [];
        })();

    if (!matches.length) {
      document.getElementById("regexStatusTitulo").innerText = "Regex válida, sem correspondências";
      document.getElementById("regexStatusTexto").innerText = "O padrão foi aceito, mas nenhuma ocorrência foi encontrada no texto.";
      document.getElementById("regexOutput").value = "";
      ultimoRegexResultado = "";
      return;
    }

    const resultado = matches.map((match, index) => {
      const grupos = match.slice(1).filter((value) => value !== undefined);
      return [
        `Match ${index + 1}: ${match[0]}`,
        `Posição inicial: ${match.index}`,
        grupos.length ? `Grupos: ${grupos.join(" | ")}` : "Grupos: nenhum"
      ].join("\n");
    }).join("\n\n");

    document.getElementById("regexStatusTitulo").innerText = "Regex válida com correspondências";
    document.getElementById("regexStatusTexto").innerText = `${matches.length} ocorrência(s) encontrada(s) no texto informado.`;
    document.getElementById("regexOutput").value = resultado;
    ultimoRegexResultado = resultado;
  } catch (error) {
    document.getElementById("regexStatusTitulo").innerText = "Regex inválida";
    document.getElementById("regexStatusTexto").innerText = error.message;
    document.getElementById("regexOutput").value = "";
    ultimoRegexResultado = "";
  }
}

function limparRegex() {
  document.getElementById("regexPattern").value = "";
  document.getElementById("regexFlags").value = "";
  document.getElementById("regexSample").value = "";
  document.getElementById("regexInput").value = "";
  document.getElementById("regexStatusTitulo").innerText = "Aguardando regex";
  document.getElementById("regexStatusTexto").innerText = "Informe uma expressão regular, as flags desejadas e um texto para testar.";
  document.getElementById("regexOutput").value = "";
  document.getElementById("copyFeedback").innerText = "";
  ultimoRegexResultado = "";
}

function copiarRegexResultado() {
  const feedback = document.getElementById("copyFeedback");
  if (!ultimoRegexResultado) {
    feedback.innerText = "Nada para copiar.";
    return;
  }

  copiarTextoComFallback(
    ultimoRegexResultado,
    () => {
      feedback.innerText = "Resultado copiado com sucesso.";
      setTimeout(() => {
        feedback.innerText = "";
      }, 1500);
    },
    () => {
      feedback.innerText = "Não foi possível copiar automaticamente.";
    }
  );
}
