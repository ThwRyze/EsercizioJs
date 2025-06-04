// Funzione fornita
function getPastEvent() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const events = [
        { year: 1990, name: "World Wide Web Invented" },
        { year: 2001, name: "Wikipedia Launched" },
        { year: 1969, name: "Moon Landing" },
        { year: 2020, name: "Global Pandemic" },
        { year: 1989, name: "Fall of Berlin Wall" }
      ];
      const randomIndex = Math.floor(Math.random() * events.length);
      resolve(events[randomIndex]);
    }, Math.random() * 1000);
  });
}

// Funzione 
async function travelThroughHistory(N) {
  // 1. Chiama N volte getPastEvent() in parallelo
  const prom = Array.from({ length: N }, () => getPastEvent());
  const risultati = await Promise.all(prom);

  // 2. Rimuove duplicati (stesso anno + stesso nome)
  const mappaeventiunici = new Map();
  for (const event of risultati) {
    const key = `${event.year}-${event.name}`;
    mappaeventiunici.set(key, event); // sovrascrive se duplicato
  }
  const eventiunici = Array.from(mappaeventiunici.values());

  // 3. Filtra solo eventi prima del 2000
  const eventiordinati = eventiunici.filter(event => event.year < 2000);

  // 4. Ordina cronologicamente
  const sortedEvents = eventiordinati.sort((a, b) => a.year - b.year);

  return sortedEvents;
}

// Esempio di utilizzo:
travelThroughHistory(10).then(events => {
  console.log("Risultato finale:", events);
});
