-- This is an empty migration.
ALTER TABLE modules ADD CONSTRAINT chk_update_at CHECK (updated_at >= created_at);   

ALTER TABLE modules ADD CONSTRAINT chk_nome CHECK (length(name) > 3);