(function () {
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const clean = (value, fallback) => (value || "").trim() || fallback;
  const sentence = (value) => clean(value, "sua ideia").replace(/\.$/, "");
  const get = (id, fallback = "") => clean(document.getElementById(id)?.value, fallback);
  const yes = (id) => get(id, "não") === "sim";

  function slugText(text) {
    return clean(text, "conteudo")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 4)
      .join("");
  }

  const generators = {
    bio() {
      const tipo = get("tipoPerfil", "perfil");
      const nome = get("nomeMarca", "Sua Marca");
      const nicho = get("nicho", "seu nicho");
      const beneficio = get("beneficio", "soluções práticas");
      const local = get("localizacao", "atendimento online");
      const estilo = get("estilo", "profissional");
      const emojis = estilo === "elegante" ? ["", "• "] : ["✨ ", "📍 ", "💬 ", "🚀 ", ""];
      const calls = yes("cta")
        ? ["Chame no direct", "Veja o link abaixo", "Peça seu orçamento", "Fale comigo", "Conheça meu trabalho"]
        : ["Conteúdo e soluções práticas", "Atendimento com cuidado", "Ideias para o dia a dia"];

      return Array.from({ length: 8 }, (_, i) =>
        `${i + 1}. ${pick(emojis)}${nome} | ${nicho}\n${beneficio} para ${tipo}\n${local} • ${pick(calls)}`
      ).join("\n\n");
    },

    legendas() {
      const tema = sentence(get("tema", "seu tema"));
      const tipo = get("tipoConteudo", "post");
      const tom = get("tom", "profissional");
      const objetivo = get("objetivo", "engajamento");
      const emoji = yes("emojis") ? ["✨", "💡", "📌", "🚀", "🤝"] : [""];
      const ctas = {
        engajamento: "Me conta o que você achou nos comentários.",
        venda: "Chame no direct para saber mais.",
        comentário: "Comente sua experiência aqui embaixo.",
        "salvar post": "Salve este post para consultar depois.",
        "enviar mensagem": "Envie uma mensagem para receber os detalhes."
      };

      let result = Array.from({ length: 5 }, (_, i) =>
        `${i + 1}. ${pick(emoji)} ${pick([
          "Você já pensou nisso?",
          "Uma forma simples de começar:",
          "O detalhe que muita gente esquece:",
          "Para quem quer evoluir com mais clareza:",
          "Antes de publicar, vale olhar para isso:"
        ])} ${tema} pode ficar mais simples quando você conecta a mensagem ao formato ${tipo} e mantém um tom ${tom}. ${ctas[objetivo] || ctas.engajamento}`
      ).join("\n\n");

      if (yes("hashtags")) {
        result += `\n\nHashtags sugeridas:\n#${slugText(tema)} #conteudodigital #instagrambrasil #criadoresdeconteudo #marketingdigital #redessociais`;
      }

      return result;
    },

    hashtags() {
      const tema = slugText(get("tema", "conteudo"));
      const nicho = slugText(get("nicho", "negocio"));
      const publico = slugText(get("publico", "clientes"));
      const local = slugText(get("localizacao", ""));
      const qtd = Number(get("quantidade", "20"));
      const base = ["instagrambrasil", "conteudodigital", "redessociais", "empreendedorismodigital", "marketingdeconteudo", "criadoresbr"];
      const specific = [tema, `${tema}brasil`, `${tema}online`, `${nicho}criativo`, `${nicho}digital`, `${publico}brasil`, `${publico}online`].filter(Boolean);
      const localTags = get("localizacao", "") ? [`${tema}${local}`, `${nicho}${local}`, `${local}empreende`, `${local}criativo`, `${local}digital`] : [];
      const all = [...base, ...specific, ...localTags].filter(Boolean).map((item) => `#${item.replace(/^#/, "")}`).slice(0, qtd);

      return `Hashtags amplas:\n${base.map((item) => `#${item}`).join(" ")}\n\nHashtags específicas:\n${specific.slice(0, Math.max(6, Math.floor(qtd / 2))).map((item) => `#${item}`).join(" ")}\n\nHashtags de nicho:\n${specific.reverse().slice(0, Math.max(4, Math.floor(qtd / 3))).map((item) => `#${item}`).join(" ")}${localTags.length ? `\n\nHashtags locais:\n${localTags.map((item) => `#${item}`).join(" ")}` : ""}\n\nLista rápida (${all.length}):\n${all.join(" ")}`;
    },

    contadorInstagram() {
      const text = document.getElementById("texto")?.value || "";
      const chars = text.length;
      const semEspacos = text.replace(/\s/g, "").length;
      const words = (text.trim().match(/\S+/g) || []).length;
      const lines = text ? text.split(/\n/).length : 0;
      const bio = chars <= 150 ? `Bio: dentro do limite de 150 caracteres. Sobram ${150 - chars}.` : `Bio: passou ${chars - 150} caracteres do limite de 150.`;
      const legenda = chars <= 2200 ? `Legenda: dentro do limite de 2.200 caracteres. Sobram ${2200 - chars}.` : `Legenda: passou ${chars - 2200} caracteres do limite de 2.200.`;

      return `Total de caracteres: ${chars}\nCaracteres sem espaços: ${semEspacos}\nTotal de palavras: ${words}\nTotal de linhas: ${lines}\n\nEstimativa para bio do Instagram:\n${bio}\n\nEstimativa para legenda:\n${legenda}\n\nAvisos:\n${chars === 0 ? "Digite ou cole um texto para analisar." : chars > 150 ? "Se for bio, encurte a mensagem e priorize nicho, benefício e CTA." : "Texto curto e fácil de revisar."}`;
    }
  };

  function run(tool) {
    const output = document.getElementById("creatorResult");
    if (!generators[tool] || !output) return;
    output.value = generators[tool]();
  }

  function clearForm(container) {
    container.querySelectorAll("input, textarea").forEach((element) => {
      element.value = "";
    });
    const output = document.getElementById("creatorResult");
    const feedback = document.getElementById("copyFeedback");
    if (output) output.value = "";
    if (feedback) feedback.textContent = "";
  }

  async function copyResult() {
    const output = document.getElementById("creatorResult");
    const feedback = document.getElementById("copyFeedback");
    const text = output?.value || "";

    if (!text.trim()) {
      if (feedback) feedback.textContent = "Gere um resultado antes de copiar.";
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      output.focus();
      output.select();
      document.execCommand("copy");
    }

    if (feedback) feedback.textContent = "Resultado copiado.";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("[data-criador-tool]");
    if (!container) return;

    const tool = container.getAttribute("data-criador-tool");
    container.addEventListener("click", (event) => {
      const action = event.target?.getAttribute("data-action");
      if (action === "generate" || action === "again") run(tool);
      if (action === "clear") clearForm(container);
      if (action === "copy") copyResult();
    });

    run(tool);
  });
})();
