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

const prefixos = ["Alpha", "Nova", "Prime", "Flex", "Integra", "Central", "Brasil", "Digital"];
const segmentos = ["Logística", "Tecnologia", "Consultoria", "Serviços", "Varejo", "Saúde", "Financeiro", "Educação"];

function escolher(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function gerarBaseCnpj() {
  let base = "";
  for (let i = 0; i < 8; i++) {
    base += Math.floor(Math.random() * 10);
  }
  return `${base}0001`;
}

function gerarDigitoCnpj(base, pesos) {
  let soma = 0;
  for (let i = 0; i < pesos.length; i++) {
    soma += Number(base[i]) * pesos[i];
  }
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

function formatarCnpj(cnpj) {
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

function gerarEmpresa() {
  const segmento = escolher(segmentos);
  const nome = `${escolher(prefixos)} ${segmento}`;
  const email = `${nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ".")}@empresa.com`;
  const base = gerarBaseCnpj();
  const d1 = gerarDigitoCnpj(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = gerarDigitoCnpj(base + d1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const cnpj = formatarCnpj(`${base}${d1}${d2}`);

  document.getElementById("resumoTopoTitulo").innerText = "Empresa gerada";
  document.getElementById("resumoTopoValor").innerText = nome;
  document.getElementById("resumoTopoTexto").innerText = `Perfil empresarial fictício do segmento ${segmento}.`;
  document.getElementById("resultadoCnpj").innerText = cnpj;
  document.getElementById("resultadoEmail").innerText = email;
}

function copiarResultado() {
  const nome = document.getElementById("resumoTopoValor").innerText;
  const cnpj = document.getElementById("resultadoCnpj").innerText;
  const email = document.getElementById("resultadoEmail").innerText;
  const feedback = document.getElementById("copyFeedback");
  if (!nome) {
    feedback.innerText = "Gere uma empresa antes de copiar.";
    return;
  }
  const texto = `Empresa: ${nome}\nCNPJ: ${cnpj}\nE-mail: ${email}`;
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

window.onload = gerarEmpresa;
