CREATE TABLE table_role (
    id integer NOT NULL,
    role_name character varying
);

INSERT INTO table_role(id, role_name) VALUES (1, 'admin')
INSERT INTO table_role(id, role_name) VALUES (2, 'petugas')
INSERT INTO table_role(id, role_name) VALUES (3, 'masyarakat')