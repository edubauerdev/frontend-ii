-- ===========================================
-- SCRIPT SQL: Adicionar UUID Interno aos Chats
-- Execute este script no SQL Editor do Supabase
-- ===========================================

-- ===========================================
-- 1. ADICIONAR COLUNA uuid NA TABELA chats
-- ===========================================

-- Adiciona coluna uuid (identificador interno estável)
ALTER TABLE public.chats 
ADD COLUMN IF NOT EXISTS uuid UUID DEFAULT gen_random_uuid() UNIQUE;

-- Garante que todos os chats existentes tenham um UUID
UPDATE public.chats 
SET uuid = gen_random_uuid() 
WHERE uuid IS NULL;

-- Torna a coluna NOT NULL após preencher valores existentes
ALTER TABLE public.chats 
ALTER COLUMN uuid SET NOT NULL;

-- Índice para performance
CREATE INDEX IF NOT EXISTS idx_chats_uuid ON public.chats(uuid);

-- Comentário
COMMENT ON COLUMN public.chats.uuid IS 'Identificador interno único e estável do chat (independente do ID do WhatsApp)';

-- ===========================================
-- 2. ADICIONAR COLUNA chat_uuid NAS TABELAS RELACIONADAS
-- ===========================================

-- 2.1 Tabela leads
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS chat_uuid UUID REFERENCES public.chats(uuid) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_leads_chat_uuid ON public.leads(chat_uuid);
COMMENT ON COLUMN public.leads.chat_uuid IS 'Referência estável ao chat do WhatsApp';

-- 2.2 Tabela chat_assignments
ALTER TABLE public.chat_assignments 
ADD COLUMN IF NOT EXISTS chat_uuid UUID;

CREATE INDEX IF NOT EXISTS idx_chat_assignments_chat_uuid ON public.chat_assignments(chat_uuid);

-- 2.3 Tabela chat_notes
ALTER TABLE public.chat_notes 
ADD COLUMN IF NOT EXISTS chat_uuid UUID;

CREATE INDEX IF NOT EXISTS idx_chat_notes_chat_uuid ON public.chat_notes(chat_uuid);

-- 2.4 Tabela chat_history
ALTER TABLE public.chat_history 
ADD COLUMN IF NOT EXISTS chat_uuid UUID;

CREATE INDEX IF NOT EXISTS idx_chat_history_chat_uuid ON public.chat_history(chat_uuid);

-- 2.5 Tabela chat_activity
ALTER TABLE public.chat_activity 
ADD COLUMN IF NOT EXISTS chat_uuid UUID;

CREATE INDEX IF NOT EXISTS idx_chat_activity_chat_uuid ON public.chat_activity(chat_uuid);

-- 2.6 Tabela messages (opcional, mas recomendado)
ALTER TABLE public.messages 
ADD COLUMN IF NOT EXISTS chat_uuid UUID;

CREATE INDEX IF NOT EXISTS idx_messages_chat_uuid ON public.messages(chat_uuid);

-- ===========================================
-- 3. POPULAR chat_uuid NAS TABELAS EXISTENTES
-- Usa o chat_id para encontrar o UUID correspondente
-- ===========================================

-- 3.1 chat_assignments
UPDATE public.chat_assignments ca
SET chat_uuid = c.uuid
FROM public.chats c
WHERE ca.chat_id = c.id
AND ca.chat_uuid IS NULL;

-- 3.2 chat_notes
UPDATE public.chat_notes cn
SET chat_uuid = c.uuid
FROM public.chats c
WHERE cn.chat_id = c.id
AND cn.chat_uuid IS NULL;

-- 3.3 chat_history
UPDATE public.chat_history ch
SET chat_uuid = c.uuid
FROM public.chats c
WHERE ch.chat_id = c.id
AND ch.chat_uuid IS NULL;

-- 3.4 chat_activity
UPDATE public.chat_activity ca
SET chat_uuid = c.uuid
FROM public.chats c
WHERE ca.chat_id = c.id
AND ca.chat_uuid IS NULL;

-- 3.5 messages
UPDATE public.messages m
SET chat_uuid = c.uuid
FROM public.chats c
WHERE m.chat_id = c.id
AND m.chat_uuid IS NULL;

-- ===========================================
-- 4. FUNÇÃO PARA OBTER UUID DE UM CHAT
-- Retorna o UUID existente ou cria um novo
-- ===========================================

CREATE OR REPLACE FUNCTION get_or_create_chat_uuid(p_chat_id TEXT)
RETURNS UUID AS $$
DECLARE
    v_uuid UUID;
BEGIN
    -- Tenta buscar o UUID existente
    SELECT uuid INTO v_uuid 
    FROM public.chats 
    WHERE id = p_chat_id;
    
    -- Se não encontrou, retorna NULL (o chat ainda não existe)
    -- O servidor deve criar o chat primeiro
    RETURN v_uuid;
END;
$$ LANGUAGE plpgsql;

-- ===========================================
-- 5. FUNÇÃO PARA BUSCAR CHAT POR TELEFONE
-- Útil para encontrar chats quando o ID muda
-- Busca pelo ID que contém o telefone (ex: 5511999999999@s.whatsapp.net)
-- ===========================================

