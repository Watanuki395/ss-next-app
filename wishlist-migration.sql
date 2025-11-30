-- Tabla de listas de deseos (Wishlists)
create table if not exists public.wishlists (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  item_name text not null,
  item_link text,
  item_price numeric,
  item_note text,
  image_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone
);

-- Habilitar Row Level Security
alter table public.wishlists enable row level security;

-- Políticas de Seguridad (RLS)

-- 1. Los usuarios pueden ver todas las wishlists (necesario para ver la de tu amigo secreto)
--    Podríamos restringirlo más adelante para que solo vean la de su amigo asignado,
--    pero por ahora "público para usuarios autenticados" es suficiente y facilita la implementación.
create policy "Authenticated users can view all wishlists"
  on public.wishlists for select
  using (auth.role() = 'authenticated');

-- 2. Los usuarios solo pueden insertar en su propia wishlist
create policy "Users can insert into own wishlist"
  on public.wishlists for insert
  with check (auth.uid() = user_id);

-- 3. Los usuarios solo pueden actualizar su propia wishlist
create policy "Users can update own wishlist"
  on public.wishlists for update
  using (auth.uid() = user_id);

-- 4. Los usuarios solo pueden eliminar de su propia wishlist
create policy "Users can delete from own wishlist"
  on public.wishlists for delete
  using (auth.uid() = user_id);

-- Índices
create index if not exists idx_wishlists_user_id on public.wishlists(user_id);

-- Trigger para updated_at
create trigger set_updated_at
  before update on public.wishlists
  for each row
  execute function public.handle_updated_at();

comment on table public.wishlists is 'Lista de deseos de los usuarios';
