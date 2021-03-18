create
DATABASE clockware;

create TABLE masters
(
    id      serial NOT NULL primary key,
    name    varchar(50) not null,
    surname varchar(50) not null,
    city    integer     REFERENCES cities ON delete SET NULL,
);


--select m.name, COALESCE(avg(r.rating), 5) from masters m left join rating r on
--select m.id, m.name, m.surname, ci.name as city, coalesce(round(avg(r.rating)::numeric), 5) as rating from masters m left join orders o on m.id=o.master left join cities ci on m.city = ci.id left join rating r on r.orderId = o.id where o.master=m.id group by m.id, ci.name;

create TABLE services
(
    id   serial primary key,
    name varchar not null,
    time varchar not null
);

create TABLE customers
(
    id      serial primary key,
    name    varchar       not null,
    surname varchar       not null,
    email   varchar unique not null
);

create TABLE cities
(
    id   serial primary key,
    name varchar not null unique
);


create TABLE orders (
id serial primary key,
    master   integer   REFERENCES masters ON delete SET NULL,
    customer integer   REFERENCES customers ON delete SET NULL,
    service  integer   REFERENCES services ON delete SET NULL,
    beginAt timestamp not null,
    endAt timestamp not null
);

--alter table orders rename endat to finishAt;



create TABLE admin
(
    id       uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name     VARCHAR(255) NOT NULL,
    password VARCHAR(255)      NOT NULL
);
--create extension if not exists "uuid-ossp";
--insert into admin (name, password) values ('admin', 'admin123');
-- alter table admin rename to users;
-- alter table users rename column id to token;
-- alter table users rename column name to role;
-- alter table users add column id integer;

create table users (
    id serial primary key,
    role varchar(255) not null,
        name varchar(255) not null,
    pass varchar(255) not null,
salt varchar(255) not null,
token varchar(255),
user_id integer references masters on delete set null
)

-- alter table masters add column user_id integer references users on delete set null;