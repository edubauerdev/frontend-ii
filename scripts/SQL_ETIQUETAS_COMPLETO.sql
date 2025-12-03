-- ========================================
-- COMANDOS SQL PARA IMPLEMENTAÇÃO DE ETIQUETAS
-- Execute estes comandos no Supabase SQL Editor
-- ========================================

-- 1. Criar tabela de etiquetas
-- Este comando cria a tabela principal para armazenar as etiquetas
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

-- ========================================

-- 2. Adicionar coluna etiqueta_id na tabela chats
-- Esta coluna permite associar uma etiqueta a cada chat
ALTER TABLE chats
ADD COLUMN IF NOT EXISTS etiqueta_id UUID REFERENCES whatsapp_etiquetas(id) ON DELETE SET NULL;

-- Índice para buscar chats por etiqueta
CREATE INDEX IF NOT EXISTS idx_chats_etiqueta_id ON chats(etiqueta_id);

-- Comentário na coluna
COMMENT ON COLUMN chats.etiqueta_id IS 'ID da etiqueta atribuída ao chat';

-- ========================================
-- FIM DOS COMANDOS
-- ========================================
