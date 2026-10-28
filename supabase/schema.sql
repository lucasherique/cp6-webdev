-- Rode no Supabase: SQL Editor > New query > cole tudo > Run

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 200),
  message text not null check (char_length(message) between 20 and 1000),
  replied boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.messages enable row level security;

-- Qualquer visitante pode ENVIAR; só quem está logado (o dono) pode LER e ATUALIZAR.
create policy "visitantes enviam mensagens" on public.messages
  for insert to anon, authenticated with check (true);
create policy "dono le mensagens" on public.messages
  for select to authenticated using (true);
create policy "dono atualiza mensagens" on public.messages
  for update to authenticated using (true) with check (true);

create table if not exists public.featured_repos (
  repo_name text primary key
);
alter table public.featured_repos enable row level security;

create policy "todos leem destaques" on public.featured_repos
  for select to anon, authenticated using (true);
create policy "dono insere destaques" on public.featured_repos
  for insert to authenticated with check (true);
create policy "dono remove destaques" on public.featured_repos
  for delete to authenticated using (true);
