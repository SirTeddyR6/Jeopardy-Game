const questions = {
  "Filme": {
    100: { q: "In welcher Stadt spielt der Großteil des Films Blade Runner 2049?", a: "Los Angeles" },
    200: { q: "Wie viele Wagons hat der Polar Express aus dem gleichnamigen Film?", a: "5 – 4 Gästewagons und 1 für die Kohle" },
    300: { q: "Wie heißt der Planet in 'Interstellar', auf dem die Zeit langsamer vergeht?", a: "Millers Planet" },
    400: { q: "Welcher Film wurde als erster vollständig digital animierter Langfilm veröffentlicht?", a: "Toy Story im Jahr 1995" },
    500: { q: "Was ist Fillmores Hauptgeschäft in 'Cars'?", a: "Er verkauft organischen Bio-Kraftstoff" }
  },
  "Anime": {
    100: { q: "Wie kommt Guts in die Welt?", a: "Er wird lebendig aus der Leiche seiner Mutter gehängt gefunden" },
    200: { q: "Wie heißt der meistgesehene Anime-Film nach 2020?", a: "Demon Slayer: Mugen Train" },
    300: { q: "Wie viele Kategorien von „Nen“ gibt es in Hunter x Hunter?", a: "6" },
    400: { q: "Wie heißt die Insel, auf der Whitebeard geboren wurde – und was ist ihr Status heute?", a: "Sphinx – heute von Marco geschützt" },
    500: { q: "Was ist Ls echter Name?", a: "L Lawliet" }
  },
  "Zurück in die Schule": {
    100: { q: "Wie heißen die fünf Sinne des Menschen?", a: "Sehen, Hören, Riechen, Schmecken, Tasten" },
    200: { q: "Wie viele Klimazonen gibt es auf der Erde? Nenne mindestens drei!", a: "Tropen, Subtropen, gemäßigte Zone, Polarzone, subpolar" },
    300: { q: "Was ist der Goldene Schnitt?", a: "Gestaltungsprinzip für harmonische Proportionen" },
    400: { q: "Wie bildet man das Plusquamperfekt? Gib ein Beispiel!", a: "hatte/war + Partizip II (z. B. 'Ich hatte gegessen')" },
    500: { q: "Wann sind zwei Funktionen orthogonal?", a: "Wenn sich ihre Geraden im rechten Winkel schneiden (Steigungen m1 * m2 = -1)" }
  },
  "Allgemeinwissen": {
    100: { q: "Warum sind Flamingos rosa?", a: "Wegen ihrer Nahrung" },
    200: { q: "Warum ist Gähnen ansteckend?", a: "Spiegelneuronen im Gehirn verursachen Nachahmung" },
    300: { q: "Warum gibt es keine quadratischen Löffel?", a: "Weil sie aus runden Gefäßen schlecht aufnehmen würden" },
    400: { q: "Warum drehen sich Uhren im Uhrzeigersinn?", a: "Weil sich Sonnenuhren auf der Nordhalbkugel so bewegten" },
    500: { q: "Was ist das Ziel der UNO?", a: "Frieden, Menschenrechte, Entwicklung, Zusammenarbeit" }
  },
  "Screenshots": {
    100: { q: "Screenshot 100 – Erkennst du das Spiel?", a: "Shadow of the Colossus" },
    200: { q: "Screenshot 200 – Welches Spiel ist das?", a: "Expedition 33" },
    300: { q: "Screenshot 300 – Welches Spiel?", a: "Assassin’s Creed Shadows" },
    400: { q: "Screenshot 400 – Welcher Titel ist das?", a: "Uncharted 1" },
    500: { q: "Screenshot 500 – Welches Spiel?", a: "Angry Birds Star Wars" }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector(".board");
  const modal = document.getElementById("question-modal");
  const questionText = document.getElementById("question-text");
  const answerButton = document.getElementById("answer-button");
  const closeButton = document.getElementById("close-button");

  let currentAnswer = "";

  for (let category in questions) {
    const header = document.createElement("div");
    header.className = "category";
    header.textContent = category;
    board.appendChild(header);

    for (let points of [100, 200, 300, 400, 500]) {
      const data = questions[category][points];
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = points;
      card.addEventListener("click", () => {
        if (!card.classList.contains("used")) {
          card.classList.add("used");
          questionText.textContent = data.q;
          currentAnswer = data.a;
          modal.style.display = "flex";
        }
      });
      board.appendChild(card);
    }
  }

  answerButton.addEventListener("click", () => {
    questionText.textContent = "Antwort: " + currentAnswer;
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
