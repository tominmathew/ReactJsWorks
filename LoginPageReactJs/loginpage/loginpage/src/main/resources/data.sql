CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS all_languages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO skills (name) VALUES ('Java');
INSERT INTO skills (name) VALUES ('SpringBoot');
INSERT INTO skills (name) VALUES ('Hibernate ORM');
INSERT INTO skills (name) VALUES ('JavaScript');
INSERT INTO skills (name) VALUES ('ReactJS');
INSERT INTO skills (name) VALUES ('MySQL');
INSERT INTO skills (name) VALUES ('ElasticSearch');
INSERT INTO skills (name) VALUES ('Logstash');
INSERT INTO skills (name) VALUES ('Kibana');
INSERT INTO skills (name) VALUES ('Grafana');
INSERT INTO skills (name) VALUES ('Prometheus');
INSERT INTO skills (name) VALUES ('AWS');

INSERT INTO all_languages (name) VALUES ('Malayalam');
INSERT INTO all_languages (name) VALUES ('English');
INSERT INTO all_languages (name) VALUES ('Spanish');
INSERT INTO all_languages (name) VALUES ('French');
INSERT INTO all_languages (name) VALUES ('Italian');
INSERT INTO all_languages (name) VALUES ('Portuguese');
INSERT INTO all_languages (name) VALUES ('Chinese');
INSERT INTO all_languages (name) VALUES ('Korean');
INSERT INTO all_languages (name) VALUES ('Japanese');
