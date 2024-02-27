/*==============================================================*/
/* DBMS name:      ORACLE Version 11g                           */
/* Created on:     26/02/2024 7:23:38                           */
/*==============================================================*/


alter table CITA
   drop constraint FK_CITA_ATIENDE_DOCTOR;

alter table CITA
   drop constraint FK_CITA_REGISTRA_RECEPCIO;

alter table CITA
   drop constraint FK_CITA_SOLICITA_PACIENTE;

alter table DIAGNOSTICO
   drop constraint FK_DIAGNOST_CONTIENE_FICHA_ME;

alter table DIAGNOSTICO
   drop constraint FK_DIAGNOST_GENERA_TRATAMIE;

alter table DOCTOR
   drop constraint FK_DOCTOR_POSEE_USUARIO;

alter table PACIENTE
   drop constraint FK_PACIENTE_TIENE_FICHA_ME;

alter table PADECE
   drop constraint FK_PADECE_PADECE_ENFERMED;

alter table PADECE
   drop constraint FK_PADECE_PADECE2_FICHA_ME;

alter table PRESENTA
   drop constraint FK_PRESENTA_PRESENTA_ALERGIA;

alter table PRESENTA
   drop constraint FK_PRESENTA_PRESENTA2_FICHA_ME;

alter table RECEPCIONISTA
   drop constraint FK_RECEPCIO_CUENTA_CO_USUARIO;

alter table USUARIO
   drop constraint FK_USUARIO_SE_REGIST_SEDE;

drop table ALERGIA cascade constraints;

drop index REGISTRA_FK;

drop index ATIENDE_FK;

drop index SOLICITA_FK;

drop table CITA cascade constraints;

drop index GENERA_FK;

drop index CONTIENE_FK;

drop table DIAGNOSTICO cascade constraints;

drop index POSEE_FK;

drop table DOCTOR cascade constraints;

drop table ENFERMEDAD cascade constraints;

drop table FICHA_MEDICA cascade constraints;

drop index TIENE_FK;

drop table PACIENTE cascade constraints;

drop index PADECE_FK;

drop index PADECE2_FK;

drop table PADECE cascade constraints;

drop index PRESENTA_FK;

drop index PRESENTA2_FK;

drop table PRESENTA cascade constraints;

drop index CUENTA_CON_FK;

drop table RECEPCIONISTA cascade constraints;

drop table SEDE cascade constraints;

drop table TRATAMIENTO cascade constraints;

drop index SE_REGISTRA_FK;

drop table USUARIO cascade constraints;

/*==============================================================*/
/* Table: ALERGIA                                               */
/*==============================================================*/
create table ALERGIA 
(
   ALE_CODIGO           NUMBER               not null,
   ALE_DESCRIPCION      VARCHAR2(60),
   constraint PK_ALERGIA primary key (ALE_CODIGO)
);

comment on table ALERGIA is
'Esta tabla almacena información sobre diferentes tipos de alergias.';

/*==============================================================*/
/* Table: CITA                                                  */
/*==============================================================*/
create table CITA 
(
   PAC_CODIGO           VARCHAR2(10)         not null,
   DOC_CODIGO           VARCHAR2(10)         not null,
   REC_CODIGO           NUMBER               not null,
   CIT_HORA             DATE,
   CIT_FECHA            DATE,
   CIT_ESTADO           VARCHAR2(30),
   constraint PK_CITA primary key (PAC_CODIGO, DOC_CODIGO, REC_CODIGO)
);

comment on table CITA is
'Esta tabla registra las citas programadas. ';

/*==============================================================*/
/* Index: SOLICITA_FK                                           */
/*==============================================================*/
create index SOLICITA_FK on CITA (
   PAC_CODIGO ASC
);

/*==============================================================*/
/* Index: ATIENDE_FK                                            */
/*==============================================================*/
create index ATIENDE_FK on CITA (
   DOC_CODIGO ASC
);

/*==============================================================*/
/* Index: REGISTRA_FK                                           */
/*==============================================================*/
create index REGISTRA_FK on CITA (
   REC_CODIGO ASC
);

/*==============================================================*/
/* Table: DIAGNOSTICO                                           */
/*==============================================================*/
create table DIAGNOSTICO 
(
   DIA_CODIGO           VARCHAR2(10)         not null,
   FIC_CODIGO           VARCHAR2(10),
   TRA_CODIGO           VARCHAR2(10)         not null,
   DIA_DESCIPCION       VARCHAR2(100),
   constraint PK_DIAGNOSTICO primary key (DIA_CODIGO)
);

comment on table DIAGNOSTICO is
'Almacena información sobre los diagnósticos médicos realizados a los pacientes';

