create extension if not exists pgcrypto;

create table if not exists public.prontodoc_orders (
  id uuid primary key default gen_random_uuid(),
  plan_id text not null check (plan_id in ('pdf','versions','kit','interview','vacancy','journey')),
  customer_email text,
  amount numeric(10,2) not null check (amount >= 0),
  currency text not null default 'BRL' check (currency = 'BRL'),
  status text not null default 'pending' check (status in ('pending','approved','pending_payment','rejected','cancelled','refunded')),
  mercado_pago_preference_id text,
  mercado_pago_payment_id text unique,
  external_reference text not null unique,
  access_token_hash text not null unique,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists prontodoc_orders_email_idx
  on public.prontodoc_orders (customer_email);

create index if not exists prontodoc_orders_status_idx
  on public.prontodoc_orders (status);

alter table public.prontodoc_orders enable row level security;

revoke all on table public.prontodoc_orders from anon, authenticated;
grant all on table public.prontodoc_orders to service_role;

create or replace function public.prontodoc_set_order_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists prontodoc_orders_updated_at on public.prontodoc_orders;
create trigger prontodoc_orders_updated_at
before update on public.prontodoc_orders
for each row execute function public.prontodoc_set_order_updated_at();
