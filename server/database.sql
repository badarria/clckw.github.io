

CREATE
DATABASE clockware;

CREATE TABLE masters
(
    id      serial NOT NULL primary key,
    name    varchar(50) not null,
    surname varchar(50) not null,
    city    integer     REFERENCES cities ON DELETE SET NULL,
    rating  numeric     not null
);

CREATE TABLE services
(
    id   serial primary key,
    name varchar not null,
    time varchar not null
);

CREATE TABLE customers
(
    id      serial primary key,
    name    varchar       not null,
    surname varchar       not null,
    email   varchar unique not null
);

CREATE TABLE cities
(
    id   serial primary key,
    name varchar not null unique
);

CREATE TABLE orders
(
    id         serial primary key,
    masterId   integer   REFERENCES masters ON DELETE SET NULL,
    customerId integer   REFERENCES customers ON DELETE SET NULL,
    cityId     integer   REFERENCES cities ON DELETE SET NULL,
    serviceId  integer   REFERENCES services ON DELETE SET NULL,
    startAt    timestamp not null,
    endAt      timestamp not null
);

insert into orders (masterId, customerId, cityId, serviceId, startAt, endAt)
values (3, 17, 2, 1, '2020-11-08 16:00:00', '2020-11-08 19:00:00');
insert into orders (masterId, customerId, cityId, serviceId, startAt, endAt)
values (3, 16, 2, 2, '2020-11-09 15:00:00', '2020-11-09 17:00:00');
insert into orders (masterId, customerId, cityId, serviceId, startAt, endAt)
values (3, 16, 2, 3, '2020-11-09 17:00:00', '2020-11-09 18:00:00');


CREATE TABLE admin
(
    id       uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name     VARCHAR(255) NOT NULL,
    password VARCHAR(255)      NOT NULL
);
--create extension if not exists "uuid-ossp";
--insert into admin (name, password) values ('admin', 'admin123');