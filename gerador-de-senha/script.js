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

function gerarSenha() {
  const tamanho = Number(document.getElementById("tamanhoSenha").value);
  const perfil = document.getElementById("perfilSenha").value;
  let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  if (perfil === "completo") {
    caracteres += "!@#$%&*()-_=+?";
  } else if (perfil === "numerica") {
    caracteres = "0123456789";
  }

  let senha = "";
  for (let i = 0; i < tamanho; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    senha += caracteres[indice];
  }

  document.getElementById("resumoTopoTitulo").innerText = "Senha gerada";
  document.getElementById("resumoTopoValor").innerText = senha;
  document.getElementById("resumoTopoTexto").innerText = "Resultado gerado conforme o tamanho e o perfil selecionados.";
}

function copiarResultado() {
  const valor = document.getElementById("resumoTopoValor").innerText;
  const feedback = document.getElementById("copyFeedback");
  if (!valor) {
    feedback.innerText = "Gere uma senha antes de copiar.";
    return;
  }
  copiarTextoComFallback(
    valor,
    () => {
      feedback.innerText = "Copiado com sucesso.";
      setTimeout(() => { feedback.innerText = ""; }, 1500);
    },
    () => {
      feedback.innerText = "Não foi possível copiar automaticamente.";
    }
  );
}

window.onload = function () {
  document.getElementById("tamanhoSenha").addEventListener("change", gerarSenha);
  document.getElementById("perfilSenha").addEventListener("change", gerarSenha);
  gerarSenha();
};
