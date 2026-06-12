'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const initialLogs = [
  '[2025-04-07 10:23:01] SSH connection from 192.168.1.22 accepted',
  '[2025-04-07 10:25:17] sudo: bakayoko : TTY=pts/2 ; COMMAND=/usr/bin/nmap -sS',
  '[2025-04-07 10:27:44] iptables: new rule added (INPUT -p tcp --dport 443 -j ACCEPT)',
  '[2025-04-07 10:30:02] FAILED LOGIN for admin from 10.0.0.45 (blocked by IPS)',
]

export function SystemLogs() {
  const [logs, setLogs] = useState(initialLogs)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = `[${new Date().toLocaleTimeString()}] ${
        Math.random() > 0.7 ? '⚠️ ' : '✓ '
      }${
        Math.random() > 0.5
          ? 'Suricata: alert ICMP sweep'
          : 'AAA: authentication success'
      }`
      setLogs((prev) => [newLog, ...prev.slice(0, 4)])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 border border-accent-neon/50 bg-black/90 p-2 font-mono text-[10px] shadow-lg backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between border-b border-accent-neon/30 pb-1">
        <span className="text-accent-neon">system.log</span>
        <button
          onClick={() => setVisible(false)}
          className="text-foreground/50 hover:text-accent-err"
        >
          <X size={12} />
        </button>
      </div>
      <div className="h-32 overflow-y-auto space-y-1">
        {logs.map((log, i) => (
          <div key={i} className="text-foreground/70">
            {log}
          </div>
        ))}
      </div>
    </div>
  )
}