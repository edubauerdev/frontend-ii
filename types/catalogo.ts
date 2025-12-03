// Tipos para o sistema de Catálogo

export interface Catalogo {
  id: string
  nome: string
  slug: string
  descricao: string | null
  logo_url: string | null
  cor_primaria: string
  ativo: boolean
  created_by_id: string | null
  created_by_name: string | null
  created_at: string
  updated_at: string
}

export interface ProdutoTipo {
  id: string
  catalogo_id: string
  nome: string
  descricao: string | null
  ordem: number
  created_at: string
  updated_at: string
}

export interface ProdutoImagem {
  id: string
  produto_id: string
  url: string
  ordem: number
  principal: boolean
  created_at: string
}

export interface Produto {
  id: string
  catalogo_id: string
  tipo_id: string | null
  nome: string
  descricao: string | null
  preco: number | null
  preco_promocional: number | null
  ativo: boolean
  destaque: boolean
  ordem: number
  created_by_id: string | null
  created_by_name: string | null
  created_at: string
  updated_at: string
  // Relacionamentos
  tipo?: ProdutoTipo | null
  imagens?: ProdutoImagem[]
}

export interface CatalogoComProdutos {
  catalogo: Catalogo
  tipos: ProdutoTipo[]
  produtos: Produto[]
}

// Request/Response types
export interface CreateCatalogoRequest {
  nome: string
  descricao?: string
  logo_url?: string
  cor_primaria?: string
  created_by_id?: string
  created_by_name?: string
}

export interface UpdateCatalogoRequest {
  id: string
  nome?: string
  descricao?: string
  logo_url?: string
  cor_primaria?: string
  ativo?: boolean
}

export interface CreateProdutoRequest {
  catalogo_id: string
  tipo_id?: string
  nome: string
  descricao?: string
  preco?: number
  preco_promocional?: number
  ativo?: boolean
  destaque?: boolean
  ordem?: number
  created_by_id?: string
  created_by_name?: string
  imagens?: string[] // URLs ou base64
}

export interface UpdateProdutoRequest {
  id: string
  tipo_id?: string
  nome?: string
  descricao?: string
  preco?: number
  preco_promocional?: number
  ativo?: boolean
  destaque?: boolean
  ordem?: number
  imagens?: string[] // Se fornecido, substitui todas as imagens
}

export interface CreateProdutoTipoRequest {
  catalogo_id: string
  nome: string
  descricao?: string
  ordem?: number
}

export interface UpdateProdutoTipoRequest {
  id: string
  nome?: string
  descricao?: string
  ordem?: number
}
