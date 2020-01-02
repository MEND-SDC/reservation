-- DROP SCHEMA IF EXISTS mend CASCADE;
-- CREATE SCHEMA mend;

DROP DATABASE IF EXISTS reservations;
CREATE DATABASE reservations;

\c reservations;

DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    birthday DATE
);

DROP TABLE IF EXISTS listings;
CREATE TABLE listings(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price_base MONEY,
    price_weekend MONEY,
    price_holiday MONEY,
    price_guest MONEY,
    price_cleaning MONEY,
    price_service MONEY,
    max_guests INTEGER,
    min_nights INTEGER,
    max_nights INTEGER,
    rating_average INTEGER,
    review_count INTEGER,
    country VARCHAR(2)
);

DROP TABLE IF EXISTS reservations;
CREATE TABLE reservations(
    id SERIAL PRIMARY KEY,
    listing_id INTEGER REFERENCES listings(id),
    user_id INTEGER REFERENCES users(id),
    start_date DATE,
    end_date DATE,
    adult_count INTEGER,
    child_count INTEGER,
    infant_count INTEGER,
    total_payment MONEY
);

-- CREATE TABLE mend.reviews(
--   id SERIAL PRIMARY KEY,
--   listing_id INTEGER REFERENCES rooms(id),
--   user_id INTEGER REFERENCES users(id),
--   rating INTEGER,
--   comment TEXT
-- );