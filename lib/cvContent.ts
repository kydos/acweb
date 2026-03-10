/**
 * Locale-specific overrides for CV content stored in siteConfig.
 * English (en) falls back to siteConfig directly — no override needed.
 */

interface CvLocaleOverride {
  researchProfile: string;
  researchInterests: string[];
  experience: Array<{ role: string; description: string }>;
  teaching: Array<{ role: string; note?: string; courses: string[] }>;
  education: Array<{ degree: string; location: string; note?: string }>;
  keyContributions: Array<{ title: string; period?: string; description: string }>;
  publicationTypes: Record<string, string>;
  standards: string[];
  openSourceRoles: string[];
  recognition: Array<{ year: string; award: string }>;
  skillDomains: string[];
}

// ── French ────────────────────────────────────────────────────────────────────
const fr: CvLocaleOverride = {
  researchProfile:
    "Le Dr Angelo Corsaro est un expert mondial des systèmes distribués à l'échelle d'Internet, avec plus de 25 ans de contributions couvrant la conception de protocoles, le middleware temps réel, les algorithmes de consensus et de synchronisation d'horloges, et le cloud vers le calcul en périphérie. Ses travaux ont eu un impact théorique profond (plus de 100 publications évaluées par des pairs, plus de 1 478 citations) et une portée industrielle transformatrice (plus de 10 normes internationales co-rédigées, plusieurs protocoles déployés dans des millions de systèmes critiques).",
  researchInterests: [
    "Algorithmes distribués : consensus, synchronisation d'horloges, ordonnancement causal, CRDTs",
    "Continuum de calcul cloud-périphérie-microcontrôleur : conception de protocoles, architectures orientées données",
    "Systèmes temps réel et critiques pour la sûreté : ordonnancement déterministe, sûreté mémoire, vérification formelle",
    "Stockage distribué et transfert de données à grande échelle : codage d'effacement, réplication géo-distribuée",
    "Réseaux haute performance : abstractions zéro surcharge, contournement du noyau, middleware basé sur RDMA",
    "Infrastructure distribuée native IA : apprentissage fédéré, inférence distribuée",
  ],
  experience: [
    {
      role: "PDG / DT & Co-Fondateur",
      description:
        "Co-fondé la société commercialisant Eclipse Zenoh. A conduit le protocole du prototype de recherche à la version de production (Zenoh 1.0, octobre 2024) au sein de la Fondation Eclipse. A dirigé toute la R&D, la stratégie technologique et les publications scientifiques. Sélectionné pour représenter la France à l'initiative Genius Minds 2024 (Business France / Choose France) à l'Ambassade de France à Londres.",
    },
    {
      role: "Directeur Technique",
      description:
        "A dirigé le Bureau des Technologies Avancées. A établi l'edge computing comme pilier stratégique de l'entreprise plusieurs années avant son adoption généralisée. A dirigé la veille technologique, la stratégie R&D et les activités de normalisation. Reconnu comme Power 200 : Leader le plus influent de l'économie des données (2019).",
    },
    {
      role: "Directeur Technique",
      description:
        "A transformé l'entreprise d'un fournisseur de niche de middleware aérospatial à un leader des plateformes IoT. A conçu Vortex, la première plateforme commerciale soutenant le cloud et le fog computing unifiés. A stimulé une croissance du chiffre d'affaires d'environ 75 %. Gartner Cool Vendor (2014).",
    },
    {
      role: "Responsable Stratégie Produit",
      description:
        "A conçu et exécuté une stratégie open source qui a entraîné une adoption massive par les utilisateurs et une expansion du marché.",
    },
    {
      role: "Chercheur en Technologies Logicielles",
      description:
        "Direction de la Planification Stratégique et Technologique. Responsable technique du Groupe de Recherche sur les Processeurs Multi-Cœurs de Finmeccanica. A présidé le comité scientifique du Laboratoire Logiciel de Finmeccanica. Co-encadrement de doctorants à La Sapienza, Rome.",
    },
    {
      role: "Architecte en Chef, R&D",
      description:
        "A conçu une plateforme middleware d'entreprise pour les systèmes de gestion critiques du contrôle du trafic aérien, aéroportés et navals. A dirigé une équipe internationale d'environ 50 ingénieurs.",
    },
  ],
  teaching: [
    {
      role: "Chargé de cours",
      note: "Membre de la Conférence des Grandes Écoles Françaises",
      courses: ["Internet des objets (IoT)", "Programmation fonctionnelle"],
    },
    {
      role: "Co-directeur de thèse",
      courses: ["Systèmes distribués, middleware temps réel, informatique tolérante aux pannes"],
    },
  ],
  education: [
    {
      degree: "Doctorat en Informatique",
      location: "Missouri, États-Unis",
      note: "Directeur de thèse : Prof. Douglas C. Schmidt. Thèse : Conception et performance d'un middleware Java temps réel compilé à l'avance.",
    },
    { degree: "Master en Informatique", location: "Missouri, États-Unis" },
    { degree: "Laurea en Génie Informatique", location: "Italie", note: "Magna cum laude" },
  ],
  keyContributions: [
    {
      title: "Eclipse Zenoh — Inventeur & Chef de Projet",
      period: "2015 – présent",
      description:
        "A inventé Zenoh, un protocole unifiant pub/sub, les requêtes géo-distribuées et le calcul sur le continuum complet cloud-microcontrôleur. 5 octets de surcharge fil, latence inférieure à 13 µs, débit de 50 Gbps, fonctionne sur 32 Ko de RAM. Sélectionné par le Comité de Direction Technique de ROS 2 comme alternative officielle à DDS. Adopté par General Motors (uProtocol), Bosch, Volvo, Foxconn et Volocopter. Recommandé par l'UIT pour les Systèmes de Transport Intelligents.",
    },
    {
      title: "Standard OMG Data Distribution Service (DDS)",
      description:
        "Co-président fondateur du Groupe d'Intérêt Spécial OMG DDS et architecte principal de la famille de standards DDS (DDS, DDSI-RTPS, DDS Security, DDS RPC, DDS4CCM, API C++ ISO DDS). DDS est le standard fondamental de pub/sub temps réel déployé dans des millions de systèmes critiques : contrôle du trafic aérien, gestion des combats navals, véhicules autonomes et dispositifs médicaux.",
    },
    {
      title: "Fog Computing : Standard IEEE 1934-2018",
      description:
        "A été pionnier du calcul en périphérie distribuée (initialement appelé « Fluid Computing ») avant que le terme « fog computing » soit inventé. A collaboré avec l'équipe Cisco, contribué à l'architecture de référence du Consortium OpenFog et créé Eclipse fog05 — la première infrastructure de fog computing entièrement décentralisée. L'architecture de référence a été adoptée comme Standard IEEE 1934-2018.",
    },
    {
      title: "Synchronisation d'Horloges Distribuée",
      description:
        "A inventé un algorithme entièrement distribué de synchronisation d'horloges internes basé sur la théorie du couplage, qui a atteint les marges d'erreur les plus faibles publiées à l'époque pour les systèmes dynamiques à grande échelle. Publié dans IEEE TPDS (2009) et déployé dans les systèmes tolérants aux pannes de Finmeccanica/SELEX-ES.",
    },
    {
      title: "Java Temps Réel : jRate & Algorithmes de Sûreté Mémoire",
      description:
        "A créé jRate, la première implémentation RTSJ open source compilée à l'avance, développée dans le cadre du programme DARPA PCES. Boeing a utilisé jRate pour prouver la faisabilité de Java Temps Réel pour les avioniques UAV critiques. A également inventé un algorithme en temps constant O(1) pour vérifier la sûreté des affectations de pointeurs dans les régions mémoire scopées — la première solution à ce problème fondamental de RTSJ.",
    },
  ],
  publicationTypes: { Journal: "Revue", Conference: "Conférence" },
  standards: [
    "OMG Data Distribution Service (DDS) v1.0–1.4 — Co-Président Fondateur (2004–2015)",
    "OMG DDSI-RTPS (protocole fil d'interopérabilité) v2.x — Contributeur",
    "OMG DDS Security, DDS RPC, DDS4CCM — Co-auteur",
    "API C++ ISO DDS (SimD) — Auteur principal ; adopté comme standard OMG",
    "Architecture de Référence du Consortium OpenFog — Contributeur clé ; adoptée comme Standard IEEE 1934-2018",
  ],
  openSourceRoles: [
    "Inventeur & chef de projet",
    "Co-responsable",
    "Créateur & chef de projet",
    "Créateur — première implémentation RTSJ open source compilée à l'avance",
    "Auteur unique — API C++ ISO DDS (adopté comme standard OMG)",
  ],
  recognition: [
    { year: "2024", award: "PDG Technologique de l'Année" },
    { year: "2024", award: "Meilleure Plateforme du Continuum Cloud-Appareil" },
    { year: "2024", award: "Genius Minds 2024 — Sélectionné pour représenter la France, Ambassade de France à Londres" },
    { year: "2023–24", award: "Top 10 des Startups V2X à Surveiller" },
    { year: "2023", award: "Finaliste Spring50 — Paris-Saclay SPRING (ZettaScale)" },
    { year: "2019", award: "Power 200 : Leaders les Plus Influents de l'Économie des Données dans le Monde" },
    { year: "2018", award: "Prix Compass Intelligence : Meilleure Entreprise M2M & IoT" },
    { year: "2017–18", award: "Top 50 des Cadres les Plus Influents dans l'Edge Computing" },
    { year: "2014", award: "Gartner Cool Vendor" },
    { year: "En cours", award: "Membre Senior IEEE | Membre ACM | Membre du Conseil d'Administration de la Fondation Eclipse" },
  ],
  skillDomains: ["Systèmes Distribués", "Edge & Fog Computing", "IoT", "Robotique (ROS 2)", "Systèmes Temps Réel", "Automobile (V2X)"],
};

