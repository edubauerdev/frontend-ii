import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

// GET - Buscar catálogo público por slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await createServerClient()

    // Buscar catálogo ativo pelo slug
    const { data: catalogo, error: catalogoError } = await supabase
      .from('catalogos')
      .select('*')
      .eq('slug', slug)
      .eq('ativo', true)
      .single()

    if (catalogoError || !catalogo) {
      return NextResponse.json(
        { error: 'Catálogo não encontrado' },
        { status: 404 }
      )
    }

    // Buscar tipos de produto do catálogo
    const { data: tipos, error: tiposError } = await supabase
      .from('produto_tipos')
      .select('*')
      .eq('catalogo_id', catalogo.id)
      .order('ordem', { ascending: true })

    if (tiposError) {
      console.error('Erro ao buscar tipos:', tiposError)
    }

    // Buscar produtos ativos com imagens
    const { data: produtos, error: produtosError } = await supabase
      .from('produtos')
      .select(`
        id,
        nome,
        descricao,
        preco,
        preco_promocional,
        destaque,
        ordem,
        tipo_id,
        tipo:produto_tipos(id, nome),
        imagens:produto_imagens(id, url, ordem, principal)
      `)
      .eq('catalogo_id', catalogo.id)
      .eq('ativo', true)
      .order('destaque', { ascending: false })
      .order('ordem', { ascending: true })
      .order('nome', { ascending: true })

    if (produtosError) {
      console.error('Erro ao buscar produtos:', produtosError)
    }

    return NextResponse.json({
      catalogo,
      tipos: tipos || [],
      produtos: produtos || [],
    })
  } catch (error) {
    console.error('Erro ao buscar catálogo público:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar catálogo' },
      { status: 500 }
    )
  }
}
