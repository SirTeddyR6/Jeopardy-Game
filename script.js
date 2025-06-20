// --- Daten für Board 1 (Fragen, Antworten, Screenshots) ---
const boardData1 = {
  "Filme": {
    100: {
      question: "In welcher Stadt spielt der Großteil des Films Blade Runner 2049?",
      answer: "Los Angeles"
    },
    200: {
      question: "Wie viele Wagons hat der Polar Express aus dem gleichnamigen Film?",
      answer: "5 – 4 Gästewagons und 1 für die Kohle"
    },
    300: {
      question: "Welcher Film wurde als erster vollständig digital animierter Langfilm veröffentlicht?",
      answer: "Toy Story im Jahr 1995"
    },
    400: {
      question: "Wie heißt der Planet in 'Interstellar', auf dem die Zeit langsamer vergeht?",
      answer: "Millers Planet"
    },
    500: {
      question: "Was ist Fillmores Hauptgeschäft in dem Film Cars?",
      answer: "Er verkauft organischen Bio-Kraftstoff"
    }
  },
  "Anime": {
    100: {
      question: "Wie kommt Guts in die Welt?",
      answer: "Er wird lebendig aus der Leiche seiner Mutter gehängt gefunden"
    },
    200: {
      question: "Wie heißt der meistgesehene Anime-Film nach 2020?",
      answer: "Demon Slayer: Mugen Train (Kimetsu no Yaiba: Mugen Ressha-hen)"
    },
    300: {
      question: "Wie viele Kategorien von Nen gibt es in Hunter x Hunter?",
      answer: "6"
    },
    400: {
      question: "Wie heißt die Insel, auf der Whitebeard geboren wurde – und was ist ihr Status heute?",
      answer: "Sphinx – heute eine von Marco geschützte Insel"
    },
    500: {
      question: "Was ist Ls echter Name?",
      answer: "L Lawliet"
    }
  },
  "Zurück in die Schule": {
    100: {
      question: "6. Klasse Biologie: Wie heißen die 5 Sinne des Menschen?",
      answer: "Sehsinn, Hörsinn, Geruchssinn, Geschmackssinn, Tastsinn"
    },
    200: {
      question: "7. Klasse Geografie: Wie viele Klimazonen gibt es auf der Erde? Nenne mindestens drei!",
      answer: "Tropen, Subtropen, gemäßigte Zone, subpolare Zone, Polarzone"
    },
    300: {
      question: "8. Klasse Kunst: Was ist der Goldene Schnitt in der Bildgestaltung?",
      answer: "Ein Gestaltungsprinzip, das für harmonische Proportionen sorgt – kleiner zu größer wie größer zur Gesamtlänge"
    },
    400: {
      question: "9. Klasse Deutsch: Wie bildet man das Plusquamperfekt? Bilde mir einen Beispielsatz!",
      answer: "Präteritum von haben/sein + Partizip II, z. B. 'Ich hatte gegessen'"
    },
    500: {
      question: "10. Klasse Mathe: Wie erkenne ich, ob zwei Funktionen zueinander orthogonal sind?",
      answer: "Sie schneiden sich im 90°-Winkel – das erkennt man an den negativen reziproken Steigungen"
    }
  },
  "Allgemeinwissen": {
    100: {
      question: "Warum sind Flamingos rosa?",
      answer: "Aufgrund ihrer Nahrung"
    },
    200: {
      question: "Warum ist Gähnen ansteckend?",
      answer: "Weil Spiegelneuronen in unserem Gehirn soziale Reaktionen auslösen"
    },
    300: {
      question: "Warum gibt es keine quadratischen Löffel?",
      answer: "Weil sie in runden Gefäßen schlecht funktionieren"
    },
    400: {
      question: "Warum drehen sich Uhren im Uhrzeigersinn?",
      answer: "Wegen der alten Sonnenuhren auf der Nordhalbkugel"
    },
    500: {
      question: "Was ist das Ziel der UNO?",
      answer: "Frieden sichern, Menschenrechte schützen, Entwicklung fördern, Zusammenarbeit stärken"
    }
  },
  "Screenshots": {
    100: {
      question: "<img src='Shadow of colossus 100.png' alt='Screenshot 100' style='max-width:100%;'>",
      answer: "Shadow of the Colossus"
    },
    200: {
      question: "<img src='Expedition 33 200.png' alt='Screenshot 200' style='max-width:100%;'>",
      answer: "Expedition 33"
    },
    300: {
      question: "<img src='Assasins creed Shadows 3004.png' alt='Screenshot 300' style='max-width:100%;'>",
      answer: "Assassin’s Creed Shadows"
    },
    400: {
      question: "<img src='Uncharted 1   400.png' alt='Screenshot 400' style='max-width:100%;'>",
      answer: "Uncharted 1"
    },
    500: {
      question: "<img src='Angry birds star wars 500.png' alt='Screenshot 500' style='max-width:100%;'>",
      answer: "Angry Birds Star Wars"
    }
  }
};

