function calcular() {
    const dataNascimentoInput = document.getElementById("dataNascimento").value;

    const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
    const resumoTopoValor = document.getElementById("resumoTopoValor");
    const resumoTopoTexto = document.getElementById("resumoTopoTexto");

    if (!dataNascimentoInput) {
        resumoTopoTitulo.innerText = "Sua idade";
        resumoTopoValor.innerText = "-";
        resumoTopoTexto.innerText = "Informe uma data de nascimento para calcular.";
        return;
    }

    const hoje = new Date();
    const nascimento = new Date(dataNascimentoInput + "T00:00:00");

    if (nascimento > hoje) {
        resumoTopoTitulo.innerText = "Sua idade";
        resumoTopoValor.innerText = "-";
        resumoTopoTexto.innerText = "A data de nascimento não pode estar no futuro.";
        return;
    }

    let anos = hoje.getFullYear() - nascimento.getFullYear();
    let meses = hoje.getMonth() - nascimento.getMonth();
    let dias = hoje.getDate() - nascimento.getDate();

    if (dias < 0) {
        meses--;
        dias += new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
    }

    if (meses < 0) {
        anos--;
        meses += 12;
    }

    resumoTopoTitulo.innerText = "Sua idade";
    resumoTopoValor.innerText = anos + " anos";
    resumoTopoTexto.innerText =
        `${anos} anos, ${meses} meses e ${dias} dias desde ${nascimento.toLocaleDateString("pt-BR")}.`;
}

window.onload = function () {
    const campoData = document.getElementById("dataNascimento");

    campoData.addEventListener("change", calcular);
    campoData.addEventListener("input", calcular);
};