'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search, ShoppingBag, Star, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface ProdutoImagem {
  id: string
  url: string
  ordem: number
  principal: boolean
}

interface ProdutoTipo {
  id: string
  nome: string
}

interface Produto {
  id: string
  nome: string
  descricao: string | null
  preco: number | null
  preco_promocional: number | null
  destaque: boolean
  ordem: number
  tipo_id: string | null
  tipo: ProdutoTipo | null
  imagens: ProdutoImagem[]
}

interface Catalogo {
  id: string
  nome: string
  slug: string
  descricao: string | null
  logo_url: string | null
  cor_primaria: string
}

interface CatalogoData {
  catalogo: Catalogo
  tipos: ProdutoTipo[]
  produtos: Produto[]
}

interface CatalogoPublicoProps {
  data: CatalogoData
}

export default function CatalogoPublico({ data }: CatalogoPublicoProps) {
  const { catalogo, tipos, produtos } = data
  const [busca, setBusca] = useState('')
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null)
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
  const [imagemAtual, setImagemAtual] = useState(0)

  // Filtrar produtos
  const produtosFiltrados = produtos.filter((produto) => {
    const matchBusca = busca === '' || 
      produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      produto.descricao?.toLowerCase().includes(busca.toLowerCase())
    
    const matchTipo = tipoSelecionado === null || produto.tipo_id === tipoSelecionado

    return matchBusca && matchTipo
  })

  // Formatar preço
  const formatarPreco = (valor: number | null) => {
    if (valor === null) return null
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  // Obter imagem principal do produto
  const getImagemPrincipal = (produto: Produto) => {
    const principal = produto.imagens.find(img => img.principal)
    return principal?.url || produto.imagens[0]?.url || null
  }

  // Navegação de imagens no modal
  const proximaImagem = () => {
    if (produtoSelecionado && produtoSelecionado.imagens.length > 1) {
      setImagemAtual((prev) => (prev + 1) % produtoSelecionado.imagens.length)
    }
  }

  const imagemAnterior = () => {
    if (produtoSelecionado && produtoSelecionado.imagens.length > 1) {
      setImagemAtual((prev) => 
        prev === 0 ? produtoSelecionado.imagens.length - 1 : prev - 1
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header 
        className="sticky top-0 z-40 border-b bg-white shadow-sm"
        style={{ borderBottomColor: catalogo.cor_primaria }}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo e Nome */}
            <div className="flex items-center gap-3">
              {catalogo.logo_url ? (
                <Image
                  src={catalogo.logo_url}
                  alt={catalogo.nome}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-lg object-cover"
                />
              ) : (
                <div 
                  className="flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{ backgroundColor: catalogo.cor_primaria }}
                >
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold text-gray-900">{catalogo.nome}</h1>
                {catalogo.descricao && (
                  <p className="text-sm text-gray-500 line-clamp-1">{catalogo.descricao}</p>
                )}
              </div>
            </div>

            {/* Busca */}
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar produtos..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filtro por tipo */}
          {tipos.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant={tipoSelecionado === null ? "default" : "outline"}
                size="sm"
                onClick={() => setTipoSelecionado(null)}
                style={tipoSelecionado === null ? { backgroundColor: catalogo.cor_primaria } : {}}
              >
                Todos
              </Button>
              {tipos.map((tipo) => (
                <Button
                  key={tipo.id}
                  variant={tipoSelecionado === tipo.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTipoSelecionado(tipo.id)}
                  style={tipoSelecionado === tipo.id ? { backgroundColor: catalogo.cor_primaria } : {}}
                >
                  {tipo.nome}
                </Button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Produtos */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {produtosFiltrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Nenhum produto encontrado
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {busca ? 'Tente buscar por outro termo' : 'Ainda não há produtos neste catálogo'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {produtosFiltrados.map((produto) => {
              const imagemUrl = getImagemPrincipal(produto)
              const temPromocao = produto.preco_promocional !== null && produto.preco !== null

              return (
                <div
                  key={produto.id}
                  className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
                  onClick={() => {
                    setProdutoSelecionado(produto)
                    setImagemAtual(0)
                  }}
                >
                  {/* Imagem */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    {imagemUrl ? (
                      <Image
                        src={imagemUrl}
                        alt={produto.nome}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ShoppingBag className="h-16 w-16 text-gray-300" />
                      </div>
                    )}
                    {produto.destaque && (
                      <Badge 
                        className="absolute left-2 top-2"
                        style={{ backgroundColor: catalogo.cor_primaria }}
                      >
                        <Star className="mr-1 h-3 w-3" />
                        Destaque
                      </Badge>
                    )}
                    {temPromocao && (
                      <Badge className="absolute right-2 top-2 bg-red-500">
                        Promoção
                      </Badge>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    {produto.tipo && (
                      <span 
                        className="text-xs font-medium uppercase"
                        style={{ color: catalogo.cor_primaria }}
                      >
                        {produto.tipo.nome}
                      </span>
                    )}
                    <h3 className="mt-1 font-semibold text-gray-900 line-clamp-2">
                      {produto.nome}
                    </h3>
                    {produto.descricao && (
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {produto.descricao}
                      </p>
                    )}
                    {produto.preco !== null && (
                      <div className="mt-3 flex items-center gap-2">
                        {temPromocao ? (
                          <>
                            <span className="text-lg font-bold" style={{ color: catalogo.cor_primaria }}>
                              {formatarPreco(produto.preco_promocional)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              {formatarPreco(produto.preco)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold" style={{ color: catalogo.cor_primaria }}>
                            {formatarPreco(produto.preco)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Modal de Produto */}
      <Dialog 
        open={produtoSelecionado !== null} 
        onOpenChange={() => setProdutoSelecionado(null)}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {produtoSelecionado && (
            <div className="flex flex-col md:flex-row">
              {/* Galeria de imagens */}
              <div className="relative aspect-square w-full md:w-1/2 bg-gray-100">
                {produtoSelecionado.imagens.length > 0 ? (
                  <>
                    <Image
                      src={produtoSelecionado.imagens[imagemAtual]?.url}
                      alt={produtoSelecionado.nome}
                      fill
                      className="object-cover"
                    />
                    {produtoSelecionado.imagens.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            imagemAnterior()
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg hover:bg-white"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            proximaImagem()
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg hover:bg-white"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
                          {produtoSelecionado.imagens.map((_, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation()
                                setImagemAtual(index)
                              }}
                              className={`h-2 w-2 rounded-full transition-colors ${
                                index === imagemAtual ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ShoppingBag className="h-24 w-24 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Detalhes */}
              <div className="flex flex-1 flex-col p-6">
                <button
                  onClick={() => setProdutoSelecionado(null)}
                  className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100 md:hidden"
                >
                  <X className="h-5 w-5" />
                </button>

                {produtoSelecionado.tipo && (
                  <span 
                    className="text-sm font-medium uppercase"
                    style={{ color: catalogo.cor_primaria }}
                  >
                    {produtoSelecionado.tipo.nome}
                  </span>
                )}
                
                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {produtoSelecionado.nome}
                </h2>

                {produtoSelecionado.preco !== null && (
                  <div className="mt-4 flex items-center gap-3">
                    {produtoSelecionado.preco_promocional !== null ? (
                      <>
                        <span 
                          className="text-3xl font-bold"
                          style={{ color: catalogo.cor_primaria }}
                        >
                          {formatarPreco(produtoSelecionado.preco_promocional)}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          {formatarPreco(produtoSelecionado.preco)}
                        </span>
                        <Badge className="bg-red-500">
                          {Math.round((1 - produtoSelecionado.preco_promocional! / produtoSelecionado.preco!) * 100)}% OFF
                        </Badge>
                      </>
                    ) : (
                      <span 
                        className="text-3xl font-bold"
                        style={{ color: catalogo.cor_primaria }}
                      >
                        {formatarPreco(produtoSelecionado.preco)}
                      </span>
                    )}
                  </div>
                )}

                {produtoSelecionado.descricao && (
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-900">Descrição</h3>
                    <p className="mt-2 text-gray-600 whitespace-pre-wrap">
                      {produtoSelecionado.descricao}
                    </p>
                  </div>
                )}

                {produtoSelecionado.destaque && (
                  <div className="mt-4">
                    <Badge 
                      className="text-sm"
                      style={{ backgroundColor: catalogo.cor_primaria }}
                    >
                      <Star className="mr-1 h-4 w-4" />
                      Produto em Destaque
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="mt-auto border-t bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {catalogo.nome}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
