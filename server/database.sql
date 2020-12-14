

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

create TABLE newOrders (
id serial primary key,
    master   integer   REFERENCES masters ON delete SET NULL,
    customer integer   REFERENCES customers ON delete SET NULL,
    service  integer   REFERENCES services ON delete SET NULL,
    beginAt timestamptz not null,
    endAt timestamptz not null
);



insert into orders (master, customer, service, orderDate, beginAt, endAt)
values (5, 27,  1, '2020-11-08', '16:00:00', '19:00:00');
insert into orders (master, customer, service, orderDate, beginAt, endAt)
values (9, 24,  2, '13/12/2020', '16:00:00', '19:00:00');
insert into newOrders (master, customer, service, beginAt, endAt)
values (9, 42,  2, 'Wed Dec 16 2020 12:14:00', '2020-12-16 16:00:00');
insert into newOrders (master, customer, service, beginAt, endAt)
values (9, 42,  2, 'Wed Dec 14 2020 12:00:00', '2020-12-14 13:00:00');

--SELECT DISTINCT ON (m.id) * FROM masters m LEFT JOIN newOrders o ON o.master = m.id where m.city= 3 AND NOT (timestamp 'Wed Dec 14 2020 12:00:00', timestamp '2020-12-14 13:00:00' ) OVERLAPS (o.beginAt, o.endAt);
			;

create TABLE admin
(
    id       uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name     VARCHAR(255) NOT NULL,
    password VARCHAR(255)      NOT NULL
);
--create extension if not exists "uuid-ossp";
--insert into admin (name, password) values ('admin', 'admin123');