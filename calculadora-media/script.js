let quantidade = 4;
const maxCampos = 20;
const minCampos = 1;

function formatarNumero(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function gerarCampos() {
    const container = document.getElementById("camposValores");
    const contador = document.getElementById("contadorValores");

    if (!container || !contador) return;

    container.innerHTML = "";
    contador.innerText = quantidade;

    for (let i = 1; i <= quantidade; i++) {
        const div = document.createElement("div");
        div.className = "campo";

        const label = document.createElement("label");
        label.setAttribute("for", "valor" + i);
        label.innerText = "Valor " + i;

        const input = document.createElement("input");
        input.id = "valor" + i;
        input.type = "number";
        input.step = "0.01";
        input.inputMode = "decimal";

        input.addEventListener("input", calcular);

        div.appendChild(label);
        div.appendChild(input);
        container.appendChild(div);
    }

    calcular();
}

function adicionarCampo() {
    if (quantidade >= maxCampos) return;
    quantidade++;
    gerarCampos();
}

function removerCampo() {
    if (quantidade <= minCampos) return;
    quantidade--;
    gerarCampos();
}

function calcular() {
    const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
    const resumoTopoValor = document.getElementById("resumoTopoValor");
    const resumoTopoTexto = document.getElementById("resumoTopoTexto");

    let valores = [];

    for (let i = 1; i <= quantidade; i++) {
        const campo = document.getElementById("valor" + i);
        if (!campo) continue;

        const valor = parseFloat(campo.value);
        if (!isNaN(valor)) {
            valores.push(valor);
        }
    }

    if (valores.length === 0) {
        resumoTopoTitulo.innerText = "Resultado";
        resumoTopoValor.innerText = "-";
        resumoTopoTexto.innerText = "Informe pelo menos um valor para calcular a média.";
        return;
    }

    const soma = valores.reduce((total, valor) => total + valor, 0);
    const media = soma / valores.length;

    resumoTopoTitulo.innerText = "Média calculada";
    resumoTopoValor.innerText = formatarNumero(media);
    resumoTopoTexto.innerText =
        `Foram considerados ${valores.length} valor(es), com soma total de ${formatarNumero(soma)}.`;
}

window.onload = function () {
    gerarCampos();
};