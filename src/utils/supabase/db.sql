-- create a table for costumers
CREATE TABLE costumers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  address text NOT NULL,
  phone text NOT NULL,
  phone2 text NOT NULL,
  email text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

alter table costumers enable row level security;

create policy "costumers are viewed by anyone" on costumers for select using (true);

create policy "costumers are inserted by admin" on costumers for insert with check (auth.jwt() ->> 'is_admin' = 'true');

-- Create a table for cars
CREATE TABLE cars (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  make text NOT NULL,
  model text NOT NULL,
  plate text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

alter table cars enable row level security;

create policy "cars are viewed by anyone" on cars for select using (true);

create policy "cars are inserted by admin" on cars for insert with check (auth.jwt() ->> 'is_admin' = 'true');

-- Create a table for users
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  is_admin boolean NOT NULL DEFAULT false,
  email text NOT NULL,
  password text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

alter table users enable row level security;

create policy "users are viewed by anyone" on users for select using (true);

create policy "users can update own record" on users for update using (users.id =  auth.uid());

-- Create a table for pericias
CREATE TABLE pericias (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  date timestamp with time zone NOT NULL DEFAULT now(),
  id_car uuid NOT NULL,
  id_costumer uuid NOT NULL,
  price_per_working_hour numeric NOT NULL default 0,
  cofano jsonb NOT NULL default '{}'::jsonb,
  tetto jsonb NOT NULL default '{}'::jsonb,
  parafango_ad jsonb NOT NULL default '{}'::jsonb,
  porta_ad jsonb NOT NULL default '{}'::jsonb,
  porta_pd jsonb NOT NULL default '{}'::jsonb,
  parafango_pd jsonb NOT NULL default '{}'::jsonb,
  piazone_d jsonb NOT NULL default '{}'::jsonb,
  piazone_s jsonb NOT NULL default '{}'::jsonb,
  sportello_s jsonb NOT NULL default '{}'::jsonb,
  sportello_i jsonb NOT NULL default '{}'::jsonb,
  parafango_as jsonb NOT NULL default '{}'::jsonb,
  porta_as jsonb NOT NULL default '{}'::jsonb,
  porta_ps jsonb NOT NULL default '{}'::jsonb,
  parafango_ps jsonb NOT NULL default '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),

constraint fk_pericias_car
    foreign key (id_car)
    references cars (id)
    on delete cascade
    on update cascade,

constraint fk_pericias_costumer
    foreign key (id_costumer)
    references costumers (id)
);

-- Create a bridge table for users and pericias
CREATE TABLE users_pericias (
  id_user uuid NOT NULL,
  id_pericia uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),

constraint fk_users_pericia_user
    foreign key (id_user)
    references users (id),

constraint fk_users_pericia_pericia
    foreign key (id_pericia)
    references pericias (id)
);

alter table users_pericias enable row level security;

create policy "users_pericias are viewed by anyone" on users_pericias for select using (true);

create policy "users_pericias are inserted by admin" on users_pericias for insert with check (auth.jwt() ->> 'is_admin' = 'true');

alter table pericias enable row level security;

create policy "pericias are viewed by allowed users" on pericias for select using (
    (SELECT id_user FROM users_pericias WHERE id_pericia = pericias.id) = auth.uid()
);