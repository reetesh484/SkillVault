from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db import transaction
from concepts.models import Concept  # <-- change to your actual app name

REALISTIC_CONCEPTS = [
    ("React Hooks", "Understanding useState, useEffect, useCallback, useMemo, and custom hooks."),
    ("React Fiber Architecture", "Concurrent rendering engine enabling interruptible work."),
    ("React Suspense", "Mechanism to pause UI while waiting for async data."),
    ("Event Loop", "Microtasks, macrotasks, call stack, concurrency model."),
    ("Closures", "Functions that remember their lexical environment."),
    ("Promises & Async", "resolve/reject, chaining, async/await."),
    ("TypeScript Generics", "Reusable type-safe components and APIs."),
    ("JWT Authentication", "Token-based authentication using SimpleJWT."),
    ("ORM Optimization", "Using select_related and prefetch_related."),
    ("Materialized Views", "Precomputed read-optimized data in Postgres."),
    ("Load Balancing", "L4 vs L7, round-robin, least connections."),
    ("Caching Strategies", "Write-through, write-back, cache invalidation."),
    ("E2E Testing", "Full flow automation with Playwright or Cypress."),
    ("Rate Limiting", "Token bucket and sliding window algorithms."),
    ("Virtualized Lists", "Rendering only visible rows using react-window."),
]

class Command(BaseCommand):
    help = "Seeds the database with realistic developer concepts"

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE("🌱 Seeding SkillVault concepts..."))

        count = 0
        now = timezone.now()

        for title, notes in REALISTIC_CONCEPTS:
            # Avoid duplicate seeds if already run
            if Concept.objects.filter(title=title).exists():
                continue

            Concept.objects.create(
                title=title,
                notes=notes,
                created_at=now,
            )
            count += 1

        self.stdout.write(self.style.SUCCESS(f"✅ Seed complete! Inserted {count} concepts."))
CREATE OR REPLACE FUNCTION seed_skillvault()
RETURNS void AS $$
BEGIN
    INSERT INTO concepts_concept (title, notes, created_at)
    VALUES
        ('React Hooks', 'Understanding useState, useEffect, useCallback, useMemo.', NOW()),
        ('React Fiber Architecture', 'Concurrent rendering engine enabling interruptible work.', NOW()),
        ('Event Loop', 'Microtasks, macrotasks, concurrency model in JS.', NOW()),
        ('TypeScript Generics', 'Enables reusable, type-safe components.', NOW()),
        ('JWT Authentication', 'Token-based authentication used in SkillVault backend.', NOW()),
        ('Materialized Views', 'Precomputed data for fast analytics queries.', NOW()),
        ('ORM Optimization', 'Using select_related and prefetch_related in Django.', NOW()),
        ('Load Balancing', 'Layer 4 vs Layer 7, round-robin, least connections.', NOW()),
        ('Rate Limiting', 'Token bucket and sliding windows.', NOW());

END;
$$ LANGUAGE plpgsql;
