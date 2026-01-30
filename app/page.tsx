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
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [enlargedPhoto, setEnlargedPhoto] = useState<string | null>(null);
  const [showBenefits, setShowBenefits] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Swipe handlers per la galleria
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && galleryPhotos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev === galleryPhotos.length - 1 ? 0 : prev + 1));
    }
    if (isRightSwipe && galleryPhotos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev === 0 ? galleryPhotos.length - 1 : prev - 1));
    }
  };
  const [showComplimentPopup, setShowComplimentPopup] = useState(false);
  const [currentCompliment, setCurrentCompliment] = useState("");
  const [showCoinFlip, setShowCoinFlip] = useState(false);
  const [coinResult, setCoinResult] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinReason, setCoinReason] = useState("");

  // Captcha states
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [currentCaptcha, setCurrentCaptcha] = useState(0);
  const [captchaError, setCaptchaError] = useState(false);
  const [selectedCaptchaItems, setSelectedCaptchaItems] = useState<number[]>([]);

  // Scarcerazione Bossetti states
  const [showScarcerazione, setShowScarcerazione] = useState(false);
  const [scarcerazioneProgress, setScarcerazioneProgress] = useState(0);
  const [scarcerazioneComplete, setScarcerazioneComplete] = useState(false);

  // Dati dei 3 captcha - griglia 3x3
  const captchaData = [
    {
      question: "Seleziona chi faceva arrivare i treni in orario.",
      type: "images" as const,
      items: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/200px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg",
        "https://www.keblog.it/wp-content/uploads/2020/10/personaggi-storici-belli-affascinanti-25.jpg",
        "https://upload.wikimedia.org/wikipedia/it/thumb/0/08/Francesco_Totti_-_AS_Roma_1996-97.jpg/200px-Francesco_Totti_-_AS_Roma_1996-97.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/200px-Mahatma-Gandhi%2C_studio%2C_1931.jpg",
        "https://cdn.britannica.com/91/9891-050-DC25B5E5/Benito-Mussolini.jpg?w=200",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project_2.jpg/200px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project_2.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/200px-Abraham_Lincoln_O-77_matte_collodion_print.jpg",
        "https://www.shutterstock.com/image-photo/nuremberg-germany-august-9-2024-600nw-2516622489.jpg",
        "https://media.licdn.com/dms/image/v2/C5603AQFKIZf4dA8cAQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1548710517430?e=2147483647&v=beta&t=OcmpIDtJkTJ6pmHmUA7zpGmXFAp0N1XMRMk1XDhLWYA",
      ],
      correctIndex: [4, 7], // Mussolini e Hitler
    },
    {
      question: "Seleziona chi dovrebbe essere libero.",
      type: "images" as const,
      items: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Al_Capone_in_1930.jpg/200px-Al_Capone_in_1930.jpg",
        "https://images.theconversation.com/files/195825/original/file-20171122-6013-1u1ewka.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=200&fit=clip",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEdLbJD6X3JYuE6nKH9b2zB3O5L5-fsGF3dg&s",
        "https://images2.corriereobjects.it/methode_image/2013/10/10/Interni/Foto%20Interni/INT20F1_7747722F1_23667.jpg?v=20131010151732",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Ted_Bundy_headshot.jpg/200px-Ted_Bundy_headshot.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/LuckyLucianoSmaller.jpeg/200px-LuckyLucianoSmaller.jpeg",
        "https://www.repstatic.it/content/nazionale/img/2021/08/17/183523039-e9489737-2944-4741-a8c5-a682104bb4bb.jpg",
        "https://www.altalex.com/~/media/Images/Lex/Asca/Varie/bossetti-massimo-512%20jpg.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrdYGyu1E8DopozCGPfGAYDVn88tZMUhUqUg&s",
      ],
      correctIndex: [7], // Bossetti
    },
  ];

  const handleCaptchaClick = (index: number) => {
    const correctIndices = captchaData[currentCaptcha].correctIndex;

    // Se già selezionato, ignora
    if (selectedCaptchaItems.includes(index)) return;

    if (correctIndices.includes(index)) {
      setCaptchaError(false);
      const newSelected = [...selectedCaptchaItems, index];
      setSelectedCaptchaItems(newSelected);

      // Controlla se tutte le risposte corrette sono state selezionate
      const allCorrectSelected = correctIndices.every(i => newSelected.includes(i));

      if (allCorrectSelected) {
        // Passa al prossimo captcha o mostra scarcerazione
        setTimeout(() => {
          if (currentCaptcha < 1) {
            setCurrentCaptcha(currentCaptcha + 1);
            setSelectedCaptchaItems([]);
          } else {
            // Mostra popup scarcerazione
            setShowCaptcha(false);
            setCurrentCaptcha(0);
            setSelectedCaptchaItems([]);
            setShowScarcerazione(true);
            setScarcerazioneProgress(0);
            setScarcerazioneComplete(false);

            // Avvia il caricamento di 10 secondi
            const interval = setInterval(() => {
              setScarcerazioneProgress(prev => {
                if (prev >= 100) {
                  clearInterval(interval);
                  setScarcerazioneComplete(true);
                  return 100;
                }
                return prev + 1;
              });
            }, 100); // 100ms * 100 = 10 secondi
          }
        }, 500);
      }
    } else {
      // Risposta sbagliata - resetta selezioni
      setCaptchaError(true);
      setSelectedCaptchaItems([]);
    }
  };

  // Lista complimenti AI
  const complimentiAI = [
    "Sij cchiu tost do' pan da semmana passata.",
    "Sij chiù bell e nu bonifico in entrata.",
    "Sij nu suonn comm a tredicesim pe' partite iva.",
    "Tien 'a forza 'e attrazione di un buco nero.",
    "Me faje battere o core comme nu rigore ndo recupero.",
    "Sij talment a mij che aggia pava o bollo nguoll a te.",
    "Ti amo nda stessa manera in cui respiro.",
    "Sij bella comm a na butteglia 'e acqua quanne te scete in hangover.",
    "Da quanne t aggia vist a primma vota, a capa mij l'anna mannat a chi l'ha visto.",
    "Me arrevotate accussi assaje che m aggia scurdat pure o nomme mijo, ma nun me ne fott pecché ij voglio essere chiammat sul \"amo\" addu te.",
    "Sije bella comme 'o viennerì 'e sera doppe 'na semmana 'e merd.",
    "Quanno nun te tocco te vec, quanno nun te vec te chiamm, quanno nun te chiamm te penz, quanno nun te penz significa ca so muort.",
  ];

  const generaComplimento = () => {
    const randomIndex = Math.floor(Math.random() * complimentiAI.length);
    setCurrentCompliment(complimentiAI[randomIndex]);
    setShowComplimentPopup(true);
  };

  const apriMoneta = () => {
    setCoinResult(null);
    setIsFlipping(false);
    setCoinReason("");
    setShowCoinFlip(true);
  };

  const lanciaMoneta = () => {
    setIsFlipping(true);
    setCoinResult(null);

    setTimeout(() => {
      const result = Math.random() < 0.5 ? "Ricciolino" : "Roscetta";
      setCoinResult(result);
      setIsFlipping(false);

      // Invia notifica con il risultato
      const motivoTesto = coinReason.trim() ? `per "${coinReason}"` : "";
      sendNotification(`Moneta delle Decisioni ${motivoTesto}: ha vinto ${result}!`);
    }, 2000);
  };

  // Carica foto dalla galleria (generato al build time)
  useEffect(() => {
    fetch('/gallery.json')
      .then(res => res.json())
      .then(data => setGalleryPhotos(data.photos || []))
      .catch(() => setGalleryPhotos([]));
  }, []);

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
      // Mostra il primo captcha invece di andare direttamente a Prime
      setShowCaptcha(true);
      setCurrentCaptcha(0);
      setCaptchaError(false);
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
        'Title': 'Ricciolino Prime: Roscetta',
        'Tags': 'heart',
        'Priority': 'high'
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
      {/* Stelle di sfondo - limitate per performance */}
      {stars.slice(0, 25).map((star) => (
        <div
          key={star.id}
          className="star absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            contain: 'strict',
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
              {/* Foto principale */}
              <Image
                src="/images/galleria/1.jpg"
                alt="La nostra foto"
                fill
                className="object-cover"
                priority
              />
              {/* Foto sovrapposta */}
              <Image
                src="/foto.jpg"
                alt=""
                fill
                className="object-cover opacity-20"
              />
            </div>
          </div>
        </div>

        {/* Messaggio */}
        <p className="text-lg md:text-xl text-purple-200/80 text-center max-w-md px-4">
          Sei il centro del mio universo Rosce'
        </p>

        {/* Disclaimer */}
        <p className="text-sm text-purple-300/50 text-center max-w-sm px-4 mt-4">
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

      {/* Popup Captcha */}
      {showCaptcha && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter">
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-purple-500/30 rounded-2xl p-6 max-w-sm mx-4 shadow-2xl shadow-purple-500/20 popup-enter">
            {/* Header captcha */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="text-purple-200 font-semibold">Verifica di sicurezza</span>
              <span className="text-purple-400 text-sm ml-auto">{currentCaptcha + 1}/3</span>
            </div>

            {/* Domanda */}
            <p className="text-white text-center mb-4 font-medium">
              {captchaData[currentCaptcha].question}
            </p>

            {/* Griglia 3x3 */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {captchaData[currentCaptcha].items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleCaptchaClick(index)}
                  className={`aspect-square bg-[#2a2a4e] hover:bg-[#3a3a5e] border-2 rounded-lg flex items-center justify-center text-4xl transition-all duration-200 hover:scale-105 cursor-pointer overflow-hidden ${selectedCaptchaItems.includes(index) ? 'border-green-500 ring-2 ring-green-500/50' : 'border-purple-500/20'}`}
                >
                  {captchaData[currentCaptcha].type === "images" ? (
                    <img src={item} alt="" className="w-full h-full object-cover object-top" />
                  ) : (
                    item
                  )}
                </button>
              ))}
            </div>

            {/* Contatore selezioni */}
            {selectedCaptchaItems.length > 0 && (
              <p className="text-green-400 text-center text-sm mb-2">
                {selectedCaptchaItems.length}/{captchaData[currentCaptcha].correctIndex.length}
              </p>
            )}

            {/* Messaggio errore */}
            {captchaError && (
              <p className="text-red-400 text-center text-sm mb-2">
                Risposta errata. Riprova!
              </p>
            )}

            {/* Footer */}
            <p className="text-purple-400/60 text-sm text-center">
              Dimostra di non essere un robot 🤖
            </p>
          </div>
        </div>
      )}

      {/* Popup Scarcerazione Bossetti */}
      {showScarcerazione && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter">
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-purple-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-purple-500/20 popup-enter">
            {!scarcerazioneComplete ? (
              <>
                {/* Titolo */}
                <h2 className="text-2xl font-bold text-white text-center mb-4">
                  Attendere
                </h2>

                {/* Sottotitolo */}
                <p className="text-purple-300 text-center mb-6">
                  Scarcerazione di Bossetti in corso...
                </p>

                {/* Barra di caricamento */}
                <div className="w-full bg-purple-900/50 rounded-full h-4 mb-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-100"
                    style={{ width: `${scarcerazioneProgress}%` }}
                  />
                </div>

                {/* Percentuale */}
                <p className="text-purple-400 text-center text-sm">
                  {scarcerazioneProgress}%
                </p>
              </>
            ) : (
              <>
                {/* Messaggio completato */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-4xl">✓</span>
                  </div>
                </div>

                <p className="text-purple-200 text-center mb-6 text-lg">
                  Bossetti è finalmente in libertà, ora il mondo è un po&apos; più giusto.
                </p>

                {/* Pulsante Continua */}
                <button
                  onClick={() => {
                    setShowScarcerazione(false);
                    setShowPrime(true);
                    localStorage.setItem('ricciolinoPrimeAccess', 'true');
                    setHasFirstAccess(true);
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30 cursor-pointer"
                >
                  Continua
                </button>
              </>
            )}
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

      {/* Modal Galleria Completa */}
      {showFullGallery && (
        <div className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-sm flex flex-col">
          {/* Header fisso */}
          <div className="flex items-center justify-between p-4 bg-black/95 border-b border-purple-500/20 flex-shrink-0">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
              I nostri ricordi
            </h2>
            <button
              onClick={() => setShowFullGallery(false)}
              className="p-2 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-300 hover:text-pink-400 hover:border-pink-500/50 transition-all cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Griglia foto scrollabile */}
          <div className="flex-1 overflow-y-auto scroll-container">
            <div className="grid grid-cols-2 gap-2 p-2 pb-8 max-w-lg mx-auto">
              {galleryPhotos.map((photo, index) => (
                <div
                  key={index}
                  onClick={() => setEnlargedPhoto(photo)}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-purple-500/20 hover:border-pink-500/50 contain-paint"
                >
                  <Image
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Foto Ingrandita */}
      {enlargedPhoto && (
        <div
          className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setEnlargedPhoto(null)}
        >
          {/* Pulsante chiudi */}
          <button
            onClick={() => setEnlargedPhoto(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-300 hover:text-pink-400 hover:border-pink-500/50 transition-all cursor-pointer z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Foto */}
          <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={enlargedPhoto}
              alt="Foto ingrandita"
              width={1200}
              height={1200}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Popup Complimento AI */}
      {showComplimentPopup && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter p-4">
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-cyan-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-cyan-500/20 popup-enter">
            {/* Icona */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <span className="text-4xl">🤖</span>
              </div>
            </div>

            {/* Titolo */}
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 text-center mb-4">
              Ricciolino AI dice:
            </h2>

            {/* Complimento */}
            <div className="bg-purple-900/30 rounded-xl p-4 mb-6">
              <p className="text-purple-200 text-center text-lg italic">&quot;{currentCompliment}&quot;</p>
            </div>

            {/* Pulsanti */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowComplimentPopup(false)}
                className="flex-1 px-6 py-3 bg-purple-900/50 border border-purple-500/30 rounded-full text-purple-300 font-semibold hover:bg-purple-900/70 transition-all duration-300 cursor-pointer"
              >
                Chiudi
              </button>
              <button
                onClick={generaComplimento}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/30 cursor-pointer"
              >
                Altro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Moneta delle Decisioni */}
      {showCoinFlip && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter p-4">
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-yellow-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-yellow-500/20 popup-enter">
            {/* Titolo */}
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-center mb-2">
              Moneta delle Decisioni
            </h2>

            {/* Descrizione */}
            {!coinResult && !isFlipping && (
              <p className="text-purple-300/70 text-center text-sm mb-4">
                Chi farà i piatti? Chi pagherà al sushi? Chi sconfiggerà Freezer? Lancia la moneta e lascia decidere a lei.
              </p>
            )}

            {/* Campo motivo */}
            {!isFlipping && !coinResult && (
              <input
                type="text"
                value={coinReason}
                onChange={(e) => setCoinReason(e.target.value)}
                placeholder="Per cosa lanci la moneta? (opzionale)"
                className="w-full px-4 py-3 rounded-xl bg-purple-900/50 border border-yellow-500/30 text-white placeholder-purple-400/50 focus:outline-none focus:border-yellow-500 mb-4"
              />
            )}

            {/* Mostra motivo durante/dopo il lancio */}
            {(isFlipping || coinResult) && coinReason && (
              <p className="text-yellow-300/80 text-center text-sm mb-2">
                &quot;{coinReason}&quot;
              </p>
            )}

            {/* Moneta animata */}
            <div className="flex justify-center my-6">
              <div
                className="coin-container w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/50"
                style={{
                  animation: coinResult && !isFlipping ? 'none' : (isFlipping ? 'coinFlip 0.2s linear infinite' : 'coinSpin 3s linear infinite'),
                }}
              >
                {coinResult && !isFlipping ? (
                  <div className="flex flex-col items-center">
                    <span className="text-4xl">{coinResult === "Ricciolino" ? "🦱" : "👩‍🦰"}</span>
                    <span className="text-yellow-900 font-bold text-xs text-center">
                      {coinResult}
                    </span>
                  </div>
                ) : (
                  <span className="text-5xl font-bold text-yellow-900">$</span>
                )}
              </div>
            </div>

            {/* Risultato */}
            {coinResult && !isFlipping && (
              <div className="bg-yellow-900/30 rounded-xl p-4 mb-4">
                <p className="text-yellow-200 text-center text-lg">
                  Tocca a <span className="font-bold text-yellow-400">{coinResult}</span>!
                </p>
              </div>
            )}

            {isFlipping && (
              <p className="text-yellow-300/70 text-center mb-4">Lancio in corso...</p>
            )}

            {/* Pulsanti */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCoinFlip(false)}
                className="flex-1 px-6 py-3 bg-purple-900/50 border border-purple-500/30 rounded-full text-purple-300 font-semibold hover:bg-purple-900/70 transition-all duration-300 cursor-pointer"
              >
                Chiudi
              </button>
              <button
                onClick={lanciaMoneta}
                disabled={isFlipping}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-500/30 cursor-pointer disabled:opacity-50 disabled:hover:scale-100"
              >
                {coinResult ? 'Rilancia' : 'Lancia'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagina Ricciolino Prime */}
      {showPrime && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#0a0a1a] via-[#1a1a2e] to-[#0a0a1a] overflow-x-hidden overflow-y-auto scroll-container">
          {/* Stelle di sfondo - limitate per performance */}
          {stars.slice(0, 25).map((star) => (
            <div
              key={`prime-${star.id}`}
              className="star absolute rounded-full bg-white"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                contain: 'strict',
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center gap-6 px-2 sm:px-4 max-w-2xl mx-auto popup-enter py-12 min-h-screen justify-center">
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
            <div className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-rose-400 px-6 py-2 rounded-full">
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

            {/* Galleria Foto */}
            {galleryPhotos.length > 0 && (
              <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 border border-pink-500/30 rounded-2xl p-6 backdrop-blur-sm w-full">
                <p className="text-purple-200 text-center text-lg mb-4">I nostri ricordi</p>

                {/* Container foto - cliccabile per ingrandire, swipe per scorrere */}
                <div
                  onClick={() => setEnlargedPhoto(galleryPhotos[currentPhotoIndex])}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  className="relative w-full aspect-square mx-auto rounded-xl overflow-hidden border-2 border-purple-500/30 cursor-pointer hover:border-pink-500/50 transition-all touch-pan-y"
                >
                  <div key={currentPhotoIndex} className="absolute inset-0 gallery-slide">
                    <Image
                      src={galleryPhotos[currentPhotoIndex]}
                      alt={`Foto ${currentPhotoIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Icona zoom */}
                  <div className="absolute top-2 right-2 p-2 bg-black/50 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>

                {/* Controlli galleria */}
                {galleryPhotos.length > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <button
                      onClick={() => setCurrentPhotoIndex((prev) => (prev === 0 ? galleryPhotos.length - 1 : prev - 1))}
                      className="p-2 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-300 hover:text-pink-400 hover:border-pink-500/50 transition-all cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {/* Indicatori - max 5 visibili */}
                    <div className="flex gap-2 items-center">
                      {(() => {
                        const maxDots = 5;
                        const total = galleryPhotos.length;
                        if (total <= maxDots) {
                          return galleryPhotos.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentPhotoIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                                index === currentPhotoIndex
                                  ? 'bg-pink-500 w-4'
                                  : 'bg-purple-500/50 hover:bg-purple-400'
                              }`}
                            />
                          ));
                        }
                        // Calcola range di 5 pallini centrati sulla foto corrente
                        let start = Math.max(0, currentPhotoIndex - 2);
                        let end = start + maxDots;
                        if (end > total) {
                          end = total;
                          start = Math.max(0, end - maxDots);
                        }
                        return Array.from({ length: end - start }, (_, i) => start + i).map(index => (
                          <button
                            key={index}
                            onClick={() => setCurrentPhotoIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                              index === currentPhotoIndex
                                ? 'bg-pink-500 w-4'
                                : 'bg-purple-500/50 hover:bg-purple-400'
                            }`}
                          />
                        ));
                      })()}
                    </div>

                    <button
                      onClick={() => setCurrentPhotoIndex((prev) => (prev === galleryPhotos.length - 1 ? 0 : prev + 1))}
                      className="p-2 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-300 hover:text-pink-400 hover:border-pink-500/50 transition-all cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Contatore e pulsante allarga */}
                <div className="flex items-center justify-between mt-3">
                  <p className="text-purple-400/60 text-xs">
                    {currentPhotoIndex + 1} / {galleryPhotos.length}
                  </p>
                  <button
                    onClick={() => setShowFullGallery(true)}
                    className="flex items-center gap-1 text-purple-400 hover:text-pink-400 text-xs transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    Vedi tutte
                  </button>
                </div>
              </div>
            )}

            {/* Box Ricciolino AI */}
            <div className="w-full bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90 border border-cyan-500/30 rounded-2xl p-4 mt-4 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">🤖</span>
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400">
                  Ricciolino AI
                </h2>
              </div>
              <p className="text-purple-300/70 text-center text-sm mb-4">
                La versione artificialmente intelligente del tuo Ricciolino
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={generaComplimento}
                  className="px-2 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-cyan-600 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/30 cursor-pointer"
                >
                  Genera Complimento Napoletano
                </button>
                <button
                  onClick={apriMoneta}
                  className="px-2 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg hover:shadow-yellow-500/30 cursor-pointer"
                >
                  Moneta delle Decisioni
                </button>
              </div>
            </div>

            {/* Pannello Benefici - Chiudibile */}
            <div className="w-full bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90 border border-purple-500/30 rounded-2xl mt-4 backdrop-blur-sm flex-shrink-0 overflow-hidden">
              <button
                onClick={() => setShowBenefits(!showBenefits)}
                className="w-full p-3 flex items-center justify-between cursor-pointer hover:bg-purple-500/10 transition-colors"
              >
                <h2 className="text-lg font-bold text-purple-300">
                  ⚙️ Sfrutta i tuoi benefici di essere a mija
                </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 text-purple-400 transition-transform duration-300 ${showBenefits ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showBenefits && (
                <div className="p-3 pt-0">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Prima parte: Bacino, Spupazzamento, Sushi */}
                    {whatsappMessages.slice(0, 3).map((item, index) => (
                      <button
                        key={index}
                        onClick={() => inviaRichiesta(item.message)}
                        className="px-2 py-3 h-[70px] flex items-center justify-center text-center rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-rose-400 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ))}
                    {/* Pulsante Regalino - apre popup con input */}
                    <button
                      onClick={() => setShowRegalino(true)}
                      className="px-2 py-3 h-[70px] flex items-center justify-center text-center rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-rose-400 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                    >
                      Richiedi Regalino
                    </button>
                    {/* Resto dei pulsanti */}
                    {whatsappMessages.slice(3).map((item, index) => (
                      <button
                        key={index + 3}
                        onClick={() => inviaRichiesta(item.message)}
                        className="px-2 py-3 h-[70px] flex items-center justify-center text-center rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-rose-400 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ))}
                    {/* Pulsante Chiedi scusa - mostra popup invece di WhatsApp */}
                    <button
                      onClick={() => { sendNotification('Roscetta ha provato a chiedere scusa... HAHAHA'); setShowScusaPopup(true); }}
                      className="px-2 py-3 h-[70px] flex items-center justify-center text-center rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-rose-400 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                    >
                      Chiedi Scusa
                    </button>
                    {/* Pulsante Messaggio Personalizzato - larghezza piena */}
                    <button
                      onClick={() => setShowMessaggioPersonalizzato(true)}
                      className="col-span-2 px-2 py-3 h-[70px] flex items-center justify-center text-center rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-rose-400 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                    >
                      Messaggio Personalizzato
                    </button>
                    {/* Pulsante Emergenza SOS - sempre visibile */}
                    <div className="col-span-2 flex flex-col items-center gap-3 mt-4 flex-shrink-0 min-h-[120px]">
                      <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full flex-shrink-0">
                        <span className="text-red-400 animate-pulse">⚠️</span>
                        <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
                          Attenzione: usare solo per le emergenze
                        </p>
                        <span className="text-red-400 animate-pulse">⚠️</span>
                      </div>
                      <button
                        onClick={() => { sendNotification('EMERGENZA: Roscetta ha bisogno di sapere quanto la ami!'); setShowLettera(true); }}
                        className="px-4 py-4 bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 rounded-2xl text-white font-bold text-base shadow-lg shadow-pink-500/50 hover:scale-105 hover:shadow-red-500/50 transition-all duration-300 animate-pulse cursor-pointer flex-shrink-0 text-center w-full max-w-xs"
                      >
                        Premi qui per ricordare quanto il Ricciolino ti ama
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