// ── Italian ───────────────────────────────────────────────────────────────────
const it: CvLocaleOverride = {
  researchProfile:
    "Il Dr. Angelo Corsaro è un esperto mondiale nei sistemi distribuiti su scala Internet, con oltre 25 anni di contributi che spaziano dalla progettazione di protocolli, al middleware in tempo reale, agli algoritmi di consenso e sincronizzazione degli orologi, fino al cloud verso il calcolo in periferia. Il suo lavoro ha avuto sia un profondo impatto teorico (oltre 100 pubblicazioni peer-reviewed, oltre 1.478 citazioni) sia una portata industriale trasformativa (oltre 10 standard internazionali co-redatti, diversi protocolli distribuiti in milioni di sistemi mission-critical).",
  researchInterests: [
    "Algoritmi distribuiti: consenso, sincronizzazione degli orologi, ordinamento causale, CRDT",
    "Continuum di calcolo cloud-edge-microcontrollore: progettazione di protocolli, architetture data-centric",
    "Sistemi in tempo reale e safety-critical: scheduling deterministico, sicurezza della memoria, verifica formale",
    "Storage distribuito e trasferimento dati su larga scala: erasure coding, replicazione geo-distribuita",
    "Networking ad alte prestazioni: astrazioni zero-overhead, kernel bypass, middleware basato su RDMA",
    "Infrastruttura distribuita nativa AI: federated learning, inferenza distribuita",
  ],
  experience: [
    {
      role: "CEO / CTO & Co-Fondatore",
      description:
        "Co-fondato l'azienda che commercializza Eclipse Zenoh. Ha condotto il protocollo dal prototipo di ricerca alla versione di produzione (Zenoh 1.0, ottobre 2024) all'interno della Eclipse Foundation. Ha diretto tutta la R&S, la strategia tecnologica e le pubblicazioni scientifiche. Selezionato per rappresentare la Francia all'iniziativa Genius Minds 2024 (Business France / Choose France) presso l'Ambasciata Francese a Londra.",
    },
    {
      role: "Direttore Tecnico",
      description:
        "Ha diretto l'Ufficio delle Tecnologie Avanzate. Ha stabilito l'edge computing come pilastro strategico aziendale anni prima dell'adozione mainstream. Ha diretto la ricognizione tecnologica, la strategia R&S e le attività di standardizzazione. Riconosciuto come Power 200: Leader più influente dell'economia dei dati (2019).",
    },
    {
      role: "Direttore Tecnico",
      description:
        "Ha trasformato l'azienda da fornitore di nicchia di middleware aerospaziale a leader delle piattaforme IoT. Ha progettato Vortex, la prima piattaforma commerciale che supporta cloud e fog computing unificati. Ha guidato una crescita dei ricavi di circa il 75%. Gartner Cool Vendor (2014).",
    },
    {
      role: "Responsabile Strategia di Prodotto",
      description:
        "Ha ideato ed eseguito una strategia open source che ha guidato una massiccia adozione degli utenti e l'espansione del mercato.",
    },
    {
      role: "Ricercatore in Tecnologie Software",
      description:
        "Direzione della Pianificazione Strategica e Tecnologica. Responsabile tecnico del Gruppo di Ricerca sui Processori Multi-Core di Finmeccanica. Ha presieduto il comitato scientifico del Laboratorio Software di Finmeccanica. Co-supervisione di dottorandi presso La Sapienza, Roma.",
    },
    {
      role: "Architetto Capo, R&S",
      description:
        "Ha progettato una piattaforma middleware enterprise per sistemi mission-critical di controllo del traffico aereo, aeronautici e navali. Ha guidato un team internazionale di circa 50 ingegneri.",
    },
  ],
  teaching: [
    {
      role: "Docente",
      note: "Membro della Conférence des Grandes Écoles Françaises",
      courses: ["Internet of Things (IoT)", "Programmazione Funzionale"],
    },
    {
      role: "Co-Supervisore di Dottorato",
      courses: ["Sistemi distribuiti, middleware in tempo reale, informatica fault-tolerant"],
    },
  ],
  education: [
    {
      degree: "Dottorato in Informatica",
      location: "Missouri, USA",
      note: "Supervisore: Prof. Douglas C. Schmidt. Tesi: Progettazione e performance di un middleware Java in tempo reale compilato ahead-of-time.",
    },
    { degree: "Master in Informatica", location: "Missouri, USA" },
    { degree: "Laurea in Ingegneria Informatica", location: "Italia", note: "Magna cum laude" },
  ],
  keyContributions: [
    {
      title: "Eclipse Zenoh — Inventore & Responsabile del Progetto",
      period: "2015 – presente",
      description:
        "Ha inventato Zenoh, un protocollo che unifica pub/sub, query geo-distribuite e computazione sull'intero continuum cloud-microcontrollore. 5 byte di overhead wire, latenza inferiore a 13 µs, throughput di 50 Gbps, funziona su 32 KB di RAM. Selezionato dal Comitato Direttivo Tecnico di ROS 2 come alternativa ufficiale a DDS. Adottato da General Motors (uProtocol), Bosch, Volvo, Foxconn e Volocopter. Raccomandato dall'ITU per i Sistemi di Trasporto Intelligenti.",
    },
    {
      title: "Standard OMG Data Distribution Service (DDS)",
      description:
        "Co-presidente fondatore del Gruppo di Interesse Speciale OMG DDS e principale architetto della famiglia di standard DDS (DDS, DDSI-RTPS, DDS Security, DDS RPC, DDS4CCM, API C++ ISO DDS). DDS è lo standard fondamentale di pub/sub in tempo reale distribuito in milioni di sistemi mission-critical: controllo del traffico aereo, gestione dei combattimenti navali, veicoli autonomi e dispositivi medici.",
    },
    {
      title: "Fog Computing: Standard IEEE 1934-2018",
      description:
        "Pioniere del calcolo edge distribuito (originariamente denominato 'Fluid Computing') prima che il termine 'fog computing' fosse coniato. Ha collaborato con il team Cisco, contribuito all'architettura di riferimento del Consorzio OpenFog e creato Eclipse fog05 — la prima infrastruttura di fog computing completamente decentralizzata. L'architettura di riferimento è stata adottata come Standard IEEE 1934-2018.",
    },
    {
      title: "Sincronizzazione degli Orologi Distribuita",
      description:
        "Ha inventato un algoritmo completamente distribuito di sincronizzazione degli orologi interni basato sulla teoria del coupling, che ha raggiunto i margini di errore più bassi pubblicati all'epoca per sistemi dinamici su larga scala. Pubblicato in IEEE TPDS (2009) e distribuito nei sistemi fault-tolerant di Finmeccanica/SELEX-ES.",
    },
    {
      title: "Java in Tempo Reale: jRate & Algoritmi di Sicurezza della Memoria",
      description:
        "Ha creato jRate, la prima implementazione RTSJ open source compilata ahead-of-time, sviluppata nell'ambito del programma DARPA PCES. Boeing ha utilizzato jRate per dimostrare la fattibilità di Java in tempo reale per le avioniche UAV critiche. Ha anche inventato un algoritmo a tempo costante O(1) per verificare la sicurezza delle assegnazioni di puntatori nelle regioni di memoria scopate — la prima soluzione a questo fondamentale problema RTSJ.",
    },
  ],
  publicationTypes: { Journal: "Rivista", Conference: "Conferenza" },
  standards: [
    "OMG Data Distribution Service (DDS) v1.0–1.4 — Co-Presidente Fondatore (2004–2015)",
    "OMG DDSI-RTPS (protocollo wire di interoperabilità) v2.x — Contributore",
    "OMG DDS Security, DDS RPC, DDS4CCM — Co-autore",
    "API C++ ISO DDS (SimD) — Autore principale; adottato come standard OMG",
    "Architettura di Riferimento del Consorzio OpenFog — Contributore chiave; adottata come Standard IEEE 1934-2018",
  ],
  openSourceRoles: [
    "Inventore & responsabile del progetto",
    "Co-responsabile",
    "Creatore & responsabile del progetto",
    "Creatore — prima implementazione RTSJ open source compilata ahead-of-time",
    "Autore unico — API C++ ISO DDS (adottata come standard OMG)",
  ],
  recognition: [
    { year: "2024", award: "CEO Tecnologico dell'Anno" },
    { year: "2024", award: "Migliore Piattaforma del Continuum Cloud-Dispositivo" },
    { year: "2024", award: "Genius Minds 2024 — Selezionato per rappresentare la Francia, Ambasciata Francese a Londra" },
    { year: "2023–24", award: "Top 10 V2X Startup da Seguire" },
    { year: "2023", award: "Finalista Spring50 — Paris-Saclay SPRING (ZettaScale)" },
    { year: "2019", award: "Power 200: i Leader più Influenti dell'Economia dei Dati nel Mondo" },
    { year: "2018", award: "Premio Compass Intelligence: Migliore Azienda M2M & IoT" },
    { year: "2017–18", award: "Top 50 dei Dirigenti più Influenti nell'Edge Computing" },
    { year: "2014", award: "Gartner Cool Vendor" },
    { year: "In corso", award: "Membro Senior IEEE | Membro ACM | Membro del Consiglio di Fondazione Eclipse" },
  ],
  skillDomains: ["Sistemi Distribuiti", "Edge & Fog Computing", "IoT", "Robotica (ROS 2)", "Sistemi in Tempo Reale", "Automotive (V2X)"],
};