// --- Dynamik & Logik ---
const isHost = document.body.classList.contains("host");
const isPlayer = document.body.classList.contains("spieler");
const boardContainer = document.querySelector(".board");
let currentRound = 1;
let buzzedPlayer = null;
let players = JSON.parse(localStorage.getItem("players")) || [];

function renderBoard(data) {
  boardContainer.innerHTML = "";
  Object.keys(data).forEach(category => {
    const column = document.createElement("div");
    column.classList.add("column");
    const header = document.createElement("div");
    header.classList.add("category");
    header.textContent = category;
    column.appendChild(header);
    Object.keys(data[category]).forEach(points => {
      const tile = document.createElement("button");
      tile.classList.add("tile");
      tile.textContent = points;
      tile.dataset.category = category;
      tile.dataset.points = points;
      column.appendChild(tile);
    });
    boardContainer.appendChild(column);
  });
}

function getBoardData() {
  return currentRound === 1 ? boardData1 : {}; // Placeholder für Runde 2
}

function updatePlayerList() {
  const list = document.getElementById("player-list");
  if (!list) return;
  list.innerHTML = "";
  players.forEach((p, i) => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${p.name}</strong>: ${p.points} 
      <button onclick="adjustPoints(${i}, 100)">+100</button>
      <button onclick="adjustPoints(${i}, -100)">-100</button>
      <button onclick="removePlayer(${i})">✖</button>`;
    list.appendChild(div);
  });
  localStorage.setItem("players", JSON.stringify(players));
}

function adjustPoints(index, change) {
  players[index].points += change;
  updatePlayerList();
}

function removePlayer(index) {
  players.splice(index, 1);
  updatePlayerList();
}

function openQuestion(category, points) {
  const questionData = getBoardData()[category][points];
  document.getElementById("question-text").innerHTML = questionData.question;
  document.getElementById("answer-text").textContent = questionData.answer;
  document.getElementById("question-modal").classList.remove("hidden");
  document.querySelector(`button[data-category="${category}"][data-points="${points}"]`).disabled = true;
}

function closeQuestion() {
  document.getElementById("question-modal").classList.add("hidden");
  document.getElementById("answer-text").classList.add("hidden");
}

function showAnswer() {
  document.getElementById("answer-text").classList.remove("hidden");
}

if (isHost) {
  renderBoard(getBoardData());
  document.getElementById("board").addEventListener("click", e => {
    if (e.target.classList.contains("tile")) {
      openQuestion(e.target.dataset.category, e.target.dataset.points);
    }
  });
  document.getElementById("show-answer").onclick = showAnswer;
  document.getElementById("close-question").onclick = closeQuestion;
  document.getElementById("switch-round").onclick = () => {
    currentRound = currentRound === 1 ? 2 : 1;
    renderBoard(getBoardData());
  };
  document.getElementById("add-player").onclick = () => {
    const name = document.getElementById("new-player-name").value.trim();
    if (name) {
      players.push({ name, points: 0 });
      updatePlayerList();
      document.getElementById("new-player-name").value = "";
    }
  };
  updatePlayerList();
}

if (isPlayer) {
  renderBoard(getBoardData());
  document.getElementById("player-board").addEventListener("click", e => {
    if (e.target.classList.contains("tile")) {
      const category = e.target.dataset.category;
      const points = e.target.dataset.points;
      const questionData = getBoardData()[category][points];
      document.getElementById("question-text").innerHTML = questionData.question;
      document.getElementById("question-modal").classList.remove("hidden");
    }
  });

  document.getElementById("buzz-button").onclick = () => {
    document.getElementById("buzzer-feedback").textContent = "Du hast gebuzzert!";
  };
}
