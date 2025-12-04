"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Phone, MapPin, Target, FileText, History, StickyNote, Pencil, Tag, MessageSquare, Loader2 } from 'lucide-react'
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { createClient } from "@/lib/supabase/client"
import type { Lead } from "@/types/crm"
import { toast } from "sonner"

// Ícone SVG do WhatsApp
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

type EtiquetaSimple = {
  id: string
  nome: string
  cor: string
}

type LeadLog = {
  id: string
  acao: string
  usuario_nome: string
  detalhes: string | null
  campo_alterado: string | null
  valor_antigo: string | null
  valor_novo: string | null
  created_at: string
}

type ViewLeadDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead | null
  onEdit?: () => void
}

export function ViewLeadDialog({ open, onOpenChange, lead, onEdit }: ViewLeadDialogProps) {
  const router = useRouter()
  const supabase = createClient()
  const [etiquetas, setEtiquetas] = useState<EtiquetaSimple[]>([])
  const [logs, setLogs] = useState<LeadLog[]>([])
  const [notas, setNotas] = useState<string>("")
  const [showHistory, setShowHistory] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [loadingLogs, setLoadingLogs] = useState(false)

  useEffect(() => {
    if (open && lead) {
      loadEtiquetas()
      setShowHistory(false)
      setShowNotes(false)
    }
  }, [open, lead])

  const loadEtiquetas = async () => {
    if (!lead?.chat_uuid) return
    
    try {
      // Buscar etiquetas do chat vinculado
      const { data: chatData } = await supabase
        .from('chats')
        .select('etiqueta_ids')
        .eq('uuid', lead.chat_uuid)
        .single()
      
      if (chatData?.etiqueta_ids && chatData.etiqueta_ids.length > 0) {
        const { data: etiquetasData } = await supabase
          .from('whatsapp_etiquetas')
          .select('id, nome, cor')
          .in('id', chatData.etiqueta_ids)
        
        setEtiquetas(etiquetasData || [])
      } else {
        setEtiquetas([])
      }
    } catch (err) {
      console.error("Erro ao carregar etiquetas:", err)
    }
  }

  const loadLogs = async () => {
    if (!lead) return
    setLoadingLogs(true)
    
    try {
      const { data, error } = await supabase
        .from('lead_logs')
        .select('*')
        .eq('lead_id', lead.id)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setLogs(data || [])
    } catch (err) {
      console.error("Erro ao carregar histórico:", err)
      toast.error("Erro ao carregar histórico")
    } finally {
      setLoadingLogs(false)
    }
  }

  const handleShowHistory = () => {
    setShowHistory(true)
    setShowNotes(false)
    loadLogs()
  }

  const handleShowNotes = () => {
    setShowNotes(true)
    setShowHistory(false)
    setNotas(lead?.observacao || "")
  }

  const handleVerChat = () => {
    if (!lead) return
    
    if (lead.chat_uuid) {
      router.push(`/whatsapp?chatUuid=${lead.chat_uuid}`)
    } else if (lead.telefone) {
      router.push(`/whatsapp?telefone=${lead.telefone}`)
    }
    onOpenChange(false)
  }

  const handleEdit = () => {
    onOpenChange(false)
    onEdit?.()
  }

  if (!lead) return null

  const getTemperaturaIcon = () => {
    switch (lead.temperatura) {
      case "Frio":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
            <path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="m14 20 1.25-2.5L18 18"/><path d="m14 4 1.25 2.5L18 6"/><path d="m17 21-3-6h-4"/><path d="m17 3-3 6 1.5 3"/><path d="M2 12h6.5L10 9"/><path d="m20 10-1.5 2 1.5 2"/><path d="M22 12h-6.5L14 15"/><path d="m4 10 1.5 2L4 14"/><path d="m7 21 3-6-1.5-3"/><path d="m7 3 3 6h4"/>
          </svg>
        )
      case "Morno":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
            <path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>
          </svg>
        )
      case "Quente":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
            <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>
          </svg>
        )
    }
  }

  // Mostrar histórico
  if (showHistory) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[550px] max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Histórico do Lead
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] pr-4">
            {loadingLogs ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum registro de histórico
              </div>
            ) : (
              <div className="space-y-3">
                {logs.map((log) => (
                  <div key={log.id} className="p-3 bg-neutral-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{log.acao}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(parseISO(log.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">por {log.usuario_nome}</p>
                    {log.detalhes && (
                      <p className="text-sm mt-1">{log.detalhes}</p>
                    )}
                    {log.campo_alterado && (
                      <p className="text-xs mt-1 text-neutral-600">
                        <span className="font-medium">{log.campo_alterado}:</span>{" "}
                        <span className="text-red-500 line-through">{log.valor_antigo || "vazio"}</span>{" "}
                        → <span className="text-green-600">{log.valor_novo || "vazio"}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowHistory(false)} className="flex-1">
              Voltar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Mostrar notas
  if (showNotes) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[550px] max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <StickyNote className="w-5 h-5" />
              Observação do Lead
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {lead.observacao ? (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{lead.observacao}</p>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma observação registrada
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowNotes(false)} className="flex-1">
              Voltar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Tela principal de detalhes
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Detalhes do Lead</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[65vh] pr-4">
          <div className="space-y-4">
            {/* Cabeçalho com nome e etiquetas */}
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h3 className="text-2xl font-bold text-neutral-900 mb-1">{lead.nome}</h3>
              <p className="text-sm text-neutral-500">Adicionado por {lead.adicionado_por_nome}</p>
              
              {/* Etiquetas */}
              {etiquetas.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {etiquetas.map((etiqueta) => (
                    <Badge
                      key={etiqueta.id}
                      className="text-xs flex items-center gap-1 text-white"
                      style={{ backgroundColor: etiqueta.cor }}
                    >
                      <Tag className="w-3 h-3" />
                      {etiqueta.nome}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Botões de ação */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleShowHistory} className="gap-2">
                <History className="w-4 h-4" />
                Histórico
              </Button>
              <Button variant="outline" size="sm" onClick={handleShowNotes} className="gap-2">
                <StickyNote className="w-4 h-4" />
                Notas
              </Button>
              {onEdit && (
                <Button variant="outline" size="sm" onClick={handleEdit} className="gap-2">
                  <Pencil className="w-4 h-4" />
                  Editar
                </Button>
              )}
              {(lead.chat_uuid || lead.telefone) && (
                <Button variant="outline" size="sm" onClick={handleVerChat} className="gap-2">
                  <WhatsAppIcon />
                  Ver chat
                </Button>
              )}
            </div>

            <Separator />

            {/* Informações do lead */}
            <div className="grid gap-4">
              {lead.telefone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div className="flex-1">
                    <Label className="text-xs text-neutral-500">Telefone</Label>
                    <p className="text-sm font-medium">{lead.telefone}</p>
                  </div>
                </div>
              )}

              {lead.endereco && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div className="flex-1">
                    <Label className="text-xs text-neutral-500">Endereço</Label>
                    <p className="text-sm font-medium">{lead.endereco}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                {getTemperaturaIcon()}
                <div className="flex-1">
                  <Label className="text-xs text-neutral-500">Temperatura</Label>
                  <p className="text-sm font-medium">{lead.temperatura}</p>
                </div>
              </div>

              {lead.proximo_contato && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div className="flex-1">
                    <Label className="text-xs text-neutral-500">Próximo Contato</Label>
                    <p className="text-sm font-medium">
                      {format(parseISO(lead.proximo_contato), "PPP", { locale: ptBR })}
                    </p>
                  </div>
                </div>
              )}

              {lead.acao && (
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div className="flex-1">
                    <Label className="text-xs text-neutral-500">Ação</Label>
                    <p className="text-sm font-medium">{lead.acao}</p>
                  </div>
                </div>
              )}

              {lead.observacao && (
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div className="flex-1">
                    <Label className="text-xs text-neutral-500">Observação</Label>
                    <p className="text-sm font-medium whitespace-pre-wrap line-clamp-3">{lead.observacao}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Timestamps */}
            <div className="bg-neutral-50 p-3 rounded-lg text-xs text-neutral-500">
              <p>Criado em {format(parseISO(lead.created_at), "PPP 'às' HH:mm", { locale: ptBR })}</p>
              {lead.updated_at !== lead.created_at && (
                <p className="mt-1">Atualizado em {format(parseISO(lead.updated_at), "PPP 'às' HH:mm", { locale: ptBR })}</p>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="pt-4">
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
