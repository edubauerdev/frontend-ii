-- =====================================================
-- SISTEMA DE CATÁLOGO DE PRODUTOS
-- =====================================================

-- 1. Tabela de Catálogos
CREATE TABLE IF NOT EXISTS catalogos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE, -- usado na URL pública
    descricao TEXT,
    logo_url TEXT,
    cor_primaria VARCHAR(7) DEFAULT '#000000',
    ativo BOOLEAN DEFAULT true,
    created_by_id UUID REFERENCES perfis(id) ON DELETE SET NULL,
    created_by_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela de Tipos de Produtos
CREATE TABLE IF NOT EXISTS produto_tipos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    catalogo_id UUID NOT NULL REFERENCES catalogos(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    ordem INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    catalogo_id UUID NOT NULL REFERENCES catalogos(id) ON DELETE CASCADE,
    tipo_id UUID REFERENCES produto_tipos(id) ON DELETE SET NULL,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2),
    preco_promocional DECIMAL(10, 2),
    ativo BOOLEAN DEFAULT true,
    destaque BOOLEAN DEFAULT false,
    ordem INT DEFAULT 0,
    created_by_id UUID REFERENCES perfis(id) ON DELETE SET NULL,
    created_by_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabela de Imagens dos Produtos
CREATE TABLE IF NOT EXISTS produto_imagens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    produto_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
    url TEXT NOT NULL, -- URL da imagem (pode ser base64 ou URL externa)
    ordem INT DEFAULT 0,
    principal BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_catalogos_slug ON catalogos(slug);
CREATE INDEX IF NOT EXISTS idx_catalogos_ativo ON catalogos(ativo);
CREATE INDEX IF NOT EXISTS idx_produto_tipos_catalogo ON produto_tipos(catalogo_id);
CREATE INDEX IF NOT EXISTS idx_produtos_catalogo ON produtos(catalogo_id);
CREATE INDEX IF NOT EXISTS idx_produtos_tipo ON produtos(tipo_id);
CREATE INDEX IF NOT EXISTS idx_produtos_ativo ON produtos(ativo);
CREATE INDEX IF NOT EXISTS idx_produto_imagens_produto ON produto_imagens(produto_id);

-- Função para gerar slug único
CREATE OR REPLACE FUNCTION generate_catalog_slug(p_nome TEXT)
RETURNS TEXT AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INT := 0;
BEGIN
    -- Converte para lowercase e substitui espaços por hífens
    base_slug := lower(regexp_replace(p_nome, '[^a-zA-Z0-9]+', '-', 'g'));
    -- Remove hífens no início e fim
    base_slug := trim(both '-' from base_slug);
    
    final_slug := base_slug;
    
    -- Verifica se já existe e adiciona número se necessário
    WHILE EXISTS (SELECT 1 FROM catalogos WHERE slug = final_slug) LOOP
        counter := counter + 1;
        final_slug := base_slug || '-' || counter;
    END LOOP;
    
    RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Comentários
COMMENT ON TABLE catalogos IS 'Catálogos de produtos para exibição pública';
COMMENT ON TABLE produto_tipos IS 'Categorias/tipos de produtos dentro de um catálogo';
COMMENT ON TABLE produtos IS 'Produtos de um catálogo';
COMMENT ON TABLE produto_imagens IS 'Imagens dos produtos';
COMMENT ON COLUMN catalogos.slug IS 'Identificador único para URL pública (ex: /meu-catalogo)';

-- =====================================================
-- QUERIES ÚTEIS:
-- =====================================================

-- Buscar catálogo por slug (para rota pública):
-- SELECT * FROM catalogos WHERE slug = 'nome-do-catalogo' AND ativo = true;

-- Buscar produtos de um catálogo com suas imagens:
-- SELECT p.*, 
--        (SELECT url FROM produto_imagens WHERE produto_id = p.id AND principal = true LIMIT 1) as imagem_principal,
--        t.nome as tipo_nome
-- FROM produtos p
-- LEFT JOIN produto_tipos t ON p.tipo_id = t.id
-- WHERE p.catalogo_id = 'uuid' AND p.ativo = true
-- ORDER BY p.ordem, p.created_at;
