/* Schematic drawings, one per featured paper. They are redrawn for this site and
   show the idea of a result, not its data. Colours come from CSS variables. */
(function () {
  const B = "var(--brain)", M = "var(--model)", I = "var(--ink)", S = "var(--soft)", L = "var(--line)";
  const svg = (inner, label) =>
    `<svg viewBox="0 0 320 200" role="img" aria-label="${label}" class="schematic">${inner}</svg>`;
  const t = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" font-size="${o.size || 11}" text-anchor="${o.anchor || "middle"}" fill="${o.fill || I}" ${o.italic ? 'font-style="italic"' : ""} ${o.bold ? 'font-weight="700"' : ""}>${s}</text>`;
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const raster = (x, y, w, h, n, col) => {
    let o = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="none" stroke="${L}"/>`;
    for (let i = 0; i < n; i++) {
      const px = x + 4 + rnd() * (w - 8), py = y + 4 + Math.floor(rnd() * 4) * ((h - 8) / 4);
      o += `<line x1="${px}" y1="${py}" x2="${px}" y2="${py + (h - 8) / 4 - 2}" stroke="${col}" stroke-width="1.4"/>`;
    }
    return o;
  };
  const arc = (x1, x2, y, h, col, dash) =>
    `<path d="M${x1} ${y} C${x1} ${y - h},${x2} ${y - h},${x2} ${y}" fill="none" stroke="${col}" stroke-width="2" ${dash ? 'stroke-dasharray="5 4"' : ""}/>`;

  const F = {};

  F.units = () => {
    const words = ["The", "keys", "to", "the", "cabinet", "are"], xs = [28, 76, 124, 164, 216, 286];
    let o = words.map((w, i) => t(xs[i], 176, w, { bold: i === 1 || i === 5, fill: i === 1 || i === 5 ? M : I })).join("");
    o += `<line x1="14" y1="150" x2="306" y2="150" stroke="${L}"/>`;
    o += `<path d="M14 140 H60 C68 140,68 60,80 60 H270 C282 60,282 140,296 140 H306" fill="none" stroke="${M}" stroke-width="2.5"/>`;
    o += t(175, 48, "plural unit holds its value", { fill: M });
    o += t(14, 24, "unit activity", { anchor: "start", fill: S });
    return svg(o, "Activity of a number unit staying high from subject to verb");
  };

  F.nested = () => {
    const words = ["The", "boy", "that", "the", "girls", "near", "the", "car", "see", "runs"];
    const xs = [18, 46, 76, 104, 134, 168, 198, 224, 254, 290];
    let o = words.map((w, i) => t(xs[i], 172, w, { size: 10.5, bold: [1, 4, 8, 9].includes(i), fill: [1, 9].includes(i) ? M : [4, 8].includes(i) ? B : I })).join("");
    o += arc(46, 290, 156, 150, M) + arc(134, 254, 156, 78, B, true);
    o += t(168, 30, "outer dependency: robust", { fill: M });
    o += t(194, 86, "inner: error-prone", { fill: B });
    return svg(o, "Two nested subject-verb dependencies");
  };

  F.neurons = () => {
    seed = 11;
    const rows = [["Fusiform", 46, 2], ["Auditory cortex", 2, 44], ["Middle temporal", 30, 32]];
    let o = t(158, 22, "read", { fill: S }) + t(256, 22, "heard", { fill: S });
    rows.forEach((r, i) => {
      const y = 34 + i * 54;
      o += t(104, y + 26, r[0], { anchor: "end", size: 10.5 });
      o += raster(112, y, 92, 42, r[1], i === 2 ? "var(--loop)" : B) + raster(210, y, 92, 42, r[2], i === 2 ? "var(--loop)" : B);
    });
    return svg(o, "Spike rasters for three regions under reading and listening");
  };

  F.phonemes = () => {
    const groups = [["stops", ["p", "t", "k", "b", "d", "g"]], ["fricatives", ["f", "s", "ʃ", "v", "z"]], ["nasals", ["m", "n", "ŋ"]], ["vowels", ["a", "i", "u", "e", "o"]]];
    let o = "";
    groups.forEach((g, i) => {
      const y = 22 + i * 44;
      if (i === 1) o += `<rect x="96" y="${y - 2}" width="214" height="34" rx="17" fill="${B}" opacity=".16"/>`;
      o += t(88, y + 20, g[0], { anchor: "end", fill: i === 1 ? B : S });
      g[1].forEach((p, j) => { o += t(120 + j * 36, y + 21, p, { size: 16, bold: i === 1, fill: i === 1 ? B : I }); });
    });
    return svg(o, "Phonemes grouped by manner of articulation, one group highlighted");
  };

  F.ramp = () => {
    let o = `<line x1="40" y1="160" x2="300" y2="160" stroke="${I}"/><line x1="40" y1="160" x2="40" y2="24" stroke="${I}"/>`;
    o += `<path d="M40 150 L92 128 L144 104 L196 78 L248 52 L290 36" fill="none" stroke="${B}" stroke-width="2.5"/>`;
    o += `<path d="M40 150 L92 142 L144 138 L196 134 L248 132 L290 130" fill="none" stroke="${S}" stroke-width="2.5" stroke-dasharray="5 4"/>`;
    [92, 144, 196, 248].forEach(x => { o += `<line x1="${x}" y1="160" x2="${x}" y2="165" stroke="${I}"/>`; });
    o += t(170, 184, "words of the sentence, in order", { fill: S });
    o += t(286, 28, "sentence", { anchor: "end", fill: B }) + t(292, 122, "jabberwocky", { anchor: "end", fill: S });
    o += `<text x="18" y="96" font-size="11" fill="${S}" text-anchor="middle" transform="rotate(-90 18 96)">dimensionality</text>`;
    return svg(o, "Dimensionality rising for sentences and flat for jabberwocky");
  };

  F.brainscore = () => {
    let o = "";
    [0, 1, 2].forEach(l => [0, 1, 2, 3].forEach(n => { o += `<circle cx="${34 + l * 30}" cy="${52 + n * 30}" r="7" fill="none" stroke="${M}" stroke-width="2"/>`; }));
    o += t(64, 184, "language model", { fill: M });
    o += `<path d="M118 97 H184" stroke="${I}" stroke-width="2"/><path d="M178 91 L186 97 L178 103" fill="none" stroke="${I}" stroke-width="2"/>`;
    o += t(151, 86, "linear map", { fill: S });
    for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) {
      seed = (r * 7 + c * 13 + 5) * 97; const v = .12 + rnd() * .75;
      o += `<rect x="${200 + c * 17}" y="${46 + r * 17}" width="15" height="15" rx="2" fill="${B}" opacity="${v.toFixed(2)}"/>`;
    }
    o += t(250, 184, "fMRI voxels", { fill: B });
    o += t(160, 24, "same story given to both", { fill: S });
    return svg(o, "Model activations mapped linearly onto fMRI voxels");
  };

  F.polar = () => {
    const cx = 150, cy = 108;
    let o = `<circle cx="${cx}" cy="${cy}" r="62" fill="none" stroke="${L}" stroke-dasharray="3 4"/><line x1="40" y1="${cy}" x2="270" y2="${cy}" stroke="${L}"/><line x1="${cx}" y1="24" x2="${cx}" y2="190" stroke="${L}"/>`;
    const v = [[-28, "subject", M], [62, "object", B], [150, "determiner", "var(--loop)"]];
    v.forEach(([a, lab, col]) => {
      const r = a * Math.PI / 180, x = cx + 62 * Math.cos(r), y = cy + 62 * Math.sin(r);
      o += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${col}" stroke-width="2.5"/><circle cx="${x}" cy="${y}" r="5" fill="${col}"/>`;
      o += t(x + (x > cx ? 10 : -10), y + (y > cy ? 16 : -8), lab, { anchor: x > cx ? "start" : "end", fill: col });
    });
    o += `<circle cx="${cx}" cy="${cy}" r="6" fill="${I}"/>` + t(cx - 10, cy - 12, "head word", { anchor: "end" });
    o += t(310, 20, "angle = type of relation", { anchor: "end", fill: S }) + t(310, 36, "length = linked or not", { anchor: "end", fill: S });
    return svg(o, "Word vectors whose angle encodes dependency type");
  };

  F.map = () => {
    let o = "";
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) o += `<circle cx="${40 + i * 32}" cy="${36 + j * 32}" r="2.5" fill="${L}"/>`;
    o += `<path d="M40 164 V100 H104 V36 H168 V100" fill="none" stroke="${M}" stroke-width="2.5"/><circle cx="40" cy="164" r="5" fill="${I}"/><circle cx="168" cy="100" r="6" fill="${M}"/>`;
    o += t(104, 190, "path through a space", { fill: S });
    o += `<circle cx="258" cy="92" r="36" fill="none" stroke="${L}"/><line x1="258" y1="92" x2="258" y2="56" stroke="${S}" stroke-width="2" stroke-dasharray="3 3"/>`;
    o += `<line x1="258" y1="92" x2="289" y2="74" stroke="${M}" stroke-width="2.5"/><path d="M258 68 A24 24 0 0 1 279 80" fill="none" stroke="${M}" stroke-width="1.5"/>`;
    o += t(258, 152, "each step rotates", { fill: M }) + t(258, 167, "the position code", { fill: M });
    return svg(o, "A path on a grid and a rotating position code");
  };

  F.meta = () => {
    const seq = ["a", "a", "a", "b", "b", "b"], h = [1, 2, 3, 2, 1, 0];
    let o = "", px = 36, py = 140;
    let d = `M${px} ${py}`;
    seq.forEach((c, i) => {
      const x = 62 + i * 44; o += t(x, 178, c, { size: 15, bold: true, fill: c === "a" ? M : B });
      const y = 140 - h[i] * 30; d += ` H${x - 12} V${y} H${x + 12}`;
    });
    o += `<line x1="30" y1="140" x2="300" y2="140" stroke="${L}"/><path d="${d} H300" fill="none" stroke="${I}" stroke-width="2.5"/>`;
    o += t(30, 28, "counter", { anchor: "start", fill: S });
    return svg(o, "A counter stepping up on a and down on b");
  };

  F.repetition = () => {
    const boxes = [["hear", 14], ["sounds", 80], ["buffer", 146], ["plan", 212], ["say", 270]];
    let o = "";
    boxes.forEach(([lab, x], i) => {
      const w = i === 4 ? 40 : 56;
      o += `<rect x="${x}" y="80" width="${w}" height="38" rx="8" fill="none" stroke="${i === 2 ? B : M}" stroke-width="2"/>` + t(x + w / 2, 104, lab, { fill: i === 2 ? B : I });
      if (i < 4) o += `<line x1="${x + w}" y1="99" x2="${boxes[i + 1][1]}" y2="99" stroke="${I}" stroke-width="1.5"/>`;
    });
    o += `<path d="M160 60 L188 138 M188 60 L160 138" stroke="${B}" stroke-width="2.5"/>`;
    o += t(42, 62, "“banana”", { italic: true }) + t(288, 62, "“bana…”", { italic: true, fill: B });
    o += t(174, 164, "lesion here: errors grow with word length", { fill: B });
    return svg(o, "Stages of word repetition with one stage lesioned");
  };

  F.stages = () => {
    let o = `<line x1="36" y1="166" x2="300" y2="166" stroke="${I}"/>` + t(168, 188, "amount of language experience", { fill: S });
    const cols = [M, "var(--loop)", B];
    o += t(92, 20, "children", { bold: true }) + t(236, 20, "model", { bold: true });
    [0, 1, 2].forEach(i => {
      const x = 44 + i * 36;
      o += `<path d="M36 ${150 - i * 4} H${x} C${x + 14} ${150 - i * 4},${x + 6} ${40 + i * 6},${x + 24} ${40 + i * 6} H150" fill="none" stroke="${cols[i]}" stroke-width="2.2"/>`;
      const e = 214 + i * 26;
      o += `<path d="M180 ${150 - i * 4} C${e} ${150 - i * 4},${e - 10} ${40 + i * 6},${e + 14} ${40 + i * 6} H300" fill="none" stroke="${cols[i]}" stroke-width="2.2"/>`;
    });
    o += `<line x1="165" y1="30" x2="165" y2="166" stroke="${L}"/>`;
    return svg(o, "Learning curves for three skills in children and in a model");
  };

  F.depth = () => {
    let o = "";
    const row = (y, words, xs, inner, ok) => {
      o += words.map((w, i) => t(xs[i], y, w, { size: 10, bold: inner.includes(i), fill: inner.includes(i) ? B : I })).join("");
      o += arc(xs[inner[0]], xs[inner[1]], y - 14, 34, B, !ok);
      o += t(304, y - 46, ok ? "correct" : "below chance", { anchor: "end", fill: ok ? M : B, bold: true });
    };
    row(74, ["The", "boy", "that", "the", "girls", "see", "runs"], [20, 50, 82, 112, 144, 180, 214], [4, 5], true);
    row(160, ["The", "boy", "that", "the", "girls", "near", "the", "car", "see", "runs"], [16, 42, 70, 96, 124, 156, 184, 208, 236, 268], [4, 8], false);
    return svg(o, "Short and long embedded dependencies");
  };

  window.SCHEMATICS = F;
})();