// ── Spanish ───────────────────────────────────────────────────────────────────
const es: CvLocaleOverride = {
  researchProfile:
    "El Dr. Angelo Corsaro es un experto mundial en sistemas distribuidos a escala de Internet, con más de 25 años de contribuciones que abarcan el diseño de protocolos, middleware en tiempo real, algoritmos de consenso y sincronización de relojes, y la computación desde la nube hasta el borde. Su trabajo ha tenido tanto un profundo impacto teórico (más de 100 publicaciones revisadas por pares, más de 1.478 citas) como un alcance industrial transformador (más de 10 normas internacionales co-redactadas, múltiples protocolos desplegados en millones de sistemas de misión crítica).",
  researchInterests: [
    "Algoritmos distribuidos: consenso, sincronización de relojes, ordenación causal, CRDTs",
    "Continuum de computación cloud-borde-microcontrolador: diseño de protocolos, arquitecturas centradas en datos",
    "Sistemas en tiempo real y de seguridad crítica: planificación determinista, seguridad de memoria, verificación formal",
    "Almacenamiento distribuido y transferencia de datos a gran escala: codificación de borrado, replicación geo-distribuida",
    "Redes de alto rendimiento: abstracciones de cero sobrecarga, bypass del kernel, middleware basado en RDMA",
    "Infraestructura distribuida nativa de IA: aprendizaje federado, inferencia distribuida",
  ],
  experience: [
    {
      role: "CEO / CTO & Co-Fundador",
      description:
        "Co-fundó la empresa que comercializa Eclipse Zenoh. Llevó el protocolo desde un prototipo de investigación hasta su lanzamiento de producción (Zenoh 1.0, octubre 2024) dentro de la Eclipse Foundation. Dirigió toda la I+D, la estrategia tecnológica y las publicaciones científicas. Seleccionado para representar a Francia en la iniciativa Genius Minds 2024 (Business France / Choose France) en la Embajada Francesa en Londres.",
    },
    {
      role: "Director de Tecnología",
      description:
        "Dirigió la Oficina de Tecnología Avanzada. Estableció el edge computing como pilar estratégico corporativo años antes de su adopción generalizada. Dirigió la exploración tecnológica, la estrategia de I+D y las actividades de normalización. Reconocido como Power 200: Líder más influyente de la economía de datos (2019).",
    },
    {
      role: "Director de Tecnología",
      description:
        "Transformó la empresa de un proveedor de nicho de middleware aeroespacial a un líder en plataformas IoT. Diseñó Vortex, la primera plataforma comercial con soporte unificado para cloud y fog computing. Impulsó un crecimiento de ingresos de aproximadamente el 75%. Gartner Cool Vendor (2014).",
    },
    {
      role: "Responsable de Estrategia de Producto",
      description:
        "Diseñó y ejecutó una estrategia de código abierto que impulsó una adopción masiva de usuarios y la expansión del mercado.",
    },
    {
      role: "Científico de Tecnologías Software",
      description:
        "Dirección de Planificación Estratégica y Tecnológica. Director técnico del Grupo de Investigación de Procesadores Multi-Core de Finmeccanica. Presidió el comité científico del Laboratorio de Software de Finmeccanica. Co-supervisión de doctorandos en La Sapienza, Roma.",
    },
    {
      role: "Arquitecto Jefe, I+D",
      description:
        "Diseñó una plataforma middleware empresarial para sistemas críticos de gestión del control de tráfico aéreo, sistemas aerotransportados y navales. Dirigió un equipo internacional de aproximadamente 50 ingenieros.",
    },
  ],
  teaching: [
    {
      role: "Profesor",
      note: "Miembro de la Conférence des Grandes Écoles Françaises",
      courses: ["Internet de las cosas (IoT)", "Programación funcional"],
    },
    {
      role: "Co-Director de Tesis Doctoral",
      courses: ["Sistemas distribuidos, middleware en tiempo real, computación tolerante a fallos"],
    },
  ],
  education: [
    {
      degree: "Doctorado en Informática",
      location: "Missouri, EE. UU.",
      note: "Director: Prof. Douglas C. Schmidt. Tesis: Diseño y rendimiento de un middleware Java en tiempo real compilado ahead-of-time.",
    },
    { degree: "Máster en Informática", location: "Missouri, EE. UU." },
    { degree: "Laurea en Ingeniería Informática", location: "Italia", note: "Magna cum laude" },
  ],
  keyContributions: [
    {
      title: "Eclipse Zenoh — Inventor & Responsable del Proyecto",
      period: "2015 – presente",
      description:
        "Inventó Zenoh, un protocolo que unifica pub/sub, consultas geo-distribuidas y computación en todo el continuum cloud-microcontrolador. 5 bytes de sobrecarga wire, latencia inferior a 13 µs, rendimiento de 50 Gbps, funciona con 32 KB de RAM. Seleccionado por el Comité Directivo Técnico de ROS 2 como alternativa oficial a DDS. Adoptado por General Motors (uProtocol), Bosch, Volvo, Foxconn y Volocopter. Recomendado por la UIT para los Sistemas de Transporte Inteligentes.",
    },
    {
      title: "Estándar OMG Data Distribution Service (DDS)",
      description:
        "Co-presidente fundador del Grupo de Interés Especial OMG DDS y arquitecto principal de la familia de estándares DDS (DDS, DDSI-RTPS, DDS Security, DDS RPC, DDS4CCM, API C++ ISO DDS). DDS es el estándar fundamental de pub/sub en tiempo real desplegado en millones de sistemas de misión crítica: control de tráfico aéreo, gestión de combate naval, vehículos autónomos y dispositivos médicos.",
    },
    {
      title: "Fog Computing: Estándar IEEE 1934-2018",
      description:
        "Pionero en computación edge distribuida (originalmente denominada 'Fluid Computing') antes de que se acuñara el término 'fog computing'. Colaboró con el equipo de Cisco, contribuyó a la arquitectura de referencia del Consorcio OpenFog y creó Eclipse fog05 — la primera infraestructura de fog computing completamente descentralizada. La arquitectura de referencia fue adoptada como Estándar IEEE 1934-2018.",
    },
    {
      title: "Sincronización Distribuida de Relojes",
      description:
        "Inventó un algoritmo completamente distribuido de sincronización interna de relojes basado en la teoría del acoplamiento, que logró los menores márgenes de error publicados en su momento para sistemas dinámicos a gran escala. Publicado en IEEE TPDS (2009) y desplegado en sistemas tolerantes a fallos de Finmeccanica/SELEX-ES.",
    },
    {
      title: "Java en Tiempo Real: jRate & Algoritmos de Seguridad de Memoria",
      description:
        "Creó jRate, la primera implementación RTSJ de código abierto compilada ahead-of-time, desarrollada bajo el programa DARPA PCES. Boeing utilizó jRate para demostrar la viabilidad de Java en tiempo real para aviónica UAV de vuelo crítico. También inventó un algoritmo de tiempo constante O(1) para verificar la seguridad de asignación de punteros en regiones de memoria con alcance — la primera solución a este problema fundamental de RTSJ.",
    },
  ],
  publicationTypes: { Journal: "Revista", Conference: "Conferencia" },
  standards: [
    "OMG Data Distribution Service (DDS) v1.0–1.4 — Co-Presidente Fundador (2004–2015)",
    "OMG DDSI-RTPS (protocolo wire de interoperabilidad) v2.x — Colaborador",
    "OMG DDS Security, DDS RPC, DDS4CCM — Co-autor",
    "API C++ ISO DDS (SimD) — Autor principal; adoptado como estándar OMG",
    "Arquitectura de Referencia del Consorcio OpenFog — Colaborador clave; adoptada como Estándar IEEE 1934-2018",
  ],
  openSourceRoles: [
    "Inventor & responsable del proyecto",
    "Co-responsable",
    "Creador & responsable del proyecto",
    "Creador — primera implementación RTSJ de código abierto compilada ahead-of-time",
    "Autor único — API C++ ISO DDS (adoptada como estándar OMG)",
  ],
  recognition: [
    { year: "2024", award: "CEO Tecnológico del Año" },
    { year: "2024", award: "Mejor Plataforma del Continuum Cloud-Dispositivo" },
    { year: "2024", award: "Genius Minds 2024 — Seleccionado para representar a Francia, Embajada de Francia en Londres" },
    { year: "2023–24", award: "Top 10 Startups V2X a Seguir" },
    { year: "2023", award: "Finalista Spring50 — Paris-Saclay SPRING (ZettaScale)" },
    { year: "2019", award: "Power 200: Líderes más Influyentes de la Economía de Datos del Mundo" },
    { year: "2018", award: "Premio Compass Intelligence: Mejor Empresa M2M & IoT" },
    { year: "2017–18", award: "Top 50 Ejecutivos más Influyentes en Edge Computing" },
    { year: "2014", award: "Gartner Cool Vendor" },
    { year: "En curso", award: "Miembro Senior IEEE | Miembro ACM | Miembro del Consejo de la Fundación Eclipse" },
  ],
  skillDomains: ["Sistemas Distribuidos", "Edge & Fog Computing", "IoT", "Robótica (ROS 2)", "Sistemas en Tiempo Real", "Automoción (V2X)"],
};

