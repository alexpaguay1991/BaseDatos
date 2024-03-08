---role
INSERT INTO role (role) VALUES ('Administrador');
INSERT INTO role (role) VALUES ('Medico');
commit;

---genders
INSERT INTO genders (description) VALUES ('Masculino');
INSERT INTO genders (description) VALUES ('Femenino');
commit;

---appointment_states
INSERT INTO appointment_states (state_name) VALUES ('Completada');
INSERT INTO appointment_states (state_name) VALUES ('Cancelada');
INSERT INTO appointment_states (state_name) VALUES ('No asistio');
commit;