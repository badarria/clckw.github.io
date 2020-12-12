

create
DATABASE clockware;

create TABLE masters
(
    id      serial NOT NULL primary key,
    name    varchar(50) not null,
    surname varchar(50) not null,
    city    integer     REFERENCES cities ON delete SET NULL,
    rating  numeric     not null
);

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

create TABLE orders
(
    id         serial primary key,
    master   integer   REFERENCES masters ON delete SET NULL,
    customer integer   REFERENCES customers ON delete SET NULL,
    service  integer   REFERENCES services ON delete SET NULL,
    orderDate date not null,
    beginAt   time not null,
    endAt     time not null
);

insert into orders (master, customer, service, orderDate, beginAt, endAt)
values (5, 27,  1, '2020-11-08', '16:00:00', '19:00:00');
insert into orders (master, customer, service, orderDate, beginAt, endAt)
values (9, 24,  2, '13/12/2020', '16:00:00', '19:00:00');
insert into orders (master, customer, service, orderDate, beginAt, endAt)
values (9, 24,  2, '2020-12-13', '15:00:00', '16:00:00');

create TABLE admin
(
    id       uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name     VARCHAR(255) NOT NULL,
    password VARCHAR(255)      NOT NULL
);
--create extension if not exists "uuid-ossp";
--insert into admin (name, password) values ('admin', 'admin123');