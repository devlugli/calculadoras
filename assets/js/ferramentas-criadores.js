(function () {
  const $ = (id) => document.getElementById(id);
  const tool = document.querySelector("[data-creator-tool]")?.getAttribute("data-creator-tool");
  const state = { image: null, file: null, outputBlob: null, outputName: "imagem" };

  const mime = (format) => ({ jpg: "image/jpeg", png: "image/png", webp: "image/webp" }[format] || "image/png");
  const ext = (format) => format === "jpg" ? "jpg" : format;
  const fmtBytes = (bytes) => bytes ? bytes < 1048576 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1048576).toFixed(2)} MB` : "-";
  const setText = (id, text) => { const el = $(id); if (el) el.textContent = text; };
  const setValue = (id, value) => { const el = $(id); if (el) el.value = value; };
  const getValue = (id, fallback = "") => ($(id)?.value || fallback).trim();
  const checked = (id) => !!$(id)?.checked;
  const downloadBlob = (blob, name) => {
    if (!blob) return setText("toolMessage", "Gere um arquivo antes de baixar.");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  const copyText = async (text) => {
    if (!text) return setText("toolMessage", "Não há resultado para copiar.");
    try { await navigator.clipboard.writeText(text); }
    catch { const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); }
    setText("toolMessage", "Resultado copiado.");
  };
  const drawImage = (width, height, format, quality = 0.85) => new Promise((resolve) => {
    const canvas = $("imageCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(state.image, 0, 0, width, height);
    canvas.hidden = false;
    canvas.toBlob(resolve, mime(format), format === "png" ? undefined : quality);
  });
  const loadImage = (file) => {
    if (!file || !file.type.startsWith("image/")) return setText("toolMessage", "Envie uma imagem JPG, PNG ou WebP.");
    if (file.size > 20 * 1024 * 1024) return setText("toolMessage", "Use uma imagem de até 20 MB para evitar travamentos no navegador.");
    const img = new Image();
    img.onload = () => {
      state.image = img; state.file = file; state.outputBlob = null;
      setText("originalInfo", `${img.naturalWidth} x ${img.naturalHeight} • ${fmtBytes(file.size)} • ${file.type || "imagem"}`);
      setValue("width", img.naturalWidth); setValue("height", img.naturalHeight);
      const canvas = $("imageCanvas");
      if (canvas) { const max = 520; const ratio = Math.min(1, max / img.naturalWidth); canvas.width = Math.round(img.naturalWidth * ratio); canvas.height = Math.round(img.naturalHeight * ratio); canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height); canvas.hidden = false; }
      setText("toolMessage", "Imagem carregada. O processamento é local no seu navegador.");
    };
    img.onerror = () => setText("toolMessage", "Não foi possível ler essa imagem.");
    img.src = URL.createObjectURL(file);
  };

  function setupImageInput() {
    const input = $("imageInput");
    if (input) input.addEventListener("change", () => loadImage(input.files[0]));
  }

  function resizeImage() {
    if (!state.image) return setText("toolMessage", "Envie uma imagem primeiro.");
    const w = Math.max(1, Number(getValue("width", state.image.naturalWidth)));
    const h = Math.max(1, Number(getValue("height", state.image.naturalHeight)));
    drawImage(w, h, getValue("outputFormat", "png"), Number(getValue("quality", "90")) / 100).then((blob) => {
      state.outputBlob = blob; state.outputName = `imagem-redimensionada.${ext(getValue("outputFormat", "png"))}`;
      setText("resultInfo", `${w} x ${h} • ${fmtBytes(blob.size)}`);
      setText("toolMessage", "Imagem redimensionada.");
    });
  }

  function compressImage() {
    if (!state.image) return setText("toolMessage", "Envie uma imagem primeiro.");
    const format = getValue("outputFormat", "webp");
    drawImage(state.image.naturalWidth, state.image.naturalHeight, format, Number(getValue("quality", "75")) / 100).then((blob) => {
      state.outputBlob = blob; state.outputName = `imagem-comprimida.${ext(format)}`;
      const reduction = state.file?.size ? Math.round((1 - blob.size / state.file.size) * 100) : 0;
      setText("resultInfo", `${fmtBytes(blob.size)} • redução estimada: ${reduction}%`);
      setText("toolMessage", format === "png" ? "PNG pode não reduzir com qualidade. Para reduzir mais, teste WebP ou JPG." : "Imagem comprimida.");
    });
  }

  function convertImage() {
    if (!state.image) return setText("toolMessage", "Envie uma imagem primeiro.");
    const format = getValue("outputFormat", "webp");
    drawImage(state.image.naturalWidth, state.image.naturalHeight, format, Number(getValue("quality", "90")) / 100).then((blob) => {
      state.outputBlob = blob; state.outputName = `imagem-convertida.${ext(format)}`;
      setText("resultInfo", `${fmtBytes(blob.size)} • formato ${format.toUpperCase()}`);
      setText("toolMessage", format === "jpg" ? "Imagem convertida. Transparências são preenchidas com fundo branco no JPG." : "Imagem convertida.");
    });
  }

  function aspect() {
    const ow = Number(getValue("originalWidth", "1080"));
    const oh = Number(getValue("originalHeight", "1080"));
    let nw = Number(getValue("newWidth", ""));
    let nh = Number(getValue("newHeight", ""));
    if (ow && oh && nw && !nh) { nh = Math.round(nw * oh / ow); setValue("newHeight", nh); }
    if (ow && oh && nh && !nw) { nw = Math.round(nh * ow / oh); setValue("newWidth", nw); }
    const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
    const g = gcd(ow, oh) || 1;
    const ratio = `${ow / g}:${oh / g}`;
    const known = { "1:1": "1:1 quadrado", "4:5": "4:5 vertical", "9:16": "9:16 stories/reels", "16:9": "16:9 horizontal", "3:2": "3:2 foto" }[ratio] || `personalizada (${ratio})`;
    const result = `Proporção: ${known}\nOriginal: ${ow} x ${oh}\nNova medida proporcional: ${nw || "-"} x ${nh || "-"}\nPixels aproximados: ${(nw || ow) * (nh || oh)}`;
    setValue("textResult", result); setText("toolMessage", "Proporção calculada.");
  }

  const countStats = (text) => ({
    chars: text.length,
    noSpaces: text.replace(/\s/g, "").length,
    words: (text.trim().match(/\S+/g) || []).length,
    lines: text ? text.split(/\n/).length : 0,
    hashtags: (text.match(/#[\p{L}\p{N}_]+/gu) || []).length,
    mentions: (text.match(/@[\p{L}\p{N}_.]+/gu) || []).length,
    emojis: (text.match(/\p{Extended_Pictographic}/gu) || []).length
  });
  function socialCounter() {
    const text = $("sourceText")?.value || "";
    const s = countStats(text);
    const limits = [["Instagram bio", 150], ["Instagram legenda", 2200], ["TikTok legenda (referência)", 2200], ["YouTube título", 100], ["YouTube descrição", 5000], ["X/Twitter post", 280], ["LinkedIn post (referência)", 3000]];
    const status = limits.map(([name, limit]) => {
      const label = s.chars > limit ? "Acima do limite" : s.chars > limit * 0.85 ? "Perto do limite" : "Dentro do limite";
      return `${name}: ${label} (${s.chars}/${limit})`;
    }).join("\n");
    setValue("textResult", `Caracteres com espaços: ${s.chars}\nCaracteres sem espaços: ${s.noSpaces}\nPalavras: ${s.words}\nLinhas: ${s.lines}\nHashtags: ${s.hashtags}\nMenções: ${s.mentions}\nEmojis aproximados: ${s.emojis}\n\n${status}`);
  }

  const slugify = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
  function cleanText(text) {
    let out = text;
    if (checked("tabs")) out = out.replace(/\t/g, " ");
    if (checked("invisible")) out = out.replace(/[\u200B-\u200D\uFEFF]/g, "");
    if (checked("pdf")) out = out.replace(/-\n/g, "").replace(/\s+\n/g, "\n");
    if (checked("breaks")) out = out.replace(/\n+/g, " ");
    if (checked("singleBreak")) out = out.replace(/\n{2,}/g, "\n");
    if (checked("accents")) out = out.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (checked("emoji")) out = out.replace(/\p{Extended_Pictographic}/gu, "");
    if (checked("punct")) out = out.replace(/[^\p{L}\p{N}\s]/gu, "");
    if (checked("numbers")) out = out.replace(/\d/g, "");
    if (checked("letters")) out = out.replace(/\p{L}/gu, "");
    if (checked("spaces")) out = out.replace(/[ ]{2,}/g, " ");
    if (checked("trim")) out = out.trim();
    return out;
  }
  function runTextTool(action) {
    const input = $("sourceText")?.value || "";
    let out = input;
    if (tool === "whatsapp") {
      const wrap = { bold: "*", italic: "_", strike: "~", mono: "```" }[action] || "";
      const source = $("sourceText");
      const start = source?.selectionStart || 0;
      const end = source?.selectionEnd || 0;
      if (wrap && source && end > start) {
        out = `${input.slice(0, start)}${wrap}${input.slice(start, end)}${wrap}${input.slice(end)}`;
      } else {
        out = wrap ? `${wrap}${input || "seu texto"}${wrap}` : input;
      }
    } else if (tool === "limpador") out = cleanText(input);
    else if (tool === "case") {
      if (action === "upper") out = input.toUpperCase();
      if (action === "lower") out = input.toLowerCase();
      if (action === "sentence") out = input.toLowerCase().replace(/(^\s*\p{L}|[.!?]\s+\p{L})/gu, (m) => m.toUpperCase());
      if (action === "title") out = input.toLowerCase().replace(/\b\p{L}/gu, (m) => m.toUpperCase());
      if (action === "toggle") out = [...input].map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
      if (action === "spaces") out = input.replace(/\s+/g, " ").trim();
      if (action === "slug") out = slugify(input);
    } else if (tool === "slug") {
      out = slugify(input);
      const max = Number(getValue("maxLength", "0"));
      if (checked("shortWords")) out = out.split("-").filter((w) => w.length > 2).join("-");
      if (max > 0) out = out.slice(0, max).replace(/-+$/g, "");
      const domain = getValue("domain", "");
      if (domain) out = `${domain.replace(/\/+$/g, "")}/${out}`;
    } else if (tool === "split") {
      const mode = getValue("splitMode", "chars");
      const size = Math.max(1, Number(getValue("splitSize", "280")));
      let parts = [];
      if (mode === "words") {
        const words = input.split(/\s+/).filter(Boolean);
        for (let i = 0; i < words.length; i += size) parts.push(words.slice(i, i + size).join(" "));
      } else if (mode === "lines") {
        const lines = input.split(/\n/);
        for (let i = 0; i < lines.length; i += size) parts.push(lines.slice(i, i + size).join("\n"));
      } else {
        let text = input;
        while (text.length) {
          let cut = Math.min(size, text.length);
          if (checked("avoidCut") && cut < text.length) cut = text.lastIndexOf(" ", cut) > 20 ? text.lastIndexOf(" ", cut) : cut;
          parts.push(text.slice(0, cut).trim());
          text = text.slice(cut).trim();
        }
      }
      const total = parts.length || 1;
      out = (parts.length ? parts : [""]).map((part, i) => `${checked("numberParts") ? `${i + 1}/${total}\n` : ""}${part}`).join(getValue("separator", "\n\n---\n\n"));
      setText("partsInfo", `${total} parte(s) gerada(s)`);
    }
    setValue("textResult", out);
    const before = input.length, after = out.length;
    setText("toolMessage", `Pronto. Antes: ${before} caracteres. Depois: ${after} caracteres.`);
  }

  function clearAll() {
    document.querySelectorAll("input[type=text], input[type=number], input[type=file], textarea").forEach((el) => { el.value = ""; });
    document.querySelectorAll("canvas").forEach((el) => { el.hidden = true; });
    state.image = null; state.file = null; state.outputBlob = null;
    setText("toolMessage", "Campos limpos.");
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupImageInput();
    $("preset")?.addEventListener("change", (e) => { const [w, h] = e.target.value.split("x").map(Number); if (w && h) { setValue("width", w); setValue("height", h); setValue("newWidth", w); setValue("newHeight", h); } });
    $("width")?.addEventListener("input", () => { if (checked("keepRatio") && state.image) setValue("height", Math.round(Number(getValue("width", state.image.naturalWidth)) * state.image.naturalHeight / state.image.naturalWidth)); });
    $("height")?.addEventListener("input", () => { if (checked("keepRatio") && state.image) setValue("width", Math.round(Number(getValue("height", state.image.naturalHeight)) * state.image.naturalWidth / state.image.naturalHeight)); });
    $("sourceText")?.addEventListener("input", () => { if (tool === "social-counter") socialCounter(); });
    document.addEventListener("click", (e) => {
      const action = e.target?.getAttribute("data-action");
      if (!action) return;
      if (action === "resize") resizeImage();
      if (action === "compress") compressImage();
      if (action === "convert") convertImage();
      if (action === "download") downloadBlob(state.outputBlob, state.outputName);
      if (action === "aspect") aspect();
      if (action === "social") socialCounter();
      if (["bold", "italic", "strike", "mono", "clean", "upper", "lower", "sentence", "title", "toggle", "spaces", "slug", "split"].includes(action)) runTextTool(action);
      if (action === "copy") copyText($("textResult")?.value || $("sourceText")?.value || "");
      if (action === "clear") clearAll();
    });
    if (tool === "social-counter") socialCounter();
  });
})();
