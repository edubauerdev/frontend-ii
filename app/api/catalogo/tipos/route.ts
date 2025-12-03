import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

// GET - Listar tipos de produto de um catálogo
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { searchParams } = new URL(request.url)
    const catalogo_id = searchParams.get('catalogo_id')

    if (!catalogo_id) {
      return NextResponse.json(
        { error: 'catalogo_id é obrigatório' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('produto_tipos')
      .select('*')
      .eq('catalogo_id', catalogo_id)
      .order('ordem', { ascending: true })
      .order('nome', { ascending: true })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao buscar tipos de produto:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar tipos de produto' },
      { status: 500 }
    )
  }
}

// POST - Criar tipo de produto
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()
    
    const { catalogo_id, nome, descricao, ordem } = body

    if (!catalogo_id || !nome) {
      return NextResponse.json(
        { error: 'catalogo_id e nome são obrigatórios' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('produto_tipos')
      .insert({
        catalogo_id,
        nome,
        descricao,
        ordem: ordem || 0,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao criar tipo de produto:', error)
    return NextResponse.json(
      { error: 'Erro ao criar tipo de produto' },
      { status: 500 }
    )
  }
}

// PATCH - Atualizar tipo de produto
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()
    
    const { id, nome, descricao, ordem } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID é obrigatório' },
        { status: 400 }
      )
    }

    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() }
    if (nome !== undefined) updateData.nome = nome
    if (descricao !== undefined) updateData.descricao = descricao
    if (ordem !== undefined) updateData.ordem = ordem

    const { data, error } = await supabase
      .from('produto_tipos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao atualizar tipo de produto:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar tipo de produto' },
      { status: 500 }
    )
  }
}

// DELETE - Excluir tipo de produto
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()
    
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID é obrigatório' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('produto_tipos')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao excluir tipo de produto:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir tipo de produto' },
      { status: 500 }
    )
  }
}
