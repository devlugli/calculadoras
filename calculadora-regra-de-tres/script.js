function formatarNumero(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function calcular() {
    const valorA = parseFloat(document.getElementById("valorA").value) || 0;
    const valorB = parseFloat(document.getElementById("valorB").value) || 0;
    const valorC = parseFloat(document.getElementById("valorC").value) || 0;

    const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
    const resumoTopoValor = document.getElementById("resumoTopoValor");
    const resumoTopoTexto = document.getElementById("resumoTopoTexto");

    if (valorA === 0) {
        resumoTopoTitulo.innerText = "Resultado da regra de três";
        resumoTopoValor.innerText = "0,00";
        resumoTopoTexto.innerText = "Informe um valor A maior que zero para calcular.";
        return;
    }

    const resultado = (valorB * valorC) / valorA;

    resumoTopoTitulo.innerText = "Resultado da regra de três";
    resumoTopoValor.innerText = formatarNumero(resultado);
    resumoTopoTexto.innerText =
        `Se ${formatarNumero(valorA)} está para ${formatarNumero(valorB)}, então ${formatarNumero(valorC)} está para ${formatarNumero(resultado)}.`;
}

window.onload = function () {
    document.getElementById("valorA").addEventListener("input", calcular);
    document.getElementById("valorB").addEventListener("input", calcular);
    document.getElementById("valorC").addEventListener("input", calcular);

    calcular();
};