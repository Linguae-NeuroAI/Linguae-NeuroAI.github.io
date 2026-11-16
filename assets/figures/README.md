# Paper figures

Each featured paper shows a schematic drawn for the site (js/figures.js).
To show the real figure from the paper instead:

1. Export the figure as PNG or JPG, about 1200 px wide, and save it here,
   e.g. `assets/figures/units.png`.
2. In `js/data.js`, add `image` to that paper's `figure`:

       figure: { schematic: "units", image: "assets/figures/units.png", caption: "..." }

3. Rewrite `caption` so it describes the panels of the real figure.

If the file is missing the schematic is shown, so nothing breaks.

Check the licence before copying a published figure. eLife and Cognition (open
access) articles are CC BY; arXiv and conference papers vary; for subscription
journals use your own author version of the figure.
