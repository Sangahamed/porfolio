export const profile = {
  name: "Bakayoko Sanga Hamed",
  role: "Lead Technicien Informatique",
  tagline: "Administration système, réseaux & développement full-stack.",
  intro:
    "Technicien informatique polyvalent, expert en administration Linux, Active Directory et architectures réseau. Orienté leadership technique, je pilote des équipes IT, supervise des déploiements serveurs et conçois des infrastructures TCP/IP robustes. Autonome et rigoureux, je conjugue développement full-stack et administration système avec de solides pratiques de sécurité et de documentation.",
  location: "Abidjan, Yopougon — Côte d'Ivoire",
  email: "bsangahamed@gmail.com",
  phone: "05-65-35-50-79",
  github: "github.com/Sangahamed",
  githubUrl: "https://github.com/Sangahamed",
}

export const stats = [
  { value: "5+", label: "Années d'expérience" },
  { value: "4", label: "Plateformes déployées" },
  { value: "N1/N2", label: "Support technique" },
  { value: "100%", label: "Infra. Linux gérée" },
]

export const experiences = [
  {
    period: "2021 — 2025",
    title: "Responsable IT & Développeur Full Stack",
    company: "HDEV — Abidjan",
    points: [
      "Architecture, développement et déploiement de plateformes immobilières et automobiles (ksfimmobilier.com, Monauto.ci, Tharamotor.com).",
      "Administration de serveurs Linux (Ubuntu/Debian) : Apache/Nginx, SSL/TLS, UFW, supervision.",
      "Configuration DHCP/DNS, routage interne, sécurisation SSH et API REST.",
      "Pipelines CI/CD sur GitHub/GitLab, gestion des déploiements et mises à jour de sécurité.",
      "Coordination des prestataires et support N1/N2.",
    ],
    tags: ["Linux", "Nginx", "CI/CD", "API REST", "DevOps"],
  },
  {
    period: "2022 — 2024",
    title: "Technicien Informatique",
    company: "SIVEM — Société Ivoirienne d'Emballage",
    points: [
      "Administration et gestion du système de pointage.",
      "Gestion des utilisateurs, des accès et des droits.",
      "Suivi des pointages, génération de rapports et exports.",
      "Maintenance des équipements informatiques et support aux utilisateurs.",
    ],
    tags: ["Active Directory", "Support IT", "Maintenance"],
  },
  {
    period: "2021",
    title: "Agent Recenseur — Coordinateur Terrain",
    company: "INS — Songon",
    points: [
      "Coordination logistique des opérations de recensement terrain.",
      "Traitement, saisie et validation des données collectées.",
      "Liaison avec les partenaires institutionnels et les populations locales.",
    ],
    tags: ["Coordination", "Data", "Logistique"],
  },
  {
    period: "2020",
    title: "Stagiaire Informatique",
    company: "OKPLAST",
    points: [
      "Gestion et administration du système de pointage des employés.",
      "Mise à jour et maintenance du site web de l'entreprise.",
      "Support informatique et assistance aux utilisateurs.",
    ],
    tags: ["Support", "Web", "Administration"],
  },
]

export const skillGroups = [
  {
    category: "Systèmes & Réseaux",
    skills: [
      "Linux / Systèmes",
      "Réseaux TCP/IP",
      "Active Directory",
      "DHCP / DNS",
      "Administration serveurs",
      "Virtualisation (VirtualBox)",
    ],
  },
  {
    category: "Développement",
    skills: [
      "Laravel / PHP",
      "React / Next.js",
      "Scripting Bash",
      "API REST",
      "MySQL / PostgreSQL",
    ],
  },
  {
    category: "DevOps & Sécurité",
    skills: [
      "DevOps / CI-CD",
      "Sécurité & Sauvegardes",
      "Docker",
      "Git / GitHub / GitLab",
      "Supervision (Zabbix)",
    ],
  },
]

export const stack = [
  "Ubuntu",
  "Debian",
  "CentOS",
  "Apache",
  "Nginx",
  "MySQL",
  "PostgreSQL",
  "Git",
  "GitHub",
  "GitLab",
  "BIND9",
  "UFW",
  "VirtualBox",
  "Wireshark",
  "Zabbix",
  "Tailwind",
  "SSH",
  "API REST",
  "CI/CD",
  "Docker",
]

