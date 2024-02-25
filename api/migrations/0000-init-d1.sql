DROP TABLE IF EXISTS foo;
CREATE TABLE foo
(
    id   serial NOT NULL,
    name text,
    CONSTRAINT foo_pkey PRIMARY KEY (id)
);
