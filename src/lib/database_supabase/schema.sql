-- -----------------------------------------------------------------------------
-- 1. UTILITIES & EXTENSIONS
-- -----------------------------------------------------------------------------
create extension if not exists vector;

-- -----------------------------------------------------------------------------
-- 2. AUTHENTICATION & USERS
-- -----------------------------------------------------------------------------
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  billing_plan text default 'free',
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check ((select auth.uid()) = id);
create policy "Users can update their own profile." on public.profiles for update using ((select auth.uid()) = id);

create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 3. DOCUMENTS & VECTEURS (US MARKET CONFIG)
-- -----------------------------------------------------------------------------
create table public.documents (
  id bigserial primary key,
  content text,
  metadata jsonb,
  embedding vector(3072), -- OpenAI text-embedding-3-large
  -- ✅ REGLAGE US: On utilise 'english' pour le marché américain
  fts tsvector generated always as (to_tsvector('english', content)) stored
);

-- Index Full Text Search (Rapide)
create index on public.documents using gin (fts);

-- ✅ OPTIMISATION CRITIQUE (Le fameux Index HNSW)
create index on public.documents using hnsw (embedding vector_cosine_ops);

-- Sécurité
alter table public.documents enable row level security;
create policy "Documents are viewable by everyone" on public.documents for select using (true);
create policy "Authenticated users can insert documents" on public.documents for insert with check (auth.role() = 'authenticated');

-- -----------------------------------------------------------------------------
-- 4. FONCTIONS DE RECHERCHE
-- -----------------------------------------------------------------------------

-- A. Recherche Vectorielle (Sémantique)
create or replace function match_documents (
  query_embedding vector(3072),
  match_count int DEFAULT null,
  filter jsonb DEFAULT '{}'
) returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- B. Recherche Mots-clés (Optimisée pour l'anglais)
create or replace function kw_match_documents(query_text text, match_count int)
returns table (id bigint, content text, metadata jsonb, similarity real)
as $$
begin
    return query execute
    -- ✅ On utilise 'english' ici aussi
    format('select id, content, metadata, ts_rank(fts, plainto_tsquery(''english'', $1)) as similarity
    from documents
    where fts @@ plainto_tsquery(''english'', $1)
    order by similarity desc
    limit $2')
    using query_text, match_count;
end;
$$ language plpgsql;

-- -----------------------------------------------------------------------------
-- 5. STORAGE
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public) 
values ('user_uploads', 'user_uploads', false)
on conflict (id) do nothing;

create policy "Authenticated users can upload"
on storage.objects for insert
with check ( bucket_id = 'user_uploads' and auth.role() = 'authenticated' );

create policy "Authenticated users can view"
on storage.objects for select
using ( bucket_id = 'user_uploads' and auth.role() = 'authenticated' );
