function calcular() {
    const dataInicialInput = document.getElementById("dataInicial").value;
    const dataFinalInput = document.getElementById("dataFinal").value;

    const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
    const resumoTopoValor = document.getElementById("resumoTopoValor");
    const resumoTopoTexto = document.getElementById("resumoTopoTexto");

    if (!dataInicialInput || !dataFinalInput) {
        resumoTopoTitulo.innerText = "Resultado";
        resumoTopoValor.innerText = "-";
        resumoTopoTexto.innerText = "Informe a data inicial e a data final para calcular.";
        return;
    }

    const dataInicial = new Date(dataInicialInput + "T00:00:00");
    const dataFinal = new Date(dataFinalInput + "T00:00:00");

    const diferencaMs = dataFinal.getTime() - dataInicial.getTime();
    const diferencaDias = Math.round(diferencaMs / (1000 * 60 * 60 * 24));
    const diferencaAbsoluta = Math.abs(diferencaDias);

    resumoTopoTitulo.innerText = "Diferença entre as datas";
    resumoTopoValor.innerText = diferencaAbsoluta + " dia" + (diferencaAbsoluta === 1 ? "" : "s");

    if (diferencaDias === 0) {
        resumoTopoTexto.innerText = "As duas datas são iguais.";
        return;
    }

    if (diferencaDias > 0) {
        resumoTopoTexto.innerText =
            `Existem ${diferencaAbsoluta} dia(s) entre ${dataInicial.toLocaleDateString("pt-BR")} e ${dataFinal.toLocaleDateString("pt-BR")}.`;
    } else {
        resumoTopoTexto.innerText =
            `A data final é anterior à data inicial. A diferença entre ${dataFinal.toLocaleDateString("pt-BR")} e ${dataInicial.toLocaleDateString("pt-BR")} é de ${diferencaAbsoluta} dia(s).`;
    }
}

window.onload = function () {
    const hoje = new Date();
    const hojeFormatado = hoje.toISOString().split("T")[0];

    document.getElementById("dataInicial").value = hojeFormatado;
    document.getElementById("dataFinal").value = hojeFormatado;

    document.getElementById("dataInicial").addEventListener("change", calcular);
    document.getElementById("dataFinal").addEventListener("change", calcular);

    calcular();
};