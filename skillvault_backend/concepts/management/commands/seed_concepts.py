from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db import transaction
from django.contrib.auth.models import User
from concepts.models import Concept, Tag  # <-- change to your actual app name
import random
from faker import Faker

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
    def add_arguments(self, parser):
        parser.add_argument(
            '--count',
            type=int,
            default=None,
            help='Number of random concepts to generate. If not specified, seeds default concepts.'
        )

    help = "Seeds the database with realistic developer concepts"

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE("🌱 Seeding SkillVault concepts..."))

        # Create or get default user with id=1
        user, created = User.objects.get_or_create(
            id=1,
            defaults={
                "username": "default_user",
                "email": "default@skillvault.com",
                "first_name": "Default",
                "last_name": "User",
            }
        )
        num_to_create = kwargs.get('count')
        # count = 0

        if num_to_create:
            # Generate random concepts
            self.stdout.write(self.style.WARNING(f"🔄 Generating {num_to_create} random concepts..."))
            faker = Faker()
            
            # Dev-related keywords for realistic concept titles
            dev_keywords = [
                "React", "Vue", "Angular", "Django", "FastAPI", "Flask", "Node.js",
                "TypeScript", "Python", "JavaScript", "Java", "Go", "Rust",
                "API", "Database", "Cache", "Queue", "Testing", "CI/CD",
                "Docker", "Kubernetes", "GraphQL", "REST", "WebSocket", "OAuth",
                "Async", "Concurrency", "Performance", "Optimization", "Security",
                "Authentication", "Authorization", "Monitoring", "Logging", "Analytics"
            ]
            
            concepts_to_create = []
            existing_titles = set(Concept.objects.values_list('title', flat=True))
            
            for i in range(num_to_create):
                # Generate unique title with fallback to avoid infinite loops
                attempts = 0
                while attempts < 100:
                    title = f"{random.choice(dev_keywords)} - {faker.word().title()}"
                    if title not in existing_titles:
                        existing_titles.add(title)
                        break
                    attempts += 1
                else:
                    # Fallback: use index if collision happens too often
                    title = f"{random.choice(dev_keywords)} - Concept {i}"
                    existing_titles.add(title)
                
                notes = faker.sentence(nb_words=12)
                
                concepts_to_create.append(
                    Concept(
                        title=title,
                        notes=notes,
                        created_at=timezone.now(),
                        owner=user
                    )
                )
                
                # Batch create every 1000 for progress feedback
                if len(concepts_to_create) % 1000 == 0:
                    self.stdout.write(f"  ... {len(concepts_to_create)} concepts prepared")
            
            Concept.objects.bulk_create(concepts_to_create, batch_size=1000)
            count = len(concepts_to_create)
            self.stdout.write(self.style.SUCCESS(f"✅ Bulk inserted {count} random concepts!"))
        
        else:
            # Seed default realistic concepts (original behavior)
            for title, notes in REALISTIC_CONCEPTS:
                # Avoid duplicate seeds if already run
                if Concept.objects.filter(title=title).exists():
                    continue

                Concept.objects.create(
                    title=title,
                    notes=notes,
                    created_at=timezone.now(),
                    owner=user
                )
                count += 1

        self.stdout.write(self.style.SUCCESS(f"✅ Seed complete! Inserted {count} concepts."))
# CREATE OR REPLACE FUNCTION seed_skillvault()
# RETURNS void AS $$
# BEGIN
#     INSERT INTO concepts_concept (title, notes, created_at)
#     VALUES
#         ('React Hooks', 'Understanding useState, useEffect, useCallback, useMemo.', NOW()),
#         ('React Fiber Architecture', 'Concurrent rendering engine enabling interruptible work.', NOW()),
#         ('Event Loop', 'Microtasks, macrotasks, concurrency model in JS.', NOW()),
#         ('TypeScript Generics', 'Enables reusable, type-safe components.', NOW()),
#         ('JWT Authentication', 'Token-based authentication used in SkillVault backend.', NOW()),
#         ('Materialized Views', 'Precomputed data for fast analytics queries.', NOW()),
#         ('ORM Optimization', 'Using select_related and prefetch_related in Django.', NOW()),
#         ('Load Balancing', 'Layer 4 vs Layer 7, round-robin, least connections.', NOW()),
#         ('Rate Limiting', 'Token bucket and sliding windows.', NOW());

# END;
# $$ LANGUAGE plpgsql;