// ── Korean ────────────────────────────────────────────────────────────────────
const ko: CvLocaleOverride = {
  researchProfile:
    "Angelo Corsaro 박사는 인터넷 규모의 분산 시스템 분야의 세계 최고 전문가로, 프로토콜 설계, 실시간 미들웨어, 합의 및 시계 동기화 알고리즘, 클라우드에서 엣지까지의 컴퓨팅에 걸친 25년 이상의 기여를 보유하고 있습니다. 그의 연구는 깊은 이론적 영향(100편 이상의 동료 심사 논문, 1,478건 이상의 인용)과 혁신적인 산업적 성과(10개 이상의 국제 표준 공동 작성, 수백만 개의 미션 크리티컬 시스템에 배포된 다수의 프로토콜)를 모두 달성했습니다.",
  researchInterests: [
    "분산 알고리즘: 합의, 시계 동기화, 인과 순서 결정, CRDT",
    "클라우드-엣지-마이크로컨트롤러 컴퓨팅 연속체: 프로토콜 설계, 데이터 중심 아키텍처",
    "실시간 및 안전 필수 시스템: 결정론적 스케줄링, 메모리 안전성, 형식 검증",
    "분산 스토리지 및 대규모 데이터 전송: 이레이저 코딩, 지리적 분산 복제",
    "고성능 네트워킹: 제로 오버헤드 추상화, 커널 바이패스, RDMA 기반 미들웨어",
    "AI 네이티브 분산 인프라: 연합 학습, 분산 추론",
  ],
  experience: [
    {
      role: "CEO / CTO & 공동 창업자",
      description:
        "Eclipse Zenoh를 상용화하는 회사를 공동 창업했습니다. Eclipse Foundation 내에서 프로토콜을 연구 프로토타입에서 프로덕션 릴리스(Zenoh 1.0, 2024년 10월)까지 이끌었습니다. 모든 R&D, 기술 전략 및 과학 출판물을 총괄했습니다. 런던 프랑스 대사관에서 열린 Genius Minds 2024 이니셔티브(Business France / Choose France)에서 프랑스를 대표하도록 선발되었습니다.",
    },
    {
      role: "최고 기술 책임자",
      description:
        "고급 기술 사무소를 이끌었습니다. 주류 채택보다 수년 앞서 엣지 컴퓨팅을 핵심 전략적 기업 기반으로 확립했습니다. 기술 탐색, R&D 전략 및 표준화 활동을 지휘했습니다. Power 200: 가장 영향력 있는 데이터 경제 리더(2019)로 선정되었습니다.",
    },
    {
      role: "최고 기술 책임자",
      description:
        "틈새 항공우주 미들웨어 공급업체에서 IoT 플랫폼 리더로 회사를 변모시켰습니다. 통합 클라우드 및 포그 컴퓨팅을 지원하는 최초의 상용 플랫폼인 Vortex를 설계했습니다. 약 75%의 매출 성장을 이끌었습니다. Gartner Cool Vendor(2014).",
    },
    {
      role: "제품 전략 관리자",
      description:
        "대규모 사용자 채택과 시장 확장을 이끈 오픈 소스 전략을 수립하고 실행했습니다.",
    },
    {
      role: "소프트웨어 기술 과학자",
      description:
        "전략 및 기술 기획 이사회. Finmeccanica 멀티코어 프로세서 연구 그룹의 기술 관리자. Finmeccanica 소프트웨어 연구소의 과학 위원회를 주재했습니다. 로마 La Sapienza에서 박사 과정생을 공동 지도했습니다.",
    },
    {
      role: "수석 아키텍트, R&D",
      description:
        "항공 교통 관제, 항공기 탑재 및 해군 전투 관리 시스템을 위한 미션 크리티컬 엔터프라이즈 미들웨어 플랫폼을 설계했습니다. 약 50명의 엔지니어로 구성된 국제팀을 이끌었습니다.",
    },
  ],
  teaching: [
    {
      role: "강사",
      note: "Conférence des Grandes Écoles Françaises 회원",
      courses: ["사물 인터넷 (IoT)", "함수형 프로그래밍"],
    },
    {
      role: "박사 공동 지도교수",
      courses: ["분산 시스템, 실시간 미들웨어, 결함 허용 컴퓨팅"],
    },
  ],
  education: [
    {
      degree: "컴퓨터 과학 박사",
      location: "미주리, 미국",
      note: "지도교수: Douglas C. Schmidt 교수. 논문: 사전 컴파일된 실시간 Java 미들웨어의 설계와 성능.",
    },
    { degree: "컴퓨터 과학 석사", location: "미주리, 미국" },
    { degree: "컴퓨터 공학 학사 (Laurea)", location: "이탈리아", note: "최우등 졸업" },
  ],
  keyContributions: [
    {
      title: "Eclipse Zenoh — 발명가 & 프로젝트 리드",
      period: "2015 – 현재",
      description:
        "클라우드-마이크로컨트롤러 전체 연속체에서 pub/sub, 지리적 분산 쿼리 및 컴퓨팅을 통합하는 프로토콜 Zenoh를 발명했습니다. 5바이트 와이어 오버헤드, 13µs 미만의 지연 시간, 50Gbps 처리량, 32KB RAM에서 실행. ROS 2 기술 운영 위원회에서 공식 DDS 대안으로 선정. General Motors(uProtocol), Bosch, Volvo, Foxconn 및 Volocopter가 채택. ITU가 지능형 교통 시스템에 권장.",
    },
    {
      title: "OMG 데이터 배포 서비스(DDS) 표준",
      description:
        "OMG DDS 특별 관심 그룹의 공동 창립 의장이자 DDS 표준 계열(DDS, DDSI-RTPS, DDS Security, DDS RPC, DDS4CCM, ISO C++ DDS API)의 주요 설계자. DDS는 항공 교통 관제, 해군 전투 관리, 자율 주행 차량 및 의료 기기 등 수백만 개의 미션 크리티컬 시스템에 배포된 근본적인 실시간 pub/sub 표준입니다.",
    },
    {
      title: "포그 컴퓨팅: IEEE 표준 1934-2018",
      description:
        "'포그 컴퓨팅'이라는 용어가 만들어지기 전에 분산 엣지 컴퓨팅(원래 'Fluid Computing'이라 불림)을 개척했습니다. Cisco 팀과 협력하여 OpenFog 컨소시엄 참조 아키텍처에 기여하고 최초의 완전 분산 포그 컴퓨팅 인프라인 Eclipse fog05를 만들었습니다. 참조 아키텍처는 IEEE 표준 1934-2018로 채택되었습니다.",
    },
    {
      title: "분산 시계 동기화",
      description:
        "동적 대규모 시스템에 대해 당시 발표된 가장 낮은 오차 범위를 달성한 결합 이론 기반의 완전 분산 내부 시계 동기화 알고리즘을 발명했습니다. IEEE TPDS(2009)에 게재되었으며 Finmeccanica/SELEX-ES 결함 허용 시스템에 배포되었습니다.",
    },
    {
      title: "실시간 Java: jRate & 메모리 안전성 알고리즘",
      description:
        "DARPA PCES 프로그램 하에 개발된 최초의 오픈 소스 사전 컴파일 RTSJ 구현체인 jRate를 만들었습니다. Boeing은 jRate를 사용하여 비행 필수 UAV 항공전자 장비에 실시간 Java의 실현 가능성을 입증했습니다. 또한 스코프 메모리 영역의 포인터 할당 안전성을 검증하는 상수 시간 O(1) 알고리즘을 발명했습니다 — 이 근본적인 RTSJ 문제에 대한 최초의 해결책.",
    },
  ],
  publicationTypes: { Journal: "학술지", Conference: "학회" },
  standards: [
    "OMG 데이터 배포 서비스(DDS) v1.0–1.4 — 공동 창립 의장 (2004–2015)",
    "OMG DDSI-RTPS (상호 운용성 와이어 프로토콜) v2.x — 기여자",
    "OMG DDS Security, DDS RPC, DDS4CCM — 공동 저자",
    "ISO C++ DDS API (SimD) — 주저자; OMG 표준으로 채택됨",
    "OpenFog 컨소시엄 참조 아키텍처 — 핵심 기여자; IEEE 표준 1934-2018로 채택됨",
  ],
  openSourceRoles: [
    "발명가 & 프로젝트 리드",
    "공동 책임자",
    "창작자 & 프로젝트 리드",
    "창작자 — 최초의 오픈 소스 사전 컴파일 RTSJ 구현체",
    "단독 저자 — ISO C++ DDS API (OMG 표준으로 채택됨)",
  ],
  recognition: [
    { year: "2024", award: "기술 CEO 올해의 인물" },
    { year: "2024", award: "최고 클라우드-디바이스 연속체 플랫폼 상" },
    { year: "2024", award: "Genius Minds 2024 — 프랑스 대표 선정, 런던 프랑스 대사관" },
    { year: "2023–24", award: "주목해야 할 V2X 스타트업 Top 10" },
    { year: "2023", award: "Spring50 파이널리스트 — 파리-사클레 SPRING (ZettaScale)" },
    { year: "2019", award: "Power 200: 세계에서 가장 영향력 있는 데이터 경제 리더" },
    { year: "2018", award: "Compass Intelligence 상: 최고 M2M & IoT 기업" },
    { year: "2017–18", award: "엣지 컴퓨팅에서 가장 영향력 있는 임원 Top 50" },
    { year: "2014", award: "Gartner Cool Vendor" },
    { year: "현재", award: "IEEE 시니어 회원 | ACM 회원 | Eclipse 재단 이사회 이사" },
  ],
  skillDomains: ["분산 시스템", "엣지 & 포그 컴퓨팅", "IoT", "로보틱스 (ROS 2)", "실시간 시스템", "자동차 (V2X)"],
};

