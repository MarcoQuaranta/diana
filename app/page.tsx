"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupExiting, setPopupExiting] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [popup2Exiting, setPopup2Exiting] = useState(false);
  const [showPrime, setShowPrime] = useState(false);
  const [showScusaPopup, setShowScusaPopup] = useState(false);
  const [showLettera, setShowLettera] = useState(false);
  const [showRichiesta, setShowRichiesta] = useState(false);
  const [richiestaMessage, setRichiestaMessage] = useState("");
  const [richiestaType, setRichiestaType] = useState<"richiesta" | "messaggio">("richiesta");
  const [hasFirstAccess, setHasFirstAccess] = useState(false);
  const [showRegalino, setShowRegalino] = useState(false);
  const [regalinoInput, setRegalinoInput] = useState("");
  const [showMessaggioPersonalizzato, setShowMessaggioPersonalizzato] = useState(false);
  const [messaggioPersonalizzatoInput, setMessaggioPersonalizzatoInput] = useState("");
  const [showDisdetta, setShowDisdetta] = useState(false);

  // Controlla se ha già fatto il primo accesso
  useEffect(() => {
    const firstAccess = localStorage.getItem('ricciolinoPrimeAccess');
    if (firstAccess === 'true') {
      setHasFirstAccess(true);
    }
  }, []);

  const closePopup1 = () => {
    setPopupExiting(true);
    setTimeout(() => {
      setShowPopup(false);
      setPopupExiting(false);
      setShowPopup2(true);
    }, 300);
  };

  const closePopup2 = () => {
    setPopup2Exiting(true);
    setTimeout(() => {
      setShowPopup2(false);
      setPopup2Exiting(false);
      setShowPrime(true);
      // Salva il primo accesso
      localStorage.setItem('ricciolinoPrimeAccess', 'true');
      setHasFirstAccess(true);
    }, 300);
  };

  const whatsappMessages = [
    { label: "Richiedi Bacino", message: "Damme 'nu vas, muovt." },
    { label: "Richiedi Spupazzamento", message: "M'edde soffoca e vas strunz fa ambress." },
    { label: "Richiedi Sushi", message: "Ammo teng famm. Ci sfondiamo all'All You Can Eat?" },
    { label: "Richiedi Chiamata Telefonica", message: "Chiamami zoccolo te vogl senti m manc." },
    { label: "Richiedi Black Humor", message: "È tempo di offendere le minoranze." },
    { label: "Richiedi Complimento", message: "L'autostima di Roscetta è al di sotto del 20%. Collegare all'alimentazione di complimenti il prima possibile." },
    { label: "Chiedi Se Sono Tuo", message: "Sij o mij?" },
    { label: "Segnala Bug", message: "Devi dirmi qualcosa? Ah fai finta di nulla... LO SAI COSA HAI FATTO!!" },
  ];

  const sendNotification = (message: string) => {
    fetch('https://ntfy.sh/roscetta', {
      method: 'POST',
      headers: {
        'Title': 'Ricciolino Prime',
        'Priority': 'high',
        'Tags': 'heart,sparkles'
      },
      body: message
    }).catch(() => {});
  };

  const inviaRichiesta = (message: string) => {
    sendNotification(message);
    setRichiestaMessage(message);
    setRichiestaType("richiesta");
    setShowRichiesta(true);
  };

  const inviaRegalino = () => {
    if (!regalinoInput.trim()) return;
    const message = `Amo non puoi capire, ho visto ${regalinoInput} in un negozio... bellissimo, peccato che non posso prenderlo... ora vedo un po' come fare, sarebbe bello se qualcuno a caso me lo regalasse... va beh prima o poi lo prenderò dai.`;
    sendNotification(message);
    setRichiestaMessage(message);
    setRichiestaType("richiesta");
    setShowRegalino(false);
    setRegalinoInput("");
    setShowRichiesta(true);
  };

  const inviaMessaggioPersonalizzato = () => {
    if (!messaggioPersonalizzatoInput.trim()) return;
    sendNotification(messaggioPersonalizzatoInput);
    setRichiestaMessage(messaggioPersonalizzatoInput);
    setRichiestaType("messaggio");
    setShowMessaggioPersonalizzato(false);
    setMessaggioPersonalizzatoInput("");
    setShowRichiesta(true);
  };

  // Timer da quando state insieme
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const startDate = new Date("2025-12-26T12:25:00");

    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  // Genera stelle casuali per lo sfondo (ridotto per performance)
  const [stars] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 98}%`,
      top: `${Math.random() * 98}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }))
  );

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#1a1a2e] to-[#0a0a1a]">
      {/* Stelle di sfondo */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Contenitore principale */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Titolo */}
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-center">
          Vuo' essere a mija?
        </h1>

        {/* Globo che gira */}
        <div className="globe-container">
          <div className="globe relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-purple-500/30">
            {/* Gradiente overlay per effetto sferico */}
            <div className="absolute inset-0 z-10 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/40 pointer-events-none" />

            {/* Riflesso luce */}
            <div className="absolute top-4 left-8 w-16 h-16 md:w-20 md:h-20 bg-white/30 rounded-full blur-xl z-20 pointer-events-none" />

            {/* Foto  */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900">
              {/* Placeholder */}
              <Image
                src="/foto.jpg"
                alt="La nostra foto"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Messaggio */}
        <p className="text-lg md:text-xl text-purple-200/80 text-center max-w-md px-4">
          Sei il centro del mio universo Rosce'
        </p>

        {/* Disclaimer */}
        <p className="text-xs text-purple-300/50 text-center max-w-sm px-4 mt-4">
          Cliccando sul pulsante sottostante accetti le politiche aziendali sul possesso delle Roscette e i Termini e Condizioni d&apos;Uso del mio cuore.
        </p>

        {/* Pulsante */}
        <button
          onClick={() => setShowPopup(true)}
          className="mt-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-full text-white font-bold text-lg shadow-lg shadow-purple-500/50 hover:scale-105 hover:shadow-pink-500/50 transition-all duration-300 cursor-pointer"
        >
          Clicca qui per essere mia
        </button>

        {/* Pulsante accesso diretto - solo dopo primo accesso */}
        {hasFirstAccess && (
          <button
            onClick={() => setShowPrime(true)}
            className="mt-2 px-6 py-2 text-purple-400 hover:text-pink-400 transition-colors text-sm underline underline-offset-4 cursor-pointer"
          >
            Accedi a Ricciolino Prime
          </button>
        )}
      </div>

      {/* Popup Errore 404 */}
      {showPopup && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm ${popupExiting ? 'popup-backdrop-exit' : 'popup-backdrop-enter'}`}>
          <div className={`relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-red-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-red-500/20 ${popupExiting ? 'popup-exit' : 'popup-enter'}`}>
            {/* Icona errore */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-4xl text-red-400">!</span>
              </div>
            </div>

            {/* Titolo errore */}
            <h2 className="text-2xl font-bold text-red-400 text-center mb-4">
              Errore 404: Bacino non trovato
            </h2>
            <p className="text-purple-300/80 text-center mb-6">
              Dai un bacino al tuo ricciolino per proseguire.
            </p>

            {/* Pulsante conferma */}
            <button
              onClick={closePopup1}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/30 cursor-pointer"
            >
              Ho dato il bacino giuro.<br />Fonte: fidati.
            </button>
          </div>
        </div>
      )}

      {/* Popup 2 - Bossetti */}
      {showPopup2 && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm ${popup2Exiting ? 'popup-backdrop-exit' : 'popup-backdrop-enter'}`}>
          <div className={`relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-red-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-red-500/20 ${popup2Exiting ? 'popup-exit' : 'popup-enter'}`}>
            {/* Icona errore */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-4xl text-red-400">!</span>
              </div>
            </div>

            {/* Titolo errore */}
            <h2 className="text-2xl font-bold text-red-400 text-center mb-4">
              Errore critico: Bossetti è ancora ingiustamente carcerato
            </h2>

            {/* Messaggio */}
            <p className="text-purple-300/80 text-center mb-6">
              Libera Bossetti per proseguire.
            </p>

            {/* Pulsante conferma */}
            <button
              onClick={closePopup2}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/30 cursor-pointer"
            >
              Ho liberato Bossetti, è qui con me ora.<br />(#FreeBoffetti)
            </button>
          </div>
        </div>
      )}

      {/* Popup Chiedi Scusa */}
      {showScusaPopup && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter">
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-red-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-red-500/20 popup-enter">
            {/* Icona errore */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-4xl text-red-400">X</span>
              </div>
            </div>

            {/* Titolo errore */}
            <h2 className="text-2xl font-bold text-red-400 text-center mb-4">
              Funzione non disponibile per l&apos;account selezionato
            </h2>

            {/* Spiegazione */}
            <p className="text-purple-300/80 text-center mb-6">
              Questa funzione non è disponibile per gli account con sesso selezionato: <span className="font-bold text-pink-400">Donna</span>.<br /><br />
              Passa ad un account maschile per sbloccare la funzionalità.
            </p>

            {/* Pulsante chiudi */}
            <button
              onClick={() => setShowScusaPopup(false)}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/30 cursor-pointer"
            >
              Ho capito
            </button>
          </div>
        </div>
      )}

      {/* Popup Conferma Disdetta */}
      {showDisdetta && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter">
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-red-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-red-500/20 popup-enter">
            {/* Icona */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-4xl">💔</span>
              </div>
            </div>

            {/* Titolo */}
            <h2 className="text-2xl font-bold text-red-400 text-center mb-4">
              Sei sicura?
            </h2>

            {/* Messaggio */}
            <p className="text-purple-200/80 text-center mb-6">
              Così facendo non potrai più ricevere i benefici di <span className="font-bold text-pink-400">Ricciolino Prime</span> e spezzerai il suo cuoricino in mille frantumi.
            </p>

            {/* Pulsanti */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  sendNotification("Fra che cazzo hai combinato? Stavolta ti è andata bene ma Roscetta stava per lasciarti ed è molto probabile che ti stia per staccare le palle. Mantieni un profilo basso per i prossimi giorni.");
                  setShowDisdetta(false);
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/30 cursor-pointer"
              >
                No, voglio restare con il Ricciolino
              </button>
              <button
                onClick={() => {
                  setShowDisdetta(false);
                  inviaRichiesta("Amo dobbiamo parlare... non sei tu davvero, sono io...");
                }}
                className="w-full px-6 py-3 bg-transparent border border-red-500/50 rounded-full text-red-400 font-semibold hover:bg-red-500/10 transition-all duration-300 cursor-pointer text-sm"
              >
                Sì, sono una persona senza cuore e desidero lasciare il Ricciolino
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Messaggio Personalizzato */}
      {showMessaggioPersonalizzato && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter">
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-pink-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-pink-500/20 popup-enter">
            {/* Icona */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center">
                <span className="text-4xl">✉️</span>
              </div>
            </div>

            {/* Titolo */}
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-center mb-4">
              Scrivi il tuo messaggio
            </h2>

            {/* Textarea */}
            <textarea
              value={messaggioPersonalizzatoInput}
              onChange={(e) => setMessaggioPersonalizzatoInput(e.target.value)}
              placeholder="Scrivi qui il tuo messaggio..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-purple-900/50 border border-purple-500/30 text-white placeholder-purple-400/50 focus:outline-none focus:border-pink-500 mb-6 resize-none"
            />

            {/* Pulsanti */}
            <div className="flex gap-3">
              <button
                onClick={() => { setShowMessaggioPersonalizzato(false); setMessaggioPersonalizzatoInput(""); }}
                className="flex-1 px-6 py-3 bg-purple-900/50 border border-purple-500/30 rounded-full text-purple-300 font-semibold hover:bg-purple-900/70 transition-all duration-300 cursor-pointer"
              >
                Annulla
              </button>
              <button
                onClick={inviaMessaggioPersonalizzato}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/30 cursor-pointer"
              >
                Invia
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Regalino */}
      {showRegalino && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter">
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-pink-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-pink-500/20 popup-enter">
            {/* Icona regalo */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center">
                <span className="text-4xl">🎁</span>
              </div>
            </div>

            {/* Titolo */}
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-center mb-4">
              Cosa vorresti ricevere?
            </h2>

            {/* Input */}
            <input
              type="text"
              value={regalinoInput}
              onChange={(e) => setRegalinoInput(e.target.value)}
              placeholder="Es: una borsa Gucci, un iPhone..."
              className="w-full px-4 py-3 rounded-xl bg-purple-900/50 border border-purple-500/30 text-white placeholder-purple-400/50 focus:outline-none focus:border-pink-500 mb-2"
            />
            <p className="text-xs text-purple-300/50 mb-6">
              * Ricordati che sono povero come Jeff Bezos dopo aver acquistato un kilo di castagne.
            </p>

            {/* Pulsanti */}
            <div className="flex gap-3">
              <button
                onClick={() => { setShowRegalino(false); setRegalinoInput(""); }}
                className="flex-1 px-6 py-3 bg-purple-900/50 border border-purple-500/30 rounded-full text-purple-300 font-semibold hover:bg-purple-900/70 transition-all duration-300 cursor-pointer"
              >
                Annulla
              </button>
              <button
                onClick={inviaRegalino}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/30 cursor-pointer"
              >
                Invia
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Richiesta Inviata */}
      {showRichiesta && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter">
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-green-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-green-500/20 popup-enter">
            {/* Icona successo */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-4xl">✓</span>
              </div>
            </div>

            {/* Titolo */}
            <h2 className="text-2xl font-bold text-green-400 text-center mb-4">
              {richiestaType === "messaggio" ? "Messaggio inviato!" : "Richiesta inviata!"}
            </h2>

            {/* Messaggio */}
            <div className="bg-purple-900/30 rounded-xl p-4 mb-6">
              <p className="text-purple-300/60 text-sm mb-2">
                {richiestaType === "messaggio" ? "Testo del messaggio:" : "Testo della richiesta:"}
              </p>
              <p className="text-purple-200 italic">{richiestaMessage}</p>
            </div>

            {/* Pulsante chiudi */}
            <button
              onClick={() => setShowRichiesta(false)}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/30 cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Popup Lettera d'Amore */}
      {showLettera && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm popup-backdrop-enter p-4">
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-pink-500/30 rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl shadow-pink-500/20 popup-enter">
            {/* Pulsante chiudi */}
            <button
              onClick={() => setShowLettera(false)}
              className="absolute top-4 right-4 text-purple-400 hover:text-pink-400 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Intestazione SOS */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-4xl">🚨</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-red-400 text-center mb-2">
              SOS INVIATO
            </h2>
            <p className="text-purple-300/80 text-center mb-6">
              In attesa dei soccorsi, usa questo kit di emergenza
            </p>

            {/* Lettera */}
            <div className="bg-purple-900/30 rounded-xl p-6 border border-pink-500/20">
              <div className="flex justify-center mb-4">
                <span className="text-3xl">💌</span>
              </div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-center mb-4">
                Una lettera per te, Roscetta
              </h3>

              {/* Contenuto della lettera - MODIFICA QUI */}
              <div className="text-purple-200/90 space-y-4 leading-relaxed">
                <p>Cara Roscetta,</p>
                <p>
                  [Scrivi qui la tua lettera...]
                </p>
                <p className="text-right text-pink-400 font-semibold mt-6">
                  Con tutto il mio amore,<br />
                  Il tuo Ricciolino
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Effetto nebulosa di sfondo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl" />

      {/* Pagina Ricciolino Prime */}
      {showPrime && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#0a0a1a] via-[#1a1a2e] to-[#0a0a1a] overflow-x-hidden overflow-y-auto">
          {/* Stelle di sfondo */}
          {stars.map((star) => (
            <div
              key={`prime-${star.id}`}
              className="star absolute rounded-full bg-white"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center gap-6 px-4 max-w-2xl mx-auto popup-enter py-12 min-h-screen justify-center">
            {/* Pulsante esci */}
            <button
              onClick={() => setShowPrime(false)}
              className="absolute top-6 right-6 text-purple-400 hover:text-pink-400 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Badge Prime */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-2 rounded-full">
              <span className="text-2xl">👑</span>
              <span className="text-white font-bold text-xl">RICCIOLINO PRIME</span>
            </div>

            {/* Messaggio benvenuto */}
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ora sei ufficialmente un membro di<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
                  Ricciolino Prime
                </span>
              </h1>
              <p className="text-xl text-purple-200">
                Scadenza abbonamento: <span className="font-bold text-pink-400">mai.</span>
              </p>
            </div>

            {/* Timer insieme */}
            <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 border border-pink-500/30 rounded-2xl p-6 backdrop-blur-sm w-full max-w-lg">
              <p className="text-purple-200 text-center text-lg mb-3">Mi sopporti da ben</p>
              <div className="grid grid-cols-4 gap-2 md:gap-4 w-full">
                <div className="flex flex-col items-center bg-purple-900/50 rounded-xl py-3">
                  <span className="text-2xl md:text-4xl font-bold text-pink-400">{timeTogether.days}</span>
                  <span className="text-xs text-purple-300">giorni</span>
                </div>
                <div className="flex flex-col items-center bg-purple-900/50 rounded-xl py-3">
                  <span className="text-2xl md:text-4xl font-bold text-pink-400">{timeTogether.hours}</span>
                  <span className="text-xs text-purple-300">ore</span>
                </div>
                <div className="flex flex-col items-center bg-purple-900/50 rounded-xl py-3">
                  <span className="text-2xl md:text-4xl font-bold text-pink-400">{timeTogether.minutes}</span>
                  <span className="text-xs text-purple-300">minuti</span>
                </div>
                <div className="flex flex-col items-center bg-purple-900/50 rounded-xl py-3">
                  <span className="text-2xl md:text-4xl font-bold text-pink-400">{timeTogether.seconds}</span>
                  <span className="text-xs text-purple-300">secondi</span>
                </div>
              </div>
            </div>

            {/* Pannello Amministrazione */}
            <div className="w-full bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90 border border-purple-500/30 rounded-2xl p-6 mt-4 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-purple-300 text-center mb-6">
                ⚙️ Sfrutta i tuoi benefici di essere a mija
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Prima parte: Bacino, Spupazzamento, Sushi */}
                {whatsappMessages.slice(0, 3).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => inviaRichiesta(item.message)}
                    className="px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
                {/* Pulsante Regalino - apre popup con input */}
                <button
                  onClick={() => setShowRegalino(true)}
                  className="px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                >
                  Richiedi Regalino
                </button>
                {/* Resto dei pulsanti */}
                {whatsappMessages.slice(3).map((item, index) => (
                  <button
                    key={index + 3}
                    onClick={() => inviaRichiesta(item.message)}
                    className="px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
                {/* Pulsante Chiedi scusa - mostra popup invece di WhatsApp */}
                <button
                  onClick={() => { sendNotification('Roscetta ha provato a chiedere scusa... HAHAHA'); setShowScusaPopup(true); }}
                  className="px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                >
                  Chiedi Scusa
                </button>
                {/* Pulsante Messaggio Personalizzato - larghezza piena */}
                <button
                  onClick={() => setShowMessaggioPersonalizzato(true)}
                  className="col-span-1 sm:col-span-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                >
                  Messaggio Personalizzato
                </button>
                {/* Pulsante Emergenza - dentro il box ma più grande */}
                <div className="col-span-1 sm:col-span-2 flex flex-col items-center gap-3 mt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
                    <span className="text-red-400 animate-pulse">⚠️</span>
                    <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
                      Attenzione: usare solo per le emergenze
                    </p>
                    <span className="text-red-400 animate-pulse">⚠️</span>
                  </div>
                  <button
                    onClick={() => { sendNotification('EMERGENZA: Roscetta ha bisogno di sapere quanto la ami!'); setShowLettera(true); }}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 rounded-full text-white font-bold text-lg shadow-lg shadow-pink-500/50 hover:scale-105 hover:shadow-red-500/50 transition-all duration-300 animate-pulse cursor-pointer"
                  >
                    Premi qui per ricordare quanto il Ricciolino ti ama
                  </button>
                </div>
              </div>
            </div>

            {/* Disdici abbonamento - fuori dal box */}
            <button
              onClick={() => setShowDisdetta(true)}
              className="mt-6 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-red-600 to-red-800 text-white hover:shadow-lg hover:shadow-red-500/30 cursor-pointer"
            >
              Disdici abbonamento Ricciolino Prime
            </button>

            {/* Nebulose */}
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-56 h-56 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
}
