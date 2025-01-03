CREATE DATABASE brewit_db;
CREATE USER brewit_user WITH PASSWORD 'heineken2';
ALTER ROLE brewit_user SET client_encoding TO 'utf8';
ALTER ROLE brewit_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE brewit_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE brewit_db TO brewit_user;