// ── Japanese ──────────────────────────────────────────────────────────────────
const ja: CvLocaleOverride = {
  researchProfile:
    "Angelo Corsaro博士はインターネット規模の分散システムの世界的権威であり、プロトコル設計、リアルタイムミドルウェア、合意アルゴリズムと時刻同期アルゴリズム、クラウドからエッジへのコンピューティングにわたる25年以上の貢献を有します。その研究は深い理論的影響（100本以上の査読付き論文、1,478件以上の被引用数）と変革的な産業への波及効果（10件以上の国際標準の共同執筆、数百万のミッションクリティカルシステムに展開された複数のプロトコル）を兼ね備えています。",
  researchInterests: [
    "分散アルゴリズム：合意、時刻同期、因果順序、CRDT",
    "クラウド-エッジ-マイクロコントローラコンピューティング連続体：プロトコル設計、データ中心アーキテクチャ",
    "リアルタイム・セーフティクリティカルシステム：決定論的スケジューリング、メモリ安全性、形式検証",
    "分散ストレージと大規模データ転送：消失訂正符号、地理的分散レプリケーション",
    "高性能ネットワーキング：ゼロオーバーヘッド抽象化、カーネルバイパス、RDMAベースミドルウェア",
    "AIネイティブ分散インフラ：連合学習、分散推論",
  ],
  experience: [
    {
      role: "CEO / CTO & 共同創業者",
      description:
        "Eclipse Zenohを商業化する会社を共同設立。Eclipse Foundation内でプロトコルを研究プロトタイプから本番リリース（Zenoh 1.0、2024年10月）まで主導。R&D全般、技術戦略、科学的出版物を統括。ロンドンのフランス大使館でのGenius Minds 2024イニシアチブ（Business France / Choose France）においてフランスを代表する人物として選出。",
    },
    {
      role: "最高技術責任者",
      description:
        "先端技術室を率いた。主流採用の数年前からエッジコンピューティングを戦略的企業の柱として確立。技術スカウティング、R&D戦略、標準化活動を指揮。Power 200：最も影響力のあるデータ経済リーダー（2019年）として表彰。",
    },
    {
      role: "最高技術責任者",
      description:
        "ニッチな航空宇宙ミドルウェアベンダーからIoTプラットフォームリーダーへと会社を変革。統合クラウドとフォグコンピューティングをサポートする初の商用プラットフォームVortexを設計。売上成長約75%を牽引。Gartner Cool Vendor（2014年）。",
    },
    {
      role: "製品戦略マネージャー",
      description:
        "大規模なユーザー採用と市場拡大を促進したオープンソース戦略を立案・実行。",
    },
    {
      role: "ソフトウェア技術研究者",
      description:
        "戦略技術計画局所属。Finmeccanicaマルチコアプロセッサ研究グループの技術責任者。Finmeccanicaソフトウェア研究所の科学委員会を主宰。ローマのLa Sapienzaで博士課程学生を共同指導。",
    },
    {
      role: "チーフアーキテクト、R&D",
      description:
        "航空交通管制、航空機搭載、海上戦闘管理システム向けのミッションクリティカルなエンタープライズミドルウェアプラットフォームを設計。約50名のエンジニアからなる国際チームを率いた。",
    },
  ],
  teaching: [
    {
      role: "講師",
      note: "Conférence des Grandes Écoles Françaises会員",
      courses: ["モノのインターネット（IoT）", "関数型プログラミング"],
    },
    {
      role: "博士課程共同指導教員",
      courses: ["分散システム、リアルタイムミドルウェア、耐障害コンピューティング"],
    },
  ],
  education: [
    {
      degree: "情報科学博士",
      location: "ミズーリ州、アメリカ",
      note: "指導教員：Douglas C. Schmidt教授。論文：事前コンパイル型リアルタイムJavaミドルウェアの設計と性能。",
    },
    { degree: "情報科学修士", location: "ミズーリ州、アメリカ" },
    { degree: "コンピュータ工学学士（Laurea）", location: "イタリア", note: "最優秀卒業" },
  ],
  keyContributions: [
    {
      title: "Eclipse Zenoh — 発明者 & プロジェクトリード",
      period: "2015 – 現在",
      description:
        "クラウドからマイクロコントローラまでの全連続体にわたってpub/sub、地理分散クエリ、計算を統合するプロトコルZenohを発明。5バイトのワイヤオーバーヘッド、13µs未満のレイテンシ、50Gbpsスループット、32KB RAMで動作。ROS 2技術運営委員会により公式DDS代替として選定。General Motors（uProtocol）、Bosch、Volvo、Foxconn、Volocopterに採用。ITUが高度道路交通システムに推奨。",
    },
    {
      title: "OMG データ配布サービス（DDS）標準",
      description:
        "OMG DDS特別利益グループの共同設立議長であり、DDS標準ファミリー（DDS、DDSI-RTPS、DDS Security、DDS RPC、DDS4CCM、ISO C++ DDS API）の主要設計者。DDSは航空交通管制、海上戦闘管理、自律型車両、医療機器など数百万のミッションクリティカルシステムに展開されているリアルタイムpub/subの基盤標準。",
    },
    {
      title: "フォグコンピューティング：IEEE標準1934-2018",
      description:
        "「フォグコンピューティング」という用語が作られる前から分散エッジコンピューティング（当初は「Fluid Computing」と呼ばれた）のパイオニア。Ciscoチームと協力し、OpenFogコンソーシアム参照アーキテクチャに貢献、初の完全分散フォグコンピューティングインフラEclipse fog05を作成。参照アーキテクチャはIEEE標準1934-2018として採用。",
    },
    {
      title: "分散クロック同期",
      description:
        "結合理論に基づく完全分散型内部クロック同期アルゴリズムを発明し、動的大規模システムで当時発表された最低の誤差限界を達成。IEEE TPDS（2009年）に掲載、Finmeccanica/SELEX-ESの耐障害システムに展開。",
    },
    {
      title: "リアルタイムJava：jRate & メモリ安全性アルゴリズム",
      description:
        "DARPA PCESプログラムの下で開発された最初のオープンソース事前コンパイルRTSJ実装jRateを作成。Boeingはjrateを使用して飛行クリティカルUAVアビオニクスへのリアルタイムJavaの実現可能性を証明。スコープメモリ領域でのポインタ割り当て安全性を検証する定数時間O(1)アルゴリズムも発明 — この根本的なRTSJ問題への最初の解決策。",
    },
  ],
  publicationTypes: { Journal: "学術誌", Conference: "国際会議" },
  standards: [
    "OMG データ配布サービス（DDS）v1.0–1.4 — 共同設立議長（2004–2015）",
    "OMG DDSI-RTPS（相互運用性ワイヤプロトコル）v2.x — 貢献者",
    "OMG DDS Security、DDS RPC、DDS4CCM — 共同著者",
    "ISO C++ DDS API（SimD）— 主著者；OMG標準として採用",
    "OpenFogコンソーシアム参照アーキテクチャ — 主要貢献者；IEEE標準1934-2018として採用",
  ],
  openSourceRoles: [
    "発明者 & プロジェクトリード",
    "共同リード",
    "作成者 & プロジェクトリード",
    "作成者 — 初のオープンソース事前コンパイルRTSJ実装",
    "単独著者 — ISO C++ DDS API（OMG標準として採用）",
  ],
  recognition: [
    { year: "2024", award: "テクノロジーCEO・オブ・ザ・イヤー" },
    { year: "2024", award: "最優秀クラウドからデバイスへの連続体プラットフォーム賞" },
    { year: "2024", award: "Genius Minds 2024 — フランス代表選出、ロンドンフランス大使館" },
    { year: "2023–24", award: "注目のV2Xスタートアップ Top 10" },
    { year: "2023", award: "Spring50ファイナリスト — パリ・サクレーSPRING（ZettaScale）" },
    { year: "2019", award: "Power 200：世界で最も影響力のあるデータ経済リーダー" },
    { year: "2018", award: "Compass Intelligence賞：最優秀M2M & IoT企業" },
    { year: "2017–18", award: "エッジコンピューティングで最も影響力のある経営幹部 Top 50" },
    { year: "2014", award: "Gartner Cool Vendor" },
    { year: "継続中", award: "IEEE上級会員 | ACM会員 | Eclipse財団理事会メンバー" },
  ],
  skillDomains: ["分散システム", "エッジ & フォグコンピューティング", "IoT", "ロボティクス（ROS 2）", "リアルタイムシステム", "自動車（V2X）"],
};

