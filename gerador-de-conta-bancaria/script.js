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

const bancos = [
  { nome: "Banco do Brasil", codigo: "001" },
  { nome: "Caixa", codigo: "104" },
  { nome: "Bradesco", codigo: "237" },
  { nome: "Itaú", codigo: "341" },
  { nome: "Santander", codigo: "033" },
  { nome: "Nubank", codigo: "260" }
];

function escolher(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function numeroAleatorio(tamanho) {
  let valor = "";
  for (let i = 0; i < tamanho; i++) {
    valor += Math.floor(Math.random() * 10);
  }
  return valor;
}

function gerarConta() {
  const banco = escolher(bancos);
  const tipo = document.getElementById("tipoConta").value;
  const agencia = numeroAleatorio(4);
  const contaBase = numeroAleatorio(8);
  const conta = `${contaBase}-${Math.floor(Math.random() * 10)}`;

  document.getElementById("resumoTopoTitulo").innerText = "Conta bancária gerada";
  document.getElementById("resumoTopoValor").innerText = `${banco.codigo} • ${banco.nome}`;
  document.getElementById("resumoTopoTexto").innerText = `Dados fictícios para conta ${tipo}.`;
  document.getElementById("resultadoAgencia").innerText = agencia;
  document.getElementById("resultadoConta").innerText = conta;
}

function copiarResultado() {
  const banco = document.getElementById("resumoTopoValor").innerText;
  const agencia = document.getElementById("resultadoAgencia").innerText;
  const conta = document.getElementById("resultadoConta").innerText;
  const tipo = document.getElementById("tipoConta").value;
  const feedback = document.getElementById("copyFeedback");
  if (!banco) {
    feedback.innerText = "Gere uma conta antes de copiar.";
    return;
  }
  const texto = `Banco: ${banco}\nTipo: ${tipo}\nAgência: ${agencia}\nConta: ${conta}`;
  copiarTextoComFallback(
    texto,
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
  document.getElementById("tipoConta").addEventListener("change", gerarConta);
  gerarConta();
};
