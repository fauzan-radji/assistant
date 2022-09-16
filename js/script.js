const input = document.getElementById("input");
const whatYouSaid = document.getElementById("what-you-said");
let listening = false;
const greetings = [
  "halo",
  "coy",
  "cuy",
  "oi",
  "woi",
  "halo cuy",
  "halo coy",
  "oke cuy",
  "oy cuy",
  "woi cuy",
  "halo mbak",
  "woy coy",
  "woi coy",
  "dengerin",
];
const responses = [
  "ngapa bang?",
  "iya kenapa?",
  "apa cuy?",
  "nani deska?",
  "NGAPA LU BANGSAT!!",
  "NGAPA LU ANJING!!",
];

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "id-ID";

recognition.addEventListener("error", (e) => {
  const error = e.error;
  console.log({ error });
  if (error === "no-speech") listening = false;
});

recognition.addEventListener("end", () => recognition.start());

const synth = window.speechSynthesis;

/* MAIN CODE */
recognition.addEventListener("result", async (e) => {
  const results = Array.from(e.results);
  const transcript = results
    .map((speechRecognitionResult) => speechRecognitionResult[0])
    .map(
      (speechRecognitionAlternative) => speechRecognitionAlternative.transcript
    )
    .join("");

  updateText(transcript);
  if (e.results[0].isFinal) {
    updateText("");

    if (!listening && greetings.includes(transcript.toLowerCase())) {
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      speak(randomResponse);
      setTimeout(() => (listening = true), 1000);
      return;
    }

    if (listening) {
      listening = false;
      addText(transcript);
      executeCommand(transcript);
    }
  }
});

recognition.start();
