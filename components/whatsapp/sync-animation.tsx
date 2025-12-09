"use client"

import { Radio } from "lucide-react"

export function SyncAnimation() {
  return (
    <div className="flex items-center justify-center">
      {/* Ícone Radio pulsante verde */}
      <div className="relative">
        <Radio className="w-16 h-16 text-green-500 animate-pulse" />
        {/* Ondas de rádio */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 border-2 border-green-500/30 rounded-full animate-ping" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 border-2 border-green-500/20 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
        </div>
      </div>
    </div>
  )
}
