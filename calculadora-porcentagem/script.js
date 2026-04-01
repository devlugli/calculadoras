function formatarNumero(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function trocarModo() {
    const tipo = document.getElementById("tipoCalculo").value;

    document.getElementById("modoPercentualDeValor").style.display =
        tipo === "percentualDeValor" ? "block" : "none";

    document.getElementById("modoValorRepresentaPercentual").style.display =
        tipo === "valorRepresentaPercentual" ? "block" : "none";

    document.getElementById("modoVariacaoPercentual").style.display =
        tipo === "variacaoPercentual" ? "block" : "none";

    calcular();
}

function calcular() {
    const tipo = document.getElementById("tipoCalculo").value;
    const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
    const resumoTopoValor = document.getElementById("resumoTopoValor");
    const resumoTopoTexto = document.getElementById("resumoTopoTexto");

    if (tipo === "percentualDeValor") {
        const percentual = parseFloat(document.getElementById("percentual1").value) || 0;
        const valor = parseFloat(document.getElementById("valor1").value) || 0;

        const resultado = valor * (percentual / 100);

        resumoTopoTitulo.innerText = "Resultado do cálculo percentual";
        resumoTopoValor.innerText = formatarNumero(resultado);
        resumoTopoTexto.innerText =
            `${formatarNumero(percentual)}% de ${formatarNumero(valor)} é ${formatarNumero(resultado)}.`;

        return;
    }

    if (tipo === "valorRepresentaPercentual") {
        const valorBase = parseFloat(document.getElementById("valorBase2").value) || 0;
        const valorComparado = parseFloat(document.getElementById("valorComparado2").value) || 0;

        if (valorBase === 0) {
            resumoTopoTitulo.innerText = "Percentual em relação ao valor base";
            resumoTopoValor.innerText = "0,00%";
            resumoTopoTexto.innerText = "Informe um valor base maior que zero para calcular.";
            return;
        }

        const resultado = (valorComparado / valorBase) * 100;

        resumoTopoTitulo.innerText = "Percentual em relação ao valor base";
        resumoTopoValor.innerText = `${formatarNumero(resultado)}%`;
        resumoTopoTexto.innerText =
            `${formatarNumero(valorComparado)} representa ${formatarNumero(resultado)}% de ${formatarNumero(valorBase)}.`;

        return;
    }

    if (tipo === "variacaoPercentual") {
        const valorInicial = parseFloat(document.getElementById("valorInicial3").value) || 0;
        const valorFinal = parseFloat(document.getElementById("valorFinal3").value) || 0;

        if (valorInicial === 0) {
            resumoTopoTitulo.innerText = "Variação percentual";
            resumoTopoValor.innerText = "0,00%";
            resumoTopoTexto.innerText = "Informe um valor inicial maior que zero para calcular.";
            return;
        }

        const variacao = ((valorFinal - valorInicial) / valorInicial) * 100;
        const tipoVariacao = variacao >= 0 ? "aumento" : "desconto";

        resumoTopoTitulo.innerText = "Variação percentual";
        resumoTopoValor.innerText = `${formatarNumero(variacao)}%`;
        resumoTopoTexto.innerText =
            `Ao passar de ${formatarNumero(valorInicial)} para ${formatarNumero(valorFinal)}, houve um ${tipoVariacao} de ${formatarNumero(Math.abs(variacao))}%.`;

        return;
    }
}

window.onload = function () {
    document.getElementById("tipoCalculo").addEventListener("change", calcular);

    document.getElementById("percentual1").addEventListener("input", calcular);
    document.getElementById("valor1").addEventListener("input", calcular);

    document.getElementById("valorBase2").addEventListener("input", calcular);
    document.getElementById("valorComparado2").addEventListener("input", calcular);

    document.getElementById("valorInicial3").addEventListener("input", calcular);
    document.getElementById("valorFinal3").addEventListener("input", calcular);

    trocarModo();
};