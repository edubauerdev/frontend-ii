-- Criação da tabela whatsapp_etiquetas
-- Esta tabela armazena as etiquetas configuradas pelos usuários para categorizar chats

CREATE TABLE IF NOT EXISTS whatsapp_etiquetas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(100) NOT NULL,
  cor VARCHAR(7) NOT NULL, -- Formato hexadecimal: #RRGGBB
  descricao TEXT,
  created_by_id UUID REFERENCES perfis(id) ON DELETE SET NULL,
  created_by_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para buscar etiquetas por nome
CREATE INDEX IF NOT EXISTS idx_whatsapp_etiquetas_nome ON whatsapp_etiquetas(nome);

-- Índice para buscar etiquetas criadas por um usuário específico
CREATE INDEX IF NOT EXISTS idx_whatsapp_etiquetas_created_by ON whatsapp_etiquetas(created_by_id);

-- Comentários nas colunas
COMMENT ON TABLE whatsapp_etiquetas IS 'Etiquetas para categorização de chats do WhatsApp';
COMMENT ON COLUMN whatsapp_etiquetas.id IS 'Identificador único da etiqueta';
COMMENT ON COLUMN whatsapp_etiquetas.nome IS 'Nome da etiqueta (ex: Urgente, Vendas, Suporte)';
COMMENT ON COLUMN whatsapp_etiquetas.cor IS 'Cor da etiqueta em formato hexadecimal (#RRGGBB)';
COMMENT ON COLUMN whatsapp_etiquetas.descricao IS 'Descrição detalhada da etiqueta';
COMMENT ON COLUMN whatsapp_etiquetas.created_by_id IS 'ID do usuário que criou a etiqueta';
COMMENT ON COLUMN whatsapp_etiquetas.created_by_name IS 'Nome do usuário que criou a etiqueta';
