CREATE DATABASE clockware;

CREATE TABLE masters(
id serial primary key,
name varchar(50) not null,
surname varchar(50) not null,
cityId integer not null REFERENCES cities,
rating numeric not null
);

CREATE TABLE services(
id serial primary key,
name varchar not null,
time time not null
);

CREATE TABLE customers(
id serial primary key,
name varchar not null,
surname varchar not null,
email citext unique not null
);

CREATE TABLE cities(
id serial primary key,
name varchar not null
);

CREATE TABLE orders(
id serial primary key,
masterId integer not null REFERENCES masters,
clientId integer not null REFERENCES clients,
serviceId integer not null REFERENCES orders,
startAt timestamp not null,
endAt timestamp not null
);


