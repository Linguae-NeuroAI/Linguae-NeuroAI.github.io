# Linguae-NeuroAI website

Website of the Linguae-NeuroAI team (LSCP, Département d'Études Cognitives, ENS-PSL, Paris).

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Preview locally

    python3 -m http.server 8000
    # open http://localhost:8000

## Structure

| File | What it holds |
|---|---|
| `index.html` | Page shell, header, footer |
| `js/data.js` | **All content**: papers, recording methods, themes, team |
| `js/site.js` | Views, the clickable cortex and network diagrams, routing |
| `js/figures.js` | Schematic drawings for featured papers |
| `css/site.css` | Styles (colours and fonts are variables at the top) |
| `assets/figures/` | Real paper figures (optional, see its README) |
| `assets/team/` | Portraits |

## Pages

- `#home`: the brain / model loop, the two directions, decoding, selected work
- `#brain`, `#brain-neurons`, `#brain-ieeg`, `#brain-meg`, `#brain-fmri`, `#brain-behaviour`
- `#models`, `#models-mechanisms`, `#models-geometry`, `#models-limits`, `#models-architectures`, `#models-learning`
- `#publications`, `#team`

## Common edits

- **Add a paper**: add an entry to `papers` in `js/data.js`. `side`, `methods` and `themes`
  decide where it appears. Add `featured: true` plus `finding` and `figure` for a full card.
- **Add a team member**: add `{ name, role, topic, url }` to `team.members`.
- **Add a recording method or theme**: add it to `methods` / `themes`, then add a matching
  clickable element in `brainDiagram` / `modelDiagram` in `js/site.js`.

## Publish on GitHub Pages

    git remote add origin git@github.com:<account>/linguae-neuroai.git
    git push -u origin main

Then in the repository: Settings, Pages, Source "Deploy from a branch", branch `main`, folder `/`.
