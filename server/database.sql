--что делать с городом клиента? Надо его тоже добавить? Может ли это быть несколько городов, как у мастеров, или всегда один, допустим из последнего заказа?
--рейтинг мастера, видимо, какой-то очень условный?)
--подходит ли вообще такая структура?
--что, если я хочу добавить фото мастеров? надо их как-то отдельно хранить, а сюда передавать путь?
--что будет при удалении мастера или клиента? Должны вместе с этим удалиться все связанные заказы?
--для выбора свободных мастеров использовать OVERLAPS с датами-временем из заказов? или это делается каким-то другим способом?


CREATE DATABASE clockware;

CREATE TABLE masters(
id_master serial primary key,
master_name varchar(50) not null,
master_surname varchar(50) not null,
master_rating numeric not null
);

CREATE TABLE services(
id_service serial primary key,
service_name varchar not null,
service_time time not null
);

CREATE TABLE clients(
id_client serial primary key,
client_email citext unique not null,
client_name varchar not null,
client_surname varchar not null
);

CREATE TABLE cities(
id_city serial primary key,
city_name varchar not null
);

table cities_masters(
id_city REFERENCES cities,
id_master REFERENCES masters
);

CREATE TABLE orders(
id serial primary key,
id_master REFERENCES masters,
id_client REFERENCES clients,
id_service REFERENCES orders,
start_at datatime not null,
end_at datatime not null
);

