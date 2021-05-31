CREATE TABLE table_users (
    id integer NOT NULL,
    nama character varying NOT NULL,
    nip character varying,
    "no_HP" character varying NOT NULL,
    password character varying NOT NULL,
    username character varying NOT NULL,
    email character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    "tableRoleId" integer
);


(id, nama, nip, "no_HP", password, username, email, "createdAt", "updatedAt", "deletedAt", "tableRoleId"
1	Sarah	\N	082276730137	sarah123	sarahchrstne	sarah@gmail.com	2021-05-19 00:00:00+07	2021-05-19 16:52:36+07	\N	3