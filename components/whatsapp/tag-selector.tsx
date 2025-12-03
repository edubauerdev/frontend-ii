"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tag } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import type { Etiqueta } from "@/lib/whatsapp-types"

interface TagSelectorProps {
  chatId: string
  currentEtiquetaId?: string | null
  onTagAssigned?: () => void
}

export function TagSelector({ chatId, currentEtiquetaId, onTagAssigned }: TagSelectorProps) {
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([])
  const [loading, setLoading] = useState(false)
  const [assigning, setAssigning] = useState(false)

  useEffect(() => {
    loadEtiquetas()
  }, [])

  async function loadEtiquetas() {
    try {
      setLoading(true)
      const response = await fetch("/api/whatsapp/etiquetas")
      const data = await response.json()

      if (data.success) {
        setEtiquetas(data.etiquetas || [])
      }
    } catch (error) {
      console.error("Erro ao carregar etiquetas:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleAssignTag(etiquetaId: string | null) {
    try {
      setAssigning(true)
      console.log("🏷️ Atribuindo etiqueta:", { chatId, etiquetaId })
      
      const response = await fetch("/api/whatsapp/assign-tag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, etiquetaId }),
      })

      console.log("📡 Response status:", response.status)
      
      const data = await response.json()
      console.log("📦 Response data:", data)

      if (data.success) {
        toast.success(etiquetaId ? "Etiqueta atribuída" : "Etiqueta removida")
        onTagAssigned?.()
      } else {
        toast.error(data.message || "Erro ao atribuir etiqueta")
      }
    } catch (error) {
      console.error("❌ Erro ao atribuir etiqueta:", error)
      toast.error("Erro ao atribuir etiqueta")
    } finally {
      setAssigning(false)
    }
  }

  if (loading) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={assigning}>
          <Tag className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {etiquetas.length === 0 ? (
          <div className="p-2 text-sm text-neutral-500 text-center">
            Nenhuma etiqueta disponível
          </div>
        ) : (
          <>
            {etiquetas.map((etiqueta) => (
              <DropdownMenuItem
                key={etiqueta.id}
                onClick={() => handleAssignTag(etiqueta.id)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2 w-full">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: etiqueta.cor }}
                  />
                  <span className="flex-1">{etiqueta.nome}</span>
                  {currentEtiquetaId === etiqueta.id && (
                    <span className="text-xs text-neutral-500">✓</span>
                  )}
                </div>
              </DropdownMenuItem>
            ))}
            {currentEtiquetaId && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleAssignTag(null)}
                  className="cursor-pointer text-red-600"
                >
                  Remover etiqueta
                </DropdownMenuItem>
              </>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
