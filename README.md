# techEd

A small static web app that explains AI in plain language: what it is, how it learns, where it shows up, and where it falls short. The hero has a toy "next word" demo that samples from hand-set probabilities to show how language models pick words.

## Run it

No build step. Open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy

Works as-is on GitHub Pages: Settings → Pages → deploy from the `main` branch, root folder.

## Structure

```
index.html     page content
css/styles.css styles (light and dark mode)
js/main.js     next-word demo
```
