import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { chatId, etiquetaId } = body

    console.log("📌 [ASSIGN-TAG] Início:", { chatId, etiquetaId })

    if (!chatId) {
      console.log("❌ [ASSIGN-TAG] Chat ID ausente")
      return NextResponse.json(
        { success: false, message: "Chat ID é obrigatório" },
        { status: 400 }
      )
    }

    if (!etiquetaId) {
      return NextResponse.json(
        { success: false, message: "Etiqueta ID é obrigatório" },
        { status: 400 }
      )
    }

    // Verifica se o chat existe
    const { data: chatExists, error: checkError } = await supabase
      .from("chats")
      .select("id, name, etiqueta_ids")
      .eq("id", chatId)
      .maybeSingle()

    if (checkError) {
      console.error("❌ [ASSIGN-TAG] Erro ao verificar chat:", checkError)
      throw checkError
    }

    console.log("🔍 [ASSIGN-TAG] Chat existe?", { exists: !!chatExists })

    if (!chatExists) {
      console.log("➕ [ASSIGN-TAG] Criando novo chat...")
      // Chat não existe, cria um registro básico com a etiqueta
      const { error: insertError } = await supabase
        .from("chats")
        .insert({
          id: chatId,
          name: chatId,
          is_archived: false,
          unread_count: 0,
          last_message_time: Date.now(),
          etiqueta_ids: [etiquetaId]
        })

      if (insertError) {
        console.error("❌ [ASSIGN-TAG] Erro ao inserir chat:", insertError)
        throw insertError
      }
      console.log("✅ [ASSIGN-TAG] Chat criado com etiqueta")
    } else {
      console.log("🔄 [ASSIGN-TAG] Atualizando etiqueta do chat...")
      
      const currentIds = chatExists.etiqueta_ids || []
      
      // Verifica se a etiqueta já existe
      if (currentIds.includes(etiquetaId)) {
        return NextResponse.json({
          success: true,
          message: "Etiqueta já atribuída",
        })
      }

      // Adiciona a nova etiqueta ao array
      const newIds = [...currentIds, etiquetaId]

      const { error: updateError } = await supabase
        .from("chats")
        .update({ etiqueta_ids: newIds })
        .eq("id", chatId)

      if (updateError) {
        console.error("❌ [ASSIGN-TAG] Erro ao atualizar etiqueta:", updateError)
        throw updateError
      }
      console.log("✅ [ASSIGN-TAG] Etiqueta adicionada ao array")
    }

    return NextResponse.json({
      success: true,
      message: "Etiqueta atribuída com sucesso",
    })
  } catch (error: any) {
    console.error("❌ [ASSIGN-TAG] Erro geral:", error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: error?.message || "Erro ao atribuir etiqueta",
        details: error?.details,
        hint: error?.hint
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { chatId, etiquetaId } = body

    console.log("🗑️ [REMOVE-TAG] Início:", { chatId, etiquetaId })

    if (!chatId) {
      return NextResponse.json(
        { success: false, message: "Chat ID é obrigatório" },
        { status: 400 }
      )
    }

    // Se etiquetaId específico, remove apenas essa do array
    if (etiquetaId) {
      // Usa array_remove do PostgreSQL para remover do array
      const { error } = await supabase.rpc('remove_etiqueta_from_chat', {
        p_chat_id: chatId,
        p_etiqueta_id: etiquetaId
      })

      // Se a função RPC não existir, fazemos manualmente
      if (error && error.message.includes('function')) {
        const { data: chat } = await supabase
          .from("chats")
          .select("etiqueta_ids")
          .eq("id", chatId)
          .maybeSingle()

        if (chat) {
          const newIds = (chat.etiqueta_ids || []).filter((id: string) => id !== etiquetaId)
          await supabase.from("chats").update({ etiqueta_ids: newIds }).eq("id", chatId)
        }
      } else if (error) {
        throw error
      }
    }
    // Se nenhum especificado, remove todas as etiquetas (limpa o array)
    else {
      const { error } = await supabase
        .from("chats")
        .update({ etiqueta_ids: [] })
        .eq("id", chatId)

      if (error) throw error
    }

    return NextResponse.json({
      success: true,
      message: "Etiqueta(s) removida(s) com sucesso",
    })
  } catch (error: any) {
    console.error("❌ [REMOVE-TAG] Erro:", error)
    return NextResponse.json(
      { success: false, message: error?.message || "Erro ao remover etiqueta" },
      { status: 500 }
    )
  }
}