export const techStack = [
  {
    domain: "Backend & API Engineering",
    accent: "primary",
    cards: [
      {
        title: "PHP & Laravel (Architecture orientée production)",
        items: [
          "Laravel : routing, Eloquent ORM, migrations, seeders",
          "Architecture MVC & gestion des rôles (RBAC)",
          "PDO : requêtes préparées, transactions, sécurité SQL",
          "Pagination, recherche et filtrage côté serveur",
          "Génération de PDF (factures, rapports)",
          "Authentification sécurisée & mot de passe oublié",
        ],
      },
      {
        title: "API Development & RESTful Services",
        items: [
          "Conception d'APIs RESTful performantes",
          "Sécurisation par tokens & gestion des accès",
          "Intégration frontend ↔ backend",
          "JSON handling & documentation (Swagger/OpenAPI)",
          "Architecture modulaire (admin / public)",
          "Gestion de sous-domaines API",
        ],
      },
      {
        title: "Bases de Données (MySQL & PostgreSQL)",
        items: [
          "Conception relationnelle, clés étrangères, contraintes",
          "Optimisation des requêtes & scripts SQL structurés",
          "Schémas normalisés, relations 1-N / N-N",
          "Gestion multi-tables complexes",
          "Sauvegardes et restauration de bases",
        ],
      },
    ],
  },
  {
    domain: "Fullstack Web Development",
    accent: "sky",
    cards: [
      {
        title: "React / Next.js (TypeScript)",
        items: [
          "SPA (Single Page Application)",
          "Rendu côté serveur & configuration production",
          "Intégration backend & API REST",
          "Déploiement sur serveur (Nginx)",
        ],
      },
      {
        title: "HTML5 / CSS3 / JavaScript & Tailwind",
        items: [
          "Interfaces responsives avec Tailwind CSS",
          "UI orientée expérience utilisateur",
          "Manipulation DOM et interaction avec API",
          "Gestion d'états dynamiques",
        ],
      },
      {
        title: "Architecture & Structuration",
        items: [
          "Organisation dossier admin / public",
          "Séparation des responsabilités",
          "Structuration modulaire évolutive",
          "Design system & composants réutilisables",
        ],
      },
    ],
  },
  {
    domain: "Systèmes, Réseaux & DevOps",
    accent: "emerald",
    cards: [
      {
        title: "Administration Linux & Serveurs",
        items: [
          "Serveurs Linux (Ubuntu / Debian / CentOS)",
          "Apache / Nginx, SSL/TLS (Let's Encrypt)",
          "Active Directory & gestion des utilisateurs",
          "Virtualisation (VirtualBox)",
        ],
      },
      {
        title: "Réseaux TCP/IP",
        items: [
          "Configuration DHCP / DNS (BIND9)",
          "Routage interne & segmentation réseau",
          "Sécurisation SSH & pare-feu UFW",
          "Analyse de trafic (Wireshark)",
        ],
      },
      {
        title: "DevOps & Déploiement",
        items: [
          "Pipelines CI/CD (GitHub / GitLab)",
          "Conteneurisation avec Docker",
          "Supervision & monitoring (Zabbix)",
          "Git / CLI, gestion des dépendances",
          "Sauvegardes & mises à jour de sécurité",
        ],
      },
    ],
  },
]

export const projects = [
  {
    name: "KSF Immobilier",
    type: "Plateforme immobilière",
    description:
      "Plateforme immobilière complète de ventes et locations, avec gestion des annonces et tableau de bord administrateur.",
    tags: ["Laravel", "MySQL", "Nginx"],
  },
  {
    name: "MonAuto.ci",
    type: "Plateforme automobile",
    description:
      "Portail d'annonces de véhicules avec recherche avancée, filtrage et gestion des publications.",
    tags: ["React", "API REST", "PostgreSQL"],
  },
  {
    name: "Tharamotor",
    type: "Concession & stock",
    description:
      "Plateforme automobile orientée concession et gestion de stock, déployée sur infrastructure Linux sécurisée.",
    tags: ["Next.js", "Tailwind", "Linux"],
  },
  {
    name: "VistImmob",
    type: "Plateforme immobilière",
    description:
      "Application immobilière avec cartes interactives, gestion des rôles et publication d'annonces.",
    tags: ["Laravel", "Cartes", "RBAC"],
  },
  {
    name: "Welloh Finance",
    type: "Gestion financière",
    description:
      "Outil de gestion financière personnelle pour le suivi des dépenses et des budgets.",
    tags: ["Next.js", "Charts", "PHP"],
  },
  {
    name: "InnovImmobolier",
    type: "location meublée",
    description:
      "Application immobilière gestion locative, des rôles et publication d'annonces",
    tags: ["Next.js", "Charts", "PHP"],
  },
]

export const certifications = [
  {
    title: "Build Web Apps with Laravel",
    issuer: "Coursera",
    field: "Développement Web",
  },
  {
    title: "MySQL and PHP for Developers",
    issuer: "SoloLearn",
    field: "Base de données / PHP",
  },
  {
    title: "Git and GitHub Crash Course",
    issuer: "freeCodeCamp",
    field: "Versioning / DevOps",
  },
]

export const education = [
  {
    period: "2020",
    title: "DUT - ITER",
    field: "Informatique Télécommunication Électronique et Réseaux",
    school: "Université Tertiaire Technologique",
  },
  {
    period: "2016 — 2017",
    title: "Baccalauréat D",
    field: "Série scientifique",
    school: "GS Ivoire Bley Boniface",
  },
]

export const qualities = [
  "Leadership technique & coordination",
  "Autonomie & sens des responsabilités",
  "Rigueur & architecture propre",
  "Veille technologique continue",
]

export const languages = [
  { name: "Français", level: "Natif", value: 100 },
  { name: "Anglais", level: "Technique", value: 70 },
]

export const navLinks = [
  { label: "Profil", href: "#profil" },
  { label: "Parcours", href: "#parcours" },
  { label: "Compétences", href: "#competences" },
  { label: "Stack", href: "#stack" },
  { label: "Projets", href: "#projets" },
  { label: "Formations", href: "#formations" },
  { label: "Contact", href: "#contact" },
]
