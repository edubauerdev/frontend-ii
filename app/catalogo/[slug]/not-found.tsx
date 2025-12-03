import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CatalogoNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Catálogo não encontrado
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md">
          O catálogo que você está procurando não existe ou foi desativado.
        </p>
        
        <Link href="/">
          <Button>
            Voltar ao início
          </Button>
        </Link>
      </div>
    </div>
  )
}