/*==============================================================*/
/* Index: CONTIENE_FK                                           */
/*==============================================================*/
create index CONTIENE_FK on DIAGNOSTICO (
   FIC_CODIGO ASC
);

/*==============================================================*/
/* Index: GENERA_FK                                             */
/*==============================================================*/
create index GENERA_FK on DIAGNOSTICO (
   TRA_CODIGO ASC
);

/*==============================================================*/
/* Table: DOCTOR                                                */
/*==============================================================*/
create table DOCTOR 
(
   DOC_CODIGO           VARCHAR2(10)         not null,
   USU_CODIGO           VARCHAR2(10)         not null,
   DOC_NOMBRE           VARCHAR2(50),
   DOC_CEDULA           VARCHAR2(10),
   DOC_ESPECIALIDAD     VARCHAR2(10),
   DOC_SALARIO          VARCHAR2(10),
   constraint PK_DOCTOR primary key (DOC_CODIGO)
);

comment on table DOCTOR is
'Esta entidad corresponde a un médico fisioterapista dentro del centro médico.';

/*==============================================================*/
/* Index: POSEE_FK                                              */
/*==============================================================*/
create index POSEE_FK on DOCTOR (
   USU_CODIGO ASC
);

/*==============================================================*/
/* Table: ENFERMEDAD                                            */
/*==============================================================*/
create table ENFERMEDAD 
(
   ENF_CODIGO           NUMBER               not null,
   ENF_DECRIPCION       VARCHAR2(70),
   constraint PK_ENFERMEDAD primary key (ENF_CODIGO)
);

comment on table ENFERMEDAD is
' Almacena información sobre diferentes enfermedades que padecen los pacientes
.';

/*==============================================================*/
/* Table: FICHA_MEDICA                                          */
/*==============================================================*/
create table FICHA_MEDICA 
(
   FIC_CODIGO           VARCHAR2(10)         not null,
   FIC_TIPO_SANGRE      VARCHAR2(10),
   FIC_PESO             NUMBER(8,2),
   FIC_ALTURA           NUMBER(8,2),
   constraint PK_FICHA_MEDICA primary key (FIC_CODIGO)
);

/*==============================================================*/
/* Table: PACIENTE                                              */
/*==============================================================*/
create table PACIENTE 
(
   PAC_CODIGO           VARCHAR2(10)         not null,
   FIC_CODIGO           VARCHAR2(10)         not null,
   PAC_CEDULA           VARCHAR2(10),
   PAC_NOMBRE           VARCHAR2(50),
   PAC_FECHA_NACIMIENTO DATE,
   PAC_TELEFONO         VARCHAR2(10),
   PAC_DIRECCION        VARCHAR2(50),
   constraint PK_PACIENTE primary key (PAC_CODIGO)
);

comment on table PACIENTE is
'Esta entidad corresponde a la persona que necesita la atención médica.';

/*==============================================================*/
/* Index: TIENE_FK                                              */
/*==============================================================*/
create index TIENE_FK on PACIENTE (
   FIC_CODIGO ASC
);

/*==============================================================*/
/* Table: PADECE                                                */
/*==============================================================*/
create table PADECE 
(
   FIC_CODIGO           VARCHAR2(10)         not null,
   ENF_CODIGO           NUMBER               not null,
   PAD_FECHA            DATE,
   PAD_ESTADO           VARCHAR2(30),
   constraint PK_PADECE primary key (FIC_CODIGO, ENF_CODIGO)
);

/*==============================================================*/
/* Index: PADECE2_FK                                            */
/*==============================================================*/
create index PADECE2_FK on PADECE (
   FIC_CODIGO ASC
);

/*==============================================================*/
/* Index: PADECE_FK                                             */
/*==============================================================*/
create index PADECE_FK on PADECE (
   ENF_CODIGO ASC
);

/*==============================================================*/
/* Table: PRESENTA                                              */
/*==============================================================*/
create table PRESENTA 
(
   FIC_CODIGO           VARCHAR2(10)         not null,
   ALE_CODIGO           NUMBER               not null,
   PRE_FECHA            DATE,
   PRE_ESTADO           VARCHAR2(30),
   constraint PK_PRESENTA primary key (FIC_CODIGO, ALE_CODIGO)
);

/*==============================================================*/
/* Index: PRESENTA2_FK                                          */
/*==============================================================*/
create index PRESENTA2_FK on PRESENTA (
   FIC_CODIGO ASC
);

/*==============================================================*/
/* Index: PRESENTA_FK                                           */
/*==============================================================*/
create index PRESENTA_FK on PRESENTA (
   ALE_CODIGO ASC
);