// ── Chinese ───────────────────────────────────────────────────────────────────
const zh: CvLocaleOverride = {
  researchProfile:
    "Angelo Corsaro博士是互联网规模分布式系统领域的世界级专家，拥有25年以上的研究贡献，涵盖协议设计、实时中间件、共识与时钟同步算法以及云到边缘计算。他的工作既有深远的理论影响（100余篇同行评审论文，1478余次引用），也有变革性的工业影响（共同编写10余项国际标准，多个协议被部署于数百万关键任务系统）。",
  researchInterests: [
    "分布式算法：共识、时钟同步、因果排序、CRDT",
    "云-边缘-微控制器计算连续体：协议设计、数据中心架构",
    "实时与安全关键系统：确定性调度、内存安全性、形式验证",
    "分布式存储与大规模数据传输：纠删码、地理分布式复制",
    "高性能网络：零开销抽象、内核绕过、基于RDMA的中间件",
    "AI原生分布式基础设施：联邦学习、分布式推理",
  ],
  experience: [
    {
      role: "首席执行官 / 首席技术官 & 联合创始人",
      description:
        "联合创立了将Eclipse Zenoh商业化的公司。在Eclipse基金会内将协议从研究原型推进至生产版本（Zenoh 1.0，2024年10月）。负责所有研发、技术战略和科学出版物。被选为法国代表出席在伦敦法国大使馆举办的Genius Minds 2024倡议（Business France / Choose France）。",
    },
    {
      role: "首席技术官",
      description:
        "领导高级技术办公室。在主流采用之前数年就将边缘计算确立为公司战略支柱。负责技术调研、研发战略和标准化活动。被评为Power 200：最具影响力的数据经济领袖（2019年）。",
    },
    {
      role: "首席技术官",
      description:
        "将公司从利基航空航天中间件供应商转变为IoT平台领导者。架构了Vortex——首个支持统一云和雾计算的商业平台。推动收入增长约75%。Gartner Cool Vendor（2014年）。",
    },
    {
      role: "产品战略经理",
      description:
        "制定并执行了推动大规模用户采用和市场扩展的开源战略。",
    },
    {
      role: "软件技术研究员",
      description:
        "战略与技术规划部。Finmeccanica多核处理器研究组技术负责人。主持Finmeccanica软件实验室科学委员会。在罗马La Sapienza共同指导博士生。",
    },
    {
      role: "首席架构师，研发",
      description:
        "为关键任务航空交通控制、机载及海军战斗管理系统设计企业中间件平台。领导约50名工程师的国际团队。",
    },
  ],
  teaching: [
    {
      role: "讲师",
      note: "Conférence des Grandes Écoles Françaises成员",
      courses: ["物联网（IoT）", "函数式编程"],
    },
    {
      role: "博士联合导师",
      courses: ["分布式系统、实时中间件、容错计算"],
    },
  ],
  education: [
    {
      degree: "计算机科学博士",
      location: "密苏里州，美国",
      note: "导师：Douglas C. Schmidt教授。论文：提前编译实时Java中间件的设计与性能。",
    },
    { degree: "计算机科学硕士", location: "密苏里州，美国" },
    { degree: "计算机工程学士（Laurea）", location: "意大利", note: "以优异成绩毕业" },
  ],
  keyContributions: [
    {
      title: "Eclipse Zenoh — 发明者 & 项目负责人",
      period: "2015 – 至今",
      description:
        "发明了Zenoh——一个在云到微控制器全连续体上统一pub/sub、地理分布式查询和计算的协议。5字节线路开销，13µs以下延迟，50Gbps吞吐量，运行于32KB RAM。被ROS 2技术指导委员会选为官方DDS替代方案。被通用汽车（uProtocol）、博世、沃尔沃、富士康和Volocopter采用。被ITU推荐用于智能交通系统。",
    },
    {
      title: "OMG数据分发服务（DDS）标准",
      description:
        "OMG DDS特别兴趣小组的联合创始主席及DDS标准族（DDS、DDSI-RTPS、DDS Security、DDS RPC、DDS4CCM、ISO C++ DDS API）的主要架构师。DDS是部署于数百万关键任务系统的基础实时pub/sub标准，涵盖航空交通控制、海军战斗管理、自动驾驶车辆和医疗设备。",
    },
    {
      title: "雾计算：IEEE标准1934-2018",
      description:
        "在「雾计算」一词被创造之前就开创了分布式边缘计算（最初称为「Fluid Computing」）。与Cisco团队合作，为OpenFog联盟参考架构做出贡献，并创建了Eclipse fog05——首个完全去中心化的雾计算基础设施。参考架构被采纳为IEEE标准1934-2018。",
    },
    {
      title: "分布式时钟同步",
      description:
        "基于耦合理论发明了一种完全分布式的内部时钟同步算法，在动态大规模系统中实现了当时发布的最低误差界。发表于IEEE TPDS（2009年），并部署在Finmeccanica/SELEX-ES容错系统中。",
    },
    {
      title: "实时Java：jRate & 内存安全算法",
      description:
        "创建了jRate——在DARPA PCES项目下开发的首个开源提前编译RTSJ实现。波音公司使用jRate证明了实时Java用于飞行关键UAV航电设备的可行性。还发明了一种常数时间O(1)算法来验证作用域内存区域中指针赋值的安全性——这是对这一根本性RTSJ问题的首个解决方案。",
    },
  ],
  publicationTypes: { Journal: "期刊", Conference: "会议" },
  standards: [
    "OMG数据分发服务（DDS）v1.0–1.4 — 联合创始主席（2004–2015）",
    "OMG DDSI-RTPS（互操作性线路协议）v2.x — 贡献者",
    "OMG DDS Security、DDS RPC、DDS4CCM — 共同作者",
    "ISO C++ DDS API（SimD）— 主要作者；被采纳为OMG标准",
    "OpenFog联盟参考架构 — 主要贡献者；被采纳为IEEE标准1934-2018",
  ],
  openSourceRoles: [
    "发明者 & 项目负责人",
    "联合负责人",
    "创建者 & 项目负责人",
    "创建者 — 首个开源提前编译RTSJ实现",
    "唯一作者 — ISO C++ DDS API（被采纳为OMG标准）",
  ],
  recognition: [
    { year: "2024", award: "年度技术CEO" },
    { year: "2024", award: "最佳云到设备连续体平台奖" },
    { year: "2024", award: "Genius Minds 2024 — 被选为法国代表，伦敦法国大使馆" },
    { year: "2023–24", award: "最值得关注V2X初创企业Top 10" },
    { year: "2023", award: "Spring50决赛入围者 — 巴黎-萨克雷SPRING（ZettaScale）" },
    { year: "2019", award: "Power 200：全球最具影响力数据经济领袖" },
    { year: "2018", award: "Compass Intelligence奖：最佳M2M & IoT公司" },
    { year: "2017–18", award: "边缘计算最具影响力高管Top 50" },
    { year: "2014", award: "Gartner Cool Vendor" },
    { year: "持续", award: "IEEE高级会员 | ACM会员 | Eclipse基金会董事会成员" },
  ],
  skillDomains: ["分布式系统", "边缘与雾计算", "物联网", "机器人技术（ROS 2）", "实时系统", "汽车（V2X）"],
};

