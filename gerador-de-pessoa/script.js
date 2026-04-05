const nomesMasculinos = ["Lucas", "Mateus", "João", "Pedro", "Gustavo", "Rafael", "Bruno", "Thiago"];
const nomesFemininos = ["Ana", "Mariana", "Juliana", "Camila", "Larissa", "Fernanda", "Beatriz", "Aline"];
const sobrenomes = ["Silva", "Souza", "Oliveira", "Costa", "Pereira", "Rodrigues", "Almeida", "Gomes"];
const estados = ["SP", "RJ", "MG", "PR", "SC", "BA", "PE", "GO"];

function gerarDigitoCpf(base) {
  let soma = 0;
  for (let i = 0; i < base.length; i++) {
    soma += Number(base[i]) * ((base.length + 1) - i);
  }
  const resto = (soma * 10) % 11;
  return resto === 10 ? 0 : resto;
}

function gerarCpfValido() {
  let base = "";
  for (let i = 0; i < 9; i++) {
    base += Math.floor(Math.random() * 10);
  }
  const digito1 = gerarDigitoCpf(base);
  const digito2 = gerarDigitoCpf(base + digito1);
  const cpf = `${base}${digito1}${digito2}`;
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

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

function escolher(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function gerarTelefone() {
  const ddd = 10 + Math.floor(Math.random() * 80);
  const parte1 = 90000 + Math.floor(Math.random() * 10000);
  const parte2 = 1000 + Math.floor(Math.random() * 9000);
  return `(${ddd}) ${parte1}-${parte2}`;
}

function gerarPessoa() {
  const genero = document.getElementById("generoPessoa").value;
  const listaBase = genero === "feminino" ? nomesFemininos : genero === "masculino" ? nomesMasculinos : [...nomesMasculinos, ...nomesFemininos];
  const nome = `${escolher(listaBase)} ${escolher(sobrenomes)} ${escolher(sobrenomes)}`;
  const email = `${nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ".")}@teste.com`;
  const cpf = gerarCpfValido();
  const telefone = gerarTelefone();
  const estado = escolher(estados);

  document.getElementById("resumoTopoTitulo").innerText = "Pessoa gerada";
  document.getElementById("resumoTopoValor").innerText = nome;
  document.getElementById("resumoTopoTexto").innerText = `Perfil fictício pronto com estado ${estado}.`;
  document.getElementById("resultadoCpf").innerText = cpf;
  document.getElementById("resultadoEmail").innerText = email;
  document.getElementById("resultadoTelefone").innerText = telefone;
}

function copiarPessoa() {
  const nome = document.getElementById("resumoTopoValor").innerText;
  const cpf = document.getElementById("resultadoCpf").innerText;
  const email = document.getElementById("resultadoEmail").innerText;
  const telefone = document.getElementById("resultadoTelefone").innerText;
  const feedback = document.getElementById("copyFeedback");

  if (!nome || nome === "-") {
    feedback.innerText = "Gere uma pessoa antes de copiar.";
    return;
  }

  const texto = `Nome: ${nome}\nCPF: ${cpf}\nE-mail: ${email}\nTelefone: ${telefone}`;
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
  document.getElementById("generoPessoa").addEventListener("change", gerarPessoa);
  gerarPessoa();
};
