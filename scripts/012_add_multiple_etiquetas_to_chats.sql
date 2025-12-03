-- ========================================
-- SQL PARA MÚLTIPLAS ETIQUETAS (ATÉ 10 POR CHAT)
-- Execute este script no Supabase SQL Editor
-- ========================================

-- Adiciona colunas etiqueta_id_2 até etiqueta_id_10 na tabela chats
-- A coluna etiqueta_id já existe, então adicionamos apenas as novas

ALTER TABLE chats
ADD COLUMN IF NOT EXISTS etiqueta_id_2 UUID REFERENCES whatsapp_etiquetas(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS etiqueta_id_3 UUID REFERENCES whatsapp_etiquetas(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS etiqueta_id_4 UUID REFERENCES whatsapp_etiquetas(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS etiqueta_id_5 UUID REFERENCES whatsapp_etiquetas(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS etiqueta_id_6 UUID REFERENCES whatsapp_etiquetas(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS etiqueta_id_7 UUID REFERENCES whatsapp_etiquetas(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS etiqueta_id_8 UUID REFERENCES whatsapp_etiquetas(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS etiqueta_id_9 UUID REFERENCES whatsapp_etiquetas(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS etiqueta_id_10 UUID REFERENCES whatsapp_etiquetas(id) ON DELETE SET NULL;

-- Índices para busca rápida por cada etiqueta
CREATE INDEX IF NOT EXISTS idx_chats_etiqueta_id_2 ON chats(etiqueta_id_2);
CREATE INDEX IF NOT EXISTS idx_chats_etiqueta_id_3 ON chats(etiqueta_id_3);
CREATE INDEX IF NOT EXISTS idx_chats_etiqueta_id_4 ON chats(etiqueta_id_4);
CREATE INDEX IF NOT EXISTS idx_chats_etiqueta_id_5 ON chats(etiqueta_id_5);
CREATE INDEX IF NOT EXISTS idx_chats_etiqueta_id_6 ON chats(etiqueta_id_6);
CREATE INDEX IF NOT EXISTS idx_chats_etiqueta_id_7 ON chats(etiqueta_id_7);
CREATE INDEX IF NOT EXISTS idx_chats_etiqueta_id_8 ON chats(etiqueta_id_8);
CREATE INDEX IF NOT EXISTS idx_chats_etiqueta_id_9 ON chats(etiqueta_id_9);
CREATE INDEX IF NOT EXISTS idx_chats_etiqueta_id_10 ON chats(etiqueta_id_10);

-- Comentários explicativos
COMMENT ON COLUMN chats.etiqueta_id_2 IS 'Segunda etiqueta atribuída ao chat';
COMMENT ON COLUMN chats.etiqueta_id_3 IS 'Terceira etiqueta atribuída ao chat';
COMMENT ON COLUMN chats.etiqueta_id_4 IS 'Quarta etiqueta atribuída ao chat';
COMMENT ON COLUMN chats.etiqueta_id_5 IS 'Quinta etiqueta atribuída ao chat';
COMMENT ON COLUMN chats.etiqueta_id_6 IS 'Sexta etiqueta atribuída ao chat';
COMMENT ON COLUMN chats.etiqueta_id_7 IS 'Sétima etiqueta atribuída ao chat';
COMMENT ON COLUMN chats.etiqueta_id_8 IS 'Oitava etiqueta atribuída ao chat';
COMMENT ON COLUMN chats.etiqueta_id_9 IS 'Nona etiqueta atribuída ao chat';
COMMENT ON COLUMN chats.etiqueta_id_10 IS 'Décima etiqueta atribuída ao chat';

-- ========================================
-- FIM DO SCRIPT
-- ========================================
