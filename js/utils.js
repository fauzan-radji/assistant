/* UTILITY FUNCTIONS */
let cities;
(async () => {
  cities = await fetchJSON(location.href + "json/wilayah.json");
})();

function addText(text) {
  const firstChild = whatYouSaid.children[0];
  const newParagraph = document.createElement("p");
  newParagraph.textContent = text;

  whatYouSaid.insertBefore(newParagraph, firstChild);
}

function updateText(text) {
  input.value = text;
}

function speak(text) {
  addText(text);
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}

function executeCommand(transcript) {
  transcript = transcript.toLowerCase();
  const matchesCommands = commands.find((cmd) => {
    return transcript.startsWith(cmd.command);
  });
  if (matchesCommands) {
    const param = transcript.substring(matchesCommands.command.length + 1);
    matchesCommands.execute(param);
  }
}

function tellTheTime() {
  const now = new Date();
  const time = now.getHours() + ":" + now.getMinutes();
  speak("Sekarang jam " + time);
}

function tellTheDate() {
  const now = new Date();
  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const day = days[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();
  const year = now.getFullYear();

  speak(`Hari ini hari ${day}. Tanggal ${date} ${month} ${year}`);
}

async function definisi(kata) {
  const base_url = "https://new-kbbi-api.herokuapp.com/cari/" + kata;
  let response = await fetchJSON(base_url);
  const deskripsi = response.data[0].arti.map((e) => e.deskripsi);

  for (let i = 0; i < deskripsi.length; i++) {
    const kalimat = deskripsi[i].replace(/--/g, kata);
    speak(`${i + 1}. ${kalimat}`);
  }
}

async function getWeather(city) {
  if (!cities) {
    speak(
      "tunggu bentar cuy. gua belum selesai ngeload data wilayah. coba lagi nanti."
    );
    return;
  }

  const wilayah = cities.find((kota) => {
    return [
      kota.provinsi.toLowerCase(),
      kota.kota.toLowerCase(),
      kota.kecamatan.toLowerCase(),
    ].some((e) => e.includes(city.toLowerCase()));
  });

  if (!wilayah) {
    speak(city + " itu daerah mana cuy?");
    return;
  }

  const base_url = "https://ibnux.github.io/BMKG-importer/cuaca/";
  const { id, provinsi, kota, kecamatan } = wilayah;
  const url = base_url + id + ".json";
  const weathers = await fetchJSON(url);
  if (weathers.length > 0) {
    const daerah = `Provinsi ${provinsi}, ${kota}, Kecamatan ${kecamatan}`;
    speak("Ini cuaca di wilayah " + daerah + " cuy");

    for (const { jamCuaca, cuaca, humidity, tempC } of weathers) {
      const [tanggal, jam] = jamCuaca.split(" ");
      const kalimat = `Di tanggal ${tanggal.split("-")[2]}, jam ${jam
        .split(":")[0]
        .replace(
          "00",
          "12 malam"
        )}. ${cuaca}, dengan kelembapan ${humidity} dan temperatur ${tempC} derajat celcius`;

      speak(kalimat);
    }
  }
}

async function fetchJSON(url) {
  const response = await fetch(url);
  return await response.json();
}