CREATE OR REPLACE FUNCTION find_chat_by_telefone(p_telefone TEXT)
RETURNS TABLE(
    id TEXT,
    uuid UUID,
    name TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT c.id, c.uuid, c.name
    FROM public.chats c
    WHERE c.id LIKE p_telefone || '@%'
       OR c.id LIKE '%' || p_telefone || '@%';
END;
$$ LANGUAGE plpgsql;

-- ===========================================
-- 6. FUNÇÃO PARA VERIFICAR SE LEAD JÁ EXISTE
-- Verifica por chat_uuid ou telefone
-- ===========================================

CREATE OR REPLACE FUNCTION check_lead_exists(p_chat_uuid UUID, p_telefone TEXT DEFAULT NULL)
RETURNS TABLE(
    lead_id UUID,
    lead_nome TEXT,
    lead_telefone TEXT,
    lead_chat_uuid UUID
) AS $$
BEGIN
    RETURN QUERY
    SELECT l.id, l.nome::TEXT, l.telefone::TEXT, l.chat_uuid
    FROM public.leads l
    WHERE l.chat_uuid = p_chat_uuid
       OR (p_telefone IS NOT NULL AND l.telefone = p_telefone);
END;
$$ LANGUAGE plpgsql;

-- ===========================================
-- 7. TRIGGER PARA AUTO-PREENCHER chat_uuid
-- Automaticamente preenche chat_uuid quando inserir registros
-- ===========================================

-- Função genérica para preencher chat_uuid
CREATE OR REPLACE FUNCTION auto_fill_chat_uuid()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.chat_uuid IS NULL AND NEW.chat_id IS NOT NULL THEN
        SELECT uuid INTO NEW.chat_uuid
        FROM public.chats
        WHERE id = NEW.chat_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para chat_assignments
DROP TRIGGER IF EXISTS trigger_auto_fill_chat_uuid_assignments ON public.chat_assignments;
CREATE TRIGGER trigger_auto_fill_chat_uuid_assignments
    BEFORE INSERT ON public.chat_assignments
    FOR EACH ROW
    EXECUTE FUNCTION auto_fill_chat_uuid();

-- Trigger para chat_notes
DROP TRIGGER IF EXISTS trigger_auto_fill_chat_uuid_notes ON public.chat_notes;
CREATE TRIGGER trigger_auto_fill_chat_uuid_notes
    BEFORE INSERT ON public.chat_notes
    FOR EACH ROW
    EXECUTE FUNCTION auto_fill_chat_uuid();

-- Trigger para chat_history
DROP TRIGGER IF EXISTS trigger_auto_fill_chat_uuid_history ON public.chat_history;
CREATE TRIGGER trigger_auto_fill_chat_uuid_history
    BEFORE INSERT ON public.chat_history
    FOR EACH ROW
    EXECUTE FUNCTION auto_fill_chat_uuid();

-- Trigger para chat_activity
DROP TRIGGER IF EXISTS trigger_auto_fill_chat_uuid_activity ON public.chat_activity;
CREATE TRIGGER trigger_auto_fill_chat_uuid_activity
    BEFORE INSERT ON public.chat_activity
    FOR EACH ROW
    EXECUTE FUNCTION auto_fill_chat_uuid();

-- Trigger para messages
DROP TRIGGER IF EXISTS trigger_auto_fill_chat_uuid_messages ON public.messages;
CREATE TRIGGER trigger_auto_fill_chat_uuid_messages
    BEFORE INSERT ON public.messages
    FOR EACH ROW
    EXECUTE FUNCTION auto_fill_chat_uuid();

-- ===========================================
-- 8. VIEW PARA CHATS COM LEAD VINCULADO
-- ===========================================

CREATE OR REPLACE VIEW public.chats_with_leads AS
SELECT 
    c.id AS chat_id,
    c.uuid AS chat_uuid,
    c.name AS chat_name,
    l.id AS lead_id,
    l.nome AS lead_nome,
    l.telefone AS lead_telefone,
    l.temperatura,
    l.status AS lead_status,
    CASE WHEN l.id IS NOT NULL THEN true ELSE false END AS has_lead
FROM public.chats c
LEFT JOIN public.leads l ON l.chat_uuid = c.uuid;

-- ===========================================
-- 9. COMENTÁRIOS FINAIS
-- ===========================================

COMMENT ON FUNCTION get_or_create_chat_uuid IS 'Retorna o UUID de um chat dado seu ID do WhatsApp';
COMMENT ON FUNCTION find_chat_by_telefone IS 'Busca chats por telefone (útil quando ID muda)';
COMMENT ON FUNCTION check_lead_exists IS 'Verifica se já existe um lead para um chat';
COMMENT ON VIEW chats_with_leads IS 'View que mostra chats com seus leads vinculados';

-- ===========================================
-- NOTAS IMPORTANTES:
-- ===========================================
-- 
-- 1. O UUID é gerado automaticamente para novos chats
-- 2. O UUID NUNCA muda, mesmo que o ID do WhatsApp mude
-- 3. Leads agora são vinculados pelo chat_uuid, não pelo chat_id
-- 4. Triggers auto-preenchem chat_uuid em inserções
-- 5. Use a view chats_with_leads para ver quais chats já têm leads
--
-- PRÓXIMOS PASSOS (no servidor/backend):
-- - Ao criar um chat, o UUID é gerado automaticamente
-- - Ao detectar que um chat @lid virou @s.whatsapp.net:
--   1. Buscar chat existente pelo telefone
--   2. Se encontrar, atualizar o ID mantendo o UUID
--   3. Se não, criar novo chat
-- ===========================================
