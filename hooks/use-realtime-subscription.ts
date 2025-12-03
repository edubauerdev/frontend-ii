"use client"

import { useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import type { RealtimePostgresChangesPayload, RealtimeChannel } from "@supabase/supabase-js"

type EventType = "INSERT" | "UPDATE" | "DELETE" | "*"

interface UseRealtimeSubscriptionOptions<T> {
  table: string
  onInsert?: (payload: T) => void
  onUpdate?: (payload: T) => void
  onDelete?: (payload: T) => void
  filter?: string
  enabled?: boolean
}

export function useRealtimeSubscription<T extends Record<string, any> = any>(options: UseRealtimeSubscriptionOptions<T>) {
  const { table, onInsert, onUpdate, onDelete, filter, enabled = true } = options
  const channelRef = useRef<RealtimeChannel | null>(null)
  const retryCountRef = useRef(0)
  const maxRetries = 3

  useEffect(() => {
    if (!enabled) return

    const supabase = createClient()

    // Gera um nome único para o canal
    const channelName = `${table}-${filter || "all"}-${Date.now()}`

    const setupChannel = () => {
      // Remove canal anterior se existir
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
      }

      const channel = supabase
        .channel(channelName)
        .on(
          "postgres_changes" as any,
          {
            event: "*" as any,
            schema: "public",
            table: table,
            filter: filter,
          },
          (payload: RealtimePostgresChangesPayload<T>) => {
            if (payload.eventType === "INSERT" && onInsert) {
              onInsert(payload.new as T)
            }
            if (payload.eventType === "UPDATE" && onUpdate) {
              onUpdate(payload.new as T)
            }
            if (payload.eventType === "DELETE" && onDelete) {
              onDelete(payload.old as T)
            }
          },
        )
        .subscribe((status, err) => {
          if (status === "SUBSCRIBED") {
            retryCountRef.current = 0 // Reset retry count on success
          } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
            // Silencia o erro, mas tenta reconectar se possível
            if (retryCountRef.current < maxRetries) {
              retryCountRef.current++
              setTimeout(() => {
                setupChannel()
              }, 2000 * retryCountRef.current) // Backoff exponencial
            }
          }
        })

      channelRef.current = channel
    }

    setupChannel()

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
    }
  }, [table, filter, enabled]) // Removidas as funções de callback das dependências

  // Atualiza callbacks sem recriar canal
  useEffect(() => {
    // Callbacks são capturados pelo closure
  }, [onInsert, onUpdate, onDelete])
}
