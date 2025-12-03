import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("whatsapp_etiquetas")
      .select("*")
      .order("nome", { ascending: true })

    if (error) throw error

    return NextResponse.json({
      success: true,
      etiquetas: data || [],
    })
  } catch (error) {
    console.error("Erro ao carregar etiquetas:", error)
    return NextResponse.json(
      { success: false, message: "Erro ao carregar etiquetas" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = await createClient()
    const body = await request.json()
    const { nome, cor, descricao } = body

    if (!nome || !cor) {
      return NextResponse.json(
        { success: false, message: "Nome e cor são obrigatórios" },
        { status: 400 }
      )
    }

    // Pega o ID e nome do usuário autenticado
    const userId = cookieStore.get("auth_user_id")?.value
    let userName = "Sistema"

    if (userId) {
      const { data: userProfile } = await supabase
        .from("perfis")
        .select("nome")
        .eq("id", userId)
        .single()
      if (userProfile) userName = userProfile.nome
    }

    const { data, error } = await supabase
      .from("whatsapp_etiquetas")
      .insert({
        nome: nome.trim(),
        cor: cor.trim(),
        descricao: descricao?.trim() || null,
        created_by_id: userId || null,
        created_by_name: userName,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      etiqueta: data,
    })
  } catch (error) {
    console.error("Erro ao criar etiqueta:", error)
    return NextResponse.json(
      { success: false, message: "Erro ao criar etiqueta" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { id, nome, cor, descricao } = body

    if (!id || !nome || !cor) {
      return NextResponse.json(
        { success: false, message: "ID, nome e cor são obrigatórios" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("whatsapp_etiquetas")
      .update({
        nome: nome.trim(),
        cor: cor.trim(),
        descricao: descricao?.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      etiqueta: data,
    })
  } catch (error) {
    console.error("Erro ao atualizar etiqueta:", error)
    return NextResponse.json(
      { success: false, message: "Erro ao atualizar etiqueta" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID é obrigatório" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("whatsapp_etiquetas")
      .delete()
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("Erro ao deletar etiqueta:", error)
    return NextResponse.json(
      { success: false, message: "Erro ao deletar etiqueta" },
      { status: 500 }
    )
  }
}
