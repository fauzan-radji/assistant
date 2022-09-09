const input = document.getElementById("input");
const whatYouSaid = document.getElementById("what-you-said");

/* MAIN CODE */
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

recognition.addEventListener("result", (e) => {
  console.log({ result: e });
});

recognition.addEventListener("error", (e) => {
  console.log({ error: e.error });
});

recognition.addEventListener("speechstart", (e) => {
  console.log({ speechstart: e });
});

recognition.addEventListener("end", (e) => {
  recognition.start();
});

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
