-- Migración de Firebase a Supabase
-- Ejecuta este script en el SQL Editor de Supabase Dashboard

-- Habilitar la extensión UUID si no está habilitada
create extension if not exists "uuid-ossp";

-- Tabla de usuarios
-- Esta tabla almacena información adicional del usuario además de auth.users
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  fname text not null,
  lname text not null,
  games text[] default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone
);

-- Habilitar Row Level Security
alter table public.users enable row level security;

-- Políticas para la tabla users
-- Los usuarios pueden leer su propia información
create policy "Users can view own data"
  on public.users for select
  using (auth.uid() = id);

-- Los usuarios pueden actualizar su propia información
create policy "Users can update own data"
  on public.users for update
  using (auth.uid() = id);

-- Permitir inserción durante el registro
create policy "Users can insert own data"
  on public.users for insert
  with check (auth.uid() = id);

-- Tabla de juegos
create table if not exists public.games (
  id uuid default uuid_generate_v4() primary key,
  game_name text not null,
  game_description text,
  date_of_game timestamp with time zone not null,
  game_amount integer not null,
  game_active boolean default null,
  game_id text unique not null,
  players jsonb default '[]'::jsonb,
  created_at timestamp with time zone default now(),
  created_by uuid references auth.users on delete cascade,
  updated_at timestamp with time zone,
  updated_by uuid references auth.users
);

-- Habilitar Row Level Security
alter table public.games enable row level security;

-- Políticas para la tabla games
-- Los usuarios pueden ver juegos en los que participan
create policy "Users can view games they participate in"
  on public.games for select
  using (
    auth.uid() = created_by or
    exists (
      select 1 from jsonb_array_elements(players) as player
      where player->>'id' = auth.uid()::text
    )
  );

-- Los creadores pueden actualizar sus juegos
create policy "Creators can update their games"
  on public.games for update
  using (auth.uid() = created_by);

-- Los usuarios autenticados pueden crear juegos
create policy "Authenticated users can create games"
  on public.games for insert
  with check (auth.uid() = created_by);

-- Los creadores pueden eliminar sus juegos
create policy "Creators can delete their games"
  on public.games for delete
  using (auth.uid() = created_by);

-- Índices para mejorar el rendimiento
create index if not exists idx_games_created_by on public.games(created_by);
create index if not exists idx_games_game_id on public.games(game_id);
create index if not exists idx_users_games on public.users using gin(games);

-- Función para actualizar updated_at automáticamente
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger para actualizar updated_at en users
create trigger set_updated_at
  before update on public.users
  for each row
  execute function public.handle_updated_at();

-- Trigger para actualizar updated_at en games
create trigger set_updated_at
  before update on public.games
  for each row
  execute function public.handle_updated_at();

-- Función para crear usuario en la tabla users después del registro
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, fname, lname, created_at)
  values (new.id, '', '', now())
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger para crear usuario automáticamente
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Comentarios para documentación
comment on table public.users is 'Información adicional de usuarios';
comment on table public.games is 'Juegos de intercambio de regalos';
comment on column public.games.players is 'Array JSON de jugadores con estructura: [{id, userName, playing}]';
