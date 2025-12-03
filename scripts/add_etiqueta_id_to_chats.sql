-- Adiciona coluna etiqueta_id na tabela chats
ALTER TABLE chats
ADD COLUMN IF NOT EXISTS etiqueta_id UUID REFERENCES whatsapp_etiquetas(id) ON DELETE SET NULL;

-- Índice para busca rápida por etiqueta
CREATE INDEX IF NOT EXISTS idx_chats_etiqueta_id ON chats(etiqueta_id);

-- Comentário explicativo
COMMENT ON COLUMN chats.etiqueta_id IS 'ID da etiqueta atribuída ao chat';
