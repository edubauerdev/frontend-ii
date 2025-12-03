import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CatalogoPublico from '@/components/catalogo/catalogo-publico'

interface CatalogoPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CatalogoPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/catalogo/${slug}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return {
        title: 'Catálogo não encontrado',
      }
    }
    
    const data = await response.json()
    
    return {
      title: data.catalogo?.nome || 'Catálogo',
      description: data.catalogo?.descricao || 'Confira nosso catálogo de produtos',
      openGraph: {
        title: data.catalogo?.nome || 'Catálogo',
        description: data.catalogo?.descricao || 'Confira nosso catálogo de produtos',
        images: data.catalogo?.logo_url ? [data.catalogo.logo_url] : [],
      },
    }
  } catch {
    return {
      title: 'Catálogo',
    }
  }
}

export default async function CatalogoPage({ params }: CatalogoPageProps) {
  const { slug } = await params
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/catalogo/${slug}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      notFound()
    }
    
    const data = await response.json()
    
    if (!data.catalogo) {
      notFound()
    }
    
    return <CatalogoPublico data={data} />
  } catch {
    notFound()
  }
}
