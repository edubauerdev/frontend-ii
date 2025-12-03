-- Adiciona coluna etiqueta_id na tabela chats
-- Esta coluna armazena a etiqueta atribuída a cada chat

ALTER TABLE chats
ADD COLUMN IF NOT EXISTS etiqueta_id UUID REFERENCES whatsapp_etiquetas(id) ON DELETE SET NULL;

-- Índice para buscar chats por etiqueta
CREATE INDEX IF NOT EXISTS idx_chats_etiqueta_id ON chats(etiqueta_id);

-- Comentário na coluna
COMMENT ON COLUMN chats.etiqueta_id IS 'ID da etiqueta atribuída ao chat';
