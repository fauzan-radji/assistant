const input = document.getElementById("input");
const whatYouSaid = document.getElementById("what-you-said");

/* MAIN CODE */
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join(" ");

  updateText(transcript);
  if (e.results[0].isFinal) {
    addText(transcript);

    // if transcript starts with 'carikan' then it will googling
    if (transcript.toLowerCase().startsWith("carikan")) {
      const query = transcript.split("carikan ").join("");
      open(`http://www.google.com/search?hl=en&q=${normalizeQuery(query)}`);
    }
  }
});

recognition.addEventListener("error", (e) => console.log({ error: e.error }));

recognition.addEventListener("end", (e) => recognition.start());

recognition.start();

/* UTILITY FUNCTIONS */
function addText(text) {
  const firstChild = whatYouSaid.children[0];
  const newParagraph = document.createElement("p");
  newParagraph.textContent = text;

  whatYouSaid.insertBefore(newParagraph, firstChild);
}

function updateText(text) {
  input.value = text;
}

function normalizeQuery(q) {
  return q
    .replace(":", "%3A")
    .replace("+", "%2B")
    .replace("&", "%26")
    .replace(" ", "+");
}
