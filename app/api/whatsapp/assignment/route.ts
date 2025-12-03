import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

// GET - Buscar atribuição de um chat
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    const { searchParams } = new URL(request.url)
    const chatId = searchParams.get("chatId")

    if (!chatId) {
      return NextResponse.json(
        {
          success: false,
          message: "chatId é obrigatório",
        },
        { status: 400 },
      )
    }

    const { data: assignment, error } = await supabase
      .from("chat_assignments")
      .select("*")
      .eq("chat_id", chatId)
      .eq("status", "active")
      .maybeSingle()

    if (error) {
      console.error("[API] Erro ao buscar atribuição:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao buscar atribuição",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      assignment: assignment || null,
    })
  } catch (error) {
    console.error("[API] Erro ao buscar atribuição:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}

// DELETE - Remover atribuição
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()
    const { assignmentId, chatId } = body

    if (!assignmentId && !chatId) {
      return NextResponse.json(
        {
          success: false,
          message: "assignmentId ou chatId é obrigatório",
        },
        { status: 400 },
      )
    }

    let activeAssignment = null

    // Se assignmentId foi fornecido, busca por ID
    if (assignmentId) {
      const { data } = await supabase
        .from("chat_assignments")
        .select("*")
        .eq("id", assignmentId)
        .maybeSingle()
      activeAssignment = data
    }
    // Caso contrário, busca por chatId
    else if (chatId) {
      const { data } = await supabase
        .from("chat_assignments")
        .select("*")
        .eq("chat_id", chatId)
        .eq("status", "active")
        .maybeSingle()
      activeAssignment = data
    }

    if (!activeAssignment) {
      return NextResponse.json(
        {
          success: false,
          message: "Atribuição não encontrada",
        },
        { status: 404 },
      )
    }

    const { error } = await supabase
      .from("chat_assignments")
      .update({ status: "completed", updated_at: new Date().toISOString() })
      .eq("id", activeAssignment.id)

    if (error) {
      console.error("[API] Erro ao remover atribuição:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao remover atribuição",
        },
        { status: 500 },
      )
    }

    // Registra o log de auditoria
    await supabase.from("assignment_logs").insert({
      chat_id: activeAssignment.chat_id,
      chat_name: activeAssignment.chat_name,
      action: "released",
      from_user_id: activeAssignment.assigned_to_id,
      from_user_name: activeAssignment.assigned_to_name,
      to_user_id: null,
      to_user_name: null,
      performed_by_id: activeAssignment.assigned_to_id,
      performed_by_name: activeAssignment.assigned_to_name,
      notes: null,
    })

    return NextResponse.json({
      success: true,
      message: "Atribuição removida com sucesso",
    })
  } catch (error) {
    console.error("[API] Erro ao remover atribuição:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
