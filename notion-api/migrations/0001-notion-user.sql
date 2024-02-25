DROP TABLE IF EXISTS notion_user;
CREATE TABLE notion_user
(
    id     text NOT NULL,
    email  text,
    name   text,
    avatar text,
    CONSTRAINT notion_user_pkey PRIMARY KEY (id)
);
