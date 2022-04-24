

create table ESTUDANTE(
   id varchar(255) primary key,
   nome varchar(255) not null,
   email varchar(255) not null unique,
   data_nasc date not null,
   turma_id varchar(255) NOT NULL,
   FOREIGN KEY (turma_id) REFERENCES TURMA (id)
);

CREATE TABLE TURMA(
  id VARCHAR(255) primary key,
  nome varchar(255),
  modulo varchar(255) default 0
);

create table HOBBY(
  id varchar(255) primary key,
  nome varchar(255) not null unique
);

create table ESPECIALIDADE(
  id varchar(255) primary key,
  nome varchar(255) not null unique
);

create table ESTUDANTE_HOBBY(
  id varchar(255) primary key,
  estudante_id varchar(255) not null,
  hobby_id varchar(255) not null,
  FOREIGN KEY (estudante_id) REFERENCES ESTUDANTE(id),
  FOREIGN KEY (hobby_id) REFERENCES HOBBY(id)
);


create table DOCENTE(
  id varchar(255) primary key,
  nome varchar(255) not null,
  email varchar(255) not null unique,
  data_nasc DATE not null,
  turma_id varchar(255) not null,
  foreign key (turma_id) references TURMA (id)
);


create table DOCENTE_ESPECIALIDADE(
   id varchar(255) primary key,
   docente_id varchar(255) not null,
   especialidade_id varchar(255) not null,
   foreign key (docente_id) references DOCENTE (id),
   foreign key (especialidade_id) references ESPECIALIDADE (id)
);