/* All site content lives here. Edit this file to add papers, people or projects.
   - `side`: "brain" (AI for the brain), "models" (the brain for AI), or both.
   - `methods` / `themes`: which clickable part of each diagram the paper appears under.
   - `featured`: papers shown with a figure and a longer description.
   - `figure.schematic`: name of a drawing in js/figures.js.
   - `figure.image`: optional path to the real figure (e.g. "assets/figures/units.png").
     When the file exists it replaces the schematic. See assets/figures/README.md. */

window.SITE = {
  methods: [
    { id: "neurons", label: "Single neurons",
      blurb: "Microwires at the tip of clinical depth electrodes record the spiking of individual neurons in patients with epilepsy. This is the finest resolution available in the human brain, and the closest match to the units of a neural network." },
    { id: "ieeg", label: "Intracranial EEG",
      blurb: "Depth electrodes and cortical grids record local field potentials with millimetre and millisecond precision, directly from the language network." },
    { id: "meg", label: "MEG",
      blurb: "Magnetoencephalography follows whole-brain dynamics word by word in healthy volunteers, without surgery." },
    { id: "fmri", label: "fMRI",
      blurb: "Functional MRI maps where in the brain a model's representations are found, across the whole cortex, during natural listening and reading." },
    { id: "behaviour", label: "Behaviour",
      blurb: "Error patterns and reaction times in adults, and learning stages in children, test the predictions that models make about people." }
  ],

  themes: [
    { id: "mechanisms", label: "Units and circuits",
      blurb: "We open language models the way a physiologist opens a circuit: find the units that carry a grammatical feature, ablate them, and trace how they interact." },
    { id: "geometry", label: "Geometry of representations",
      blurb: "Syntax and meaning are written into the geometry of activations. We build probes and encoding methods that read out that code, layer by layer." },
    { id: "limits", label: "Where models and humans part",
      blurb: "Recursion is a hallmark of human language. Nested constructions show where today's architectures stop behaving like people." },
    { id: "architectures", label: "Brain-inspired architectures",
      blurb: "We build models with the constraints that brains have: limited working memory, separate codes for structure and content, distinct processing routes." },
    { id: "learning", label: "Learning trajectories",
      blurb: "Children learn language from little data, in a characteristic order. We compare how and when linguistic knowledge appears in models and in children." }
  ],

  papers: [
    /* ---------- Featured: brain ---------- */
    { id: "single-neurons", year: 2026, featured: true, side: ["brain"], methods: ["neurons", "ieeg"],
      title: "Modality-specific and amodal language processing by single neurons",
      authors: "Y. Lakretz, N. Friedmann, J.-R. King, E. Mankin, A. Rangel, A. Tankus, S. Dehaene, I. Fried",
      venue: "eLife (reviewed preprint)", url: "https://doi.org/10.7554/eLife.110689.1",
      finding: "Twenty-one patients read and listened to the same 152 sentences while more than a thousand single neurons were recorded. Neurons in the fusiform gyrus answer written words only, and some are tuned to letter shapes or to a letter at a given position in the word. Neurons in auditory cortex answer spoken words only, some tuned to single phonemes. Further along, in the middle temporal and inferior frontal gyri, neurons respond to both.",
      figure: { schematic: "neurons",
        caption: "Each row is one region, each column one way of presenting the sentence. Ticks stand for spikes. Sensory regions fire for one modality; middle temporal and inferior frontal neurons fire for both." } },

    { id: "hier-seq", year: 2026, featured: true, side: ["brain", "models"], methods: ["meg"], themes: ["limits"],
      title: "Disentangling hierarchical and sequential computations during sentence processing",
      authors: "C.-N. Zacharopoulos, S. Dehaene, Y. Lakretz",
      venue: "Cortex 199", url: "https://doi.org/10.1016/j.cortex.2026.02.004",
      finding: "Does the brain follow the tree structure of a sentence, or also simpler word-to-word transitions? In a linguistic version of the local-global paradigm, participants heard sentences with long-range subject-verb agreement while we recorded MEG, and we separately manipulated violations of hierarchical and of sequential expectations. The brain responded to hierarchical violations but was largely unaffected by sequential ones. An LSTM language model run on the same sentences showed both kinds of effect.",
      figure: { schematic: "hierseq",
        caption: "The verb agrees with the main subject across the tree (solid arc), but it also follows the nearer noun in the word sequence (dashed arc). Brain responses tracked only the first relation; the LSTM tracked both." } },

    { id: "stg-phonemes", year: 2021, featured: true, side: ["brain"], methods: ["neurons"],
      title: "Single-cell activity in human STG during perception of phonemes is organized according to manner of articulation",
      authors: "Y. Lakretz, O. Ossmy, N. Friedmann, R. Mukamel, I. Fried",
      venue: "NeuroImage 226", url: "https://doi.org/10.1016/j.neuroimage.2020.117499",
      finding: "Single neurons in the superior temporal gyrus were recorded while patients listened to speech sounds. Their responses group phonemes by how the sound is produced (stops, fricatives, nasals, vowels) more than by where in the mouth it is produced.",
      figure: { schematic: "phonemes",
        caption: "Phonemes arranged by manner of articulation. A typical neuron responds to one group, shaded, and stays silent for the others." } },

    { id: "ramping", year: 2023, featured: true, side: ["brain", "models"], methods: ["meg", "ieeg"], themes: ["geometry"],
      title: "Dimensionality and ramping: signatures of sentence integration in the dynamics of brains and deep language models",
      authors: "T. Desbordes, Y. Lakretz, V. Chanoine, M. Oquab, J.-M. Badier, A. Trébuchon, R. Carron, C.-G. Bénar, S. Dehaene, J.-R. King",
      venue: "Journal of Neuroscience", url: "https://doi.org/10.1523/JNEUROSCI.1163-22.2023",
      finding: "A sentence is more than the sum of its words. With MEG and intracranial recordings, we compared real sentences to jabberwocky and word lists. Each meaningful word adds dimensions to the neural representation, and activity ramps up until the sentence closes. Deep language models show the same two signatures.",
      figure: { schematic: "ramp",
        caption: "Dimensionality of the neural code as words arrive. It climbs for a meaningful sentence and stays low when the words cannot be combined." } },

    { id: "born-equal", year: 2022, featured: true, side: ["brain"], methods: ["fmri"],
      title: "Neural language models are not born equal to fit brain data, but training helps",
      authors: "A. Pasquiou, Y. Lakretz, J. Hale, B. Thirion, C. Pallier",
      venue: "ICML 2022", url: "https://arxiv.org/abs/2207.03380",
      finding: "Which properties of a language model make it a good predictor of fMRI responses to natural speech? Architectures differ in how well they fit the brain even before training, and training on text improves the fit for all of them.",
      figure: { schematic: "brainscore",
        caption: "The encoding approach: activations of a language model are mapped linearly onto fMRI responses to the same story, and the fit is scored voxel by voxel, for untrained and trained versions of each model." } },

    /* ---------- Featured: both ---------- */
    { id: "nested", year: 2021, featured: true, side: ["models", "brain"], methods: ["behaviour"], themes: ["mechanisms", "limits"],
      title: "Mechanisms for handling nested dependencies in neural-network language models and humans",
      authors: "Y. Lakretz, D. Hupkes, A. Vergallito, M. Marelli, M. Baroni, S. Dehaene",
      venue: "Cognition 213", url: "https://doi.org/10.1016/j.cognition.2021.104699",
      finding: "The agreement circuit of a recurrent language model can hold one long-range dependency at a time. That predicts a specific weakness: when one dependency is nested inside another, the inner one should fail. We tested people on the same sentences and found the predicted pattern. One difference remains: people stay above chance where the model falls below it.",
      figure: { schematic: "nested",
        caption: "Two subject-verb dependencies, one nested in the other. The outer one is carried by the model's long-range units. The inner one, dashed, is where both the model and human readers make most of their agreement errors." } },

    /* ---------- Featured: models ---------- */
    { id: "units", year: 2019, featured: true, side: ["models"], themes: ["mechanisms"],
      title: "The emergence of number and syntax units in LSTM language models",
      authors: "Y. Lakretz, G. Kruszewski, T. Desbordes, D. Hupkes, S. Dehaene, M. Baroni",
      venue: "NAACL 2019", url: "https://aclanthology.org/N19-1002/",
      finding: "How does a network trained only to predict the next word get subject-verb agreement right across many intervening words? Two units out of 1,300 carry the number of the subject, one for singular and one for plural, and they are gated by other units that track syntactic structure. Remove them and long-range agreement collapses.",
      figure: { schematic: "units",
        caption: "Activity of the plural unit across a sentence. It switches on at the plural subject, holds its value through the intervening phrase, and is read out at the verb." } },

    { id: "polar", year: 2024, featured: true, side: ["models"], themes: ["geometry"],
      title: "A polar coordinate system represents syntax in large language models",
      authors: "P. Diego-Simón, S. d'Ascoli, E. Chemla, Y. Lakretz, J.-R. King",
      venue: "NeurIPS 2024", url: "https://arxiv.org/abs/2412.05571",
      finding: "Earlier probes showed that syntactically related words sit close together in a subspace of a model's activations. Distance says that a relation exists, not which one. The Polar Probe reads both: distance between two word vectors gives the existence of a dependency, and the direction between them gives its type.",
      figure: { schematic: "polar",
        caption: "Word vectors after the probe's linear projection. The length of the arrow from a word to its head tells whether they are linked; its angle tells the kind of link (subject, object, determiner)." } },

    { id: "mapformer", year: 2025, featured: true, side: ["models"], themes: ["architectures"],
      title: "MapFormer: self-supervised learning of cognitive maps with input-dependent positional embeddings",
      authors: "V. Rambaud, S. Mascarenhas, Y. Lakretz",
      venue: "arXiv 2511.19279", url: "https://arxiv.org/abs/2511.19279",
      finding: "Humans and animals generalise far outside their experience because they hold cognitive maps, internal models that separate the structure of a situation from its content. MapFormers are Transformers whose positional code is updated by the input itself, which lets them path-integrate and learn such maps without supervision. They generalise to much longer sequences than standard architectures.",
      figure: { schematic: "map",
        caption: "Each action in the input rotates the model's position code, so the position after a path is the sum of its steps. What is seen at a place is stored separately from where the place is." } },

    { id: "meta", year: 2025, featured: true, side: ["models"], themes: ["mechanisms", "learning"],
      title: "Meta-learning neural mechanisms rather than Bayesian priors",
      authors: "M. E. Goodale, S. Mascarenhas, Y. Lakretz",
      venue: "ACL 2025", url: "https://doi.org/10.18653/v1/2025.acl-long.860",
      finding: "Meta-learning is proposed as a way to give networks human-like learning biases. What does it give them? On formal languages, meta-trained models do not acquire a preference for simplicity. They acquire mechanisms, such as counters, that then serve as building blocks for new tasks. One well-chosen language can help as much as five thousand.",
      figure: { schematic: "meta",
        caption: "A counter learned during meta-training: it steps up on each a and down on each b. The same mechanism is then reused when the model meets a new language." } },

    { id: "repetition", year: 2025, featured: true, side: ["models"], themes: ["architectures"],
      title: "A neural model for word repetition",
      authors: "D. Dager, R. Sobczyk, E. Chemla, Y. Lakretz",
      venue: "CCN 2025", url: "https://arxiv.org/abs/2506.13450",
      finding: "Hearing a word and saying it back involves a chain of processing stages that cognitive models describe and that brain damage disrupts selectively. We train networks on the task, test them for the effects known from human behaviour, and lesion them to produce 'patient' models whose speech errors can be compared with those seen in the clinic.",
      figure: { schematic: "repetition",
        caption: "The repetition route from heard word to spoken word. Removing units at one stage, marked with a cross, produces a characteristic kind of error." } },

    { id: "stages", year: 2023, featured: true, side: ["models", "brain"], methods: ["behaviour"], themes: ["learning"],
      title: "Language acquisition: do children and language models follow similar learning stages?",
      authors: "L. Evanson, Y. Lakretz, J.-R. King",
      venue: "Findings of ACL 2023", url: "https://doi.org/10.18653/v1/2023.findings-acl.773",
      finding: "Children acquire linguistic skills in a consistent order. We tracked dozens of linguistic probes throughout the training of a language model and compared the order with data from children aged 18 months to 6 years. The model also learns in a systematic order and shares part of it with children, but it learns its skills in parallel.",
      figure: { schematic: "stages",
        caption: "Three skills ordered from simple to complex. Children tend to master them one after another; the model starts improving on all of them at once, reaching each in the same order." } },

    { id: "transformers-recursion", year: 2022, featured: true, side: ["models"], themes: ["limits"],
      title: "Can Transformers process recursive nested constructions, like humans?",
      authors: "Y. Lakretz, T. Desbordes, D. Hupkes, S. Dehaene",
      venue: "COLING 2022", url: "https://aclanthology.org/2022.coling-1.285/",
      finding: "We gave Transformer language models the nested sentences used in our human experiments. They handle short-range embedded dependencies, but when the embedded dependency is itself long-range they perform below chance, which people do not.",
      figure: { schematic: "depth",
        caption: "The same agreement test at two levels of difficulty. With a short embedded dependency the models succeed; when it is stretched by an extra phrase, they pick the wrong verb form more often than not." } },

    /* ---------- Other papers ---------- */
    { id: "polar-semantic", year: 2026, side: ["models"], themes: ["geometry"],
      title: "Polar probe linearly decodes semantic structures from LLMs",
      authors: "P. Diego-Simón, P. Orhan, E. Chemla, Y. Lakretz, J.-R. King",
      venue: "arXiv 2605.14125", url: "https://arxiv.org/abs/2605.14125",
      note: "Extends the polar probe from syntactic to semantic structure." },
    { id: "emergence", year: 2026, side: ["models"], themes: ["learning", "geometry"],
      title: "Emergence of phonemic, syntactic, and semantic representations in artificial neural networks",
      authors: "P. Orhan, P. Diego-Simón, E. Chemla, Y. Lakretz, Y. Boubenec, J.-R. King",
      venue: "arXiv 2601.18617", url: "https://arxiv.org/abs/2601.18617",
      note: "When, during training, each level of linguistic representation appears." },
    { id: "dolph2vec", year: 2026, side: [],
      title: "Dolph2Vec: self-supervised representations of dolphin vocalizations",
      authors: "C. Semenzin, F. Mustun, R. Dessi, P. Orhan, A. Emanuelli, Y. Lakretz, G. de Polavieja, G. Sumbre",
      venue: "arXiv 2606.12503", url: "https://arxiv.org/abs/2606.12503" },
    { id: "probing-syntax", year: 2025, side: ["models"], themes: ["geometry"],
      title: "Probing syntax in large language models: successes and remaining challenges",
      authors: "P. Diego-Simón, E. Chemla, J.-R. King, Y. Lakretz",
      venue: "arXiv 2508.03211", url: "https://arxiv.org/abs/2508.03211",
      note: "What structural probes get right, and where they are still misled." },
    { id: "fmri-decoding", year: 2025, side: ["brain"], methods: ["fmri"], decoding: true,
      title: "Optimizing fMRI data acquisition for decoding natural speech with limited participants",
      authors: "L. Jalouzot, A. Thual, Y. Lakretz, C. Pallier, B. Thirion",
      venue: "arXiv 2505.21304", url: "https://arxiv.org/abs/2505.21304",
      note: "How to spend scanning time when the goal is to decode language from brain activity." },
    { id: "mlem", year: 2024, side: ["models"], themes: ["geometry"],
      title: "Metric-learning encoding models identify processing profiles of linguistic features in BERT's representations",
      authors: "L. Jalouzot, R. Sobczyk, B. Lhopitallier, J. Salle, N. Lan, E. Chemla, Y. Lakretz",
      venue: "arXiv 2402.11608", url: "https://arxiv.org/abs/2402.11608",
      note: "A method that tells which linguistic features shape a layer's representational geometry." },
    { id: "think-alike", year: 2024, side: ["models"], themes: ["geometry"],
      title: "What makes two language models think alike?",
      authors: "J. Salle, L. Jalouzot, N. Lan, E. Chemla, Y. Lakretz",
      venue: "arXiv 2406.12620", url: "https://arxiv.org/abs/2406.12620",
      note: "Comparing models by the linguistic features that organise their representations." },
    { id: "letters-vae", year: 2024, side: ["models"], themes: ["architectures"],
      title: "Disentanglement and compositionality of letter identity and letter position in variational auto-encoder vision models",
      authors: "B. Bianchi, A. Agrawal, S. Dehaene, E. Chemla, Y. Lakretz",
      venue: "arXiv 2412.10446", url: "https://arxiv.org/abs/2412.10446",
      note: "Do vision models separate which letter from where it is, as reading requires?" },
    { id: "cued-speech", year: 2024, side: [],
      title: "Automatic recognition of gesture identity and onset of cued-speech",
      authors: "A. Sarré, H. Salpeter, D. Bechar, L. Cohen, Y. Lakretz",
      venue: "ICASSP 2024", url: "https://doi.org/10.1109/ICASSP48485.2024.10446932" },
    { id: "info-restricted", year: 2023, side: ["brain"], methods: ["fmri"],
      title: "Information-restricted neural language models reveal different brain regions' sensitivity to semantics, syntax and context",
      authors: "A. Pasquiou, Y. Lakretz, B. Thirion, C. Pallier",
      venue: "arXiv 2302.14389", url: "https://arxiv.org/abs/2302.14389",
      note: "Models trained on only syntactic or only semantic information separate the two in fMRI maps." },
    { id: "masked-attention", year: 2023, side: ["brain"], methods: ["fmri"],
      title: "Probing brain context-sensitivity with masked-attention generation",
      authors: "A. Pasquiou, Y. Lakretz, B. Thirion, C. Pallier",
      venue: "arXiv 2305.13863", url: "https://arxiv.org/abs/2305.13863",
      note: "How much preceding context each brain region takes into account." },
    { id: "bigbench", year: 2023, side: ["models"], themes: ["limits"],
      title: "Beyond the imitation game: quantifying and extrapolating the capabilities of language models",
      authors: "A. Srivastava et al. (BIG-bench collaboration)",
      venue: "TMLR 2023", url: "https://arxiv.org/abs/2206.04615" },
    { id: "causal-transformers", year: 2021, side: ["models"], themes: ["limits"],
      title: "Causal Transformers perform below chance on recursive nested constructions, unlike humans",
      authors: "Y. Lakretz, T. Desbordes, D. Hupkes, S. Dehaene",
      venue: "arXiv 2110.07240", url: "https://arxiv.org/abs/2110.07240" },
    { id: "rnn-recursive", year: 2021, side: ["models"], themes: ["limits", "mechanisms"],
      title: "Can RNNs learn recursive nested subject-verb agreements?",
      authors: "Y. Lakretz, T. Desbordes, J.-R. King, B. Crabbé, M. Oquab, S. Dehaene",
      venue: "arXiv 2101.02258", url: "https://arxiv.org/abs/2101.02258" },
    { id: "capacity", year: 2020, side: ["models", "brain"], methods: ["behaviour"], themes: ["limits"],
      title: "What limits our capacity to process nested long-range dependencies in sentence comprehension?",
      authors: "Y. Lakretz, S. Dehaene, J.-R. King",
      venue: "Entropy 22(4)", url: "https://doi.org/10.3390/e22040446",
      note: "A proposal: capacity limits follow from sparse, feature-specific syntactic units." },
    { id: "phoneme-metric", year: 2018, side: ["models"], themes: ["architectures"],
      title: "Metric learning for phoneme perception",
      authors: "Y. Lakretz, G. Chechik, E.-G. Cohen, A. Treves, N. Friedmann",
      venue: "arXiv 1809.07824", url: "https://arxiv.org/abs/1809.07824" },
    { id: "erp", year: 2015, side: ["brain"], methods: [],
      title: "Distinguishing between different syntactic roles of identical words in normal reading: an ERP study",
      authors: "Y. Lakretz, K. Marjanovic, Y. Gu, A. Treves",
      venue: "EAPCogSci 2015", url: "https://ceur-ws.org/Vol-1419/paper0101.pdf" },
    { id: "dyslexia", year: 2015, side: ["models"], themes: ["architectures"],
      title: "Probabilistic graphical models of dyslexia",
      authors: "Y. Lakretz, G. Chechik, N. Friedmann, M. Rosen-Zvi",
      venue: "KDD 2015", url: "https://doi.org/10.1145/2783258.2788604" }
  ],

  /* Collaborating centres and researchers, shown on the Team page */
  collab: {
    centres: [
      { kind: "Neuroimaging", items: [
        { name: "NeuroSpin", where: "CEA Paris-Saclay" },
        { name: "Paris Brain Institute (ICM)", where: "Pitié-Salpêtrière Hospital, Paris" } ] },
      { kind: "Intracranial recordings", items: [
        { name: "Itzhak Fried's lab", where: "University of California, Los Angeles (UCLA)" },
        { name: "Nitin Tandon's lab", where: "UTHealth Houston" },
        { name: "Florian Mormann's lab", where: "University of Bonn" },
        { name: "Genela Morris and Ido Strauss", where: "Tel Aviv Sourasky Medical Center (Ichilov)" } ] }
    ],
    researchers: [
      { name: "Emmanuel Chemla", where: "LSCP, ENS-PSL" },
      { name: "Philippe Schlenker", where: "Institut Jean-Nicod, ENS-PSL, and New York University" },
      { name: "Stanislas Dehaene", where: "NeuroSpin and Collège de France" },
      { name: "Naama Friedmann", where: "Tel Aviv University" },
      { name: "Jean-Rémi King", where: "Meta AI and ENS-PSL" },
      { name: "Salvador Mascarenhas", where: "Institut Jean-Nicod, ENS-PSL" },
      { name: "Christophe Pallier", where: "NeuroSpin" }
    ]
  },

  /* Add team members here: { name, role, topic, photo, url } */
  team: {
    lead: {
      name: "Yair Lakretz",
      role: "Team leader, CNRS research scientist",
      photo: "assets/team/yair-lakretz.jpg",
      url: "https://yairlak.github.io/",
      scholar: "https://scholar.google.com/citations?user=cNnJ5YUAAAAJ",
      bio: "Yair Lakretz is a CNRS research scientist at the Laboratoire de Sciences Cognitives et Psycholinguistique (LSCP), in the Department of Cognitive Studies of the École normale supérieure, where he heads the Linguae-NeuroAI team. He is a fellow of the Paris Artificial Intelligence Research Institute (PRAIRIE). His work asks how linguistic structure, from sounds and letters to syntax and meaning, is encoded and computed in the human brain and in artificial neural networks."
    },
    /* group: "phd", "staff", "masters". co: co-supervisor. Leave topic empty if unknown.
       photo: optional square picture in assets/team/ (initials are shown otherwise). */
    members: [
      { group: "phd", name: "Michael Goodale", co: "Salvador Mascarenhas", topic: "Meta-learning and inductive biases in neural networks" },
      { group: "phd", name: "Pablo Diego-Simón", co: "Jean-Rémi King", topic: "Syntax in language models (polar probes)", photo: "assets/team/pablo-diego-simon.jpg" },
      { group: "phd", name: "Louis Jalouzot", co: "Christophe Pallier", topic: "Encoding models and decoding language from fMRI" },
      { group: "phd", name: "Maxence Pajot", co: "Stanislas Dehaene", topic: "The neural encoding of geometrical shapes", photo: "assets/team/maxence-pajot.jpg" },
      { group: "phd", name: "Victor Rambaud", co: "Salvador Mascarenhas", topic: "Cognitive maps in Transformers", photo: "assets/team/victor-rambaud.jpg" },
      { group: "phd", name: "Malo Renaudin", co: "Tal Linzen (NYU)", topic: "Working-memory constrained neural models, and the processing of long-range agreement in intracranial and fMRI data" },
      { group: "phd", name: "Boubacar Sow", co: "Pierre Bourdillon", topic: "Working-memory constrained neural models, and intracranial analyses of single-word processing", photo: "assets/team/boubacar-sow.jpg" },
      { group: "staff", name: "Nafiseh Momeni", role: "Research assistant", co: "", topic: "Binding of phoneme identity and position; intracranial data analysis" },
      { group: "masters", name: "Étienne Lefranc", co: "", topic: "Decoding language from intracranial recordings" },
      { group: "masters", name: "Sara Martina", role: "Erasmus Mundus master's intern, University of Trento", co: "", topic: "Long-range agreement in language models" },
      { group: "masters", name: "Yutong (Tony) Zhou", co: "Philippe Schlenker", topic: "Semantic and pragmatic inference in vision-language models" }
    ],
    visitors: ["Álvaro Cabana", "Bruno Bianchi"],
    alumni: [
      { name: "Baptiste Loreau Unger", years: "2026", role: "Master's intern", topic: "" },
      { name: "Louis Hayot", years: "2026", role: "Master's intern", topic: "Dual-route model of single-word processing, co-supervised with Emmanuel Mandonnet" },
      { name: "Karina Musina", years: "2026", role: "Master's intern", topic: "Letter identity and letter position in vision models" },
      { name: "Daniel Dager", years: "2025", role: "Master's intern", topic: "Neural model of word repetition" },
      { name: "Ali Al-Azar", years: "2025", role: "Master's intern", topic: "" },
      { name: "Mahdi Ranjbar", years: "2025", role: "Master's intern", topic: "" },
      { name: "Harshit Morj", years: "2025", role: "Master's intern", topic: "" }
    ]
  }
};
