'use client'

import { useState, useRef, useEffect } from 'react'
import { profile, skills, projects } from '@/lib/data'

type HistoryEntry = {
  command: string
  output: string | React.ReactNode
}

const pentestingTools = `
Outils de pentesting réseau & système :
  • Nmap           - Découverte de services, scan de ports
  • Wireshark      - Analyse de paquets en temps réel
  • Metasploit     - Framework d'exploitation
  • Burp Suite     - Test d'intrusion web
  • Hydra          - Cassage de mots de passe (SSH, FTP, etc.)
  • John the Ripper- Crack de hashs
  • Aircrack-ng    - Attaques Wi-Fi
  • Snort / Suricata- Test de détection d'intrusion (IPS)
  • tcpdump        - Capture ligne de commande
  • hping3         - Construction de paquets personnalisés
`

const ethicalHackingCommands = `
Commandes éthiques pour audit :
  • reconnaissance : whois, dnsrecon, theHarvester
  • scan réseau : netdiscover, arp-scan, masscan
  • énumération : enum4linux, smbclient, snmpwalk
  • exploitation contrôlée : searchsploit, sqlmap, nuclei
  • post-exploitation (sur votre propre lab) : mimikatz, bloodhound
  • évasion IPS : fragmentation (fragroute), enveloppement SSL
`

const securityBestPractices = `
Bonnes pratiques de sécurité pour admin sys/réseau :
  ✔️ Désactiver les services inutiles sur commutateurs et serveurs AAA
  ✔️ Utiliser SSH avec clés, désactiver Telnet
  ✔️ Mettre en place un pare-feu (UFW, iptables, nftables)
  ✔️ Centraliser les logs (rsyslog, SIEM comme Wazuh)
  ✔️ Appliquer le principe du moindre privilège (RBAC)
  ✔️ Activer la détection d'intrusion (Suricata / Snort)
  ✔️ Chiffrer les flux sensibles (IPsec, TLS)
  ✔️ Planifier des audits réguliers (vulnérabilités, configurations)
  ✔️ Documenter l'architecture et les procédures
`

const frameworksInfo = `
📚 Référentiels et méthodologies pour structurer vos tests :

1. OSSTMM (Open Source Security Testing Methodology Manual)
   → Mesure scientifique de la sécurité (canaux, surface d'attaque)
   → Utile pour calculer la résilience de commutateurs, IPS, serveurs AAA.

2. PTES (Penetration Testing Execution Standard)
   → Guide complet du pentest, de la préparation au rapport.
   → Indispensable pour la phase post‑exploitation et l'évasion d'IPS.

3. OWASP WSTG (Web Security Testing Guide)
   → Test des interfaces web des équipements réseau (HTTPS, authentification).

4. MITRE ATT&CK
   → Base de connaissances des techniques réelles d'attaquants.
   → Matrice "Network" pour comprendre comment contourner votre IPS.

➡️ Combinaison gagnante :
   OSSTMM (mesure) + PTES (processus) + WSTG (web) + MITRE (menaces réelles).
`

const commands: Record<
  string,
  (args: string[]) => string | React.ReactNode
> = {
  help: () => (
    <div className="space-y-1">
      <p>Commandes disponibles :</p>
      <p>  whoami            - Infos utilisateur</p>
      <p>  skills            - Compétences techniques</p>
      <p>  projects          - Projets réalisés</p>
      <p>  contact           - Coordonnées</p>
      <p>  echo [texte]      - Afficher du texte</p>
      <p>  clear             - Effacer l'écran</p>
      <p style={{ color: '#d9ff00' }}>  pentest (ou 1-pintesting)  - Outils de pentesting</p>
      <p style={{ color: '#d9ff00' }}>  hack (ou 2-hack)            - Commandes éthiques</p>
      <p style={{ color: '#d9ff00' }}>  cyber (ou 3-cyber)          - Bonnes pratiques de sécurité</p>
      <p style={{ color: '#d9ff00' }}>  frameworks (ou refs)        - Référentiels (OSSTMM, PTES, etc.)</p>
      <p style={{ color: '#d9ff00' }}>  scan [--target IP]          - Simulation de scan réseau</p>
    </div>
  ),
  whoami: () => `${profile.name} — ${profile.role}\n📍 ${profile.location}\n📧 ${profile.email}`,
  skills: () => {
    const allSkills = skills.flatMap(g => g.skills)
    return `🎯 Compétences : ${allSkills.join(', ')}`
  },
  projects: () => {
    return projects.map(p => `📦 ${p.name} : ${p.description}`).join('\n')
  },
  contact: () => `📫 Email: ${profile.email}\n📞 Tél: ${profile.phone}\n🐙 GitHub: ${profile.githubUrl}`,
  echo: (args) => args.join(' ') || '',
  '1-pintesting': () => pentestingTools,
  pentest: () => pentestingTools,
  '2-hack': () => ethicalHackingCommands,
  hack: () => ethicalHackingCommands,
  '3-cyber': () => securityBestPractices,
  cyber: () => securityBestPractices,
  frameworks: () => frameworksInfo,
  refs: () => frameworksInfo,
  scan: (args) => {
    const targetIndex = args.findIndex(a => a === '--target')
    if (targetIndex !== -1 && args[targetIndex + 1]) {
      const ip = args[targetIndex + 1]
      return `🔍 Scan approfondi de ${ip} :\n\n192.168.1.1    → routeur (Cisco) – ports 22/tcp, 443/tcp\n192.168.1.10   → serveur AAA (FreeRADIUS) – 1812/udp, 1813/udp\n192.168.1.22   → poste admin Linux – 22/tcp, 8080/tcp\n192.168.1.5    → commutateur (Juniper) – 22/tcp\n🛡️ IPS actif : aucune anomalie détectée.`
    }
    return `📡 Scan rapide du réseau (192.168.1.0/24) :\n  4 hôtes actifs détectés.\n  Utilisez "scan --target <IP>" pour un audit détaillé.`
  },
}

