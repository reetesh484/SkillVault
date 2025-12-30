CREATE OR REPLACE FUNCTION seed_skillvault()
RETURNS void AS $$
BEGIN
    -- Insert only if not already seeded
    IF (SELECT COUNT(*) FROM concepts_concept) = 0 THEN

        INSERT INTO concepts_concept (title, notes, created_at)
        VALUES
            ('React Hooks', 'Understanding useState, useEffect, useCallback, useMemo.', NOW()),
            ('React Fiber Architecture', 'Concurrent rendering engine enabling interruptible work.', NOW()),
            ('Event Loop', 'Microtasks, macrotasks, concurrency model in JS.', NOW()),
            ('TypeScript Generics', 'Enables reusable, type-safe components.', NOW()),
            ('JWT Authentication', 'Token-based authentication used in SkillVault backend.', NOW());

    END IF;
END;
$$ LANGUAGE plpgsql;