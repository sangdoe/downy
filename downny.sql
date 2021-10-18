--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-3.pgdg18.04+1)
-- Dumped by pg_dump version 13.4 (Ubuntu 13.4-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: btree_gin; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gin WITH SCHEMA public;


--
-- Name: EXTENSION btree_gin; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gin IS 'support for indexing common datatypes in GIN';


--
-- Name: btree_gist; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;


--
-- Name: EXTENSION btree_gist; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gist IS 'support for indexing common datatypes in GiST';


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: cube; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS cube WITH SCHEMA public;


--
-- Name: EXTENSION cube; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION cube IS 'data type for multidimensional cubes';


--
-- Name: dblink; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dblink WITH SCHEMA public;


--
-- Name: EXTENSION dblink; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dblink IS 'connect to other PostgreSQL databases from within a database';


--
-- Name: dict_int; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dict_int WITH SCHEMA public;


--
-- Name: EXTENSION dict_int; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_int IS 'text search dictionary template for integers';


--
-- Name: dict_xsyn; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dict_xsyn WITH SCHEMA public;


--
-- Name: EXTENSION dict_xsyn; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_xsyn IS 'text search dictionary template for extended synonym processing';


--
-- Name: earthdistance; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS earthdistance WITH SCHEMA public;


--
-- Name: EXTENSION earthdistance; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION earthdistance IS 'calculate great-circle distances on the surface of the Earth';


--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


--
-- Name: intarray; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS intarray WITH SCHEMA public;


--
-- Name: EXTENSION intarray; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION intarray IS 'functions, operators, and index support for 1-D arrays of integers';


--
-- Name: ltree; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS ltree WITH SCHEMA public;


--
-- Name: EXTENSION ltree; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION ltree IS 'data type for hierarchical tree-like structures';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track execution statistics of all SQL statements executed';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgrowlocks; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgrowlocks WITH SCHEMA public;


--
-- Name: EXTENSION pgrowlocks; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgrowlocks IS 'show row-level locking information';


--
-- Name: pgstattuple; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgstattuple WITH SCHEMA public;


--
-- Name: EXTENSION pgstattuple; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgstattuple IS 'show tuple-level statistics';


--
-- Name: tablefunc; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS tablefunc WITH SCHEMA public;


--
-- Name: EXTENSION tablefunc; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION tablefunc IS 'functions that manipulate whole tables, including crosstab';


--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: xml2; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS xml2 WITH SCHEMA public;


--
-- Name: EXTENSION xml2; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION xml2 IS 'XPath querying and XSLT';


--
-- Name: seq_category; Type: SEQUENCE; Schema: public; Owner: liymhmjb
--

CREATE SEQUENCE public.seq_category
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_category OWNER TO liymhmjb;

SET default_tablespace = '';

--
-- Name: categories; Type: TABLE; Schema: public; Owner: liymhmjb
--

CREATE TABLE public.categories (
    id smallint DEFAULT nextval('public.seq_category'::regclass) NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.categories OWNER TO liymhmjb;

--
-- Name: seq_product_images; Type: SEQUENCE; Schema: public; Owner: liymhmjb
--

CREATE SEQUENCE public.seq_product_images
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_product_images OWNER TO liymhmjb;

--
-- Name: product_images; Type: TABLE; Schema: public; Owner: liymhmjb
--

CREATE TABLE public.product_images (
    id integer DEFAULT nextval('public.seq_product_images'::regclass) NOT NULL,
    url character varying(128) NOT NULL,
    product_id integer DEFAULT 0 NOT NULL,
    is_primary boolean DEFAULT false
);


ALTER TABLE public.product_images OWNER TO liymhmjb;

--
-- Name: seq_product; Type: SEQUENCE; Schema: public; Owner: liymhmjb
--

CREATE SEQUENCE public.seq_product
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_product OWNER TO liymhmjb;

--
-- Name: products; Type: TABLE; Schema: public; Owner: liymhmjb
--

CREATE TABLE public.products (
    id integer DEFAULT nextval('public.seq_product'::regclass) NOT NULL,
    code character varying(25) NOT NULL,
    name character varying(50) NOT NULL,
    unit character varying(6) NOT NULL,
    descriptions1 character varying(256),
    descriptions2 character varying(256),
    buy_price numeric(14,2) DEFAULT 0 NOT NULL,
    price numeric(14,2) DEFAULT 0 NOT NULL,
    retail_price numeric(14,2) DEFAULT 0 NOT NULL,
    discount numeric(8,2) DEFAULT 0 NOT NULL,
    stock numeric(8,2) DEFAULT 0 NOT NULL,
    size character varying(25) NOT NULL,
    sub_category_id smallint DEFAULT 0 NOT NULL
);


ALTER TABLE public.products OWNER TO liymhmjb;

--
-- Name: seq_sub_category; Type: SEQUENCE; Schema: public; Owner: liymhmjb
--

CREATE SEQUENCE public.seq_sub_category
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_sub_category OWNER TO liymhmjb;

--
-- Name: sub_categories; Type: TABLE; Schema: public; Owner: liymhmjb
--

CREATE TABLE public.sub_categories (
    id smallint DEFAULT nextval('public.seq_sub_category'::regclass) NOT NULL,
    name character varying(50) NOT NULL,
    category_id smallint DEFAULT 0 NOT NULL
);


ALTER TABLE public.sub_categories OWNER TO liymhmjb;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: liymhmjb
--

COPY public.categories (id, name) FROM stdin;
1	Pertanian
5	Catering
4	Cake
2	Cetakan
3	Internet
6	Fashion
\.


--
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: liymhmjb
--

COPY public.product_images (id, url, product_id, is_primary) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: liymhmjb
--

COPY public.products (id, code, name, unit, descriptions1, descriptions2, buy_price, price, retail_price, discount, stock, size, sub_category_id) FROM stdin;
\.


--
-- Data for Name: sub_categories; Type: TABLE DATA; Schema: public; Owner: liymhmjb
--

COPY public.sub_categories (id, name, category_id) FROM stdin;
1	Metan	1
2	Pupuk	1
\.


--
-- Name: seq_category; Type: SEQUENCE SET; Schema: public; Owner: liymhmjb
--

SELECT pg_catalog.setval('public.seq_category', 5, true);


--
-- Name: seq_product; Type: SEQUENCE SET; Schema: public; Owner: liymhmjb
--

SELECT pg_catalog.setval('public.seq_product', 1, false);


--
-- Name: seq_product_images; Type: SEQUENCE SET; Schema: public; Owner: liymhmjb
--

SELECT pg_catalog.setval('public.seq_product_images', 1, false);


--
-- Name: seq_sub_category; Type: SEQUENCE SET; Schema: public; Owner: liymhmjb
--

SELECT pg_catalog.setval('public.seq_sub_category', 1, false);


--
-- Name: categories pk_categories; Type: CONSTRAINT; Schema: public; Owner: liymhmjb
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT pk_categories PRIMARY KEY (id);


--
-- Name: products pk_product; Type: CONSTRAINT; Schema: public; Owner: liymhmjb
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT pk_product PRIMARY KEY (id);


--
-- Name: product_images pk_product_images; Type: CONSTRAINT; Schema: public; Owner: liymhmjb
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT pk_product_images PRIMARY KEY (id);


--
-- Name: sub_categories pk_sub_categories; Type: CONSTRAINT; Schema: public; Owner: liymhmjb
--

ALTER TABLE ONLY public.sub_categories
    ADD CONSTRAINT pk_sub_categories PRIMARY KEY (id);


--
-- Name: uq_category_id; Type: INDEX; Schema: public; Owner: liymhmjb
--

CREATE INDEX uq_category_id ON public.sub_categories USING btree (category_id);


--
-- Name: uq_sub_category_id; Type: INDEX; Schema: public; Owner: liymhmjb
--

CREATE INDEX uq_sub_category_id ON public.products USING btree (sub_category_id);


--
-- Name: product_images fk_product_images; Type: FK CONSTRAINT; Schema: public; Owner: liymhmjb
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT fk_product_images FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sub_categories fk_sub_category; Type: FK CONSTRAINT; Schema: public; Owner: liymhmjb
--

ALTER TABLE ONLY public.sub_categories
    ADD CONSTRAINT fk_sub_category FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products fk_sub_category_product; Type: FK CONSTRAINT; Schema: public; Owner: liymhmjb
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_sub_category_product FOREIGN KEY (sub_category_id) REFERENCES public.sub_categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

