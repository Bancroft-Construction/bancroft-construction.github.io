# Bancroft tools home page

The root site for Bancroft Construction's tools: https://bancroft-construction.github.io/

- `index.html`: the home page, one card per tool.
- `nav.js`: the top bar every tool loads with `<script src="/nav.js" defer></script>`. The list of tools
  is `LINKS` at the top of the file. Adding a tool means adding it there and adding a card to `index.html`.
- Hosting: GitHub Pages from the `main` branch. A push to `main` goes live within a minute or two, and
  `nav.js` changes show up on every tool at once, so check it in a browser first.
- The tools live in their own repos and are served under this address:
  `/jobsite-schedule/`, `/bd-directory/`, `/staffing-planner/`.
- `nav.js` stays plain ES5 with all styles scoped under `#bc-nav`, so it can't clash with a tool's own
  CSS or scripts. It hides itself when printing.
