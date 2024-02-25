DROP TABLE IF EXISTS setting;
CREATE TABLE setting
(
    name  text NOT NULL,
    value text,
    CONSTRAINT setting_pkey PRIMARY KEY (name)
);
