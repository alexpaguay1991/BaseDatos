--create database link esclavo 1
CREATE DATABASE LINK PROYECTO1
CONNECT TO replica1 IDENTIFIED BY replica1
USING '
(DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = TCP)(HOST = DESKTOP-P3AQF06)(PORT = 1521))
    )
    (CONNECT_DATA =
      (SERVICE_NAME = ESPE)
    )
  )
';
--create database link esclavo 2
CREATE DATABASE LINK PROYECTO2
CONNECT TO replica1 IDENTIFIED BY replica1
USING '
(DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = TCP)(HOST = Samuel)(PORT = 1521))
    )
    (CONNECT_DATA =
      (SERVICE_NAME = ORCL)
    )
  )
';