// ── Russian ───────────────────────────────────────────────────────────────────
const ru: CvLocaleOverride = {
  researchProfile:
    "Доктор Анджело Корсаро — мировой эксперт в области распределённых систем интернет-масштаба с более чем 25-летним опытом в проектировании протоколов, middleware реального времени, алгоритмах консенсуса и синхронизации часов, а также облачных вычислениях на всём пути до периферии. Его работа имела как глубокое теоретическое значение (более 100 рецензируемых публикаций, более 1 478 цитирований), так и трансформационный промышленный охват (более 10 соавторских международных стандартов, несколько протоколов, развёрнутых в миллионах критически важных систем).",
  researchInterests: [
    "Распределённые алгоритмы: консенсус, синхронизация часов, причинно-следственное упорядочивание, CRDT",
    "Вычислительный континуум облако–периферия–микроконтроллер: проектирование протоколов, data-centric архитектуры",
    "Системы реального времени и функциональной безопасности: детерминированное планирование, безопасность памяти, формальная верификация",
    "Распределённое хранилище и крупномасштабная передача данных: коды стирания, гео-распределённая репликация",
    "Высокопроизводительные сети: абстракции без накладных расходов, обход ядра, middleware на основе RDMA",
    "AI-нативная распределённая инфраструктура: федеративное обучение, распределённый инференс",
  ],
  experience: [
    {
      role: "Генеральный директор / Технический директор & Сооснователь",
      description:
        "Совместно основал компанию, коммерциализирующую Eclipse Zenoh. Довёл протокол от исследовательского прототипа до производственного релиза (Zenoh 1.0, октябрь 2024 г.) в рамках Eclipse Foundation. Руководил всеми НИОКР, технологической стратегией и научными публикациями. Выбран для представления Франции в инициативе Genius Minds 2024 (Business France / Choose France) во Французском посольстве в Лондоне.",
    },
    {
      role: "Технический директор",
      description:
        "Руководил Офисом передовых технологий. Утвердил граничные вычисления как стратегический корпоративный приоритет за несколько лет до их массового распространения. Направлял технологический скаутинг, стратегию НИОКР и стандартизационную деятельность. Признан Power 200: самым влиятельным лидером цифровой экономики (2019 г.).",
    },
    {
      role: "Технический директор",
      description:
        "Трансформировал компанию из нишевого поставщика авиакосмического middleware в лидера IoT-платформ. Разработал архитектуру Vortex — первой коммерческой платформы с поддержкой унифицированных облачных и туманных вычислений. Обеспечил рост выручки около 75%. Gartner Cool Vendor (2014 г.).",
    },
    {
      role: "Менеджер по продуктовой стратегии",
      description:
        "Разработал и реализовал стратегию открытого исходного кода, обеспечившую массовое принятие пользователями и расширение рынка.",
    },
    {
      role: "Исследователь программных технологий",
      description:
        "Дирекция стратегического и технологического планирования. Технический руководитель Исследовательской группы по многоядерным процессорам Finmeccanica. Председательствовал в научном комитете Программной лаборатории Finmeccanica. Совместно руководил аспирантами в Университете Ла Сапиенца, Рим.",
    },
    {
      role: "Главный архитектор, НИОКР",
      description:
        "Спроектировал корпоративную middleware-платформу для критически важных систем управления воздушным движением, бортовых и военно-морских систем. Руководил международной командой около 50 инженеров.",
    },
  ],
  teaching: [
    {
      role: "Преподаватель",
      note: "Член Conférence des Grandes Écoles Françaises",
      courses: ["Интернет вещей (IoT)", "Функциональное программирование"],
    },
    {
      role: "Научный руководитель (совместное руководство)",
      courses: ["Распределённые системы, middleware реального времени, отказоустойчивые вычисления"],
    },
  ],
  education: [
    {
      degree: "Доктор философии в области компьютерных наук",
      location: "Миссури, США",
      note: "Научный руководитель: проф. Дуглас К. Шмидт. Диссертация: Дизайн и производительность заблаговременно скомпилированного middleware реального времени на Java.",
    },
    { degree: "Магистр компьютерных наук", location: "Миссури, США" },
    { degree: "Laurea в области компьютерной инженерии", location: "Италия", note: "С отличием" },
  ],
  keyContributions: [
    {
      title: "Eclipse Zenoh — Изобретатель & Руководитель проекта",
      period: "2015 – по н.в.",
      description:
        "Изобрёл Zenoh — протокол, объединяющий pub/sub, гео-распределённые запросы и вычисления на всём континууме от облака до микроконтроллера. 5 байт накладных расходов, задержка менее 13 мкс, пропускная способность 50 Гбит/с, работает на 32 КБ ОЗУ. Выбран техническим руководящим комитетом ROS 2 в качестве официальной альтернативы DDS. Принят General Motors (uProtocol), Bosch, Volvo, Foxconn и Volocopter. Рекомендован МСЭ для интеллектуальных транспортных систем.",
    },
    {
      title: "Стандарт OMG Data Distribution Service (DDS)",
      description:
        "Сопредседатель-основатель Группы специальных интересов OMG DDS и главный архитектор семейства стандартов DDS (DDS, DDSI-RTPS, DDS Security, DDS RPC, DDS4CCM, ISO C++ DDS API). DDS — фундаментальный стандарт pub/sub реального времени, развёрнутый в миллионах критически важных систем: управление воздушным движением, naval combat management, автономные транспортные средства и медицинские устройства.",
    },
    {
      title: "Туманные вычисления: Стандарт IEEE 1934-2018",
      description:
        "Был пионером распределённых граничных вычислений (первоначально называемых «Fluid Computing») до того, как был введён термин «fog computing». Сотрудничал с командой Cisco, внёс вклад в эталонную архитектуру консорциума OpenFog и создал Eclipse fog05 — первую полностью децентрализованную инфраструктуру туманных вычислений. Эталонная архитектура принята как Стандарт IEEE 1934-2018.",
    },
    {
      title: "Распределённая синхронизация часов",
      description:
        "Изобрёл полностью распределённый алгоритм синхронизации внутренних часов на основе теории связи, достигший наименьших погрешностей, опубликованных на тот момент для динамических крупномасштабных систем. Опубликован в IEEE TPDS (2009 г.) и развёрнут в отказоустойчивых системах Finmeccanica/SELEX-ES.",
    },
    {
      title: "Java реального времени: jRate & Алгоритмы безопасности памяти",
      description:
        "Создал jRate — первую реализацию RTSJ с открытым исходным кодом, скомпилированную заблаговременно, разработанную в рамках программы DARPA PCES. Boeing использовал jRate для подтверждения осуществимости Java реального времени для авионики критически важных беспилотников. Также изобрёл алгоритм постоянного времени O(1) для проверки безопасности присваивания указателей в областях памяти с областью видимости — первое решение этой фундаментальной проблемы RTSJ.",
    },
  ],
  publicationTypes: { Journal: "Журнал", Conference: "Конференция" },
  standards: [
    "OMG Data Distribution Service (DDS) v1.0–1.4 — Сопредседатель-основатель (2004–2015)",
    "OMG DDSI-RTPS (протокол обеспечения совместимости) v2.x — Участник",
    "OMG DDS Security, DDS RPC, DDS4CCM — Соавтор",
    "ISO C++ DDS API (SimD) — Основной автор; принят как стандарт OMG",
    "Эталонная архитектура консорциума OpenFog — Ключевой участник; принята как Стандарт IEEE 1934-2018",
  ],
  openSourceRoles: [
    "Изобретатель & руководитель проекта",
    "Сорукодитель",
    "Создатель & руководитель проекта",
    "Создатель — первая заблаговременно скомпилированная реализация RTSJ с открытым исходным кодом",
    "Единственный автор — ISO C++ DDS API (принят как стандарт OMG)",
  ],
  recognition: [
    { year: "2024", award: "Технологический генеральный директор года" },
    { year: "2024", award: "Лучшая платформа континуума «облако — устройство»" },
    { year: "2024", award: "Genius Minds 2024 — Выбран представлять Францию, Французское посольство в Лондоне" },
    { year: "2023–24", award: "Топ-10 стартапов V2X, за которыми стоит следить" },
    { year: "2023", award: "Финалист Spring50 — Paris-Saclay SPRING (ZettaScale)" },
    { year: "2019", award: "Power 200: Самые влиятельные лидеры цифровой экономики в мире" },
    { year: "2018", award: "Премия Compass Intelligence: Лучшая компания M2M & IoT" },
    { year: "2017–18", award: "Топ-50 самых влиятельных руководителей в сфере граничных вычислений" },
    { year: "2014", award: "Gartner Cool Vendor" },
    { year: "Постоянно", award: "Старший член IEEE | Член ACM | Член совета директоров Eclipse Foundation" },
  ],
  skillDomains: ["Распределённые системы", "Edge & Fog Computing", "IoT", "Робототехника (ROS 2)", "Системы реального времени", "Автомобильная (V2X)"],
};

