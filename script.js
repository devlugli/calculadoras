let grafico;

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function limparMoeda(valorTexto) {
    if (!valorTexto) return 0;

    let valorLimpo = valorTexto
        .replace(/\s/g, "")
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".");

    let numero = parseFloat(valorLimpo);

    return isNaN(numero) ? 0 : numero;
}

function formatarNumero(valor) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function calcular() {
    let P = limparMoeda(document.getElementById("valorInicial").value);
    let PMT = limparMoeda(document.getElementById("aporteMensal").value);
    let taxa = parseFloat(document.getElementById("taxaAnual").value) || 0;
    let anos = parseFloat(document.getElementById("anos").value) || 0;

    let r = taxa / 100 / 12;
    let n = anos * 12;

    let saldo = P;
    let dados = [];
    let labels = [];

    for (let i = 1; i <= n; i++) {
        saldo = saldo * (1 + r) + PMT;

        if (i % 12 === 0) {
            dados.push(saldo);
            labels.push(i / 12);
        }
    }

    let FV = saldo;
    let valorInvestido = P + (PMT * n);
    let rendimento = FV - valorInvestido;

    let resumo = `Em ${anos} anos, investindo ${formatarMoeda(P)} inicialmente e ${formatarMoeda(PMT)} por mês a ${formatarNumero(taxa)}% ao ano, você pode acumular ${formatarMoeda(FV)}.`

document.getElementById("resumoTopoTitulo").innerText =
    `Patrimônio estimado em ${anos} anos`

document.getElementById("resumoTopoValor").innerText =
    `${formatarMoeda(FV)}`

document.getElementById("resumoTopoTexto").innerText =
    `Com um aporte inicial de ${formatarMoeda(P)} e contribuições mensais de ${formatarMoeda(PMT)}, considerando rentabilidade de ${formatarNumero(taxa)}% ao ano.`
    document.getElementById("valorFinal").innerText =
        "R$ " + FV.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    document.getElementById("valorInvestido").innerText =
        "R$ " + valorInvestido.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    document.getElementById("rendimento").innerText =
        "R$ " + rendimento.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    desenharGrafico(labels, dados);
}

function desenharGrafico(labels, dados) {
    let ctx = document.getElementById("grafico");

    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
datasets: [{
    label: "Evolução do investimento",
    data: dados,
    borderColor: "#2563eb",
    backgroundColor: "rgba(37,99,235,0.12)",
    pointBackgroundColor: "#2563eb",
    pointBorderColor: "#2563eb",
    pointRadius: 4,
    pointHoverRadius: 6,
    borderWidth: 3,
    tension: 0.35,
    fill: true
}]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Anos"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Valor (R$)"
                    },
                    ticks: {
                        callback: function(value) {
                            return "R$ " + value.toLocaleString("pt-BR");
                        }
                    }
                }
            }
        }
    });
}

window.onload = function () {
    const campoValorInicial = document.getElementById("valorInicial");
    const campoAporteMensal = document.getElementById("aporteMensal");

    campoValorInicial.value = formatarMoeda(limparMoeda(campoValorInicial.value));
    campoAporteMensal.value = formatarMoeda(limparMoeda(campoAporteMensal.value));

    campoValorInicial.addEventListener("blur", function () {
        let valor = limparMoeda(this.value);
        this.value = formatarMoeda(valor);
    });

    campoAporteMensal.addEventListener("blur", function () {
        let valor = limparMoeda(this.value);
        this.value = formatarMoeda(valor);
    });

    calcular();
};

document.getElementById("valorInicial").addEventListener("input", calcular)
document.getElementById("aporteMensal").addEventListener("input", calcular)
document.getElementById("taxaAnual").addEventListener("input", calcular)
document.getElementById("anos").addEventListener("input", calcular)