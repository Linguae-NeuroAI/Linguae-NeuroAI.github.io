/* Rendering and routing. Views are chosen by the URL hash:
   #home, #brain, #brain-<method>, #models, #models-<theme>, #publications, #team */
(function () {
  const D = window.SITE, FIG = window.SCHEMATICS, main = document.getElementById("main");
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const byId = (list, id) => list.find(x => x.id === id);

  /* ---------- drawings ---------- */
  // Lateral view of the left hemisphere, drawn in a 520 x 400 box.
  const cortex = () => `
    <g fill="var(--brain-tint)" stroke="var(--brain)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">
      <path d="M302 290 C308 326,318 352,322 380 H350 C346 350,344 322,348 294 Z"/>
      <path d="M346 300 C356 272,424 266,454 290 C478 310,464 344,426 350 C390 356,350 340,346 300 Z"/>
      <path d="M362 306 C390 296,426 298,450 312 M360 322 C392 316,428 318,448 330 M372 338 C396 336,418 338,432 342" fill="none" stroke-width="1.5" opacity=".6"/>
      <path d="M62 214 C50 160,86 96,160 66 C232 36,330 34,402 66 C462 94,496 150,490 208 C487 244,462 272,424 282 C396 290,372 286,352 276 C330 300,286 318,240 318 C196 318,160 304,152 280 C150 268,158 258,172 252 C130 256,76 252,62 214 Z"/>
      <g fill="none" stroke-width="1.8" opacity=".55">
        <path d="M172 252 C220 244,290 226,356 196"/>
        <path d="M268 46 C262 90,282 140,268 198"/>
        <path d="M222 54 C214 100,236 150,226 206"/>
        <path d="M316 46 C312 90,330 140,318 190"/>
        <path d="M186 288 C240 286,310 262,372 236"/>
        <path d="M96 150 C130 128,170 122,206 128"/>
        <path d="M92 198 C128 186,166 182,200 188"/>
        <path d="M342 108 C382 110,422 130,448 162"/>
        <path d="M420 200 C440 214,452 236,448 262"/>
        <path d="M120 104 C146 92,176 86,204 88"/>
        <path d="M364 150 C390 158,412 176,424 196"/>
      </g>
    </g>`;

  // A layered network. Returns markup plus node coordinates.
  const network = (x0, cy, dx, counts, gap, r) => {
    const pts = counts.map((n, l) => Array.from({ length: n }, (_, i) => [x0 + l * dx, cy + (i - (n - 1) / 2) * gap]));
    let e = "", c = "";
    for (let l = 0; l < pts.length - 1; l++) pts[l].forEach(a => pts[l + 1].forEach(b => { e += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`; }));
    pts.flat().forEach(p => { c += `<circle cx="${p[0]}" cy="${p[1]}" r="${r}"/>`; });
    return { pts, svg: `<g stroke="var(--model)" stroke-width="1" opacity=".3">${e}</g><g fill="var(--model-tint)" stroke="var(--model)" stroke-width="2.5">${c}</g>` };
  };

  const loop = () => {
    const net = network(800, 262, 80, [3, 5, 5, 5, 3], 48, 11);
    const words = [["The", 498], ["keys", 546], ["to", 590], ["the", 624], ["cabinet", 686], ["are", 754]];
    return `
    <svg class="loop" viewBox="0 0 1200 520" role="group" aria-label="The two directions of the team's research, linking the brain and neural models">
      <defs>
        <linearGradient id="gTop" x1="1" x2="0"><stop offset="0" stop-color="var(--model)"/><stop offset="1" stop-color="var(--brain)"/></linearGradient>
        <linearGradient id="gBot" x1="0" x2="1"><stop offset="0" stop-color="var(--brain)"/><stop offset="1" stop-color="var(--model)"/></linearGradient>
      </defs>
      <path d="M900 118 C780 30,470 30,330 112" fill="none" stroke="url(#gTop)" stroke-width="3" opacity=".35"/>
      <path class="flow" d="M900 118 C780 30,470 30,330 112" fill="none" stroke="url(#gTop)" stroke-width="5"/>
      <path d="M346 96 L326 115 L352 120" fill="none" stroke="var(--brain)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M430 384 C450 520,790 512,900 412" fill="none" stroke="url(#gBot)" stroke-width="3" opacity=".35"/>
      <path class="flow" d="M430 384 C450 520,790 512,900 412" fill="none" stroke="url(#gBot)" stroke-width="5"/>
      <path d="M878 406 L904 409 L886 430" fill="none" stroke="var(--model)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

      <a href="#brain"><text class="arc-label" x="615" y="104" text-anchor="middle" fill="var(--brain)">AI for the brain</text></a>
      <text class="arc-sub" x="615" y="128" text-anchor="middle">models and methods that explain neural recordings</text>
      <a href="#models"><text class="arc-label" x="615" y="404" text-anchor="middle" fill="var(--model)">The brain for AI</text></a>
      <text class="arc-sub" x="615" y="428" text-anchor="middle">neural constraints that make models more human</text>

      <path d="M546 250 C546 196,754 196,754 250" fill="none" stroke="var(--loop)" stroke-width="2.5"/>
      ${words.map(([w, x], i) => `<text class="sentence" x="${x}" y="276" text-anchor="middle" fill="${i === 1 || i === 5 ? "var(--loop)" : "var(--ink)"}">${w}</text>`).join("")}
      <text class="arc-sub" x="626" y="308" text-anchor="middle">a dependency both systems must track</text>

      <a href="#brain" aria-label="The brain: projects on intracranial recordings, MEG, fMRI and behaviour">
        <rect class="plate" x="40" y="96" width="420" height="420" rx="28" fill="var(--brain-tint)" opacity=".0"/>
        <rect class="plate" x="40" y="96" width="420" height="420" rx="28" fill="none" stroke="var(--brain)" stroke-width="2"/>
        <g transform="translate(52,112) scale(.8)">${cortex()}</g>
        <text class="half-label" x="250" y="478" text-anchor="middle" fill="var(--brain)">The brain</text>
        <text class="half-sub" x="250" y="502" text-anchor="middle">single neurons, intracranial EEG, MEG, fMRI</text>
      </a>
      <a href="#models" aria-label="Neural models: computational work and papers">
        <rect class="plate" x="750" y="96" width="420" height="420" rx="28" fill="none" stroke="var(--model)" stroke-width="2"/>
        ${net.svg}
        <circle cx="960" cy="214" r="11" fill="var(--model)"/>
        <text class="half-label" x="960" y="478" text-anchor="middle" fill="var(--model)">Neural models</text>
        <text class="half-sub" x="960" y="502" text-anchor="middle">mechanisms, probes, new architectures</text>
      </a>
    </svg>`;
  };

  const brainDiagram = sel => {
    const on = id => (sel === id ? ' class="on"' : "");
    let sensors = "";
    for (let i = 0; i < 12; i++) {
      const a = (25 + i * (130 / 11)) * Math.PI / 180, x = 396 + 250 * Math.cos(a), y = 276 - 215 * Math.sin(a);
      const rot = Math.atan2(215 * Math.cos(a), 250 * Math.sin(a)) * 180 / Math.PI;
      sensors += `<rect x="${(x - 10).toFixed(1)}" y="${(y - 5).toFixed(1)}" width="20" height="10" rx="2" transform="rotate(${(-rot).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    }
    let vox = "";
    const lv = [.2, .5, .8, .4, .15, .45, .9, .7, .35, .2, .3, .75, .95, .55, .25, .15, .4, .6, .8, .3, .1, .25, .35, .5, .2];
    lv.forEach((v, i) => { vox += `<rect x="${470 + (i % 5) * 17}" y="${166 + Math.floor(i / 5) * 17}" width="15" height="15" rx="2" opacity="${v}"/>`; });
    // electrode from (150,412) to (372,334)
    const ex = t => 150 + 222 * t, ey = t => 412 - 78 * t;
    let contacts = "";
    [.5, .6, .7, .8, .9].forEach(t => { contacts += `<rect x="${ex(t) - 6}" y="${ey(t) - 5}" width="12" height="10" rx="2" transform="rotate(-19.4 ${ex(t)} ${ey(t)})"/>`; });
    let wires = "";
    [-34, -17, 0, 17, 34].forEach(d => { const a = (-19.4 + d) * Math.PI / 180; wires += `<line x1="372" y1="334" x2="${(372 + 30 * Math.cos(a)).toFixed(1)}" y2="${(334 + 30 * Math.sin(a)).toFixed(1)}"/>`; });
    return `
    <svg class="diagram" viewBox="0 0 760 480" role="group" aria-label="A cortex with the recording methods the team uses. Choose a method to see its projects.">
      <g transform="translate(120,46)">${cortex()}</g>
      <a href="#brain-meg"${on("meg")} aria-label="MEG projects">
        <path class="ring" d="M169 185 A250 215 0 0 1 623 185" fill="none" stroke="var(--brain-tint)" stroke-width="30" stroke-linecap="round"/>
        <path d="M169 185 A250 215 0 0 1 623 185" fill="none" stroke="var(--ink)" stroke-width="1.5" opacity=".4"/>
        <g fill="var(--ink)">${sensors}</g>
        <text class="lab" x="396" y="34" text-anchor="middle">MEG</text>
      </a>
      <a href="#brain-fmri"${on("fmri")} aria-label="fMRI projects">
        <rect class="ring" x="460" y="156" width="104" height="104" rx="10" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
        <g fill="var(--ink)">${vox}</g>
        <line x1="556" y1="170" x2="676" y2="118" stroke="var(--ink)" stroke-width="1.2"/>
        <text class="lab" x="684" y="112" text-anchor="start">fMRI</text>
      </a>
      <a href="#brain-ieeg"${on("ieeg")} aria-label="Intracranial EEG projects">
        <line class="ring" x1="150" y1="412" x2="350" y2="342" stroke="var(--brain-tint)" stroke-width="30" stroke-linecap="round"/>
        <line x1="150" y1="412" x2="372" y2="334" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>
        <line x1="132" y1="418" x2="168" y2="406" stroke="var(--ink)" stroke-width="11" stroke-linecap="round"/>
        <g fill="var(--paper)" stroke="var(--ink)" stroke-width="2">${contacts}</g>
        <text class="lab" x="24" y="452" text-anchor="start">Intracranial EEG</text>
      </a>
      <a href="#brain-neurons"${on("neurons")} aria-label="Single-neuron projects">
        <circle class="ring" cx="386" cy="330" r="34" fill="var(--brain-tint)" stroke="var(--ink)" stroke-width="2"/>
        <g stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round">${wires}</g>
        <line x1="380" y1="364" x2="352" y2="436" stroke="var(--ink)" stroke-width="1.2"/>
        <text class="lab" x="346" y="458" text-anchor="middle">Single neurons</text>
      </a>
      <a href="#brain-behaviour"${on("behaviour")} aria-label="Behavioural projects">
        <rect class="ring" x="604" y="372" width="118" height="62" rx="14" fill="var(--brain-tint)" stroke="var(--ink)" stroke-width="2"/>
        <rect x="616" y="384" width="42" height="38" rx="8" fill="var(--card)" stroke="var(--ink)" stroke-width="2"/>
        <rect x="668" y="384" width="42" height="38" rx="8" fill="var(--card)" stroke="var(--ink)" stroke-width="2"/>
        <path d="M627 404 L635 412 L648 396" fill="none" stroke="var(--model)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M681 395 L697 411 M697 395 L681 411" stroke="var(--brain)" stroke-width="3" stroke-linecap="round"/>
        <text class="lab" x="663" y="458" text-anchor="middle">Behaviour</text>
      </a>
    </svg>`;
  };

  const modelDiagram = sel => {
    const on = id => (sel === id ? ' class="on"' : "");
    const net = network(220, 256, 80, [4, 6, 6, 6, 4], 42, 10);
    const u = net.pts[1][1];
    const sw = [["the", 232], ["boy", 268], ["that", 306], ["the", 342], ["girls", 380], ["see", 420], ["runs", 458]];
    return `
    <svg class="diagram" viewBox="0 0 760 480" role="group" aria-label="A neural network with the research themes of the team. Choose a theme to see its papers.">
      <a href="#models-architectures"${on("architectures")} aria-label="Brain-inspired architectures">
        <rect class="ring" x="262" y="124" width="236" height="264" rx="22" fill="var(--model-tint)" opacity=".7"/>
        <rect x="262" y="124" width="236" height="264" rx="22" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-dasharray="7 6"/>
        <line x1="380" y1="388" x2="380" y2="404" stroke="var(--ink)" stroke-width="1.6"/>
        <rect x="312" y="404" width="136" height="30" rx="8" fill="var(--card)" stroke="var(--ink)" stroke-width="1.8"/>
        <text x="380" y="424" text-anchor="middle" font-size="13">working memory</text>
        <text class="lab" x="380" y="462" text-anchor="middle">Brain-inspired architectures</text>
      </a>
      ${net.svg}
      <a href="#models-mechanisms"${on("mechanisms")} aria-label="Units and circuits">
        <circle class="ring" cx="${u[0]}" cy="${u[1]}" r="22" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
        <circle cx="${u[0]}" cy="${u[1]}" r="10" fill="var(--model)" stroke="var(--model)" stroke-width="2.5"/>
        <line x1="${u[0] - 16}" y1="${u[1] - 14}" x2="150" y2="118" stroke="var(--ink)" stroke-width="1.2"/>
        <text class="lab" x="20" y="110" text-anchor="start">Units and circuits</text>
      </a>
      <a href="#models-limits"${on("limits")} aria-label="Where models and humans part">
        <rect class="ring" x="212" y="18" width="270" height="70" rx="14" fill="var(--model-tint)" opacity=".7"/>
        <path d="M268 60 C268 20,458 20,458 60" fill="none" stroke="var(--model)" stroke-width="2"/>
        <path d="M380 60 C380 40,420 40,420 60" fill="none" stroke="var(--brain)" stroke-width="2" stroke-dasharray="4 3"/>
        ${sw.map(([w, x]) => `<text x="${x}" y="78" text-anchor="middle" font-size="14">${w}</text>`).join("")}
        <line x1="345" y1="92" x2="345" y2="116" stroke="var(--ink)" stroke-width="1.4"/><path d="M340 110 L345 118 L350 110" fill="none" stroke="var(--ink)" stroke-width="1.4"/>
        <text class="lab" x="496" y="50" text-anchor="start">Where models and</text>
        <text class="lab" x="496" y="72" text-anchor="start">humans part</text>
      </a>
      <a href="#models-geometry"${on("geometry")} aria-label="Geometry of representations">
        <circle class="ring" cx="664" cy="240" r="58" fill="var(--model-tint)" opacity=".7"/>
        <circle cx="664" cy="240" r="50" fill="none" stroke="var(--ink)" stroke-width="1.4" stroke-dasharray="3 5"/>
        <line x1="552" y1="252" x2="612" y2="244" stroke="var(--ink)" stroke-width="1.2"/>
        <g stroke-width="2.5"><line x1="664" y1="240" x2="700" y2="214" stroke="var(--model)"/><line x1="664" y1="240" x2="684" y2="278" stroke="var(--brain)"/><line x1="664" y1="240" x2="628" y2="222" stroke="var(--loop)"/></g>
        <circle cx="700" cy="214" r="5" fill="var(--model)"/><circle cx="684" cy="278" r="5" fill="var(--brain)"/><circle cx="628" cy="222" r="5" fill="var(--loop)"/><circle cx="664" cy="240" r="5" fill="var(--ink)"/>
        <text class="lab" x="664" y="326" text-anchor="middle">Geometry of</text>
        <text class="lab" x="664" y="348" text-anchor="middle">representations</text>
      </a>
      <a href="#models-learning"${on("learning")} aria-label="Learning trajectories">
        <rect class="ring" x="22" y="296" width="140" height="104" rx="14" fill="var(--model-tint)" opacity=".7"/>
        <path d="M40 314 V384 H146" fill="none" stroke="var(--ink)" stroke-width="1.6"/>
        <path d="M42 378 C70 376,74 330,144 324" fill="none" stroke="var(--model)" stroke-width="2.5"/>
        <path d="M42 380 C96 378,100 344,144 340" fill="none" stroke="var(--brain)" stroke-width="2.5"/>
        <text class="lab" x="92" y="426" text-anchor="middle">Learning</text>
        <text class="lab" x="92" y="448" text-anchor="middle">trajectories</text>
      </a>
    </svg>`;
  };

  /* ---------- papers ---------- */
  const tags = p =>
    (p.methods || []).map(m => `<a class="tag b" href="#brain-${m}">${byId(D.methods, m).label}</a>`).join("") +
    (p.themes || []).map(t => `<a class="tag m" href="#models-${t}">${byId(D.themes, t).label}</a>`).join("");

  const figureOf = p => {
    const sch = FIG[p.figure.schematic] ? FIG[p.figure.schematic]() : "";
    const img = p.figure.image
      ? `<img src="${p.figure.image}" alt="Figure from ${esc(p.title)}" onerror="this.nextElementSibling.hidden=false;this.remove()"><div hidden>${sch}</div>`
      : sch;
    const lead = p.figure.image ? "What the figure shows." : "Schematic of the result.";
    return `<figure>${img}<figcaption><b>${lead}</b> ${esc(p.figure.caption)}</figcaption></figure>`;
  };

  const card = p => `
    <article class="paper" id="p-${p.id}">
      ${figureOf(p)}
      <div>
        <h3><a href="${p.url}">${esc(p.title)}</a></h3>
        <p class="meta">${esc(p.authors)}<br><span class="venue">${esc(p.venue)}</span>, ${p.year}</p>
        <p class="finding">${esc(p.finding)}</p>
        <div class="tags">${tags(p)}</div>
      </div>
    </article>`;

  const row = p => `
    <li><span class="yr">${p.year}</span>
      <div><h3><a href="${p.url}">${esc(p.title)}</a></h3>
      <p class="meta">${esc(p.authors)}. <span class="venue">${esc(p.venue)}</span></p>
      ${p.note ? `<p class="note">${esc(p.note)}</p>` : ""}</div></li>`;

  const listing = papers => {
    if (!papers.length) return `<p class="empty">Papers for this part are on their way. See all <a href="#publications">publications</a>.</p>`;
    const f = papers.filter(p => p.featured), r = papers.filter(p => !p.featured);
    return f.map(card).join("") + (r.length ? `${f.length ? '<h2 class="more-head">More on this</h2>' : ""}<ul class="rows">${r.map(row).join("")}</ul>` : "");
  };

  /* ---------- views ---------- */
  const home = () => `
    <div class="wrap">
      <section class="hero">
        <div class="hero-head">
          <h1>Linguae-NeuroAI</h1>
          <p class="lede">We study the neural mechanisms that underlie language processing, in the human brain and in neural AI models.</p>
        </div>
        ${loop()}
      </section>

      <section class="statement">
        <p>We study the neural mechanisms of language processing, that is, how the brain represents sounds, letters, words and sentences, and how it combines them into meaning.</p>
        <p>To do this, we use neural AI models. Language models learn to process language from large amounts of text and speech. Unlike the brain, they can be examined in full detail. We can look at the activity of every unit in the network and switch units off to see what breaks. This lets us find mechanisms in the model that might also be used by the brain, and turn them into precise predictions.</p>
        <p>We test these predictions in human brain data. We use fMRI and MEG to follow language processing across the whole brain in healthy volunteers. We also use high-resolution intracranial recordings, down to the activity of single neurons, made in patients undergoing neurosurgery, in collaboration with neurosurgical teams around the world.</p>
        <p>In the other direction, we use what we learn from neuroscience to build new neural AI models that are more human-like. Models that learn and process language more like people do are also better at predicting the mechanisms we find in the brain.</p>
      </section>

      <section class="directions" aria-label="Research directions">
        <a class="dir brain" href="#brain">
          <svg class="dir-art" viewBox="40 20 480 380" aria-hidden="true">${cortex()}</svg>
          <p class="way">From AI to the brain</p>
          <h2>AI for the brain</h2>
          <p>New computational methods to analyse neural recordings, from single neurons to whole-brain imaging, and to describe the mechanisms behind speech, reading, syntax and meaning.</p>
          <ul>${D.methods.map(m => `<li>${m.label}</li>`).join("")}</ul>
          <span class="go">See the brain projects</span>
        </a>
        <a class="dir models" href="#models">
          <svg class="dir-art" viewBox="770 130 380 264" aria-hidden="true">${network(800, 262, 80, [3, 5, 5, 5, 3], 48, 11).svg}</svg>
          <p class="way">From the brain to AI</p>
          <h2>The brain for AI</h2>
          <p>Language models that are cognitively and biologically plausible: architectures with human constraints, which are more robust, learn from less, and serve as better models of the brain.</p>
          <ul>${D.themes.map(m => `<li>${m.label}</li>`).join("")}</ul>
          <span class="go">See the modelling work</span>
        </a>
      </section>

      <section class="meet">
        <div>
          <h2>Where the two meet: decoding language</h2>
          <p>A model that predicts brain activity from language can be turned around to read language from brain activity. We work on decoding speech and language from fMRI and intracranial recordings, a step toward restoring communication for people who have lost the ability to speak.</p>
        </div>
        <p class="cite">${D.papers.filter(p => p.decoding).map(p => `<a href="${p.url}">${esc(p.title)}</a><br>${esc(p.authors)}, ${p.year}`).join("<br><br>")}</p>
      </section>

      <section>
        <div class="section-head"><h2>Selected work</h2><p>Three results, one from each end of the loop and one that joins them.</p></div>
        ${["single-neurons", "units", "nested"].map(id => card(byId(D.papers, id))).join("")}
        <p><a href="#publications">All publications</a></p>
      </section>
    </div>`;

  const direction = (side, sub) => {
    const isBrain = side === "brain", parts = isBrain ? D.methods : D.themes, key = isBrain ? "methods" : "themes";
    const pick = byId(parts, sub);
    const papers = D.papers.filter(p => p.side.includes(side) && (!pick || (p[key] || []).includes(pick.id)));
    return `
    <div class="wrap ${side}-view">
      <section class="page-head ${side}">
        <p class="way">${isBrain ? "From AI to the brain" : "From the brain to AI"}</p>
        <h1>${isBrain ? "AI for the brain" : "The brain for AI"}</h1>
        <p>${isBrain
          ? "We study language processing across a wide range of resolutions, from large neuronal populations down to single neurons. Choose a recording method on the cortex to see the projects that use it."
          : "We take language models apart to find their mechanisms, test them where human language is hardest, and build architectures that carry the constraints of the brain. Choose a part of the network to see the work behind it."}</p>
      </section>
      <section class="stage">
        ${isBrain ? brainDiagram(sub) : modelDiagram(sub)}
        <div class="picked" aria-live="polite">
          ${pick ? `<h2>${pick.label}</h2><p>${pick.blurb}</p>` : `<h2>${isBrain ? "Complementary recording methods" : "Five ways into the model"}</h2><p>${isBrain
            ? "We combine several methods for recording brain activity, each with its own strengths. MEG has high temporal resolution, but the sources of the signal cannot be localized precisely. fMRI, in contrast, has good spatial resolution but poor temporal resolution. Intracranial recordings, such as sEEG, have both high spatial and high temporal resolution, but they do not cover the whole brain, since electrode placement is decided by clinical needs. Finally, single-neuron recordings have the highest spatiotemporal resolution and signal-to-noise ratio, which the study of neural mechanisms requires, but they capture only a tiny fraction of the neurons in a given region."
            : "Mechanisms inside the network, the geometry of what it represents, its limits against human performance, new architectures, and how knowledge appears during learning."}</p>`}
          <p class="hint">${pick ? `${papers.length} ${papers.length === 1 ? "paper" : "papers"} below.` : "The drawing is clickable."}</p>
        </div>
      </section>
      <nav class="tabs" id="list" aria-label="${isBrain ? "Recording methods" : "Research themes"}">
        <a href="#${side}"${pick ? "" : ' class="on" aria-current="true"'}>All</a>
        ${parts.map(m => `<a href="#${side}-${m.id}"${pick && pick.id === m.id ? ' class="on" aria-current="true"' : ""}>${m.label}</a>`).join("")}
      </nav>
      <section>${listing(papers)}</section>
    </div>`;
  };

  const publications = sub => {
    const papers = D.papers.filter(p => !sub || p.side.includes(sub)).sort((a, b) => b.year - a.year);
    const tab = (id, label) => `<a href="#publications${id ? "-" + id : ""}"${(sub || "") === id ? ' class="on" aria-current="true"' : ""}>${label}</a>`;
    return `
    <div class="wrap pub-view">
      <section class="page-head"><h1>Publications</h1>
        <p>Papers from the team and its collaborators. The full, current list is on <a href="${D.team.lead.scholar}">Google Scholar</a>.</p></section>
      <nav class="tabs" id="list" aria-label="Filter publications">${tab("", "All")}${tab("brain", "AI for the brain")}${tab("models", "The brain for AI")}</nav>
      <ul class="rows">${papers.map(row).join("")}</ul>
    </div>`;
  };

  const group = (g, title, defRole) => {
    const ms = D.team.members.filter(m => m.group === g);
    if (!ms.length) return "";
    return `<div class="section-head"><h2>${title}</h2></div><div class="people">${ms.map(m => `
      <div class="person">${m.photo ? `<img class="avatar" src="${m.photo}" alt="Portrait of ${esc(m.name)}" width="72" height="72">` : `<div class="avatar" aria-hidden="true">${esc(m.name.split(/[\s-]+/).filter(w => /^[A-ZÀ-Ý]/.test(w)).map(w => w[0]).slice(0, 2).join(""))}</div>`}
        <h3>${m.url ? `<a href="${m.url}">${esc(m.name)}</a>` : esc(m.name)}</h3>
        <p class="role">${esc(m.role || defRole)}${m.co ? `, co-supervised with ${esc(m.co)}` : ""}</p>
        ${m.topic ? `<p class="topic">${esc(m.topic)}</p>` : ""}</div>`).join("")}</div>`;
  };

  const team = () => {
    const L = D.team.lead;
    return `
    <div class="wrap">
      <section class="page-head"><h1>Team</h1></section>
      <section class="lead" style="margin-top:28px">
        <img class="portrait" src="${L.photo}" alt="Portrait of ${L.name}" width="200" height="200">
        <div><h2>${L.name}</h2><p class="role">${L.role}</p><p>${L.bio}</p>
          <p><a href="${L.url}">Personal page</a> &nbsp; <a href="${L.scholar}">Google Scholar</a></p></div>
      </section>
      ${group("phd", "PhD students", "PhD student")}
      ${group("staff", "Research staff", "")}
      ${group("masters", "Master's interns", "Master's intern")}
      ${D.team.visitors.length ? `<div class="section-head"><h2>Visiting researchers</h2></div><p>${D.team.visitors.map(esc).join(", ")}</p>` : ""}
      ${D.team.alumni.length ? `<div class="section-head"><h2>Alumni</h2></div>
      <ul class="rows">${D.team.alumni.map(m => `<li><span class="yr">${esc(m.years)}</span><div><h3>${esc(m.name)}</h3><p class="meta">${esc(m.role)}${m.topic ? `. ${esc(m.topic)}` : ""}</p></div></li>`).join("")}</ul>` : ""}
      <div class="section-head"><h2>Collaborating centres</h2><p>Neuroimaging and clinical centres where we record brain data.</p></div>
      <div class="collab">
        ${D.collab.centres.map(g => `<div><h3>${g.kind}</h3><ul>${g.items.map(c => `<li><b>${esc(c.name)}</b><br><span>${esc(c.where)}</span></li>`).join("")}</ul></div>`).join("")}
      </div>
      <div class="section-head"><h2>Collaborators</h2></div>
      <ul class="people-list">${D.collab.researchers.map(r => `<li><b>${esc(r.name)}</b><br><span>${esc(r.where)}</span></li>`).join("")}</ul>
      <section class="join">
        <h2>Join us</h2>
        <p>We welcome students and researchers from neuroscience, linguistics, computer science and physics who want to work between brains and models. Master's internships, PhD projects and postdoctoral positions open regularly.</p>
        <p style="margin:0"><a href="https://yairlak.github.io/sections/contact.html">Get in touch</a></p>
      </section>
    </div>`;
  };

  /* ---------- router ---------- */
  let last = null;
  const render = () => {
    const h = (location.hash || "#home").slice(1), i = h.indexOf("-");
    let view = i < 0 ? h : h.slice(0, i), sub = i < 0 ? "" : h.slice(i + 1);
    if (!["home", "brain", "models", "publications", "team"].includes(view)) { view = "home"; sub = ""; }
    main.innerHTML = view === "home" ? home() : view === "team" ? team() : view === "publications" ? publications(sub) : direction(view, sub);
    document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("on", a.dataset.nav === view));
    document.title = { home: "Linguae-NeuroAI, ENS Paris", brain: "AI for the brain | Linguae-NeuroAI", models: "The brain for AI | Linguae-NeuroAI", publications: "Publications | Linguae-NeuroAI", team: "Team | Linguae-NeuroAI" }[view];
    if (last === view && sub) { const l = document.getElementById("list"); if (l) l.scrollIntoView({ block: "start" }); }
    else if (last !== null) window.scrollTo(0, 0);
    last = view;
  };
  window.addEventListener("hashchange", render);
  render();
})();
