-- This is an empty migration.
ALTER TABLE courses ADD CONSTRAINT chk_duration CHECK (duration > 0);

ALTER TABLE courses ADD CONSTRAINT chk_update_at CHECK (updated_at >= created_at);

ALTER TABLE courses ADD CONSTRAINT chk_nome CHECK (length(name) > 3);