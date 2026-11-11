// A toy "next word" model: hand-picked probabilities, not a real AI.
const model = {
  sky:    { text: "The sky is",        next: { blue: 0.58, clear: 0.17, falling: 0.11, gray: 0.09, purple: 0.05 } },
  coffee: { text: "I'd like a cup of", next: { coffee: 0.52, tea: 0.31, water: 0.09, sugar: 0.05, soup: 0.03 } },
  once:   { text: "Once upon a",       next: { time: 0.91, hill: 0.04, dream: 0.03, star: 0.02 } }
};

let current = "sky";
const bars = document.getElementById("bars");
const sentence = document.getElementById("sentence-text");
const chosen = document.getElementById("chosen");

function render() {
  const { text, next } = model[current];
  sentence.textContent = text;
  chosen.textContent = "…";
  bars.innerHTML = "";
  Object.entries(next).forEach(([word, p]) => {
    const li = document.createElement("li");
    li.className = "bar";
    li.dataset.word = word;
    li.innerHTML = `<span>${word}</span><span class="bar-track"><span class="bar-fill"></span></span><span class="bar-pct">${Math.round(p * 100)}%</span>`;
    bars.appendChild(li);
    requestAnimationFrame(() => { li.querySelector(".bar-fill").style.width = `${p * 100}%`; });
  });
}

// Sample a word in proportion to its probability, like a real model does.
function sample(next) {
  let r = Math.random();
  for (const [word, p] of Object.entries(next)) {
    if ((r -= p) <= 0) return word;
  }
  return Object.keys(next)[0];
}

document.querySelectorAll(".prompt").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".prompt").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    current = btn.dataset.key;
    render();
  });
});

document.getElementById("pick").addEventListener("click", () => {
  const word = sample(model[current].next);
  chosen.textContent = word;
  bars.querySelectorAll(".bar").forEach(b => b.classList.toggle("is-picked", b.dataset.word === word));
});

render();
