-- =====================================================
-- MIGRAÇÃO: Converter colunas etiqueta_id_1..10 para array etiqueta_ids
-- =====================================================

-- 1. Adicionar nova coluna de array
ALTER TABLE chats ADD COLUMN IF NOT EXISTS etiqueta_ids UUID[] DEFAULT '{}';

-- 2. Migrar dados existentes das colunas antigas para o array (se as colunas existirem)
-- Execute apenas se você tinha as colunas etiqueta_id_1..10 anteriormente
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'chats' AND column_name = 'etiqueta_id_1') THEN
        UPDATE chats SET etiqueta_ids = ARRAY_REMOVE(ARRAY[
          etiqueta_id_1,
          etiqueta_id_2,
          etiqueta_id_3,
          etiqueta_id_4,
          etiqueta_id_5,
          etiqueta_id_6,
          etiqueta_id_7,
          etiqueta_id_8,
          etiqueta_id_9,
          etiqueta_id_10
        ], NULL)
        WHERE etiqueta_id_1 IS NOT NULL 
           OR etiqueta_id_2 IS NOT NULL 
           OR etiqueta_id_3 IS NOT NULL
           OR etiqueta_id_4 IS NOT NULL
           OR etiqueta_id_5 IS NOT NULL
           OR etiqueta_id_6 IS NOT NULL
           OR etiqueta_id_7 IS NOT NULL
           OR etiqueta_id_8 IS NOT NULL
           OR etiqueta_id_9 IS NOT NULL
           OR etiqueta_id_10 IS NOT NULL;
    END IF;
END $$;

-- 3. Criar índice GIN para buscas eficientes no array
CREATE INDEX IF NOT EXISTS idx_chats_etiqueta_ids ON chats USING GIN (etiqueta_ids);

-- 4. (OPCIONAL) Função RPC para remover etiqueta de um chat
-- Isso permite usar array_remove diretamente do banco
CREATE OR REPLACE FUNCTION remove_etiqueta_from_chat(p_chat_id TEXT, p_etiqueta_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE chats 
    SET etiqueta_ids = array_remove(etiqueta_ids, p_etiqueta_id)
    WHERE id = p_chat_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. (OPCIONAL) Função RPC para adicionar etiqueta a um chat
CREATE OR REPLACE FUNCTION add_etiqueta_to_chat(p_chat_id TEXT, p_etiqueta_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE chats 
    SET etiqueta_ids = array_append(etiqueta_ids, p_etiqueta_id)
    WHERE id = p_chat_id
      AND NOT (p_etiqueta_id = ANY(etiqueta_ids));  -- Evita duplicatas
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Remover colunas antigas (EXECUTE APENAS APÓS CONFIRMAR QUE A MIGRAÇÃO FUNCIONOU!)
-- Descomente as linhas abaixo quando tiver certeza que os dados foram migrados corretamente:

-- ALTER TABLE chats DROP COLUMN IF EXISTS etiqueta_id_1;
-- ALTER TABLE chats DROP COLUMN IF EXISTS etiqueta_id_2;
-- ALTER TABLE chats DROP COLUMN IF EXISTS etiqueta_id_3;
-- ALTER TABLE chats DROP COLUMN IF EXISTS etiqueta_id_4;
-- ALTER TABLE chats DROP COLUMN IF EXISTS etiqueta_id_5;
-- ALTER TABLE chats DROP COLUMN IF EXISTS etiqueta_id_6;
-- ALTER TABLE chats DROP COLUMN IF EXISTS etiqueta_id_7;
-- ALTER TABLE chats DROP COLUMN IF EXISTS etiqueta_id_8;
-- ALTER TABLE chats DROP COLUMN IF EXISTS etiqueta_id_9;
-- ALTER TABLE chats DROP COLUMN IF EXISTS etiqueta_id_10;

-- =====================================================
-- QUERIES ÚTEIS PARA A NOVA ESTRUTURA:
-- =====================================================

-- Buscar chats que têm uma etiqueta específica:
-- SELECT * FROM chats WHERE 'uuid-da-etiqueta' = ANY(etiqueta_ids);

-- Buscar chats que têm qualquer uma das etiquetas:
-- SELECT * FROM chats WHERE etiqueta_ids && ARRAY['uuid1', 'uuid2']::uuid[];

-- Adicionar etiqueta a um chat:
-- UPDATE chats SET etiqueta_ids = array_append(etiqueta_ids, 'nova-uuid'::uuid) WHERE id = 'chat-id';

-- Remover etiqueta de um chat:
-- UPDATE chats SET etiqueta_ids = array_remove(etiqueta_ids, 'uuid-a-remover'::uuid) WHERE id = 'chat-id';

-- Contar quantas etiquetas um chat tem:
-- SELECT id, array_length(etiqueta_ids, 1) as num_etiquetas FROM chats;