// ── Registry & export ─────────────────────────────────────────────────────────
const overrides: Record<string, CvLocaleOverride> = { fr, it, es, ko, ja, zh, ru };

import { siteConfig } from "@/lib/siteConfig";

/**
 * Returns a CV data object identical in shape to siteConfig.cv but with
 * all long-form text fields replaced by locale-specific translations.
 * Falls back to the English siteConfig values for any unrecognised locale.
 */
export function getLocalizedCV(locale: string) {
  const base = siteConfig.cv;
  const o = overrides[locale];
  if (!o) return base;

  return {
    ...base,
    researchProfile: o.researchProfile,
    researchInterests: o.researchInterests,
    experience: base.experience.map((job, i) => ({
      ...job,
      role: o.experience[i]?.role ?? job.role,
      description: o.experience[i]?.description ?? job.description,
    })),
    teaching: base.teaching.map((entry, i) => ({
      ...entry,
      role: o.teaching[i]?.role ?? entry.role,
      note: o.teaching[i]?.note ?? ("note" in entry ? entry.note : undefined),
      courses: o.teaching[i]?.courses ?? entry.courses,
    })),
    education: base.education.map((edu, i) => ({
      ...edu,
      degree: o.education[i]?.degree ?? edu.degree,
      location: o.education[i]?.location ?? edu.location,
      note: o.education[i]?.note ?? ("note" in edu ? edu.note : undefined),
    })),
    keyContributions: base.keyContributions.map((contrib, i) => ({
      ...contrib,
      title: o.keyContributions[i]?.title ?? contrib.title,
      period: o.keyContributions[i]?.period ?? contrib.period,
      description: o.keyContributions[i]?.description ?? contrib.description,
    })),
    selectedPublications: base.selectedPublications.map((pub) => ({
      ...pub,
      type: o.publicationTypes[pub.type] ?? pub.type,
    })),
    standards: o.standards,
    openSource: base.openSource.map((p, i) => ({
      ...p,
      role: o.openSourceRoles[i] ?? p.role,
    })),
    recognition: o.recognition,
    skills: {
      ...base.skills,
      skillCatDomains: o.skillDomains,
    },
  };
}
