const commands = [
  new Command("jam berapa sekarang", tellTheTime),
  new Command("sekarang jam berapa", tellTheTime),

  new Command("hari apa ini", tellTheDate),
  new Command("tanggal berapa hari ini", tellTheDate),
  new Command("tanggal hari ini", tellTheDate),

  new Command("Apa itu", definisi),
  new Command("Jelaskan", definisi),
  new Command("Definisi dari", definisi),
  new Command("Definisikan", definisi),
  new Command("Definisi", definisi),

  new Command("coba bilang", speak),
  new Command("bilang", speak),

  new Command("cuaca di", getWeather),
  new Command("hujan nggak hari ini", () => getWeather("bone bolango")),

  new Command("nggak sopan", () => speak("oh iya maaf bang.")),
  new Command("gak papa", () => speak("oh yaudah.")),
  new Command("apa kabar", () => speak("alhamdulillah baik.")),
  new Command("reload", () => location.reload(true)),
];