// Liste complète et synchronisée des suggestions (sans sudo, avec alias numériques)
const SUGGESTION_LIST = [
  'help', 'whoami', 'skills', 'projects', 'contact', 'clear', 'scan',
  'pentest', '1-pintesting', 
  'hack', '2-hack', 
  'cyber', '3-cyber', 
  'frameworks', 'refs'
]

export function InteractiveTerminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: '', output: '🔐 Terminal interactif — tape "help" pour démarrer.' },
  ])
  const [input, setInput] = useState('')
  const [currentDir, setCurrentDir] = useState('~')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trimmedInput = input.trim().toLowerCase()
    if (!trimmedInput) {
      setSuggestions([])
      return
    }

    const filtered = SUGGESTION_LIST.filter(cmd => 
      cmd.startsWith(trimmedInput) && cmd !== trimmedInput
    )
    setSuggestions(filtered)
  }, [input])

  const executeCommand = (cmdLine: string) => {
    const trimmed = cmdLine.trim()
    if (!trimmed) return

    const [cmd, ...args] = trimmed.split(' ')
    let output: string | React.ReactNode

    if (cmd === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    if (commands[cmd]) {
      output = commands[cmd](args)
    } else {
      output = `❌ Commande non trouvée : ${cmd}. Tapez "help".`
    }

    setHistory((prev) => [...prev, { command: trimmed, output }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    executeCommand(input)
    setInput('')
  }

  const handleSuggestionClick = (cmd: string) => {
    executeCommand(cmd)
    setInput('')
    focusInput()
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history, suggestions])

  const focusInput = () => inputRef.current?.focus()

  return (
    <div
      className="w-full rounded-none border border-accent-neon/50 bg-black/80 font-mono text-sm"
      onClick={focusInput}
    >
      <div className="flex items-center gap-2 border-b border-accent-neon/30 px-3 py-2">
        <span className="inline-block h-2 w-2 rounded-full bg-accent-err" />
        <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" />
        <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-foreground/60">bash — {currentDir}</span>
      </div>

      <div ref={containerRef} className="h-96 overflow-y-auto p-3 flex flex-col justify-between">
        <div className="flex-1 overflow-y-auto mb-2">
          {history.map((entry, idx) => (
            <div key={idx} className="mb-2">
              {entry.command && (
                <div className="flex items-center gap-2 text-accent-neon">
                  <span className="select-none">$</span>
                  <span className="break-all">{entry.command}</span>
                </div>
              )}
              <div className="ml-4 whitespace-pre-wrap text-foreground/80">
                {entry.output}
              </div>
            </div>
          ))}
        </div>

        <div>
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center mb-2 px-4 py-1.5 border-t border-accent-neon/10 bg-accent-neon/5 rounded-sm">
              <span className="text-xs text-foreground/40 select-none mr-1">Suggestions :</span>
              {suggestions.map((suggestedCmd) => {
                // Détection de la couleur jaune pour les commandes cyber/pentest/frameworks
                const isCyberCmd = ['pentest', '1-pintesting', 'hack', '2-hack', 'cyber', '3-cyber', 'frameworks', 'refs'].includes(suggestedCmd);
                const badgeColor = isCyberCmd 
                  ? "border-[#d9ff00]/30 hover:border-[#d9ff00] hover:bg-[#d9ff00]/10 text-[#d9ff00]" 
                  : "border-accent-neon/20 hover:border-accent-neon hover:bg-accent-neon/10 text-accent-neon";

                return (
                  <button
                    key={suggestedCmd}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestedCmd)}
                    className={`text-xs px-2 py-0.5 rounded border transition-colors cursor-pointer ${badgeColor}`}
                  >
                    {suggestedCmd}
                  </button>
                )
              })}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-accent-neon/10 pt-2">
            <span className="text-accent-neon select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-accent-neon font-bold"
              autoFocus
              spellCheck={false}
            />
            <span className="animate-pulse text-foreground/40">▊</span>
          </form>
        </div>
      </div>
    </div>
  )
}