/*==============================================================*/
/* Table: RECEPCIONISTA                                         */
/*==============================================================*/
create table RECEPCIONISTA 
(
   REC_CODIGO           NUMBER               not null,
   USU_CODIGO           VARCHAR2(10)         not null,
   REC_NOMBRE           VARCHAR2(50),
   REC_TELEFONO         VARCHAR2(10),
   REC_DIRECCION        VARCHAR2(50),
   constraint PK_RECEPCIONISTA primary key (REC_CODIGO)
);

comment on table RECEPCIONISTA is
'Esta entidad corresponde a un recepcionista, quien atiende el centro médico.';

/*==============================================================*/
/* Index: CUENTA_CON_FK                                         */
/*==============================================================*/
create index CUENTA_CON_FK on RECEPCIONISTA (
   USU_CODIGO ASC
);

/*==============================================================*/
/* Table: SEDE                                                  */
/*==============================================================*/
create table SEDE 
(
   SED_CODIGO           NUMBER               not null,
   SED_DESCRIPCION      VARCHAR2(70),
   SED_DIRECCION        VARCHAR2(50),
   constraint PK_SEDE primary key (SED_CODIGO)
);

/*==============================================================*/
/* Table: TRATAMIENTO                                           */
/*==============================================================*/
create table TRATAMIENTO 
(
   TRA_CODIGO           VARCHAR2(10)         not null,
   TRA_DESCRIPCION      VARCHAR2(50),
   constraint PK_TRATAMIENTO primary key (TRA_CODIGO)
);

comment on table TRATAMIENTO is
'Contiene información sobre los tratamientos médicos recomendados para los pacientes. 
';

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO 
(
   USU_CODIGO           VARCHAR2(10)         not null,
   SED_CODIGO           NUMBER               not null,
   USU_USUARIO          VARCHAR2(30),
   USU_CLAVE            VARCHAR2(100),
   USU_ROL              VARCHAR2(30),
   constraint PK_USUARIO primary key (USU_CODIGO)
);

/*==============================================================*/
/* Index: SE_REGISTRA_FK                                        */
/*==============================================================*/
create index SE_REGISTRA_FK on USUARIO (
   SED_CODIGO ASC
);

alter table CITA
   add constraint FK_CITA_ATIENDE_DOCTOR foreign key (DOC_CODIGO)
      references DOCTOR (DOC_CODIGO);

alter table CITA
   add constraint FK_CITA_REGISTRA_RECEPCIO foreign key (REC_CODIGO)
      references RECEPCIONISTA (REC_CODIGO);

alter table CITA
   add constraint FK_CITA_SOLICITA_PACIENTE foreign key (PAC_CODIGO)
      references PACIENTE (PAC_CODIGO);

alter table DIAGNOSTICO
   add constraint FK_DIAGNOST_CONTIENE_FICHA_ME foreign key (FIC_CODIGO)
      references FICHA_MEDICA (FIC_CODIGO);

alter table DIAGNOSTICO
   add constraint FK_DIAGNOST_GENERA_TRATAMIE foreign key (TRA_CODIGO)
      references TRATAMIENTO (TRA_CODIGO);

alter table DOCTOR
   add constraint FK_DOCTOR_POSEE_USUARIO foreign key (USU_CODIGO)
      references USUARIO (USU_CODIGO);

alter table PACIENTE
   add constraint FK_PACIENTE_TIENE_FICHA_ME foreign key (FIC_CODIGO)
      references FICHA_MEDICA (FIC_CODIGO);

alter table PADECE
   add constraint FK_PADECE_PADECE_ENFERMED foreign key (ENF_CODIGO)
      references ENFERMEDAD (ENF_CODIGO);

alter table PADECE
   add constraint FK_PADECE_PADECE2_FICHA_ME foreign key (FIC_CODIGO)
      references FICHA_MEDICA (FIC_CODIGO);

alter table PRESENTA
   add constraint FK_PRESENTA_PRESENTA_ALERGIA foreign key (ALE_CODIGO)
      references ALERGIA (ALE_CODIGO);

alter table PRESENTA
   add constraint FK_PRESENTA_PRESENTA2_FICHA_ME foreign key (FIC_CODIGO)
      references FICHA_MEDICA (FIC_CODIGO);

alter table RECEPCIONISTA
   add constraint FK_RECEPCIO_CUENTA_CO_USUARIO foreign key (USU_CODIGO)
      references USUARIO (USU_CODIGO);

alter table USUARIO
   add constraint FK_USUARIO_SE_REGIST_SEDE foreign key (SED_CODIGO)
      references SEDE (SED_CODIGO);

